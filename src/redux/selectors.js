import { createSelector } from 'reselect'
import maleProfilePic from "./img/dialogs/male.png";

// USERS RESELECTORS

// export const getUsersInfo      = (state) => { return state.usersReducer                            };
export const getUsersACs     = state => { return state.usersACs                                     };
export const getHeaderAC     = state => { return state.headerAC                                     };
export const getDialogsACs   = state => { return state.dialogACs                                    };
//in reSelector control
const getInitialUserList     = state => { return state.usersReducer.initialUsersList                };
const getPageSize            = state => { return state.usersReducer.pageSize                        };
const getTotalCount          = state => { return state.usersReducer.totalCount                      };
const getCurrentPage         = state => { return state.usersReducer.currentPage                     };
const getIsLoading           = state => { return state.usersReducer.isLoading                       };
const getDefaultAvatar       = state => { return state.usersReducer.defaultAvatar                   };
const getFollowingInProgress = state => { return state.usersReducer.followingInProgress             };
const getUserSearchMode      = state => { return state.usersReducer.userSearchMode                  };
const getUserSearchField     = state => { return state.usersReducer.userSearchField                 };
const getUsersGettingError   = state => { return state.usersReducer.usersGettingError               };
const getUserFindingError    = state => { return state.usersReducer.userFindingError                };
const getMSGStat             = state => { return state.dialogsReducer.onSendMSGStatArr              };
const getFeedbackArr         = state => { return state.dialogsReducer.feedbackArr                   };
const getGeneralLDR_GIF      = state => { return state.backgroundReducer.usersThemes.generalLDR_GIF };
const getColorThemeAC        = state => { return state.backgroundReducer.theme                      };

export const getSmartUsersMediaData = createSelector(getInitialUserList,getPageSize,getTotalCount,getCurrentPage,getIsLoading,
    getDefaultAvatar,getFollowingInProgress,getUserSearchMode,getUserSearchField, getUsersGettingError,getUserFindingError
    ,getMSGStat,getFeedbackArr,getGeneralLDR_GIF,getColorThemeAC,
    (initialUsersList,pageSize,totalCount,currentPage,isLoading,defaultAvatar,followingInProgress,userSearchMode,
     userSearchField,usersGettingError,userFindingError, onSendMSGStatArr, feedbackArr, generalLDR_GIF, theme)=> {
        return {initialUsersList,pageSize,totalCount, currentPage,isLoading,defaultAvatar,
              followingInProgress,userSearchMode,  userSearchField,usersGettingError,userFindingError,
            colorTheme:theme,feedbackArr,sendingMSGStat:onSendMSGStatArr,  generalLDR_GIF }
    });

// PROFILE RESELECTORS

export const getMyId             = state => { return state.appAuthReducer.id                                };
export const getProfilePics      = state => { return state.profilePics                                      };
export const getProfileACs       = state => { return state.profileACs                                       };

export const getTheme            = state => { return state.backgroundReducer.theme                          };
export const getAuth_LDR_GIF     = state => { return state.backgroundReducer.auth_LDR_GIF                   };
export const getAva_LDR_GIF      = state => { return state.backgroundReducer.profileThemes.ava_LDR_GIF      };
export const getBTN_LDR_GIF      = state => { return state.backgroundReducer.profileThemes.BTN_LDR_GIF      };
export const getStatus_LDR_GIF   = state => { return state.backgroundReducer.profileThemes.status_LDR_GIF   };
export const getPanoramaPic      = state => { return state.backgroundReducer.profileThemes.panoramaPic      };
export const getPanorama_LDR_GIF = state => { return state.backgroundReducer.profileThemes.panorama_LDR_GIF };

export const getProfileReducer   = state => { return state.profileReducer                                   };

const getWallPosts               = state => { return state.profileReducer.wallPosts       };
const getProfileData             = state => { return state.profileReducer.profileData     };
const getIsLoading_compProfile   = state => { return state.profileReducer.isLoading       };
const getStatusField             = state => { return state.profileReducer.statusField     };
const getMyAvatarSmall           = state => { return state.profileReducer.myAvatarSmall   };
const getMyAvatarLarge           = state => { return state.profileReducer.myAvatarLarge   };
const getIsFollowed              = state => { return state.profileReducer.isFollowed      };
const getIsFollowing             = state => { return state.profileReducer.isFollowing     };


export const getSmartProfileMediaData = createSelector(
    getWallPosts, getProfileData, getIsLoading_compProfile, getStatusField, getMyAvatarSmall, getMyAvatarLarge,
    getIsFollowed, getIsFollowing,   (
        wallPosts,profileData,isLoading,statusField,myAvatarSmall,myAvatarLarge,isFollowed,isFollowing,  )=> {
        return {wallPosts, profileData, isLoading, statusField, myAvatarSmall, myAvatarLarge, isFollowed, isFollowing,
        }
});



