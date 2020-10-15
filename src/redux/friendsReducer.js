import userLoader from './loader/users/24.gif';
import maleProfilePic from './img/dialogs/male.png';
import {usersApi} from "./app";


const GOT_FRIENDS_LIST              = 'GET_FRIENDS';
const UNFOLLOW                      = 'UNFOLLOW';
const FOLLOW                        = 'FOLLOW';
const TOGGLE_IS_FOLLOWING_PROGRESS  = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const getMyFriendsAC                = (returnedList) => ({type: GOT_FRIENDS_LIST, returnedList})
const getMyFriendsListThunkAC       = () => (dispatch) => {
    usersApi.getMyFriends()
        .then(data => {
            // console.log(data);
            dispatch(getMyFriendsAC(data.items))
        })
};

const toggleFollowingProgressAC     = (isLoading, userId)  =>  ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isLoading, userId});
const unFollowBTNAC                 = (userId)             =>  ({type: UNFOLLOW, userId});
const followBTNAC                   = (userId)             =>  ({type: FOLLOW, userId});
const followThunkAC                 = (userId)             =>  (dispatch) =>  {
    dispatch(toggleFollowingProgressAC(true, userId));
    usersApi.followRequest(userId)
        .then( data =>{
            if (data.resultCode == 0){
                dispatch(followBTNAC(userId))
            }
            dispatch(toggleFollowingProgressAC(false, userId));
        })
};
const unFollowThunkAC               = (userId)             =>  (dispatch) =>  {
    dispatch(toggleFollowingProgressAC(true, userId))
    usersApi.unFollowRequest(userId)
        .then( data =>{
            if (data.resultCode == 0){
                dispatch(unFollowBTNAC(userId));
            }
            console.log(data)
            dispatch(toggleFollowingProgressAC(false, userId))
        })
};


const actionCreators = { getMyFriendsListThunkAC,followThunkAC, unFollowThunkAC }

export const friendsACs = (state = actionCreators) => {
    return state
}

const initialFriendsInfo = {
    fiendsList: [],
    defaultAvatar: maleProfilePic,
    followingInProgress: [],
};

export const friendsReducer = (state = initialFriendsInfo, action) => {

    switch (action.type) {
        case GOT_FRIENDS_LIST:
            // console.log('GOT_FRIENDS_LIST');
            return {...state, fiendsList: action.returnedList};

        case FOLLOW : /*console.log('action type === FOLLOW');*/
            return { ...state, fiendsList: state.fiendsList.map(currentUser => {
                    if (currentUser.id == action.userId) { return {...currentUser, followed: true}
                    }
                    return {...currentUser} }) };
        case UNFOLLOW : /*console.log('action type === UNFOLLOW');*/
            return { ...state, fiendsList: state.fiendsList.map(currentUser => {
                    if (currentUser.id == action.userId) { return {...currentUser, followed: false}
                    }
                    return {...currentUser} }) };
        case TOGGLE_IS_FOLLOWING_PROGRESS: /*console.log('action type === TOGGLE_IS_FOLLOWING_PROGRESS');*/
            return {
                ...state, followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id != action.userId)]  };

        default:
            return {...state}

    }
};