import Panorama from "./img/propfilePic/summer.jpg";
import Avatar from "./img/propfilePic/avatar.jpg";
import maleProfilePic from './img/defaultUserAvas/male.jpg'
import {userLoaderTheme} from "./backGroundSetter";
import {usersApi} from "./app";

const UPDATE_POST_FIELD            =  'UPDATE-POST-FIELD';
const ADD_POST                     =  "ADD-POST";
const SET_USER_PROFILE             =  'SET_USER_PROFILE';
const TOGGLE_IS_LOADING            =  'TOGGLE_IS_LOADING';
const STATUS_CHANGER               =  'STATUS_CHANGER';
const STATUS_EDITOR_ON             =  'STATUS_EDITOR_ON';
const STATUS_EDITOR_OFF            =  'STATUS_EDITOR_OFF';
const MY_STATUS_SETTER             =  'MY_STATUS_SETTER';
const UPDATE_MY_AVATAR             =  'UPDATE_MY_AVATAR';
const GET_MY_AVATAR                =  'GET_MY_AVATAR';
const SET_LETTER_BALANCE_COUNTER   =  'SET_LETTER_BALANCE_COUNTER';

const updatePostFieldAC       = (text) =>                  ({type: UPDATE_POST_FIELD, text});
const addPostAC               = (finalPost, date, time) => ({type: ADD_POST, txt: finalPost, date, time});
const setUserProfileAC        = (profile) =>               ({ type: SET_USER_PROFILE, profile });
const toggleIsLoadingAC       = (isLoading) =>             ({type: TOGGLE_IS_LOADING, isLoading});
const getProfileThUnkAC       = (userId)=>                 (dispatch) => {
    dispatch(toggleIsLoadingAC(true));
    console.log('да откуда блять ты лезешь мразь?')
    if (!userId) userId = 2;
    usersApi.getProfile(userId)
        .then( response => {
            dispatch(setUserProfileAC(response.data));
            console.log(response.data)
            dispatch(toggleIsLoadingAC(false));
        });
};
const statusEditOnAC          = () =>                      ({type: STATUS_EDITOR_ON});
const statusChangeAC          = (text) =>                  ({type: STATUS_CHANGER, text: text});
const statusEditOffAC         = () =>                      ({type: STATUS_EDITOR_OFF});
const updateStatusThunkAC     = (text) =>                  (dispatch) => {
    usersApi.updateMyStatus(text)
        .then(data =>{
            let finalStatus = JSON.parse(data);
            dispatch(statusChangeAC(finalStatus.status))
            dispatch(myStatusSetterAC(finalStatus.status))
        })
};
const myStatusSetterAC        = (status) =>                ({type:MY_STATUS_SETTER, status});
const getMyStatusThunkAC      = () =>                      (dispatch) => {
    usersApi.getMyStatus().then(data => { dispatch(myStatusSetterAC(data))})
};
const updateMyAvatarAC        = (file)  =>                 ({type: UPDATE_MY_AVATAR, file });
const updateMyAvatarThunkAC   = (file) =>                  (dispatch) => {
    usersApi.updateMyAvatar(file)
        .then( data => {
            console.log(data);
            console.log(data.data.photos.large);
            dispatch(updateMyAvatarAC(data.data.photos.large))
        })
};

const getMyAvatarAC           = (myAva) =>                 ({ type: GET_MY_AVATAR, myAva })
const getMyProfileThunkAC     =() =>                       (dispatch) => {
    dispatch(toggleIsLoadingAC(true));
    usersApi.getMyProfile()
        .then( data => {
            dispatch(setUserProfileAC(data));

            dispatch(getMyAvatarAC(data.photos.large))
            dispatch(toggleIsLoadingAC(false));
        });

};
const letterBalanceCounterAC  =(number) =>                 ({type: SET_LETTER_BALANCE_COUNTER, number})


const profilePictures = { panoramaPic: Panorama, avatarPic: Avatar, };



export const profilePics = (state = profilePictures)=> { return state };

const actionsCreators = {updatePostFieldAC, addPostAC, setUserProfileAC, toggleIsLoadingAC, getProfileThUnkAC,
    statusEditOnAC, statusChangeAC, statusEditOffAC, updateStatusThunkAC, getMyStatusThunkAC, updateMyAvatarThunkAC,
    getMyProfileThunkAC, letterBalanceCounterAC,  };

export const profileACs = (state= actionsCreators)=> { return state };

let initialProfileState = {
    wallPosts: [
        {"id": 5, "likesCount": 88, "date": "28.04.20", "time": "16:00", "message": "Many kisses honey=))"},
        {"id": 4, "likesCount": 58, "date": "28.04.20", "time": "15:30", "message": "I miss you soo much"},
        {"id": 3, "likesCount": 40, "date": "28.04.20", "time": "15:00", "message": "Lets`s met sweety!"},
        {"id": 2, "likesCount": 25, "date": "28.04.20", "time": "14:30", "message": "how are you?"},
        {"id": 1, "likesCount": 12, "date": "28.04.20", "time": "14:00", "message": "hey"},
    ],
    postField: '',
    profile: null,
    isLoading: false,
    loader: userLoaderTheme,
    statusEdit: false,
    statusField: '',
    statusFieldMaxLength: 300,
    statusFieldBalanceLength: 0,
    previousStatus: '',
    myAvatarSmall: '',
    myAvatarLarge: maleProfilePic,
    myId: 0,
};

export const profileReducer = (state = initialProfileState, action,  date, time) => {
    // debugger
    let stateCopy = {...state};
    switch (action.type) {
        case UPDATE_POST_FIELD : stateCopy.postField = action.text; return stateCopy;

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
            return {...state, profile: action.profile };

        case TOGGLE_IS_LOADING: return {...state, isLoading: action.isLoading};

        case STATUS_EDITOR_ON:
            // console.log('STATUS_EDITOR_ON')
            return {...state, statusEdit: true};

        case STATUS_CHANGER:
            // console.log('STATUS_CHANGER')
            stateCopy.statusField = action.text; return stateCopy;

        case STATUS_EDITOR_OFF:
            // console.log('STATUS_EDITOR_OFF')
            return {...state, statusEdit: false};

        case MY_STATUS_SETTER:
            // console.log('MY_STATUS_SETTER');
            let number = action.status.length
            return {...state, statusField: action.status, previousStatus: action.status,
                statusFieldBalanceLength: state.statusFieldMaxLength - number
            };

        case UPDATE_MY_AVATAR:
            // console.log('UPDATE_MY_AVATAR');
            return {...state, myAvatarLarge: action.file, myAvatarSmall: action.file };

        case GET_MY_AVATAR: return {...state, myAvatarLarge: action.myAva, myAvatarSmall: action.myAva};

        case SET_LETTER_BALANCE_COUNTER:
            // console.log('SET_LETTER_BALANCE_COUNTER')
            return {...state, statusFieldBalanceLength: action.number };

        default: return state;
    }
};

// export default profileReducer;