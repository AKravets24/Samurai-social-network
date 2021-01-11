// import maleProfilePic  from './img/dialogs/male.png'
// import { usersApi }    from "./app";
// import nobodyFoundGIF  from './img/users/polarPupCry.gif'
//
// const FOLLOW_ACTION_TOGGLER         = 'FOLLOW_ACTION_TOGGLER';
// const SET_USERS                     = 'SET_USERS';
// const SET_CURRENT_PAGE              = 'SET_CURRENT_PAGE';
// const TOGGLE_IS_LOADING             = 'TOGGLE_IS_LOADING';
// const TOGGLE_IS_FOLLOWING_PROGRESS  = 'TOGGLE_IS_FOLLOWING_PROGRESS';
// const UPDATE_SEARCH_FIELD           = 'UPDATE_SEARCH_FIELD';
// const AT_GETTING_USERS_ERROR_CAUGHT = 'AT_GETTING_USERS_ERROR_CAUGHT';
// const AT_FINDING_USERS_ERROR_CAUGHT = 'AT_FINDING_USERS_ERROR_CAUGHT';
// const ERROR_NULLIFIER               = 'ERROR_NULLIFIER';
// const ERROR_AT_FOLLOWING_TOGGLER    = 'ERROR_AT_FOLLOWING_TOGGLER';
//
//
// const followBTNTogglerAC        = (userId,isFollowed)     =>  ({type: FOLLOW_ACTION_TOGGLER,userId,isFollowed});
//
// const setUsersAC                = (users, totalCount)     =>  ({type: SET_USERS, users,totalCount});
// const setCurrentPageAC          = (currentPage)           =>  ({type: SET_CURRENT_PAGE, currentPage});
// const toggleIsLoadingAC         = (isLoading)             =>  ({type: TOGGLE_IS_LOADING, isLoading});
// const toggleFollowingProgressAC = (isLoading, userId)     =>  ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isLoading, userId});
// const errCatcherAtUsersGetAC    = (usersGettingError)     =>  ({type: AT_GETTING_USERS_ERROR_CAUGHT, usersGettingError });
// const errCatcherAtUsersFindAC   = (usersFindingError)     =>  ({type: AT_FINDING_USERS_ERROR_CAUGHT, usersFindingError });
// const setErrorToNullAC          = ()                      =>  ({type: ERROR_NULLIFIER});
// const errCatcherAtFollowingAC   = (userId,errorCode)      =>  ({type: ERROR_AT_FOLLOWING_TOGGLER,userId,errorCode});
// const updateSearchFieldAC       = (text)                  =>  ({type: UPDATE_SEARCH_FIELD, text});
//
//
// const getUsersThunkAC           = (pageSize, currentPage) => async (dispatch) =>  {
//     dispatch(toggleIsLoadingAC(true));
//     let response = await usersApi.getUsers(pageSize, currentPage);
//     response.status===200 ?
//         dispatch(setUsersAC(response.data.items,response.data.totalCount)):dispatch(errCatcherAtUsersGetAC(JSON.stringify(response.message)));
//     dispatch(toggleIsLoadingAC(false));
// };
// const setCurrentPageThunkAC     = (pageSize, currentPage) => async (dispatch) =>  {
//     dispatch(toggleIsLoadingAC(true));
//     dispatch(setCurrentPageAC(currentPage));
//     dispatch(setErrorToNullAC());
//     let response = await usersApi.getUsers(pageSize, currentPage )
//     console.log(response)
//     response.status===200 ?
//         dispatch(setUsersAC(response.data.items,response.data.totalCount)) : dispatch(errCatcherAtUsersGetAC(JSON.stringify(response.message)))
//     dispatch(toggleIsLoadingAC(false));
// };
// const followThunkTogglerAC      = (userId, isFollowed)    => async (dispatch) =>  {
//     dispatch(toggleFollowingProgressAC(true, userId));
//     let followToggler;
//     isFollowed?followToggler=usersApi.unFollowRequest:followToggler=usersApi.followRequest;
//     let response = await followToggler(userId,isFollowed)
//     response.status===200 ? dispatch(followBTNTogglerAC(userId,!isFollowed)) :
//     dispatch(errCatcherAtFollowingAC(userId, parseInt(JSON.stringify(response.message).replace(/\D+/g,""))));
//     dispatch(toggleFollowingProgressAC(false, userId));
// };
//
// const getCertainUserThunkAC     = (pageSize,userName,pageOfEquals=1)        => async (dispatch) =>  {
//     // dispatch (toggleUserSearchModeAC(true))
//     dispatch (toggleIsLoadingAC(true));
//     dispatch(setCurrentPageAC(pageOfEquals))
//     let response = await usersApi.getCertainUser(pageSize, userName, pageOfEquals)
//     response.status===200 ?
//         dispatch(setUsersAC(response.data.items,response.data.totalCount)) : dispatch(errCatcherAtUsersFindAC(JSON.stringify(response.message)));
//     dispatch(toggleIsLoadingAC(false));
// }; // доработать логику возврате(возвращает только 10 юзеров)
//
//
// const initialUsersInfo = {
//     initialUsersList:     [],
//     pageSize:             50,
//     totalCount:           0,
//     currentPage:          1,
//     isLoading:            false,
//     defaultAvatar:        maleProfilePic,
//     followingInProgress:  [],
//     userSearchMode:       false,
//     userSearchField:      '',
//     usersGettingError:    '',
//     userNotFound:         '',
//     userFindingError:     '',
//     userNotFoundGIF:      nobodyFoundGIF,
// };
//
// export const usersReducer = (state = initialUsersInfo, action) => {
//     // debugger;
//     switch (action.type) {
//         case FOLLOW_ACTION_TOGGLER:
//             console.log(FOLLOW_ACTION_TOGGLER)
//             return { ...state, initialUsersList: state.initialUsersList.map(currentUser => {
//                     if (+currentUser.id === +action.userId) { return {...currentUser, followed: action.isFollowed}
//                     } return {...currentUser} }) };
//         case ERROR_AT_FOLLOWING_TOGGLER:
//             return {...state, initialUsersList: state.initialUsersList.map (currentUser=> {
//                     if (+currentUser.id === +action.userId) { return {...currentUser, error: `${action.errorCode} error!`}
//                     } return {...currentUser}
//                 })}
//         case SET_USERS: {
//             // console.log(action)
//             return  !action.users.length ?  {...state,initialUsersList: action.users, userNotFound: 'Nobody was found',totalCount:action.totalCount}:
//              {...state, initialUsersList: action.users,totalCount:action.totalCount}
//         }
//         case SET_CURRENT_PAGE: /*console.log('action type === SET_CURRENT_PAGE');*/
//             return {...state, currentPage: action.currentPage};
//         case TOGGLE_IS_LOADING: /*console.log('action type === TOGGLE_IS_LOADING');*/
//             return {...state, isLoading: action.isLoading};
//         case TOGGLE_IS_FOLLOWING_PROGRESS: /*console.log('action type === TOGGLE_IS_FOLLOWING_PROGRESS');*/
//             return {
//                 ...state, followingInProgress: action.isLoading
//                     ? [...state.followingInProgress, action.userId]
//                     : [...state.followingInProgress.filter(id => id != action.userId)]  };
//         case UPDATE_SEARCH_FIELD:
//             console.log('UPDATE_SEARCH_FIELD');
//             return { ...state, userSearchField: action.text  };
//         case AT_GETTING_USERS_ERROR_CAUGHT:
//             console.log('AT_GETTING_USERS_ERROR_CAUGHT');
//             // action.usersGettingError.substr(1, action.usersGettingError.length-1)
//             return {...state, usersGettingError: action.usersGettingError.substr(1 ,action.usersGettingError.length-2)};
//         case AT_FINDING_USERS_ERROR_CAUGHT:
//             console.log('AT_FINDING_USERS_ERROR_CAUGHT')
//             return  {...state, userFindingError: action.usersFindingError.substr(1 ,action.usersFindingError.length-2)};
//         case ERROR_NULLIFIER:
//             // console.log('ERROR_NULLIFIER');
//             return {...state, usersGettingError: '', userFindingError:'',}
//
//         default:
//             return {...state};
//     }
// };
// const actionCreators = {getUsersThunkAC, setCurrentPageThunkAC, /*setUsersThunkAC,*/
//     getCertainUserThunkAC,updateSearchFieldAC, setErrorToNullAC, followThunkTogglerAC};
// export const usersACs = (state = actionCreators) => { return state };



import maleProfilePic  from './img/dialogs/male.png';
import { usersApi }    from "./app";
import nobodyFoundGIF  from './img/users/polarPupCry.gif';

const FOLLOW_ACTION_TOGGLER         = 'FOLLOW_ACTION_TOGGLER';
const SET_USERS                     = 'SET_USERS';
const SET_CURRENT_PAGE              = 'SET_CURRENT_PAGE';
const TOGGLE_IS_LOADING             = 'TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS  = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const UPDATE_SEARCH_FIELD           = 'UPDATE_SEARCH_FIELD';
const AT_GETTING_USERS_ERROR_CAUGHT = 'AT_GETTING_USERS_ERROR_CAUGHT';
const AT_FINDING_USERS_ERROR_CAUGHT = 'AT_FINDING_USERS_ERROR_CAUGHT';
const ERROR_NULLIFIER               = 'ERROR_NULLIFIER';
const ERROR_AT_FOLLOWING_TOGGLER    = 'ERROR_AT_FOLLOWING_TOGGLER';


type FollowBTNTogglerAC_Type        = {type: typeof FOLLOW_ACTION_TOGGLER,         userId:number,           isFollowed:boolean}
type SetUsersAC_Type                = {type: typeof SET_USERS,                     users:InitialUsersList_Type[], totalCount:number }
type SetCurrentPageAC_Type          = {type: typeof SET_CURRENT_PAGE,              currentPage:number                         }
type ToggleIsLoadingAC_Type         = {type: typeof TOGGLE_IS_LOADING,             isLoading:boolean                          }
type ToggleFollowingProgressAC_Type = {type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,  isLoading:boolean,       userId:number     }
type ErrCatcherAtUsersGetAC_Type    = {type: typeof AT_GETTING_USERS_ERROR_CAUGHT, usersGettingError:string                   }
type ErrCatcherAtUsersFindAC_Type   = {type: typeof AT_FINDING_USERS_ERROR_CAUGHT, usersFindingError:string                   }
type SetErrorToNullAC_Type          = {type: typeof ERROR_NULLIFIER                                                           }
type ErrCatcherAtFollowingAC_Type   = {type: typeof ERROR_AT_FOLLOWING_TOGGLER,    userId:number,           errorCode:number  }
type UpdateSearchFieldAC_Type       = {type: typeof UPDATE_SEARCH_FIELD,           text:string                                }


const followBTNTogglerAC        = (userId:number,isFollowed:boolean):FollowBTNTogglerAC_Type         =>  ({type: FOLLOW_ACTION_TOGGLER,         userId,isFollowed });
const setUsersAC                = (users:InitialUsersList_Type[],totalCount:number):SetUsersAC_Type  =>  ({type: SET_USERS,                     users,totalCount  });
const setCurrentPageAC          = (currentPage:number):SetCurrentPageAC_Type                         =>  ({type: SET_CURRENT_PAGE,              currentPage       });
const toggleIsLoadingAC         = (isLoading:boolean):ToggleIsLoadingAC_Type                         =>  ({type: TOGGLE_IS_LOADING,             isLoading         });
const toggleFollowingProgressAC = (isLoading:boolean, userId:number):ToggleFollowingProgressAC_Type  =>  ({type: TOGGLE_IS_FOLLOWING_PROGRESS,  isLoading, userId });
const errCatcherAtUsersGetAC    = (usersGettingError:string):ErrCatcherAtUsersGetAC_Type             =>  ({type: AT_GETTING_USERS_ERROR_CAUGHT, usersGettingError });
const errCatcherAtUsersFindAC   = (usersFindingError:string):ErrCatcherAtUsersFindAC_Type            =>  ({type: AT_FINDING_USERS_ERROR_CAUGHT, usersFindingError });
const setErrorToNullAC          = ():SetErrorToNullAC_Type                                           =>  ({type: ERROR_NULLIFIER                                  });
const errCatcherAtFollowingAC   = (userId:number,errorCode:number):ErrCatcherAtFollowingAC_Type      =>  ({type: ERROR_AT_FOLLOWING_TOGGLER,    userId,errorCode  });
const updateSearchFieldAC       = (text:string):UpdateSearchFieldAC_Type                             =>  ({type: UPDATE_SEARCH_FIELD,           text              });

type ActionTypes = FollowBTNTogglerAC_Type | SetUsersAC_Type | SetCurrentPageAC_Type | ToggleIsLoadingAC_Type |
    ToggleFollowingProgressAC_Type | ErrCatcherAtUsersGetAC_Type | ErrCatcherAtUsersFindAC_Type | SetErrorToNullAC_Type |
    ErrCatcherAtFollowingAC_Type | UpdateSearchFieldAC_Type;

const getUsersThunkAC           = (pageSize:number, currentPage:number)                    => async (dispatch:any, getState:any) =>  {
    // console.log(getState());
    dispatch(toggleIsLoadingAC(true));
    let response = await usersApi.getUsers(pageSize, currentPage);
    // console.log(response)
    response.status===200 ?
        dispatch(setUsersAC(response.data.items,response.data.totalCount)):dispatch(errCatcherAtUsersGetAC(JSON.stringify(response.message)));
    dispatch(toggleIsLoadingAC(false));
};
const setCurrentPageThunkAC     = (pageSize:number, currentPage:number)                    => async (dispatch:any) =>  {
    dispatch(toggleIsLoadingAC(true));
    dispatch(setCurrentPageAC(currentPage));
    dispatch(setErrorToNullAC());
    let response = await usersApi.getUsers(pageSize, currentPage )
    console.log(response)
    response.status===200 ?
        dispatch(setUsersAC(response.data.items,response.data.totalCount)) : dispatch(errCatcherAtUsersGetAC(JSON.stringify(response.message)))
    dispatch(toggleIsLoadingAC(false));
};
const followThunkTogglerAC      = (userId:number, isFollowed:boolean)                      => async (dispatch:any) =>  {
    dispatch(toggleFollowingProgressAC(true, userId));
    let followToggler;
    isFollowed?followToggler=usersApi.unFollowRequest:followToggler=usersApi.followRequest;
    let response = await followToggler(userId)
    response.status===200 ? dispatch(followBTNTogglerAC(userId,!isFollowed)) :
        dispatch(errCatcherAtFollowingAC(userId, parseInt(JSON.stringify(response.message).replace(/\D+/g,""))));
    dispatch(toggleFollowingProgressAC(false, userId));
};
const getCertainUserThunkAC     = (pageSize:number,userName:string,pageOfEquals:number=1)  => async (dispatch:any) =>  {
    // dispatch (toggleUserSearchModeAC(true))
    dispatch (toggleIsLoadingAC(true));
    dispatch(setCurrentPageAC(pageOfEquals))
    let response = await usersApi.getCertainUser(pageSize, userName, pageOfEquals)
    response.status===200 ?
        dispatch(setUsersAC(response.data.items,response.data.totalCount)) : dispatch(errCatcherAtUsersFindAC(JSON.stringify(response.message)));
    dispatch(toggleIsLoadingAC(false));
}; // доработать логику возврате(возвращает только 10 юзеров)

export type UsersACs_Type = {
    setErrorToNullAC     : ()=>SetErrorToNullAC_Type
    updateSearchFieldAC  : (text:string)=>UpdateSearchFieldAC_Type
    getUsersThunkAC      : (pageSize:number, currentPage:number)=>void
    setCurrentPageThunkAC: (pageSize:number, currentPage:number)=>void
    followThunkTogglerAC : (userId:number, isFollowed:boolean)=>void
    getCertainUserThunkAC: (pageSize:number,userName:string,pageOfEquals:number)=>void
}

const actionCreators:UsersACs_Type = {getUsersThunkAC, setCurrentPageThunkAC, 
    getCertainUserThunkAC,updateSearchFieldAC, setErrorToNullAC, followThunkTogglerAC};
export const usersACs = (state = actionCreators) => { return state };


type InitialUsersList_Type = {
    followed: boolean
    id: number
    name: string
    photos: { small: number, large: string }
    status: null|string
    uniqueUrlName: null|string
}

const initialUsersInfo = {
    initialUsersList:     []               as InitialUsersList_Type[],
    pageSize:             50               as number,
    totalCount:           0                as number,
    currentPage:          1                as number,
    isLoading:            false            as boolean,
    defaultAvatar:        maleProfilePic   as string,
    followingInProgress:  []               as number[],
    userSearchMode:       false            as boolean,
    userSearchField:      ''               as string,
    usersGettingError:    ''               as string,
    userNotFound:         ''               as string,
    userFindingError:     ''               as string,
    userNotFoundGIF:      nobodyFoundGIF   as string,
};

export type InitialUsersInfo_Type = typeof initialUsersInfo;

export const usersReducer = (state = initialUsersInfo, action:ActionTypes) :InitialUsersInfo_Type  => {
    // debugger;
    switch (action.type) {
        case FOLLOW_ACTION_TOGGLER:
            console.log(FOLLOW_ACTION_TOGGLER)
            return { ...state, initialUsersList: state.initialUsersList.map((currentUser:any) => {
                    if (+currentUser.id === +action.userId) { return {...currentUser, followed: action.isFollowed}
                    } return {...currentUser} }) };
        case ERROR_AT_FOLLOWING_TOGGLER:
            return {...state, initialUsersList: state.initialUsersList.map ((currentUser:any)=> {
                    if (+currentUser.id === +action.userId) { return {...currentUser, error: `${action.errorCode} error!`}
                    } return {...currentUser}})}
        case SET_USERS: {
            console.log(action)
            return  !action.totalCount ?
                {...state, initialUsersList: action.users, userNotFound: 'Nobody was found',totalCount:action.totalCount}:
                {...state, initialUsersList: action.users,totalCount:action.totalCount}
        }
        case SET_CURRENT_PAGE: /*console.log('action type === SET_CURRENT_PAGE');*/
            return {...state, currentPage: action.currentPage};
        case TOGGLE_IS_LOADING: /*console.log('action type === TOGGLE_IS_LOADING');*/
            return {...state, isLoading: action.isLoading};
        case TOGGLE_IS_FOLLOWING_PROGRESS: /*console.log('action type === TOGGLE_IS_FOLLOWING_PROGRESS');*/
            return {
                ...state, followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id != action.userId)]  };
        case UPDATE_SEARCH_FIELD:
            console.log('UPDATE_SEARCH_FIELD');
            return { ...state, userSearchField: action.text  };
        case AT_GETTING_USERS_ERROR_CAUGHT:
            console.log('AT_GETTING_USERS_ERROR_CAUGHT');
            // action.usersGettingError.substr(1, action.usersGettingError.length-1)
            return {...state, usersGettingError: action.usersGettingError.substr(1 ,action.usersGettingError.length-2)};
        case AT_FINDING_USERS_ERROR_CAUGHT:
            console.log('AT_FINDING_USERS_ERROR_CAUGHT')
            return  {...state, userFindingError: action.usersFindingError.substr(1 ,action.usersFindingError.length-2)};
        case ERROR_NULLIFIER:
            // console.log('ERROR_NULLIFIER');
            return {...state, usersGettingError: '', userFindingError:'',}

        default:
            return {...state};
    }
};


