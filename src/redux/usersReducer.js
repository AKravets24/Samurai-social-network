import maleProfilePic  from './img/dialogs/male.png'
import { usersApi }    from "./app";

const FOLLOW                        = 'FOLLOW';
const UNFOLLOW                      = 'UNFOLLOW';
const SET_USERS                     = 'SET_USERS';
const SET_CURRENT_PAGE              = 'SET_CURRENT_PAGE';
const TOGGLE_IS_LOADING             = 'TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS  = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const TOGGLE_USER_SEARCH_MODE       = 'TOGGLE_USER_SEARCH_MODE';
const UPDATE_SEARCH_FIELD           = 'UPDATE_SEARCH_FIELD';
const AT_GETTING_USERS_ERROR_CAUGHT = 'AT_GETTING_USERS_ERROR_CAUGHT';
const AT_FINDING_USERS_ERROR_CAUGHT = 'AT_FINDING_USERS_ERROR_CAUGHT';
const ERROR_NULLIFIER               = 'ERROR_NULLIFIER';

const followBTNAC               = (userId)                =>  ({type: FOLLOW, userId});
const unFollowBTNAC             = (userId)                =>  ({type: UNFOLLOW, userId});
const setUsersAC                = (users, totalCount)     =>  ({type: SET_USERS, users,totalCount});
const setCurrentPageAC          = (currentPage)           =>  ({type: SET_CURRENT_PAGE, currentPage});
const toggleIsLoadingAC         = (isLoading)             =>  ({type: TOGGLE_IS_LOADING, isLoading});
const toggleFollowingProgressAC = (isLoading, userId)     =>  ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isLoading, userId});
const errCatcherAtUsersGetAC    = (usersGettingError)     =>  ({type: AT_GETTING_USERS_ERROR_CAUGHT, usersGettingError });
const errCatcherAtUsersFindAC   = (usersFindingError)     =>  ({type: AT_FINDING_USERS_ERROR_CAUGHT, usersFindingError });
const setErrorToNullAC          = ()                      =>  ({type: ERROR_NULLIFIER})

const getUsersThunkAC           = (pageSize, currentPage) =>  (dispatch) =>  {
        dispatch(toggleIsLoadingAC(true));
        usersApi.getUsers(pageSize, currentPage)
            .then(response => {
                if (response.data) {
                    // console.log(response)
                    dispatch(setUsersAC(response.data.items, response.data.totalCount));
                    dispatch(toggleIsLoadingAC(false));
                } else {
                    dispatch(errCatcherAtUsersGetAC(JSON.stringify(response.message)))
                    dispatch(toggleIsLoadingAC(false));
                }
            })
};
const setCurrentPageThunkAC     = (pageSize, currentPage) =>  (dispatch) =>  {
    dispatch(toggleIsLoadingAC(true));
    dispatch(setCurrentPageAC(currentPage));
    dispatch(setErrorToNullAC())
    usersApi.getUsers(pageSize, currentPage )
        .then(response => {
            if (response.data) {
                dispatch(setUsersAC(response.data.items));
                dispatch(toggleIsLoadingAC(false));
            } else {
                dispatch(errCatcherAtUsersGetAC(JSON.stringify(response.message)))
                dispatch(toggleIsLoadingAC(false));
            }
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
        .then(response => {
                if (response.data) {
                    console.log(response)
                    dispatch(setUsersAC(response.data.items,response.data.totalCount))
                    dispatch(toggleIsLoadingAC(false));
                } else {
                    dispatch(errCatcherAtUsersFindAC(JSON.stringify(response.message)))
                    dispatch(toggleIsLoadingAC(false));
                }
            }
        )
}; // доработать логику возврате(возвращает только 10 юзеров)



const updateSearchFieldAC       = (text)                  =>  ({type: UPDATE_SEARCH_FIELD, text});


const initialUsersInfo = {
    initialUsersList:     [],
    pageSize:             80,
    totalCount:           0,
    currentPage:          1,
    isLoading:            false,
    defaultAvatar:        maleProfilePic,
    followingInProgress:  [],
    userSearchMode:       false,
    userSearchField:      '',
    usersGettingError:    '',
    userFindingError:     '',
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
            // console.log(action)
            return {...state, initialUsersList: action.users,totalCount:action.totalCount}
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
        case TOGGLE_USER_SEARCH_MODE:
            console.log('TOGGLE_USER_SEARCH_MODE');
            return {...state, userSearchMode: action.userSearchMode};
        case UPDATE_SEARCH_FIELD:
            console.log('UPDATE_SEARCH_FIELD');
            return { ...state, userSearchField: action.text  };
        case AT_GETTING_USERS_ERROR_CAUGHT:
            console.log('AT_GETTING_USERS_ERROR_CAUGHT');
            // action.usersGettingError.substr(1, action.usersGettingError.length-1)
            return {...state, usersGettingError: action.usersGettingError.substr(1 ,action.usersGettingError.length-2)};
        case AT_FINDING_USERS_ERROR_CAUGHT:
            console.log('AT_FINDING_USERS_ERROR_CAUGHT')
            return  {...state, userFindingError: action.usersFindingError.substr(1 ,action.usersFindingError.length-2)+12345}

        case ERROR_NULLIFIER:
            // console.log('ERROR_NULLIFIER');
            return {...state, usersGettingError: '', userFindingError:'',}

        default:
            return {...state};
    }
};
const actionCreators = {getUsersThunkAC, setCurrentPageThunkAC, followThunkAC, unFollowThunkAC,setUsersThunkAC,
    getCertainUserThunkAC, toggleUserSearchModeAC, updateSearchFieldAC, setErrorToNullAC};
export const usersACs = (state = actionCreators) => { return state };
