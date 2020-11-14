import Avatar                  from "./img/profilePic/avatar.jpg";
import faceBookLogo            from "./img/profilePic/facebook.png";
import gitHubLogo              from "./img/profilePic/gitHub.png";
import instagramLogo           from "./img/profilePic/instagram.png";
import mainLinkLogo            from "./img/profilePic/mainLink.png";
import websiteLogo             from "./img/profilePic/webSite.png";
import twitterLogo             from "./img/profilePic/twitter.png";
import vkLogo                  from "./img/profilePic/vk.png";
import youTubeLogo             from "./img/profilePic/youtube.png";

import maleProfilePic          from './img/dialogs/male.png'
import {usersApi}              from "./app";

const ADD_POST                 = "ADD-POST";
const SET_PROFILE              = 'SET_PROFILE';
const STATUS_SETTER            = 'STATUS_SETTER';
const TOGGLE_IS_LOADING        = 'TOGGLE_IS_LOADING';
const UPDATE_MY_AVATAR         = 'UPDATE_MY_AVATAR';
const IS_USER_FOLLOWED         = 'IS_USER_FOLLOWED';
const TOGGLER_IS_FOLLOWING     = 'TOGGLER_IS_FOLLOWING';

const setProfileAC             = (profileData,isFollowed,status)  => ({type: SET_PROFILE,    profileData,isFollowed,status });
const statusSetterAC           = (status)                  => ({type: STATUS_SETTER,         status});
const addPostAC                = (finalPost, date, time)   => ({type: ADD_POST,              txt: finalPost, date, time});
const toggleIsLoadingAC        = (isLoading)               => ({type: TOGGLE_IS_LOADING,     isLoading});
const updateMyAvatarAC         = (file)                    => ({type: UPDATE_MY_AVATAR,      file });
const userIsFollowedAC         = (isFollowed)              => ({type:IS_USER_FOLLOWED,       isFollowed});
const followingTogglerAC       = (isFollowing)             => ({type: TOGGLER_IS_FOLLOWING,  isFollowing})

const updateStatusThunkAC      = (text)                  => (dispatch) => {
    usersApi.updateMyStatus(text)
        .then(data =>{
            let finalStatus = JSON.parse(data);
            dispatch(statusSetterAC(finalStatus.status))
        })
};
const updateMyAvatarThunkAC    = (file)                  => (dispatch) => {
    usersApi.updateMyAvatar(file)
        .then( data => {
            console.log(data);
            console.log(data.data.photos.large);
            dispatch(updateMyAvatarAC(data.data.photos.large))
        })
};

// const getProfileThUnkAC        = (userId)                => (dispatch) => {
//     dispatch(toggleIsLoadingAC(true));
//     let status = '';
//     usersApi.getStatus(userId)
//         .then(data => {
//             status = data;
//             usersApi.getProfile(userId)
//                 .then(data => {
//                     dispatch(setProfileAC(data));
//                     dispatch(statusSetterAC(status))
//                     dispatch(toggleIsLoadingAC(false));
//                 })
//
//         })
// };

const getProfileThUnkAC        = (userId)                => (dispatch) => {
    dispatch(toggleIsLoadingAC(true));
    let status = '';
    let userName='';
    let profileData='';
    usersApi.getStatus(userId)
        .then(data => {
            // console.log(1,'status', data)
            status = data;
            usersApi.getProfile(userId)
                .then(data => {
                    // console.log(2,'profileInfo', data);
                    profileData = data;
                    userName=data.fullName;
                    })
                .then( ()=>{
                    usersApi.getCertainUser(userName)
                        .then(response=>{
                            // console.log(3,'certainUser', response)
                            if (response.data) {
                                response.data.items.filter(el => {
                                    el.id === userId && dispatch(setProfileAC(profileData,el.followed, status));
                                    // dispatch(statusSetterAC(status));
                                    dispatch(toggleIsLoadingAC(false));
                                })
                            }
                        });
                })
                })
};
const getUserIsFollowedThunkAC = (userName, userId)      => (dispatch) => {
    usersApi.getCertainUser(userName)
        .then(response=>{
            if (response.data) {
                response.data.items.filter(el => {
                    el.id === userId && dispatch(userIsFollowedAC(el.followed))
                })
            }
        })
};
const followUserThunkAC        =(userId)                 => (dispatch) => {
    dispatch(followingTogglerAC(true));
    usersApi.followRequest(userId).then((data)=>{if (data.resultCode == 0){
        dispatch(userIsFollowedAC(true));
        dispatch(followingTogglerAC(false));
    }})
}
const unFollowUserThunkAC      =(userId)                 => (dispatch) => {
    dispatch(followingTogglerAC(true));
    usersApi.unFollowRequest(userId).then((data)=>{if (data.resultCode == 0){
        dispatch(userIsFollowedAC(false));
        dispatch(followingTogglerAC(false))
    }})
}


const profilePictures = { faceBookLogo, gitHubLogo, instagramLogo, mainLinkLogo, twitterLogo, vkLogo, websiteLogo,  youTubeLogo, };
export const profilePics = (state = profilePictures)=> { return state };

const actionsCreators = { addPostAC, setProfileAC, toggleIsLoadingAC, getProfileThUnkAC,
    updateStatusThunkAC,  updateMyAvatarThunkAC, /*getUserIsFollowedThunkAC,*/ followUserThunkAC, unFollowUserThunkAC};

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
    isFollowed:       null,
    isFollowing:      false,

};

export const profileReducer = (state = initialProfileState, action,  date, time) => {
    let stateCopy = {...state};
    switch (action.type) {

        case ADD_POST:
            let text = {id:state.wallPosts.length+1,likesCount:0,message:action.txt,date:action.date,time:action.time};
            stateCopy.wallPosts.unshift(text); stateCopy.postField = ''; return stateCopy;

        case SET_PROFILE:
            console.log(SET_PROFILE);
            // console.log(action)
            return {...state, profileData: action.profileData, isFollowed: action.isFollowed, statusField: action.status};

        case TOGGLE_IS_LOADING:    return {...state, isLoading: action.isLoading};

        case UPDATE_MY_AVATAR:     return {...state, myAvatarLarge: action.file, myAvatarSmall: action.file };// не обновляет компоненту

        case STATUS_SETTER:
            console.log(STATUS_SETTER) ;
            console.log(action.status)
            return {...state, statusField: action.status };

        case IS_USER_FOLLOWED:     return {...state, isFollowed: action.isFollowed};

        case TOGGLER_IS_FOLLOWING: return {...state, isFollowing: action.isFollowing};

        default:                   return {...state};
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