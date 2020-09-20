import Avatar                     from "./img/propfilePic/avatar.jpg";
import maleProfilePic             from './img/defaultUserAvas/male.jpg'
import userMale                   from './img/defaultUserAvas/userMale.jpg'
// import {userLoaderTheme}  from "./backGroundSetter";
import {userMorningLoader}        from "./backGroundSetter";
import {usersApi}                 from "./app";

const ADD_POST                    = "ADD-POST";
const SET_USER_PROFILE            = 'SET_USER_PROFILE';
const TOGGLE_IS_LOADING           = 'TOGGLE_IS_LOADING';
const STATUS_CHANGER              = 'STATUS_CHANGER';
const MY_STATUS_SETTER            = 'MY_STATUS_SETTER';
const UPDATE_MY_AVATAR            = 'UPDATE_MY_AVATAR';
const GET_MY_AVATAR               = 'GET_MY_AVATAR';
const USER_STATUS_SETTER          = 'USER_STATUS_SETTER';

const addPostAC                   = (finalPost, date, time) => ({type: ADD_POST, txt: finalPost, date, time});
const setUserProfileAC            = (profile)               => ({type: SET_USER_PROFILE, profile });
const toggleIsLoadingAC           = (isLoading)             => ({type: TOGGLE_IS_LOADING, isLoading});
const myStatusSetterAC            = (status)                => ({type: MY_STATUS_SETTER, status});
const statusChangeAC              = (text)                  => ({type: STATUS_CHANGER, text: text});
const updateStatusThunkAC         = (text)                  => (dispatch) => {
    usersApi.updateMyStatus(text)
        .then(data =>{
            let finalStatus = JSON.parse(data);
            dispatch(statusChangeAC(finalStatus.status))
            dispatch(myStatusSetterAC(finalStatus.status))
        })
};
const getMyStatusThunkAC          = ()                      => (dispatch) =>             {
    usersApi.getMyStatus().then(data => { dispatch(myStatusSetterAC(data))})
};
const updateMyAvatarAC            = (file)                  => ({type: UPDATE_MY_AVATAR, file });
const updateMyAvatarThunkAC       = (file)                  => (dispatch) => {
    usersApi.updateMyAvatar(file)
        .then( data => {
            console.log(data);
            console.log(data.data.photos.large);
            dispatch(updateMyAvatarAC(data.data.photos.large))
        })
};
const getMyAvatarAC               = (myAva)                 => ({type: GET_MY_AVATAR, myAva });
const getProfileThUnkAC           = (userId)                => (dispatch) => {
    dispatch(toggleIsLoadingAC(true));
    if (!userId) userId = 2;
    usersApi.getProfile(userId)
        .then( data => {
            dispatch(setUserProfileAC(data));
            // console.log(data);
            dispatch(toggleIsLoadingAC(false));
        });
};
const getMyProfileThunkAC         = (myId)                  => (dispatch) => {
    dispatch(toggleIsLoadingAC(true));
    if (myId !==0){
        usersApi.getMyProfile(myId)
            .then( (data) => {
                dispatch(setUserProfileAC(data));
                // console.log(data)
                dispatch(getMyAvatarAC(data.photos.large))
                dispatch(toggleIsLoadingAC(false));
            });
    }
};
const UserStatusSetterAC          = (status)                => ({type: USER_STATUS_SETTER, status});
const getUserStatusThunkAC        = (userId)                => (dispatch) => {
    usersApi.getUserStatus(userId).then(data => {
        // console.log(data)
        dispatch(UserStatusSetterAC(data))}  )
};


const profilePictures = { avatarPic: Avatar, };
export const profilePics = (state = profilePictures)=> { return state };

const actionsCreators = { addPostAC, setUserProfileAC, toggleIsLoadingAC, getProfileThUnkAC,
    statusChangeAC, updateStatusThunkAC, getMyStatusThunkAC, updateMyAvatarThunkAC,
    getMyProfileThunkAC, getUserStatusThunkAC, };

export const profileACs = (state= actionsCreators)=> { return state };

let initialProfileState = {
    wallPosts:        [
        {"id": 5, "likesCount": 88, "date": "28.04.20", "time": "16:00", "message": "Many kisses honey=))"},
        {"id": 4, "likesCount": 58, "date": "28.04.20", "time": "15:30", "message": "I miss you soo much"},
        {"id": 3, "likesCount": 40, "date": "28.04.20", "time": "15:00", "message": "Lets`s met sweety!"},
        {"id": 2, "likesCount": 25, "date": "28.04.20", "time": "14:30", "message": "how are you?"},
        {"id": 1, "likesCount": 12, "date": "28.04.20", "time": "14:00", "message": "hey"},
    ],
    profile:          {
        photos: {
            small: null,
            large: null,
            }
        },
    isLoading:        false,
    loader:           userMorningLoader,
    statusEdit:       false,
    statusField:      '',
    previousStatus:   '',
    myAvatarSmall:    maleProfilePic,
    myAvatarLarge:    maleProfilePic,
};

export const profileReducer = (state = initialProfileState, action,  date, time) => {
    // debugger
    let stateCopy = {...state};
    switch (action.type) {

        case ADD_POST:
            let text = {
                id: state.wallPosts.length + 1,
                likesCount: 0,
                message: action.txt,
                date: action.date,
                time: action.time,
            };
            stateCopy.wallPosts.unshift(text); stateCopy.postField = ''; return stateCopy;

        case SET_USER_PROFILE:
            // console.log('SET_USER_PROFILE');
            return {...state, profile: action.profile, myId: action.profile.id };

        case TOGGLE_IS_LOADING: return {...state, isLoading: action.isLoading};

        case STATUS_CHANGER:
            // console.log('STATUS_CHANGER')
            stateCopy.statusField = action.text; return stateCopy;

        case MY_STATUS_SETTER:
            // console.log('MY_STATUS_SETTER');
            let number = action.status.length;
            return {...state, statusField: action.status, previousStatus: action.status,
                statusFieldBalanceLength: state.statusFieldMaxLength - number
            };

        case UPDATE_MY_AVATAR:
            // console.log('UPDATE_MY_AVATAR');
            return {...state, myAvatarLarge: action.file, myAvatarSmall: action.file };

        case GET_MY_AVATAR:
            return {...state, ...state.profile.photos.large = action.myAva, ...state.profile.photos.small = action.myAva };

        case USER_STATUS_SETTER:
            // console.log('USER_STATUS_SETTER')
            return {...state, statusField: action.status };
            
        default: return state;
    }
};

// export default profileReducer;