import userLoader from './loader/users/24.gif'
import maleProfilePic from './img/defaultUserAvas/male.jpg'
import { usersApi } from "./app";

const FOLLOW                        = 'FOLLOW';
const UNFOLLOW                      = 'UNFOLLOW';
const SET_USERS                     = 'SET_USERS';
const SET_CURRENT_PAGE              = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT         = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_LOADING             = 'TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS  = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const TOGGLE_USER_SEARCH_MODE       = 'TOGGLE_USER_SEARCH_MODE';
const UPDATE_SEARCH_FIELD           = 'UPDATE_SEARCH_FIELD';

const followBTNAC               = (userId)                =>  ({type: FOLLOW, userId});
const unFollowBTNAC             = (userId)                =>  ({type: UNFOLLOW, userId});
const setUsersAC                = (users)                 =>  ({type: SET_USERS, users});
const setCurrentPageAC          = (currentPage)           =>  ({type: SET_CURRENT_PAGE, currentPage});
const setTotalUsersCountAC      = (totalCount)            =>  ({type: SET_TOTAL_USERS_COUNT, totalCount});
const toggleIsLoadingAC         = (isLoading)             =>  ({type: TOGGLE_IS_LOADING, isLoading});
const toggleFollowingProgressAC = (isLoading, userId)     =>  ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isLoading, userId});
const getUsersThunkAC           = (pageSize, currentPage) =>  (dispatch) =>  {
        dispatch(toggleIsLoadingAC(true));
        usersApi.getUsers(pageSize, currentPage)
            .then(data => {
                dispatch(setUsersAC(data.items));
                dispatch(setTotalUsersCountAC(data.totalCount));
                dispatch(toggleIsLoadingAC(false));
            })

};
const setCurrentPageThunkAC     = (pageSize, currentPage) =>  (dispatch) =>  {
        dispatch(toggleIsLoadingAC(true));
        dispatch(setCurrentPageAC(currentPage));
        usersApi.getUsers(pageSize, currentPage )
            .then(data => {
                dispatch(setUsersAC(data.items));
                dispatch(toggleIsLoadingAC(false));
            });
};
const followThunkAC             = (userId)                =>  (dispatch) =>  {
        dispatch(toggleFollowingProgressAC(true, userId));
        usersApi.followRequest(userId)
            .then( data =>{
                if (data.resultCode == 0){
                    dispatch(followBTNAC(userId))
                }
                dispatch(toggleFollowingProgressAC(false, userId));
            })
};
const unFollowThunkAC           = (userId)                =>  (dispatch) =>  {
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
const setUsersThunkAC           = (pageSize, currentPage) =>  (dispatch) =>  {
    usersApi.getUsers(pageSize, currentPage)
        .then(data => {
            dispatch(setUsersAC(data.items));
        });
};
const toggleUserSearchModeAC    = (userSearchMode)        =>  ({type: TOGGLE_USER_SEARCH_MODE, userSearchMode})
const getCertainUserThunkAC     = (userName)              =>  (dispatch) =>  {
    dispatch (toggleUserSearchModeAC(true))
    dispatch (toggleIsLoadingAC(true));
    usersApi.getCertainUser(userName)
        .then(data => {
            dispatch(setUsersAC(data.items))
            dispatch(toggleIsLoadingAC(false));
            }
        )
};
const updateSearchFieldAC       = (text)                  =>  ({type: UPDATE_SEARCH_FIELD, text});


const initialUsersInfo = {
    initialUsersList: [],
    pageSize: 7,
    totalCount: 0,
    currentPage: 1,
    isLoading: false,
    loader: userLoader,
    defaultAvatar: maleProfilePic,
    followingInProgress: [],
    userSearchMode: false,
    userSearchField: '',
};

export const usersReducer = (state = initialUsersInfo, action) => {
    // debugger;
    switch (action.type) {
        case FOLLOW : /*console.log('action type === FOLLOW');*/
            return { ...state, initialUsersList: state.initialUsersList.map(currentUser => {
                    if (currentUser.id == action.userId) { return {...currentUser, followed: true}
                    }
                    return {...currentUser} }) };
        case UNFOLLOW : /*console.log('action type === UNFOLLOW');*/
            return { ...state, initialUsersList: state.initialUsersList.map(currentUser => {
                    if (currentUser.id == action.userId) { return {...currentUser, followed: false}
                    }
                    return {...currentUser} }) };

        case SET_USERS: { /*console.log('action type === SET_USERS');*/
            return {...state, initialUsersList: action.users}
        }
        case SET_CURRENT_PAGE: /*console.log('action type === SET_CURRENT_PAGE');*/
            return {...state, currentPage: action.currentPage};

        case SET_TOTAL_USERS_COUNT: /*console.log('action type === SET_TOTAL_USERS_COUNT');*/
            return {...state, totalCount: action.totalCount};

        case TOGGLE_IS_LOADING: /*console.log('action type === TOGGLE_IS_LOADING');*/
            return {...state, isLoading: action.isLoading};

        case TOGGLE_IS_FOLLOWING_PROGRESS: /*console.log('action type === TOGGLE_IS_FOLLOWING_PROGRESS');*/
            return {
                ...state, followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id != action.userId)]  };
        case TOGGLE_USER_SEARCH_MODE:
            console.log('TOGGLE_USER_SEARCH_MODE');
            return {...state, userSearchMode: action.userSearchMode};
        case UPDATE_SEARCH_FIELD:
            console.log('UPDATE_SEARCH_FIELD');
            return { ...state, userSearchField: action.text  };

        default:
            return {...state};
    }
};
const actionCreators = {getUsersThunkAC, setCurrentPageThunkAC, followThunkAC, unFollowThunkAC,setUsersThunkAC,
    getCertainUserThunkAC, toggleUserSearchModeAC, updateSearchFieldAC};
export const usersActionCreators = (state = actionCreators) => {
    return state };
