import Avatar from "./img/profilePic/avatar.jpg";
import faceBookLogo from "./img/profilePic/facebook.png";
import gitHubLogo from "./img/profilePic/gitHub.png";
import instagramLogo from "./img/profilePic/instagram.png";
import mainLinkLogo from "./img/profilePic/mainLink.png";
import websiteLogo from "./img/profilePic/webSite.png";
import twitterLogo from "./img/profilePic/twitter.png";
import vkLogo from "./img/profilePic/vk.png";
import youTubeLogo from "./img/profilePic/youtube.png";

import maleProfilePic from './img/dialogs/male.png';
import { ProfileData_Type, usersApi } from "./app";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";

type SetProfileAC_Type = { type: 'SET_PROFILE', profileData: any, isFollowed: boolean, status: string };
type AddPostAC_Type = { type: 'ADD_POST', finalPost: string, date: string, time: string };
type ToggleIsLoadingAC_Type = { type: 'TOGGLE_IS_LOADING', isLoading: boolean };

const actions = {
  setProfileAC: (profileData: any, isFollowed: boolean, status: string) => ({ type: 'SET_PROFILE', profileData, isFollowed, status } as const),
  statusSetterAC: (status: string) => ({ type: 'STATUS_SETTER', status } as const),
  addPostAC: (finalPost: string, date: string, time: string) => ({ type: 'ADD_POST', finalPost, date, time } as const),
  toggleIsLoadingAC: (isLoading: boolean) => ({ type: 'TOGGLE_IS_LOADING', isLoading } as const),
  updateMyAvatarAC: (file: string) => ({ type: 'UPDATE_MY_AVATAR', file } as const),
  followingTogglerAC: (isFollowing: boolean) => ({ type: 'TOGGLER_IS_FOLLOWING', isFollowing } as const),
  followBTNTogglerAC: (userId: null | number, isFollowed: null | boolean) => ({ type: 'FOLLOW_ACTION_TOGGLER', userId, isFollowed } as const),
  errCatcherAtFollowingAC: (userId: null | number, errorCode: number) => ({ type: 'ERROR_AT_FOLLOWING_TOGGLER', userId, errorCode } as const),
  errCatcherAtProfileGetAC: (errorCode: number) => ({ type: 'ERROR_AT_GETTING_PROFILE', errorCode } as const),
  errCatcherAtStatusGetAC: (errorCode: number) => ({ type: 'ERROR_AT_GETTING_STATUS', errorCode } as const),
  setErrorToNullAC: () => ({ type: 'ERROR_NULLIFIER' } as const),
  errCattcherAtStatUpdateAC: (error: string) => ({ type: 'ERROR_AT_STATUS_UPDATE', error } as const),
  errCatcherAtAvaUpdateAC: (errorCode: number) => ({ type: 'ERROR_AT_AVATAR_UPDADE', errorCode } as const),
  sendMSGPositiveReportAC: (report: string) => ({ type: 'SEND_MSG_TO_USER', report } as const),
  errOnSendingMSGToUserAC: (errorCode: number) => ({ type: 'ERROR_MSG_SENDING', errorCode } as const),
  sendingStatCleanerAC: () => ({ type: 'SENDING_STAT_CLEAN' } as const),
}


type ActionTypes = InferActionsTypes<typeof actions>

type ThunkAC_Type = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type Dispatch_Type = Dispatch<ActionTypes>

// const getProfileThUnkAC     = (userId:number, isMe:boolean):ThunkAC_Type       => async (dispatch:Dispatch_Type) => {
//     dispatch(toggleIsLoadingAC(true));
//     let status='', userName='', profileData={};
//     let statusResponse = await usersApi.getStatus(userId)
//     statusResponse.status===200 ? status=statusResponse.data :
//         dispatch(errCatcherAtStatusGetAC(parseInt(JSON.stringify(statusResponse.message).replace(/\D+/g,""))))
//     let profileResponse = await usersApi.getProfile(userId) 
//     console.log(profileResponse);

//     if (profileResponse.status === 200){
//         profileData = profileResponse.data;
//         userName = profileResponse.data.fullName;
//         if (isMe) { dispatch(setProfileAC(profileData, false, status));
//         } else {
//             let certainResponse =  await usersApi.getCertainUser(null,userName);
//             certainResponse.data.items.filter((el:any) => {
//                 el.id === userId && dispatch(setProfileAC(profileData, el.followed, status));})
//         }
//     // } else dispatch(errCatcherAtProfileGetAC(parseInt(JSON.stringify(profileResponse.message).replace(/\D+/g,""))));
//     } else dispatch(errCatcherAtProfileGetAC(parseInt(JSON.stringify(profileResponse).replace(/\D+/g,""))));
//     dispatch(toggleIsLoadingAC(false));
// };


const getProfileThUnkAC = (userId: null | number, isMe: boolean): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  dispatch(actions.toggleIsLoadingAC(true));
  let status = '', userName = '', profileData = {};
  try {
    let statusResponse = await usersApi.getStatus(userId)
    if (statusResponse.status === 200) status = statusResponse.data
  } catch (err) { dispatch(actions.errCatcherAtStatusGetAC(parseInt(JSON.stringify(err.message).replace(/\D+/g, "")))) }
  try {
    let profileResponse = await usersApi.getProfile(userId)
    if (profileResponse.status === 200) {
      profileData = profileResponse.data;
      userName = profileResponse.data.fullName;
      if (isMe) {
        dispatch(actions.setProfileAC(profileData, false, status));
      } else {
        let certainResponse = await usersApi.getCertainUser(null, userName);
        console.log(certainResponse);
        certainResponse.data.items.filter((el: any) => {
          el.id === userId && dispatch(actions.setProfileAC(profileData, el.followed, status));
        })
      }
    }
  } catch (err) {
    dispatch(actions.errCatcherAtProfileGetAC(parseInt(JSON.stringify(err.message).replace(/\D+/g, ""))));
    dispatch(actions.toggleIsLoadingAC(false));
  }
};

const followThunkTogglerAC = (userId: null | number, isFollowed: null | boolean): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  dispatch(actions.followingTogglerAC(true)); dispatch(actions.setErrorToNullAC());
  let followToggler;
  isFollowed ? followToggler = usersApi.unFollowRequest : followToggler = usersApi.followRequest;
  try {
    let response = await followToggler(userId);
    if (response.status === 200) dispatch(actions.followBTNTogglerAC(userId, !isFollowed))
  }
  catch (err) { dispatch(actions.errCatcherAtFollowingAC(userId, parseInt(JSON.stringify(err.message).replace(/\D+/g, "")))); }
  dispatch(actions.followingTogglerAC(false));
};

const updateStatusThunkAC = (text: string): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  try {
    let response = await usersApi.updateMyStatus(text)
    if (response.status === 200) dispatch(actions.statusSetterAC(JSON.parse(response.config.data).status))
  } catch (err) { dispatch(actions.errCattcherAtStatUpdateAC(JSON.stringify(err.message))) };
};

const updateMyAvatarThunkAC = (file: string): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  try {
    let response = await usersApi.updateMyAvatar(file)
    // console.log(parseInt(JSON.stringify(response.message).replace(/\D+/g,"")))
    console.log(response)
    if (response.status === 200)
      dispatch(actions.updateMyAvatarAC(response.data.data.photos.large))
  } catch (err) {
    dispatch(actions.errCatcherAtAvaUpdateAC(parseInt(JSON.stringify(err.message).replace(/\D+/g, ""))))
  };
};

const sendMsgToTalkerThunkAC = (userId: null | number, message: string): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  try {
    let response = await usersApi.sendMsgToTalker(userId, message);
    console.log(response);
    if (response.status === 200) dispatch(actions.sendMSGPositiveReportAC('Your message delivered!'))
  } catch (err) {
    dispatch(actions.errOnSendingMSGToUserAC(parseInt(JSON.stringify(err.message).replace(/\D+/g, ""))));
  }
}

const afterSendMSGStatCleaner = (): any => (dispatch: any) => {          // поправить экшн нормальным написанием 
  dispatch(actions.sendingStatCleanerAC())
}

export type ProfilePicturesTypes = { faceBookLogo: string, gitHubLogo: string, instagramLogo: string, mainLinkLogo: string, twitterLogo: string, vkLogo: string, websiteLogo: string, youTubeLogo: string }

const profilePictures: ProfilePicturesTypes = { faceBookLogo, gitHubLogo, instagramLogo, mainLinkLogo, twitterLogo, vkLogo, websiteLogo, youTubeLogo, };
export const profilePics = (state = profilePictures) => { return state };

export type profileACs_Type = {
  addPostAC: (finalPost: string, date: string, time: string) => AddPostAC_Type
  setProfileAC: (profileData: any, isFollowed: boolean, status: string) => SetProfileAC_Type
  toggleIsLoadingAC: (isLoading: boolean) => ToggleIsLoadingAC_Type
  getProfileThUnkAC: (userId: null | number, isMe: boolean) => ThunkAC_Type
  updateStatusThunkAC: (text: string) => ThunkAC_Type
  updateMyAvatarThunkAC: (file: any) => ThunkAC_Type
  followThunkTogglerAC: (userId: null | number, isFollowed: null | boolean) => ThunkAC_Type
  sendMsgToTalkerThunkAC: (userId: null | number, message: string) => ThunkAC_Type
  afterSendMSGStatCleaner: () => void
}

const actionsCreators: profileACs_Type = {
  addPostAC: actions.addPostAC, setProfileAC: actions.setProfileAC, toggleIsLoadingAC: actions.toggleIsLoadingAC, getProfileThUnkAC, updateStatusThunkAC, updateMyAvatarThunkAC,
  followThunkTogglerAC, sendMsgToTalkerThunkAC, afterSendMSGStatCleaner
};

export const profileACs = (state = actionsCreators) => { return state };

let initialProfileState = {
  wallPosts: [
    { "id": 5, "likesCount": 88, "date": "28.04.20", "time": "16:00", "message": "Many kisses honey=))" },
    { "id": 4, "likesCount": 58, "date": "28.04.20", "time": "15:30", "message": "I miss you soo much" },
    { "id": 3, "likesCount": 40, "date": "28.04.20", "time": "15:00", "message": "Lets`s met sweety!" },
    { "id": 2, "likesCount": 25, "date": "28.04.20", "time": "14:30", "message": "how are you?" },
    { "id": 1, "likesCount": 12, "date": "28.04.20", "time": "14:00", "message": "hey" },
  ] as Array<{ id: number, likesCount: number, date: string, time: string, message: string }>,
  profileData: {
    aboutMe: null as null | string,
    contacts: {
      facebook: '' as string | null,
      github: '' as string | null,
      instagram: '' as string | null,
      mainlink: '' as string | null,
      twitter: '' as string | null,
      vk: '' as string | null,
      website: '' as string | null,
      youtube: '' as string | null,
    },
    fullName: '' as string,
    lookingForAJob: '' as string,
    lookingForAJobDescription: '' as string,
    photos: {
      small: null as null | string,
      large: null as null | string,
    },
    userId: null as null | number
  },
  isLoading: false as boolean,
  statusField: '' as string,
  myAvatarSmall: maleProfilePic as string,
  myAvatarLarge: maleProfilePic as string,
  isFollowed: null as null | boolean,
  isFollowing: false as boolean,
  onFollowingErr: null as null | string,
  errOnProfileLoading: '' as string,
  errOnStatusLoading: '' as string,
  errOnStatusUpdate: '' as string,
  errOnAvatarUpdate: '' as string,
  MSGToUserSended: '' as string,
  errAtMSGSending: '' as string,
};

export type InitialProfileState_Type = typeof initialProfileState

export const profileReducer = (state: InitialProfileState_Type = initialProfileState, action: ActionTypes, /* date:string, time:string */): InitialProfileState_Type => {
  let stateCopy = { ...state };
  switch (action.type) {                                                                                                  //сделать через Formik
    case 'ADD_POST':
      let text = { id: state.wallPosts.length + 1, likesCount: 0, date: action.date, time: action.time, message: action.finalPost };
      state.wallPosts.unshift(text);
      return { ...state };
    case 'SET_PROFILE': return { ...state, profileData: action.profileData, isFollowed: action.isFollowed, statusField: action.status };
    case 'ERROR_AT_GETTING_PROFILE': return { ...state, errOnProfileLoading: `${action.errorCode} error!` };
    case 'ERROR_AT_GETTING_STATUS': return { ...state, errOnStatusLoading: `${action.errorCode} error!` };
    case 'ERROR_AT_STATUS_UPDATE': return { ...state, errOnStatusUpdate: action.error.substr(1, action.error.length - 2) };
    case 'ERROR_AT_AVATAR_UPDADE': return { ...state, errOnAvatarUpdate: `${action.errorCode} error!` };
    case 'FOLLOW_ACTION_TOGGLER': return { ...state, isFollowed: action.isFollowed };
    case 'ERROR_AT_FOLLOWING_TOGGLER': return { ...state, onFollowingErr: `${action.errorCode} error!` };
    case 'ERROR_NULLIFIER': return { ...state, onFollowingErr: null };
    case 'TOGGLE_IS_LOADING': return { ...state, isLoading: action.isLoading };
    // case UPDATE_MY_AVATAR:           return {...state, myAvatarLarge: action.file, myAvatarSmall: action.file };// не обновляет компоненту
    case 'UPDATE_MY_AVATAR': return {
      ...state, ...state.profileData.photos, small: action.file,
      ...state.profileData.photos/*,large: action.file,*/
    };// не обновляет компоненту
    case 'STATUS_SETTER': return { ...state, statusField: action.status };
    case 'TOGGLER_IS_FOLLOWING': return { ...state, isFollowing: action.isFollowing };

    case 'SEND_MSG_TO_USER': return { ...state, MSGToUserSended: action.report }
    case 'ERROR_MSG_SENDING': return { ...state, errAtMSGSending: `${action.errorCode} error!` }
    case 'SENDING_STAT_CLEAN': return { ...state, MSGToUserSended: '', errAtMSGSending: '' }

    default: return { ...state };
  }
};

export default profileReducer;


// type WallPosts_Type = DataPostsObj_Type[]
// type DataPostsObj_Type = {id:number, likesCount:number, date:string, time:string, message: string}

// type ProfileData_Type = { photos: { small: null|string, large: null|string }  }


// type InitialProfileState_Type1 = {
//     wallPosts:           WallPosts_Type
//     profileData:         ProfileData_Type
//     isLoading:           boolean
//     statusField:         string
//     myAvatarSmall:       string
//     myAvatarLarge:       string
//     isFollowed:          null | boolean
//     isFollowing:         boolean
//     onFollowingErr:      null | string
//     errOnProfileLoading: string
//     errOnStatusLoading:  string
//     errOnStatusUpdate:   string
//     errOnAvatarUpdate:   string
// }



// import Avatar                  from "./img/profilePic/avatar.jpg";
// import faceBookLogo            from "./img/profilePic/facebook.png";
// import gitHubLogo              from "./img/profilePic/gitHub.png";
// import instagramLogo           from "./img/profilePic/instagram.png";
// import mainLinkLogo            from "./img/profilePic/mainLink.png";
// import websiteLogo             from "./img/profilePic/webSite.png";
// import twitterLogo             from "./img/profilePic/twitter.png";
// import vkLogo                  from "./img/profilePic/vk.png";
// import youTubeLogo             from "./img/profilePic/youtube.png";
//
// import maleProfilePic          from './img/dialogs/male.png'
// import {usersApi}              from "./app";
//
// const ADD_POST                    = "ADD-POST";
// const SET_PROFILE                 = 'SET_PROFILE';
// const STATUS_SETTER               = 'STATUS_SETTER';
// const TOGGLE_IS_LOADING           = 'TOGGLE_IS_LOADING';
// const UPDATE_MY_AVATAR            = 'UPDATE_MY_AVATAR';
//
// const TOGGLER_IS_FOLLOWING        = 'TOGGLER_IS_FOLLOWING';
// const FOLLOW_ACTION_TOGGLER       = 'FOLLOW_ACTION_TOGGLER';
// const ERROR_AT_FOLLOWING_TOGGLER  = 'ERROR_AT_FOLLOWING_TOGGLER';
// const ERROR_AT_GETTING_PROFILE    = 'ERROR_AT_GETTING_PROFILE'
// const ERROR_AT_GETTING_STATUS     = 'ERROR_AT_GETTING_STATUS';
// const ERROR_NULLIFIER             = 'ERROR_NULLIFIER';
// const ERROR_AT_STATUS_UPDATE      = 'ERROR_AT_STATUS_UPDATE';
// const ERROR_AT_AVATAR_UPDADE      = 'ERROR_AT_AVATAR_UPDADE';
//
// const setProfileAC   = (profileData,isFollowed,status)    => ({type: SET_PROFILE,  profileData,isFollowed,status       });
// const statusSetterAC            = (status)                => ({type: STATUS_SETTER,       status                       });
// const addPostAC                 = (finalPost, date, time) => ({type: ADD_POST,            txt: finalPost, date, time   });
// const toggleIsLoadingAC         = (isLoading)             => ({type: TOGGLE_IS_LOADING,   isLoading                    });
// const updateMyAvatarAC          = (file)                  => ({type: UPDATE_MY_AVATAR,    file                         });
// const followingTogglerAC        = (isFollowing)           => ({type: TOGGLER_IS_FOLLOWING,isFollowing                  });
// const followBTNTogglerAC        = (userId,isFollowed)     => ({type: FOLLOW_ACTION_TOGGLER,userId,isFollowed           });
// const errCatcherAtFollowingAC   = (userId,errorCode)      => ({type: ERROR_AT_FOLLOWING_TOGGLER,userId,errorCode       });
// const errCatcherAtProfileGetAC  = (errorCode)             => ({type: ERROR_AT_GETTING_PROFILE, errorCode               });
// const errCatcherAtStatusGetAC   = (errorCode)             => ({type: ERROR_AT_GETTING_STATUS,  errorCode               });
// const setErrorToNullAC          = ()                      => ({type: ERROR_NULLIFIER                                   });
// const errCattcherAtStatUpdateAC = (error)                 => ({type: ERROR_AT_STATUS_UPDATE, error                     });
// const errCatcherAtAvaUpdateAC   = (errorCode)             => ({type: ERROR_AT_AVATAR_UPDADE, errorCode                 });
//
//
// const getProfileThUnkAC     = (userId, isMe)              => async (dispatch) => {
//     dispatch(toggleIsLoadingAC(true));
//     let status='', userName='', profileData='';
//     let statusResponse = await usersApi.getStatus(userId)
//     statusResponse.status===200 ? status=statusResponse.data :
//         dispatch(errCatcherAtStatusGetAC(parseInt(JSON.stringify(statusResponse.message).replace(/\D+/g,""))))
//     let profileResponse = await usersApi.getProfile(userId)
//     if (profileResponse.status === 200){
//         profileData = profileResponse.data;
//         userName = profileResponse.data.fullName;
//         if (isMe) { dispatch(setProfileAC(profileData, false, status));
//         } else {
//             let certainResponse =  await usersApi.getCertainUser(null,userName);
//             certainResponse.data.items.filter(el => {
//                 el.id === userId && dispatch(setProfileAC(profileData, el.followed, status));})
//         }
//     } else dispatch(errCatcherAtProfileGetAC(parseInt(JSON.stringify(profileResponse.message).replace(/\D+/g,""))));
//     dispatch(toggleIsLoadingAC(false));
// };
//
// const followThunkTogglerAC  = (userId, isFollowed)        => async (dispatch) => {
//     dispatch(followingTogglerAC(true, userId));dispatch(setErrorToNullAC());
//     let followToggler;
//     isFollowed?followToggler=usersApi.unFollowRequest:followToggler=usersApi.followRequest;
//     let response = await followToggler(userId,isFollowed);
//     response.status===200 ? dispatch(followBTNTogglerAC(userId,!isFollowed)) :
//         dispatch(errCatcherAtFollowingAC(userId,parseInt(JSON.stringify(response.message).replace(/\D+/g,""))));
//     dispatch(followingTogglerAC(false, userId));
// };
//
// const updateStatusThunkAC   = (text)                      => async (dispatch) => {
//     let response = await usersApi.updateMyStatus(text)
//     response.status===200 ?
//         dispatch(statusSetterAC(JSON.parse(response.config.data).status)) : dispatch(errCattcherAtStatUpdateAC(JSON.stringify(response.message)));
// };
//
// const updateMyAvatarThunkAC = (file)                      => async (dispatch) => {
//     let response = await usersApi.updateMyAvatar(file)
//     // console.log(parseInt(JSON.stringify(response.message).replace(/\D+/g,"")))
//     console.log(response)
//     response.status === 200 ?
//         dispatch(updateMyAvatarAC(response.data.data.photos.large)) :
//         dispatch(errCatcherAtAvaUpdateAC(parseInt(JSON.stringify(response.message).replace(/\D+/g,""))));
// };
//
//
// const profilePictures = { faceBookLogo, gitHubLogo, instagramLogo, mainLinkLogo, twitterLogo, vkLogo, websiteLogo,  youTubeLogo, };
// export const profilePics = (state = profilePictures)=> { return state };
//
// const actionsCreators = { addPostAC, setProfileAC, toggleIsLoadingAC, getProfileThUnkAC,
//     updateStatusThunkAC,  updateMyAvatarThunkAC,  followThunkTogglerAC};
//
// export const profileACs = (state= actionsCreators)=> { return state };
//
// let initialProfileState = {
//     wallPosts:           [
//         {"id": 5, "likesCount": 88, "date": "28.04.20", "time": "16:00", "message": "Many kisses honey=))"},
//         {"id": 4, "likesCount": 58, "date": "28.04.20", "time": "15:30", "message": "I miss you soo much"},
//         {"id": 3, "likesCount": 40, "date": "28.04.20", "time": "15:00", "message": "Lets`s met sweety!"},
//         {"id": 2, "likesCount": 25, "date": "28.04.20", "time": "14:30", "message": "how are you?"},
//         {"id": 1, "likesCount": 12, "date": "28.04.20", "time": "14:00", "message": "hey"},
//     ],
//     profileData:         {
//         photos: {
//             small: null,
//             large: null,
//         }
//     },
//     isLoading:           false,
//     statusField:         '',
//     myAvatarSmall:       maleProfilePic,
//     myAvatarLarge:       maleProfilePic,
//     isFollowed:          null,
//     isFollowing:         false,
//     onFollowingErr:      null,
//     errOnProfileLoading: '',
//     errOnStatusLoading:  '',
//     errOnStatusUpdate:   '',
//     errOnAvatarUpdate:   '',
// };
//
//
// export const profileReducer = (state = initialProfileState, action,date, time) => {
//     let stateCopy = {...state};
//     switch (action.type) {
//         case ADD_POST:
//             let text = {id:state.wallPosts.length+1,likesCount:0,message:action.txt,date:action.date,time:action.time};
//             stateCopy.wallPosts.unshift(text); stateCopy.postField = ''; return stateCopy;
//         case SET_PROFILE:
//             console.log(action);              return {...state, profileData: action.profileData, isFollowed: action.isFollowed, statusField: action.status};
//         case ERROR_AT_GETTING_PROFILE:   return {...state, errOnProfileLoading: `${action.errorCode} error!`};
//         case ERROR_AT_GETTING_STATUS:    return {...state, errOnStatusLoading:  `${action.errorCode} error!`};
//         case ERROR_AT_STATUS_UPDATE:     return {...state, errOnStatusUpdate:   action.error.substr(1 ,action.error.length-2)};
//         case ERROR_AT_AVATAR_UPDADE:     return {...state, errOnAvatarUpdate:   `${action.errorCode} error!`};
//
//         case FOLLOW_ACTION_TOGGLER:      return {...state, isFollowed: action.isFollowed};
//         case ERROR_AT_FOLLOWING_TOGGLER: return {...state, onFollowingErr: `${action.errorCode} error!`};
//         case ERROR_NULLIFIER:            return {...state, onFollowingErr:null};
//         case TOGGLE_IS_LOADING:          return {...state, isLoading: action.isLoading};
//         // case UPDATE_MY_AVATAR:           return {...state, myAvatarLarge: action.file, myAvatarSmall: action.file };// не обновляет компоненту
//         case UPDATE_MY_AVATAR:           return {...state, ...state.profileData.photos,small: action.file, ...state.profileData.photos,large: action.file,};// не обновляет компоненту
//         case STATUS_SETTER:              return {...state, statusField: action.status };
//         case TOGGLER_IS_FOLLOWING:       return {...state, isFollowing: action.isFollowing};
//         default:                         return {...state };
//     }
// };
//
// export default profileReducer;
//
