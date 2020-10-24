export const getUsersInfo     = (state) => { return state.usersReducer                       };
export const getUsersACs      = (state) => { return state.usersACs                           };
export const getPageSize      = (state) => { return state.usersReducer.pageSize              };
export const getTotalCount    = (state) => { return state.usersReducer.totalCount            };
export const getCurrentPage   = (state) => { return state.usersReducer.currentPage           };
export const getHeaderAC      = (state) => { return state.headerAC                           };
export const getColorThemeAC  = (state) => { return state.backgroundReducer.theme            };
export const getDialogsACs    = (state) => { return state.dialogACs                          };
// export const getMSGStat       = (state) => { return state.dialogsReducer.onSendingMSGEStatus };
export const getMSGStat       = (state) => { return state.dialogsReducer.onSendMSGStatArr    };

