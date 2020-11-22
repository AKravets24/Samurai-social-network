import { createSelector } from 'reselect'

// APP RESELECTORS====================================================================================================================APP RESELECTORS============

export const getBackGroundReducer          = state => state.backgroundReducer                                   ;
export const getInitialized                = state => state.appAuthReducer.appIsInitialized                     ;
export const getAppACs                     = state => state.appAC                                               ;
export const getBackGroundSetterACs        = state => state.backGroundSetterACs                                 ;

const getBackgroundPic                     = state => state.backgroundReducer.backgroundPic                     ;
const getTimeToChangeTheme                 = state => state.backgroundReducer.timeToChangeTheme                 ;
const getAuth_LDR_GIF                      = state => state.backgroundReducer.auth_LDR_GIF                      ; //also used in Profile reSelector
export const getSmartBackGroundReducer = createSelector(getBackgroundPic,getTimeToChangeTheme,getAuth_LDR_GIF,
    (backgroundPic,timeToChangeTheme,auth_LDR_GIF)=> {
    return {backgroundPic, timeToChangeTheme,auth_LDR_GIF}})                                                 ;

export const geSmartInitialized        = createSelector(getInitialized,(appInitialized)=>{
    return{appInitialized}})                                                                                    ;

// HEADER RESELECTORS================================================================================================================HEADER RESELECTORS=============
export const getColorTheme                 = state => state.backgroundReducer.theme                             ; //also used in Dialogs reSelector
export const getHeaderAC                   = state => state.headerAC                                            ; //also used in Users   reSelector
// in reSelector control, it returns appReducer's state
const getAppIsInitialized                  = state => state.appAuthReducer.appIsInitialized                     ;
export const getMyId                       = state => state.appAuthReducer.id                                   ; //also used in Profile, NavBar reSelectors, ContentComp
const getEmail                             = state => state.appAuthReducer.email                                ;
const geLogin                              = state => state.appAuthReducer.login                                ;
export const getIsAuth                     = state => state.appAuthReducer.isAuth                               ; //also used in ContentComp

export const getSmartAppAuthReducer    = createSelector(getAppIsInitialized,getMyId,getEmail,geLogin,getIsAuth,
    (appIsInitialized,id,email,login,isAuth)=>{return {appIsInitialized,id,email,login,isAuth}});

// NAVBAR RESELECTORS=================================================================================================================NAVBAR RESELECTORS============

export const getDialogACs                  = state => state.dialogACs                                           ;
export const getTheme                      = state => state.backgroundReducer.theme                             ; //also used in Profile reSelector
const getBtnNewMessagesState               = state => state.dialogsReducer.newMessageBTNDisabled                ;
const getNewMSGSCounter                    = state => state.dialogsReducer.newMessagesCounter                   ;
const getMsgLoader                         = state => state.dialogsReducer.msgLoader                            ; //also used in Dialogs reSelector
const getErrGettingNewMSGSCount            = state => state.dialogsReducer.errGettingNewMSGSCount               ; //also used in Dialogs reSelector
const getOnErrorPic                        = state => state.dialogsReducer.onError                              ;

export const getSmartPartialDialogReducer = createSelector(getBtnNewMessagesState, getNewMSGSCounter, getMsgLoader, getErrGettingNewMSGSCount, getOnErrorPic,
    (newMessageBTNDisabled,newMessagesCounter,msgLoader,errGettingNewMSGSCount,onError)=> {
    return {newMessageBTNDisabled,newMessagesCounter,msgLoader,errGettingNewMSGSCount,onError}})

// CONTENTCOMP RESELECTORS===========================================================================================================CONTENTCOMP RESELECTORS========
export const getSmartIdAndIsAuth          = createSelector(getIsAuth,getMyId,(isAuth,id)=> {return {isAuth,id}})

// PROFILE RESELECTORS===============================================================================================================PROFILE RESELECTORS============
// export const getMyId                       = state => state.appAuthReducer.id                                ;
export const getProfileACs                 = state => state.profileACs                                          ;
export const getProfilePics                = state => state.profilePics                                         ;
// in reSelector's control it returns  profileReducer's state
const getWallPosts                         = state => state.profileReducer.wallPosts                            ;
const getProfileData                       = state => state.profileReducer.profileData                          ;
const getIsLoading_compProfile             = state => state.profileReducer.isLoading                            ;
const getStatusField                       = state => state.profileReducer.statusField                          ;
const getMyAvatarSmall                     = state => state.profileReducer.myAvatarSmall                        ;
const getMyAvatarLarge                     = state => state.profileReducer.myAvatarLarge                        ;
const getIsFollowed                        = state => state.profileReducer.isFollowed                           ;
const getIsFollowing                       = state => state.profileReducer.isFollowing                          ;

export const getSmartProfileMediaData = createSelector(
    getWallPosts, getProfileData, getIsLoading_compProfile, getStatusField, getMyAvatarSmall, getMyAvatarLarge,
    getIsFollowed, getIsFollowing,   (
        wallPosts,profileData,isLoading,statusField,myAvatarSmall,myAvatarLarge,isFollowed,isFollowing,  )=> {
        return {wallPosts, profileData, isLoading, statusField, myAvatarSmall, myAvatarLarge, isFollowed, isFollowing,
        }
    });
// pics and gifs to Profile
// const getTheme                            = state =>  state.backgroundReducer.theme                             ;
// const getAuth_LDR_GIF                     = state =>  state.backgroundReducer.auth_LDR_GIF                      ;
const getAva_LDR_GIF                      = state =>  state.backgroundReducer.profileThemes.ava_LDR_GIF         ;
const getBTN_LDR_GIF                      = state =>  state.backgroundReducer.profileThemes.BTN_LDR_GIF         ;
const getStatus_LDR_GIF                   = state =>  state.backgroundReducer.profileThemes.status_LDR_GIF      ;
const getPanoramaPic                      = state =>  state.backgroundReducer.profileThemes.panoramaPic         ;
const getPanorama_LDR_GIF                 = state =>  state.backgroundReducer.profileThemes.panorama_LDR_GIF    ;

export const getSmartPicsNLoaders = createSelector(getTheme,getAuth_LDR_GIF,getAva_LDR_GIF,getBTN_LDR_GIF,getStatus_LDR_GIF,
    getPanoramaPic,getPanorama_LDR_GIF,
    (theme,auth_LDR_GIF,ava_LDR_GIF,BTN_LDR_GIF,status_LDR_GIF,
     panoramaPic,panorama_LDR_GIF)=> {
        return  {colorTheme:theme,auth_LDR_GIF,ava_LDR_GIF,BTN_LDR_GIF,status_LDR_GIF,
            panoramaPic,panorama_LDR_GIF }
    })

// DIALOGS RESELECTORS===============================================================================================================DIALOGS RESELECTORS============
export const getDialogsACs_compDialogs  = state => state.dialogACs                                               ;
export const getDialogsReducer          = state => state.dialogsReducer                                          ;
// initial Dialogs Reducer's state in reselector's controle
const getDialogsList                    = state => state.dialogsReducer.dialogsList                              ;
const getCertainDialog                  = state => state.dialogsReducer.certainDialog                            ;
const getAllDialogsIsLoading            = state => state.dialogsReducer.allDialogsIsLoading                      ;
const getDefaultAvatar_compDialogs      = state => state.dialogsReducer.defaultAvatar                            ;
const getcertainDialogLoader            = state => state.dialogsReducer.certainDialogLoader                      ;
const getAllDialogsLoader               = state => state.dialogsReducer.allDialogsLoader                         ;
const getNewMessagesCounter             = state => state.dialogsReducer.newMessagesCounter                       ;
const getNewMessageBTNDisabled          = state => state.dialogsReducer.newMessageBTNDisabled                    ;
// const getMsgLoader                      = state => state.dialogsReducer.msgLoader                                ;
const getPrevMsgsIsLoading              = state => state.dialogsReducer.prevMsgsIsLoading                        ;
const getPrevMsgsLoader                 = state => state.dialogsReducer.prevMsgsLoader                           ;
const getOnError                        = state => state.dialogsReducer.onError                                  ;
// const getErrGettingNewMSGSCount         = state => state.dialogsReducer.errGettingNewMSGSCount                   ;
const getOnSendMSGStatArr               = state => state.dialogsReducer.onSendMSGStatArr                         ;
const getKeyArr                         = state => state.dialogsReducer.keyArr                                   ;
const getFeedbackArr_compDialogs        = state => state.dialogsReducer.feedbackArr                              ;

export const getSmartDialogsReducer = createSelector(getDialogsList,getCertainDialog,getAllDialogsIsLoading,getDefaultAvatar_compDialogs,
    getcertainDialogLoader,getAllDialogsLoader,getNewMessagesCounter,getNewMessageBTNDisabled,getMsgLoader,getPrevMsgsIsLoading,
    getPrevMsgsLoader,getOnError,getErrGettingNewMSGSCount,getOnSendMSGStatArr,getKeyArr,getFeedbackArr_compDialogs,
    (dialogsList,certainDialog,allDialogsIsLoading,defaultAvatar,certainDialogLoader,allDialogsLoader,newMessagesCounter, newMessageBTNDisabled,
     msgLoader,prevMsgsIsLoading,prevMsgsLoader,onError,errGettingNewMSGSCount,onSendMSGStatArr,keyArr,feedbackArr)=>{
        // debugger
        return {dialogsList, certainDialog, allDialogsIsLoading, defaultAvatar, certainDialogLoader, allDialogsLoader, newMessagesCounter,
            newMessageBTNDisabled, msgLoader, prevMsgsIsLoading, prevMsgsLoader, onError, errGettingNewMSGSCount, onSendMSGStatArr,
            keyArr, feedbackArr,}
    });


// USERS RESELECTORS===============================================================================================================USERS RESELECTORS==============

export const getUsersACs                 = state => state.usersACs                                              ;
export const getDialogsACs_compUsers     = state => state.dialogACs                                             ;
//in reSelector control
const getInitialUserList                 = state => state.usersReducer.initialUsersList                         ;
const getPageSize                        = state => state.usersReducer.pageSize                                 ;
const getTotalCount                      = state => state.usersReducer.totalCount                               ;
const getCurrentPage                     = state => state.usersReducer.currentPage                              ;
const getIsLoading_compUsers             = state => state.usersReducer.isLoading                                ;
const getDefaultAvatar                   = state => state.usersReducer.defaultAvatar                            ;
const getFollowingInProgress             = state => state.usersReducer.followingInProgress                      ;
const getUserSearchMode                  = state => state.usersReducer.userSearchMode                           ;
const getUserSearchField                 = state => state.usersReducer.userSearchField                          ;
const getUsersGettingError               = state => state.usersReducer.usersGettingError                        ;
const getUserFindingError                = state => state.usersReducer.userFindingError                         ;
const getMSGStat                         = state => state.dialogsReducer.onSendMSGStatArr                       ;
const getFeedbackArr                     = state => state.dialogsReducer.feedbackArr                            ;
const getGeneralLDR_GIF                  = state => state.backgroundReducer.usersThemes.generalLDR_GIF          ;
const getColorThemeAC                    = state => state.backgroundReducer.theme                               ;

export const getSmartUsersMediaData = createSelector(getInitialUserList,getPageSize,getTotalCount,getCurrentPage,getIsLoading_compUsers,
    getDefaultAvatar,getFollowingInProgress,getUserSearchMode,getUserSearchField, getUsersGettingError,getUserFindingError
    ,getMSGStat,getFeedbackArr,getGeneralLDR_GIF,getColorThemeAC,
    (initialUsersList,pageSize,totalCount,currentPage,isLoading,defaultAvatar,followingInProgress,userSearchMode,
     userSearchField,usersGettingError,userFindingError, onSendMSGStatArr, feedbackArr, generalLDR_GIF, theme)=> {
        return {initialUsersList,pageSize,totalCount, currentPage,isLoading,defaultAvatar,
              followingInProgress,userSearchMode,  userSearchField,usersGettingError,userFindingError,
            colorTheme:theme,feedbackArr,sendingMSGStat:onSendMSGStatArr,  generalLDR_GIF }
    });






