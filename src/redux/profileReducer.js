import Avatar                 from "./img/profilePic/avatar.jpg";
import maleProfilePic         from './img/dialogs/male.png'

import {usersApi}             from "./app";

const ADD_POST                = "ADD-POST";
const SET_PROFILE             = 'SET_PROFILE';
const STATUS_SETTER           = 'STATUS_SETTER';
const TOGGLE_IS_LOADING       = 'TOGGLE_IS_LOADING';
const UPDATE_MY_AVATAR        = 'UPDATE_MY_AVATAR';

const setProfileAC            = (profileData)           => ({type: SET_PROFILE, profileData });
const statusSetterAC          = (status)                => ({type: STATUS_SETTER, status});
const addPostAC               = (finalPost, date, time) => ({type: ADD_POST, txt: finalPost, date, time});
const toggleIsLoadingAC       = (isLoading)             => ({type: TOGGLE_IS_LOADING, isLoading});
const updateMyAvatarAC        = (file)                  => ({type: UPDATE_MY_AVATAR, file });

const updateStatusThunkAC     = (text)                  => (dispatch) => {
    usersApi.updateMyStatus(text)
        .then(data =>{
            let finalStatus = JSON.parse(data);
            dispatch(statusSetterAC(finalStatus.status))
        })
};
const updateMyAvatarThunkAC   = (file)                  => (dispatch) => {
    usersApi.updateMyAvatar(file)
        .then( data => {
            console.log(data);
            console.log(data.data.photos.large);
            dispatch(updateMyAvatarAC(data.data.photos.large))
        })
};
const getProfileThUnkAC       = (userId)                => (dispatch) => {
    dispatch(toggleIsLoadingAC(true));
    let status = '';
    usersApi.getStatus(userId)
        .then(data => {
            status = data;
            usersApi.getProfile(userId)
                .then(data => {

                        dispatch(setProfileAC(data));
                        dispatch(statusSetterAC(status))
                        dispatch(toggleIsLoadingAC(false));
                    });
                });
};

const profilePictures = { avatarPic: Avatar, };
export const profilePics = (state = profilePictures)=> { return state };

const actionsCreators = { addPostAC, setProfileAC, toggleIsLoadingAC, getProfileThUnkAC,
    updateStatusThunkAC,  updateMyAvatarThunkAC,};

export const profileACs = (state= actionsCreators)=> { return state };

let initialProfileState = {
    wallPosts:        [
        {"id": 5, "likesCount": 88, "date": "28.04.20", "time": "16:00", "message": "Many kisses honey=))"},
        {"id": 4, "likesCount": 58, "date": "28.04.20", "time": "15:30", "message": "I miss you soo much"},
        {"id": 3, "likesCount": 40, "date": "28.04.20", "time": "15:00", "message": "Lets`s met sweety!"},
        {"id": 2, "likesCount": 25, "date": "28.04.20", "time": "14:30", "message": "how are you?"},
        {"id": 1, "likesCount": 12, "date": "28.04.20", "time": "14:00", "message": "hey"},
    ],
    profileData:      {
        photos: {
            small: null,
            large: null,
            }
        },
    isLoading:        false,
    statusField:      '',
    myAvatarSmall:    maleProfilePic,
    myAvatarLarge:    maleProfilePic,
};

export const profileReducer = (state = initialProfileState, action,  date, time) => {
    // debugger
    let stateCopy = {...state};
    switch (action.type) {

        case ADD_POST:
            let text = {id:state.wallPosts.length+1,likesCount:0,message:action.txt,date:action.date,time:action.time};
            stateCopy.wallPosts.unshift(text); stateCopy.postField = ''; return stateCopy;

        case SET_PROFILE:
            // console.log('SET_USER_PROFILE');
            return {...state, profileData: action.profileData };

        case TOGGLE_IS_LOADING: return {...state, isLoading: action.isLoading};

        case UPDATE_MY_AVATAR: // не обновляет компоненту
            // console.log('UPDATE_MY_AVATAR');
            return {...state, myAvatarLarge: action.file, myAvatarSmall: action.file };

        case STATUS_SETTER:
            // console.log('USER_STATUS_SETTER')
            return {...state, statusField: action.status };

        default: return state;
    }
};

// export default profileReducer;

// const getStatusThunkAC        = (userId)                => (dispatch) => {
//     usersApi.getStatus(userId).then(data => {dispatch(statusSetterAC(data))}  )
// };


// const getProfileThUnkAC       = (userId)                => (dispatch) => {
//     dispatch(toggleIsLoadingAC(true));
//     let status = '';
//     usersApi.getStatus(userId)
//         .then(data => {
//             console.log(data)
//             status = data;
//             dispatch(statusSetterAC(data))
//
//             usersApi.getProfile(userId)
//                 .then(data => {
//                     dispatch(setProfileAC(data));
//                     // console.log(data);
//                     dispatch(toggleIsLoadingAC(false));
//                 });
//
//         })
// };