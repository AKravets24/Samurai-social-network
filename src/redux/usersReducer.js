import maleProfilePic  from './img/dialogs/male.png'
import { usersApi }    from "./app";
import {dialogsReducer} from "./dialogsReducer";

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


const followBTNTogglerAC        = (userId,isFollowed)     =>  ({type: FOLLOW_ACTION_TOGGLER,userId,isFollowed});

const setUsersAC                = (users, totalCount)     =>  ({type: SET_USERS, users,totalCount});
const setCurrentPageAC          = (currentPage)           =>  ({type: SET_CURRENT_PAGE, currentPage});
const toggleIsLoadingAC         = (isLoading)             =>  ({type: TOGGLE_IS_LOADING, isLoading});
const toggleFollowingProgressAC = (isLoading, userId)     =>  ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isLoading, userId});
const errCatcherAtUsersGetAC    = (usersGettingError)     =>  ({type: AT_GETTING_USERS_ERROR_CAUGHT, usersGettingError });
const errCatcherAtUsersFindAC   = (usersFindingError)     =>  ({type: AT_FINDING_USERS_ERROR_CAUGHT, usersFindingError });
const setErrorToNullAC          = ()                      =>  ({type: ERROR_NULLIFIER});
const errCatcherAtFollowingAC   = (userId,errorCode)      =>  ({type: ERROR_AT_FOLLOWING_TOGGLER,userId,errorCode});
const updateSearchFieldAC       = (text)                  =>  ({type: UPDATE_SEARCH_FIELD, text});


const getUsersThunkAC           = (pageSize, currentPage) => async (dispatch) =>  {
    dispatch(toggleIsLoadingAC(true));
    let response = await usersApi.getUsers(pageSize, currentPage);
    response.status===200 ?
        dispatch(setUsersAC(response.data.items,response.data.totalCount)):dispatch(errCatcherAtUsersGetAC(JSON.stringify(response.message)));
    dispatch(toggleIsLoadingAC(false));
};
const setCurrentPageThunkAC     = (pageSize, currentPage) => async (dispatch) =>  {
    dispatch(toggleIsLoadingAC(true));
    dispatch(setCurrentPageAC(currentPage));
    dispatch(setErrorToNullAC());
    let response = await usersApi.getUsers(pageSize, currentPage )
    console.log(response)
    response.status===200 ?
        dispatch(setUsersAC(response.data.items,response.data.totalCount)) : dispatch(errCatcherAtUsersGetAC(JSON.stringify(response.message)))
    dispatch(toggleIsLoadingAC(false));
};
const followThunkTogglerAC      = (userId, isFollowed)    => async (dispatch) =>  {
    dispatch(toggleFollowingProgressAC(true, userId));
    let followToggler;
    isFollowed?followToggler=usersApi.unFollowRequest:followToggler=usersApi.followRequest;
    let response = await followToggler(userId,isFollowed)
    response.status===200 ? dispatch(followBTNTogglerAC(userId,!isFollowed)) :
    dispatch(errCatcherAtFollowingAC(userId, parseInt(JSON.stringify(response.message).replace(/\D+/g,""))));
    dispatch(toggleFollowingProgressAC(false, userId));
};

const getCertainUserThunkAC     = (pageSize,userName,pageOfEquals=1)        => async (dispatch) =>  {
    // dispatch (toggleUserSearchModeAC(true))
    dispatch (toggleIsLoadingAC(true));
    dispatch(setCurrentPageAC(pageOfEquals))
    let response = await usersApi.getCertainUser(pageSize, userName, pageOfEquals)
    response.status===200 ?
        dispatch(setUsersAC(response.data.items,response.data.totalCount)) : dispatch(errCatcherAtUsersFindAC(JSON.stringify(response.message)));
    dispatch(toggleIsLoadingAC(false));
}; // доработать логику возврате(возвращает только 10 юзеров)


const initialUsersInfo = {
    initialUsersList:     [],
    pageSize:             50,
    totalCount:           0,
    currentPage:          1,
    isLoading:            false,
    defaultAvatar:        maleProfilePic,
    followingInProgress:  [],
    userSearchMode:       false,
    userSearchField:      '',
    usersGettingError:    '',
    userNotFound:         '',
    userFindingError:     '',
};

export const usersReducer = (state = initialUsersInfo, action) => {
    // debugger;
    switch (action.type) {
        case FOLLOW_ACTION_TOGGLER:
            console.log(FOLLOW_ACTION_TOGGLER)
            return { ...state, initialUsersList: state.initialUsersList.map(currentUser => {
                    if (+currentUser.id === +action.userId) { return {...currentUser, followed: action.isFollowed}
                    } return {...currentUser} }) };
        case ERROR_AT_FOLLOWING_TOGGLER:
            return {...state, initialUsersList: state.initialUsersList.map (currentUser=> {
                    if (+currentUser.id === +action.userId) { return {...currentUser, error: `${action.errorCode} error!`}
                    } return {...currentUser}
                })}
        case SET_USERS: {
            console.log(action)
            return  !action.users.length ?  {...state,initialUsersList: action.users, userNotFound: 'Nobody was found',totalCount:action.totalCount}:
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
const actionCreators = {getUsersThunkAC, setCurrentPageThunkAC, /*setUsersThunkAC,*/
    getCertainUserThunkAC,updateSearchFieldAC, setErrorToNullAC, followThunkTogglerAC};
export const usersACs = (state = actionCreators) => { return state };
