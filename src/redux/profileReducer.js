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

const ADD_POST                    = "ADD-POST";
const SET_PROFILE                 = 'SET_PROFILE';
const STATUS_SETTER               = 'STATUS_SETTER';
const TOGGLE_IS_LOADING           = 'TOGGLE_IS_LOADING';
const UPDATE_MY_AVATAR            = 'UPDATE_MY_AVATAR';

const TOGGLER_IS_FOLLOWING        = 'TOGGLER_IS_FOLLOWING';
const FOLLOW_ACTION_TOGGLER       = 'FOLLOW_ACTION_TOGGLER';
const ERROR_AT_FOLLOWING_TOGGLER  = 'ERROR_AT_FOLLOWING_TOGGLER';
const ERROR_AT_GETTING_PROFILE    = 'ERROR_AT_GETTING_PROFILE'
const ERROR_AT_GETTING_STATUS     = 'ERROR_AT_GETTING_STATUS';
const ERROR_NULLIFIER             = 'ERROR_NULLIFIER';
const ERROR_AT_STATUS_UPDATE      = 'ERROR_AT_STATUS_UPDATE';
const ERROR_AT_AVATAR_UPDADE      = 'ERROR_AT_AVATAR_UPDADE';

const setProfileAC   = (profileData,isFollowed,status)    => ({type: SET_PROFILE,  profileData,isFollowed,status       });
const statusSetterAC            = (status)                => ({type: STATUS_SETTER,       status                       });
const addPostAC                 = (finalPost, date, time) => ({type: ADD_POST,            txt: finalPost, date, time   });
const toggleIsLoadingAC         = (isLoading)             => ({type: TOGGLE_IS_LOADING,   isLoading                    });
const updateMyAvatarAC          = (file)                  => ({type: UPDATE_MY_AVATAR,    file                         });
const followingTogglerAC        = (isFollowing)           => ({type: TOGGLER_IS_FOLLOWING,isFollowing                  });
const followBTNTogglerAC        = (userId,isFollowed)     => ({type: FOLLOW_ACTION_TOGGLER,userId,isFollowed           });
const errCatcherAtFollowingAC   = (userId,errorCode)      => ({type: ERROR_AT_FOLLOWING_TOGGLER,userId,errorCode       });
const errCatcherAtProfileGetAC  = (errorCode)             => ({type: ERROR_AT_GETTING_PROFILE, errorCode               });
const errCatcherAtStatusGetAC   = (errorCode)             => ({type: ERROR_AT_GETTING_STATUS,  errorCode               });
const setErrorToNullAC          = ()                      => ({type: ERROR_NULLIFIER                                   });
const errCattcherAtStatUpdateAC = (error)                 => ({type: ERROR_AT_STATUS_UPDATE, error                     });
const errCatcherAtAvaUpdateAC   = (errorCode)             => ({type: ERROR_AT_AVATAR_UPDADE, errorCode                 });


const getProfileThUnkAC     = (userId, isMe)              => async (dispatch) => {
    dispatch(toggleIsLoadingAC(true));
    let status='', userName='', profileData='';
    let statusResponse = await usersApi.getStatus(userId)
    statusResponse.status===200 ? status=statusResponse.data :
        dispatch(errCatcherAtStatusGetAC(parseInt(JSON.stringify(statusResponse.message).replace(/\D+/g,""))))
    let profileResponse = await usersApi.getProfile(userId)
    if (profileResponse.status === 200){
        profileData = profileResponse.data;
        userName = profileResponse.data.fullName;
        if (isMe) { dispatch(setProfileAC(profileData, false, status));
        } else {
            let certainResponse =  await usersApi.getCertainUser(userName);
            certainResponse.data && certainResponse.data.items.filter(el => {
                el.id === userId && dispatch(setProfileAC(profileData, el.followed, status));})
        }
    } else dispatch(errCatcherAtProfileGetAC(parseInt(JSON.stringify(profileResponse.message).replace(/\D+/g,""))));
    dispatch(toggleIsLoadingAC(false));
};

const followThunkTogglerAC  = (userId, isFollowed)        => async (dispatch) => {
    dispatch(followingTogglerAC(true, userId));dispatch(setErrorToNullAC());
    let followToggler;
    isFollowed?followToggler=usersApi.unFollowRequest:followToggler=usersApi.followRequest;
    let response = await followToggler(userId,isFollowed);
    response.status===200 ? dispatch(followBTNTogglerAC(userId,!isFollowed)) :
        dispatch(errCatcherAtFollowingAC(userId,parseInt(JSON.stringify(response.message).replace(/\D+/g,""))));
    dispatch(followingTogglerAC(false, userId));
};

const updateStatusThunkAC   = (text)                      => async (dispatch) => {
    let response = await usersApi.updateMyStatus(text)
    response.status===200 ?
    dispatch(statusSetterAC(JSON.parse(response.config.data).status)) : dispatch(errCattcherAtStatUpdateAC(JSON.stringify(response.message)));
};

const updateMyAvatarThunkAC = (file)                      => async (dispatch) => {
    let response = await usersApi.updateMyAvatar(file)
    // console.log(parseInt(JSON.stringify(response.message).replace(/\D+/g,"")))
    console.log(response)
    response.status === 200 ?
        dispatch(updateMyAvatarAC(response.data.data.photos.large)) :
        dispatch(errCatcherAtAvaUpdateAC(parseInt(JSON.stringify(response.message).replace(/\D+/g,""))));
};


const profilePictures = { faceBookLogo, gitHubLogo, instagramLogo, mainLinkLogo, twitterLogo, vkLogo, websiteLogo,  youTubeLogo, };
export const profilePics = (state = profilePictures)=> { return state };

const actionsCreators = { addPostAC, setProfileAC, toggleIsLoadingAC, getProfileThUnkAC,
    updateStatusThunkAC,  updateMyAvatarThunkAC,  followThunkTogglerAC};

export const profileACs = (state= actionsCreators)=> { return state };

let initialProfileState = {
    wallPosts:           [
        {"id": 5, "likesCount": 88, "date": "28.04.20", "time": "16:00", "message": "Many kisses honey=))"},
        {"id": 4, "likesCount": 58, "date": "28.04.20", "time": "15:30", "message": "I miss you soo much"},
        {"id": 3, "likesCount": 40, "date": "28.04.20", "time": "15:00", "message": "Lets`s met sweety!"},
        {"id": 2, "likesCount": 25, "date": "28.04.20", "time": "14:30", "message": "how are you?"},
        {"id": 1, "likesCount": 12, "date": "28.04.20", "time": "14:00", "message": "hey"},
    ],
    profileData:         {
        photos: {
            small: null,
            large: null,
            }
        },
    isLoading:           false,
    statusField:         '',
    myAvatarSmall:       maleProfilePic,
    myAvatarLarge:       maleProfilePic,
    isFollowed:          null,
    isFollowing:         false,
    onFollowingErr:      null,
    errOnProfileLoading: '',
    errOnStatusLoading:  '',
    errOnStatusUpdate:   '',
    errOnAvatarUpdate:   '',
};


export const profileReducer = (state = initialProfileState, action,date, time) => {
    let stateCopy = {...state};
    switch (action.type) {
        case ADD_POST:
            let text = {id:state.wallPosts.length+1,likesCount:0,message:action.txt,date:action.date,time:action.time};
            stateCopy.wallPosts.unshift(text); stateCopy.postField = ''; return stateCopy;
        case SET_PROFILE:                return {...state, profileData: action.profileData, isFollowed: action.isFollowed, statusField: action.status};
        case ERROR_AT_GETTING_PROFILE:   return {...state, errOnProfileLoading: `${action.errorCode} error!`};
        case ERROR_AT_GETTING_STATUS:    return {...state, errOnStatusLoading:  `${action.errorCode} error!`};
        case ERROR_AT_STATUS_UPDATE:     return {...state, errOnStatusUpdate:   action.error.substr(1 ,action.error.length-2)};
        case ERROR_AT_AVATAR_UPDADE:     return {...state, errOnAvatarUpdate:   `${action.errorCode} error!`};

        case FOLLOW_ACTION_TOGGLER:      return {...state, isFollowed: action.isFollowed};
        case ERROR_AT_FOLLOWING_TOGGLER: return {...state, onFollowingErr: `${action.errorCode} error!`};
        case ERROR_NULLIFIER:            return {...state, onFollowingErr:null};
        case TOGGLE_IS_LOADING:          return {...state, isLoading: action.isLoading};
        // case UPDATE_MY_AVATAR:           return {...state, myAvatarLarge: action.file, myAvatarSmall: action.file };// не обновляет компоненту
        case UPDATE_MY_AVATAR:           return {...state, ...state.profileData.photos,small: action.file, ...state.profileData.photos,large: action.file,};// не обновляет компоненту
        case STATUS_SETTER:              return {...state, statusField: action.status };
        case TOGGLER_IS_FOLLOWING:       return {...state, isFollowing: action.isFollowing};
        default:                         return {...state };
    }
};

// export default profileReducer;

// const getStatusThunkAC        = (userId)                => (dispatch) => {
//     usersApi.getStatus(userId).then(data => {dispatch(statusSetterAC(data))}  )
// };


// const getProfileThUnkAC     = (userId, isMe)             => (dispatch) => {
//     dispatch(toggleIsLoadingAC(true));
//     let status='', userName='', profileData='';
//     usersApi.getStatus(userId) .then(response => {
//         console.log(response)
//         if   (response.status===200) status=response.data
//         else {let errorCode=parseInt(JSON.stringify(response.message).replace(/\D+/g,""));
//         dispatch(errCatcherAtStatusGetAC(errorCode))
//         }
//     });
//     usersApi.getProfile(userId).then(response => {
//         // console.log(response)
//         if (response.status === 200){
//             profileData = response.data;
//             userName = response.data.fullName;
//             if (isMe) {
//                 dispatch(setProfileAC(profileData, false, status));
//                 console.log(status)
//                 dispatch(toggleIsLoadingAC(false))
//             } else {
//                 usersApi.getCertainUser(userName).then(response => {
//                     response.data && response.data.items.filter(el => {
//                         el.id === userId && dispatch(setProfileAC(profileData, el.followed, status));
//                         dispatch(toggleIsLoadingAC(false));
//                     })
//                 });
//             }
//         } else {
//             let errorCode=parseInt(JSON.stringify(response.message).replace(/\D+/g,""))
//             dispatch(errCatcherAtProfileGetAC(errorCode))
//             dispatch(toggleIsLoadingAC(false));
//         }
//     })
// };