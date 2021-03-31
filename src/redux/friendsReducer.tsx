import maleProfilePic from './img/dialogs/male.png';
import { usersApi, UsersArr } from "./app";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from './redux-store';

// const GOT_FRIENDS_LIST              = 'GET_FRIENDS';
// const FOLLOW_ACTION_TOGGLER         = 'FOLLOW_ACTION_TOGGLER';
// const TOGGLE_IS_FOLLOWING_PROGRESS  = 'TOGGLE_IS_FOLLOWING_PROGRESS';
// const ERROR_AT_FOLLOWING_TOGGLER    = 'ERROR_AT_FOLLOWING_TOGGLER';
// const ERROR_AT_GETTING_USERS        = 'ERROR_AT_GETTING_USERS';

// type GetMyFriendsAC_Type            = {type: typeof GOT_FRIENDS_LIST, returnedList: UsersArr[] }
// type FollowBTNTogglerAC_Type        = {type: typeof FOLLOW_ACTION_TOGGLER, userId:number, isFollowed:boolean}
// type ErrCatcherAtFollowingAC_Type   = {type: typeof ERROR_AT_FOLLOWING_TOGGLER, userId:number,errorCode:number}
// type ToggleFollowingProgressAC_Type = {type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isLoading:boolean, userId:number}
// type ErrCatcherAtFriendsGetAC_Type  = {type: typeof ERROR_AT_GETTING_USERS, usersGettingError:string}

// type ActionTypes = GetMyFriendsAC_Type | FollowBTNTogglerAC_Type | ErrCatcherAtFollowingAC_Type | ToggleFollowingProgressAC_Type | ErrCatcherAtFriendsGetAC_Type


const actions = {
    friendsListIsLoadingAC: (isLoading: boolean) => ({ type: 'FRIENDS_LIST_TOGGLE_IS_LOADING', isLoading } as const),
    getMyFriendsAC: (returnedList: UsersArr[], friendsCounter: number) => ({ type: 'GOT_FRIENDS_LIST', returnedList, friendsCounter } as const),
    followBTNTogglerAC: (userId: number, isFollowed: boolean) => ({ type: 'FOLLOW_ACTION_TOGGLER', userId, isFollowed } as const),
    errCatcherAtFollowingAC: (userId: number, errorCode: number) => ({ type: 'ERROR_AT_FOLLOWING_TOGGLER', userId, errorCode } as const),
    toggleFollowingProgressAC: (isLoading: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isLoading, userId } as const),
    errCatcherAtFriendsGetAC: (usersGettingError: string) => ({ type: 'ERROR_AT_GETTING_USERS', usersGettingError } as const),
    ifUnMountCleanerAC: () => ({ type: 'COMPONENT_UNMOUNTED' } as const),
    followingErrCleaner: (userId: number) => ({ type: 'AT_FOLLOWING_ERROR_CLEANED', userId } as const),
}

type ActionTypes = InferActionsTypes<typeof actions>

type Dispatch_Type = Dispatch<ActionTypes>
type ThunkAC_Type = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

const getMyFriendsListThunkAC = (page: number): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
    if (page === 1) dispatch(actions.friendsListIsLoadingAC(true))
    try {
        let response = await usersApi.getMyFriends(page)
        if (response.status === 200) dispatch(actions.getMyFriendsAC(response.data.items, response.data.totalCount))
        console.log(response)
    }
    catch (err) { dispatch(actions.errCatcherAtFriendsGetAC(JSON.stringify(err.message))) }
    if (page === 1) dispatch(actions.friendsListIsLoadingAC(false))
};


const followThunkTogglerAC = (userId: number, isFollowed: boolean): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
    dispatch(actions.toggleFollowingProgressAC(true, userId));
    dispatch(actions.followingErrCleaner(userId));
    let followToggler;
    isFollowed ? followToggler = usersApi.unFollowRequest : followToggler = usersApi.followRequest;
    try {
        let response = await followToggler(userId)
        if (response.status === 200) dispatch(actions.followBTNTogglerAC(userId, !isFollowed))
    }
    catch (err) { dispatch(actions.errCatcherAtFollowingAC(userId, parseInt(JSON.stringify(err.message).replace(/\D+/g, "")))); } // errorCode
    dispatch(actions.toggleFollowingProgressAC(false, userId));
};

const unMountCleaner = () => (dispatch: Dispatch_Type) => { dispatch(actions.ifUnMountCleanerAC()) }

export type FriendsACs = {
    followThunkTogglerAC: (userId: number, isFollowed: boolean) => ThunkAC_Type
    getMyFriendsListThunkAC: (page: number) => ThunkAC_Type
    unMountCleaner: () => void
}

const actionCreators: FriendsACs = { getMyFriendsListThunkAC, followThunkTogglerAC, unMountCleaner };

export const friendsACs = (state = actionCreators) => { return state };


const initialFriendsInfo = {
    friendsList: [] as UsersArr[],
    friendsCount: 0 as number,
    defaultAvatar: maleProfilePic as string,
    followingInProgress: [] as number[],
    errOnGettingFriends: '' as string,
    friendsListIsLoading: false as boolean,

};

export type InitialFriendsInfo_Type = typeof initialFriendsInfo;


export const friendsReducer = (state = initialFriendsInfo, action: ActionTypes): InitialFriendsInfo_Type => {
    switch (action.type) {
        case 'FRIENDS_LIST_TOGGLE_IS_LOADING': return { ...state, friendsListIsLoading: action.isLoading }
        // case 'GOT_FRIENDS_LIST': return { ...state, friendsList: action.returnedList };
        case 'GOT_FRIENDS_LIST': return { ...state, friendsList: [...state.friendsList, ...action.returnedList], friendsCount: action.friendsCounter };

        // case ERROR_AT_GETTING_USERS:       return {...state,errOnGettingFriends: action.usersGettingError}
        case 'ERROR_AT_GETTING_USERS': return { ...state, errOnGettingFriends: action.usersGettingError.substr(1, action.usersGettingError.length - 2) };
        case 'FOLLOW_ACTION_TOGGLER': return {
            ...state, friendsList: state.friendsList.map((currentUser: UsersArr) => {
                if (+currentUser.id === +action.userId) {
                    return { ...currentUser, followed: action.isFollowed }
                } return { ...currentUser }
            })
        };

        case 'AT_FOLLOWING_ERROR_CLEANED':
            return {
                ...state, friendsList: state.friendsList.map((currentUser: any) => {
                    if (+currentUser.id === +action.userId) {
                        return { ...currentUser, error: '' }
                    } return { ...currentUser }
                })
            };


        case 'ERROR_AT_FOLLOWING_TOGGLER': return {
            ...state, friendsList: state.friendsList.map((currentUser: UsersArr) => {
                if (currentUser.id == action.userId) {
                    return { ...currentUser, error: `${action.errorCode} error!` }
                } return { ...currentUser }
            })
        };
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': return {
            ...state, followingInProgress: action.isLoading
                ? [...state.followingInProgress, action.userId]
                : [...state.followingInProgress.filter(id => id != action.userId)]
        };
        case 'COMPONENT_UNMOUNTED': return { ...state, friendsList: [], friendsCount: 0 }

        default: return { ...state };
    }
};

// import maleProfilePic from './img/dialogs/male.png';
// import {usersApi}     from "./app";
//
// const GOT_FRIENDS_LIST              = 'GET_FRIENDS';
// const FOLLOW_ACTION_TOGGLER         = 'FOLLOW_ACTION_TOGGLER';
// const TOGGLE_IS_FOLLOWING_PROGRESS  = 'TOGGLE_IS_FOLLOWING_PROGRESS';
// const ERROR_AT_FOLLOWING_TOGGLER    = 'ERROR_AT_FOLLOWING_TOGGLER';
// const ERROR_AT_GETTING_USERS        = 'ERROR_AT_GETTING_USERS';
//
// const getMyFriendsAC                = (returnedList)       =>  ({type: GOT_FRIENDS_LIST, returnedList});
// const followBTNTogglerAC            = (userId,isFollowed)  =>  ({type: FOLLOW_ACTION_TOGGLER,userId,isFollowed});
// const errCatcherAtFollowingAC       = (userId,errorCode)   =>  ({type: ERROR_AT_FOLLOWING_TOGGLER,userId,errorCode});
// const toggleFollowingProgressAC     = (isLoading, userId)  =>  ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isLoading, userId});
// const errCatcherAtFriendsGetAC      = (usersGettingError)  =>  ({type: ERROR_AT_GETTING_USERS, usersGettingError });
//
// const followThunkTogglerAC          = (userId,isFollowed)  =>  async (dispatch) =>  {
//     dispatch(toggleFollowingProgressAC(true, userId));
//     let followToggler;
//     isFollowed?followToggler=usersApi.unFollowRequest:followToggler=usersApi.followRequest;
//     let response = await followToggler(userId,isFollowed)
//     response.status===200 ? dispatch(followBTNTogglerAC(userId,!isFollowed)) :
//         dispatch(errCatcherAtFollowingAC(userId,parseInt(JSON.stringify(response.message).replace(/\D+/g,"")))); // errorCode
//     dispatch(toggleFollowingProgressAC(false, userId));
// };
//
// const getMyFriendsListThunkAC       = ()                   =>  async (dispatch) =>  {
//     let response = await usersApi.getMyFriends()
//     response.status===200 ?
//         dispatch(getMyFriendsAC(response.data.items)):dispatch(errCatcherAtFriendsGetAC(JSON.stringify(response.message)))
// };
//
// const actionCreators = {getMyFriendsListThunkAC,followThunkTogglerAC};
//
// export const friendsACs =(state=actionCreators)=>{return state};
//
// const initialFriendsInfo = {
//     fiendsList: [],
//     defaultAvatar: maleProfilePic,
//     followingInProgress: [],
//     errOnGettingFriends: '',
// };
//
// export const friendsReducer = (state = initialFriendsInfo, action) => {
//     switch (action.type) {
//         case GOT_FRIENDS_LIST:             return {...state,fiendsList:action.returnedList};
//         // case ERROR_AT_GETTING_USERS:       return {...state,errOnGettingFriends: action.usersGettingError}
//         case ERROR_AT_GETTING_USERS:       return {...state, errOnGettingFriends: action.usersGettingError.substr(1 ,action.usersGettingError.length-2)};
//         case FOLLOW_ACTION_TOGGLER:        return {...state,fiendsList:state.fiendsList.map(currentUser=> {
//                 if (+currentUser.id === +action.userId) { return {...currentUser, followed: action.isFollowed}
//                 } return {...currentUser} })};
//         case ERROR_AT_FOLLOWING_TOGGLER:   return {...state,fiendsList:state.fiendsList.map(currentUser=> {
//                 if (currentUser.id == action.userId) { return {...currentUser, error: `${action.errorCode} error!`  }
//                 } return {...currentUser} })};
//         case TOGGLE_IS_FOLLOWING_PROGRESS: return {...state,followingInProgress: action.isLoading
//                 ? [...state.followingInProgress, action.userId]
//                 : [...state.followingInProgress.filter(id => id != action.userId)]  };
//         default:                           return {...state};
//     }
// };