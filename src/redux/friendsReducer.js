import maleProfilePic from './img/dialogs/male.png';
import {usersApi}     from "./app";

const GOT_FRIENDS_LIST              = 'GET_FRIENDS';
const FOLLOW_ACTION_TOGGLER         = 'FOLLOW_ACTION_TOGGLER';
const TOGGLE_IS_FOLLOWING_PROGRESS  = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const ERROR_AT_FOLLOWING_TOGGLER    = 'ERROR_AT_FOLLOWING_TOGGLER';
const ERROR_AT_GETTING_USERS        = 'ERROR_AT_GETTING_USERS';

const getMyFriendsAC                = (returnedList)       =>  ({type: GOT_FRIENDS_LIST, returnedList});
const followBTNTogglerAC            = (userId,isFollowed)  =>  ({type: FOLLOW_ACTION_TOGGLER,userId,isFollowed});
const errCatcherAtFollowingAC       = (userId,errorCode)   =>  ({type: ERROR_AT_FOLLOWING_TOGGLER,userId,errorCode});
const toggleFollowingProgressAC     = (isLoading, userId)  =>  ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isLoading, userId});
const errCatcherAtFriendsGetAC      = (usersGettingError)  =>  ({type: ERROR_AT_GETTING_USERS, usersGettingError });

const followThunkTogglerAC          = (userId,isFollowed)  =>  async (dispatch) =>  {
    dispatch(toggleFollowingProgressAC(true, userId));
    let followToggler;
    isFollowed?followToggler=usersApi.unFollowRequest:followToggler=usersApi.followRequest;
    let response = await followToggler(userId,isFollowed)
        response.status===200 ? dispatch(followBTNTogglerAC(userId,!isFollowed)) :
        dispatch(errCatcherAtFollowingAC(userId,parseInt(JSON.stringify(response.message).replace(/\D+/g,"")))); // errorCode
    dispatch(toggleFollowingProgressAC(false, userId));
};

const getMyFriendsListThunkAC       = ()                   =>  async (dispatch) =>  {
    let response = await usersApi.getMyFriends()
        response.status===200 ?
        dispatch(getMyFriendsAC(response.data.items)):dispatch(errCatcherAtFriendsGetAC(JSON.stringify(response.message)))
};

const actionCreators = {getMyFriendsListThunkAC,followThunkTogglerAC};

export const friendsACs =(state=actionCreators)=>{return state};

const initialFriendsInfo = {
    fiendsList: [],
    defaultAvatar: maleProfilePic,
    followingInProgress: [],
    errOnGettingFriends: '',
};

export const friendsReducer = (state = initialFriendsInfo, action) => {
    switch (action.type) {
        case GOT_FRIENDS_LIST:             return {...state,fiendsList:action.returnedList};
        // case ERROR_AT_GETTING_USERS:       return {...state,errOnGettingFriends: action.usersGettingError}
        case ERROR_AT_GETTING_USERS:       return {...state, errOnGettingFriends: action.usersGettingError.substr(1 ,action.usersGettingError.length-2)};
        case FOLLOW_ACTION_TOGGLER:        return {...state,fiendsList:state.fiendsList.map(currentUser=> {
                    if (+currentUser.id === +action.userId) { return {...currentUser, followed: action.isFollowed}
                    } return {...currentUser} })};
        case ERROR_AT_FOLLOWING_TOGGLER:   return {...state,fiendsList:state.fiendsList.map(currentUser=> {
                if (currentUser.id == action.userId) { return {...currentUser, error: `${action.errorCode} error!`  }
                } return {...currentUser} })};
        case TOGGLE_IS_FOLLOWING_PROGRESS: return {...state,followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id != action.userId)]  };
        default:                           return {...state};
    }
};