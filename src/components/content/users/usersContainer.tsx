import React, {useState ,useEffect} from "react";
import {Users}                      from './users';
import {connect}                    from 'react-redux';
import {withAuthRedirect}           from "../HOC/withAuthRedirect";
import { withRouter }               from 'react-router-dom';
import { compose }                  from 'redux';
import { getHeaderAC,
         getUsersACs,
         getDialogACs,
    getDialogsACs_compUsers,
         getSmartUsersMediaData,
         SmartUserMediaData_Type,
         getColorTheme}    from "../../../redux/selectors";
import stl                          from "./users.module.css";
import { AppStateType }             from "../../../redux/redux-store"
import { InitialUsersInfo_Type, UsersACs_Type }    from "../../../redux/usersReducer"
import { DialogActions_Type }       from "../../../redux/dialogsReducer"
import { UsersThemesBGR_Type } from "../../../redux/backGroundSetter";


type UserContProps_Type = {
    history:       any          // comes from WithRouter                                      
    location:      any          // comes from WithRouter
    match:         any          // comes from WithRouter                                      
    staticContext: any          // comes from WithRouter

    actions: MRGProps_Type['actions']
    state:   MSTP_Type /* & UsersThemesBGR_Type  */
};


export type UsersThemes_Type = {userPageDnmc:string,generalHeaderDnmc:string,pagBTNDnmc:string,paginationSelectedDnmc:string,paginationDnmc:string,searchInputDnmc:string,userAvaDnmc:string,
followBTNDnmc:string,followBTN_ERR_DNMC:string,userNameDnmc:string,mapWrapperDnmc:string, userUnitDnmc:string,userWriteModeDnmc:string,moreUserUnitsDnmc:string}

let UsersFuncContainer: React.FC<UserContProps_Type> = ({state,actions,history,location,match,staticContext}) => {                                                           //anyType!!!!!!!!!!!!!!!!!!!
    // console.log(state)
    let pageSize = state.smartData.pageSize;
    let currentPage = state.smartData.currentPage;
    // console.log(currentPage)

    useEffect( ()=> {
        actions.getUsersThunk(state.smartData.pageSize, state.smartData.currentPage)
        history.push(`users?page=${currentPage}`)
    },[currentPage] );

    let getUsersThunk          =(pageSize:number,currentPage:number) => {actions.getUsersThunk(pageSize,currentPage)}
    let setCurrentPageThunk    =(pageSize:number,page:number)=>         {actions.setCurrentPageThunk(pageSize,page)};
    let followThunkToggler     =(userId:number,isFollowed:boolean)=>    {actions.followThunkToggler(userId,isFollowed) };
    let updateSearchField      =(text:string)=>                         {actions.updateSearchField(text)                           };
    let getCertainUserThunk    =(pageSize:number, userName:string,pageOfEquals:number)=> {actions.getCertainUserThunk(pageSize, userName,pageOfEquals)        };
    let sendMessageToUserThunk =(userId:number,body:string,actionKey:string,userName:string)=>
                                                      { actions.sendMessageToUserThunk(userId,body,actionKey,userName)};
    let feedBackWindowCloser   =(arrIndex:number)=>              { actions.feedBackWindowCloser(arrIndex)                    };
    let feedbackRefPush        =(el_id:number)=>                 { actions.feedbackRefPush(el_id)                            };
    let setErrorToNull         =()     =>                        { actions.setErrorToNull()                                  };

    let [themes, setThemes] = useState<UsersThemes_Type>({userPageDnmc:'',generalHeaderDnmc:'',pagBTNDnmc:'',paginationSelectedDnmc:'',paginationDnmc:'',searchInputDnmc:'',userAvaDnmc:'',
        followBTNDnmc:'',followBTN_ERR_DNMC:'',userNameDnmc:'',mapWrapperDnmc:'', userUnitDnmc:'',userWriteModeDnmc:'',moreUserUnitsDnmc:'',
    });
    useEffect(()=>{
        switch (state.colorTheme) {
            case 'NIGHT':
                return    setThemes({...themes,
                    userPageDnmc: stl.usersPageN,
                    generalHeaderDnmc:stl.generalHeaderN,
                    pagBTNDnmc:stl.pagBTN_N,
                    paginationSelectedDnmc:stl.paginationSelectedN,
                    paginationDnmc:stl.paginationN,
                    searchInputDnmc:stl.searchInputN,
                    userAvaDnmc:stl.userAvaN,
                    followBTNDnmc:stl.followBTN_N,
                    followBTN_ERR_DNMC:stl.followBTN_ERR_N,
                    userNameDnmc:stl.userNameN,
                    mapWrapperDnmc:stl.mapWrapperN,
                    userUnitDnmc:stl.userUnitN,
                    userWriteModeDnmc:stl.userWriteModeN,
                    moreUserUnitsDnmc:stl.moreUserUnitsN,
                });
        
            case 'MORNING':
                return setThemes({...themes,
                    userPageDnmc: stl.usersPageM,
                    generalHeaderDnmc:stl.generalHeaderM,
                    pagBTNDnmc:stl.pagBTN_M,
                    paginationSelectedDnmc:stl.paginationSelectedM,
                    paginationDnmc:stl.paginationM,
                    searchInputDnmc:stl.searchInputM,
                    userAvaDnmc:stl.userAvaM,
                    followBTNDnmc:stl.followBTN_M,
                    followBTN_ERR_DNMC:stl.followBTN_ERR_M,
                    userNameDnmc:stl.userNameM,
                    mapWrapperDnmc:stl.mapWrapperM,
                    userUnitDnmc:stl.userUnitM,
                    userWriteModeDnmc:stl.userWriteModeM,
                    moreUserUnitsDnmc:stl.moreUserUnitsM,
                });
            
            case 'DAY':
                return setThemes({...themes,
                    userPageDnmc: stl.usersPageD,
                    generalHeaderDnmc:stl.generalHeaderD,
                    pagBTNDnmc:stl.pagBTN_D,
                    paginationSelectedDnmc:stl.paginationSelectedD,
                    paginationDnmc:stl.paginationD,
                    searchInputDnmc:stl.searchInputD,
                    userAvaDnmc:stl.userAvaD,
                    followBTNDnmc:stl.followBTN_D,
                    followBTN_ERR_DNMC:stl.followBTN_ERR_D,
                    userNameDnmc:stl.userNameD,
                    mapWrapperDnmc:stl.mapWrapperD,
                    userUnitDnmc:stl.userUnitD,
                    userWriteModeDnmc:stl.userWriteModeD,
                    moreUserUnitsDnmc:stl.moreUserUnitsD
                });
                
            case 'EVENING':
                return setThemes({...themes,
                    userPageDnmc: stl.usersPageE,
                    generalHeaderDnmc:stl.generalHeaderE,
                    pagBTNDnmc:stl.pagBTN_E,
                    paginationSelectedDnmc:stl.paginationSelectedE,
                    paginationDnmc:stl.paginationE,
                    searchInputDnmc:stl.searchInputE,
                    userAvaDnmc:stl.userAvaE,
                    followBTNDnmc:stl.followBTN_E,
                    followBTN_ERR_DNMC:stl.followBTN_ERR_E,
                    userNameDnmc:stl.userNameE,
                    mapWrapperDnmc:stl.mapWrapperE,
                    userUnitDnmc:stl.userUnitE,
                    userWriteModeDnmc:stl.userWriteModeE,
                    moreUserUnitsDnmc:stl.moreUserUnitsE,
                });
        }
    },[state.colorTheme]);

    let usersFuncs:MRGProps_Type['actions'] = {getUsersThunk,followThunkToggler,setCurrentPageThunk,updateSearchField,getCertainUserThunk,sendMessageToUserThunk,
        feedBackWindowCloser,feedbackRefPush,setErrorToNull}

// usersInfo:  InitialUsersInfo_Type & UsersThemesBGR_Type

    return themes.userPageDnmc ? 
    <Users
        usersInfo  = { state.smartData }
        themes     = { themes          }
        usersFuncs = { usersFuncs      }
    /> : null
}

// let AuthRedirectComponent = withAuthRedirect(UsersClassContainer);


type MSTP_Type = {
    smartData:  InitialUsersInfo_Type & UsersThemesBGR_Type                   // юзаются данные из 3 редюсеров но почему то ts на тип из одного не ругается
    dialogsACs: DialogActions_Type
    usersACs:   UsersACs_Type
    colorTheme: string
}

const mapStateToProps = (state:AppStateType):MSTP_Type => {
    // console.log(state)
    return {
        smartData:  getSmartUsersMediaData  (state),
        dialogsACs: getDialogsACs_compUsers (state),
        usersACs:   getUsersACs             (state),
        colorTheme: getColorTheme           (state),
    }
};

type DispatchProps_Type = {dispatch: (action:any)=> void}


export type MRGProps_Type = {
    state: MSTP_Type
    actions: {
        getUsersThunk         :(pageSize:number,currentPage:number) => void
        setCurrentPageThunk   :(pageSize:number,currentPage:number) => void
        followThunkToggler    :(userId:number,isFollowed:boolean) =>   void
        getCertainUserThunk   :(pageSize:number, userName:string,pageOfEquals:number) => void
        updateSearchField     :(text:string) => void
        sendMessageToUserThunk:(userId:number,body:string,actionKey:string,userName:string) => void
        feedBackWindowCloser  :(arrIndex:number) => void
        feedbackRefPush       :(el_id:number) => void
        setErrorToNull        :() => void   
    }
}

const mergeProps = (stateProps:MSTP_Type, dispatchProps:DispatchProps_Type):MRGProps_Type => {
    // console.log(stateProps);
    // console.log(dispatchProps );
    const state = stateProps;
    const {dispatch} = dispatchProps;

    const getUsersThunk       = (pageSize:number,currentPage:number)  => dispatch ( state.usersACs.getUsersThunkAC(pageSize, currentPage));
    const setCurrentPageThunk = (pageSize:number,currentPage:number)  => dispatch ( state.usersACs.setCurrentPageThunkAC(pageSize, currentPage));
    const followThunkToggler  = (userId:number,isFollowed:boolean)    => dispatch ( state.usersACs.followThunkTogglerAC(userId,isFollowed));
    const getCertainUserThunk = (pageSize:number, userName:string,pageOfEquals:number)=>{
                                                             dispatch ( state.usersACs.getCertainUserThunkAC(pageSize,userName,pageOfEquals))};
    const updateSearchField      = (text:string)          => dispatch ( state.usersACs.updateSearchFieldAC(text));
    const sendMessageToUserThunk = (userId:number,body:string,actionKey:string,userName:string) =>
                                                             dispatch ( state.dialogsACs.sendMessageToUserThunkAC(userId,body,actionKey,userName));
    const feedBackWindowCloser   = (arrIndex:number)      => dispatch ( state.dialogsACs.feedBackWindowCloserAC(arrIndex));
    const feedbackRefPush        = (el_id:number)         => dispatch ( state.dialogsACs.feedbackRefPushAC( el_id));
    const setErrorToNull         = ()                     => dispatch ( state.usersACs.setErrorToNullAC() )
    const actions = {getUsersThunk,setCurrentPageThunk,getCertainUserThunk,updateSearchField,
        sendMessageToUserThunk,feedBackWindowCloser,feedbackRefPush,setErrorToNull,followThunkToggler}
    return { state, actions };
};

// let withUrlDataProfileContainer = withRouter(AuthRedirectComponent);
// const UsersContainer = connect(mapStateToProps, null, mergeProps)(AuthRedirectComponent);
// export default UsersContainer;

export default  compose(
    //@ts-ignore
    connect(mapStateToProps, null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(UsersFuncContainer);





// import React, {useState ,useEffect} from "react";
// import {Users}                      from './users';
// import {connect}                    from 'react-redux';
// import {withAuthRedirect}           from "../HOC/withAuthRedirect";
// import { withRouter }               from 'react-router-dom';
// import { compose }                  from 'redux';
// import { getHeaderAC,
//          getUsersACs,
//          getDialogsACs,
//     getDialogsACs_compUsers,
//          getSmartUsersMediaData}    from "../../../redux/selectors";
// import stl from "./users.module.css";

// function UsersFuncContainer (props) {
//     // console.log(props)
//     let pageSize = props.state.smartData.pageSize;
//     let currentPage = props.state.smartData.currentPage;
//     // console.log(currentPage)

//     useEffect( ()=>{
//         console.log('aasd')
//         props.getUsersThunk(props.state.smartData.pageSize, props.state.currentPage)
//         props.history.push(`users?page=${currentPage}`)
//     },[currentPage] );

//     let setCurrentPage         =(page)=>                  { props.setCurrentPageThunk(props.state.smartData.pageSize,page)};
//     let followThunkToggler     =(userId,isFollowed)=>     { props.followThunkToggler(userId,isFollowed) };

//     let updateSearchField      =(text)=>                  { props.updateSearchField(text)                           };
//     let getCertainUserThunk    =(pageSize, userName,pageOfEquals)=> {props.getCertainUserThunk(pageSize, userName,pageOfEquals)        };
//     let sendMessageToUserThunk =(userId,body,actionKey,userName)=>
//                                                       { props.sendMessageToUserThunk(userId,body,actionKey,userName)};
//     let feedBackWindowCloser   =(arrIndex)=>              { props.feedBackWindowCloser(arrIndex)                    };
//     let feedbackRefPush        =(el_id)=>                 { props.feedbackRefPush(el_id)                            };
//     let setErrorToNull         =()     =>                 { props.setErrorToNull()                                  };

//     let [themes, setThemes] = useState({userPageDnmc:'',generalHeaderDnmc:'',pagBTNDnmc:'',paginationSelectedDnmc:'',paginationDnmc:'',searchInputDnmc:'',userAvaDnmc:'',
//         followBTNDnmc:'',followBTN_ERR_DNMC:'',userNameDnmc:'',mapWrapperDnmc:'', userUnitDnmc:'',userWriteModeDnmc:'',moreUserUnitsDnmc:'',
//     });
//     useEffect(()=>{
//         switch (props.state.smartData.colorTheme) {
//             case 'NIGHT':
//                 setThemes({...themes,
//                     userPageDnmc: stl.usersPageN,
//                     generalHeaderDnmc:stl.generalHeaderN,
//                     pagBTNDnmc:stl.pagBTN_N,
//                     paginationSelectedDnmc:stl.paginationSelectedN,
//                     paginationDnmc:stl.paginationN,
//                     searchInputDnmc:stl.searchInputN,
//                     userAvaDnmc:stl.userAvaN,
//                     followBTNDnmc:stl.followBTN_N,
//                     followBTN_ERR_DNMC:stl.followBTN_ERR_N,
//                     userNameDnmc:stl.userNameN,
//                     mapWrapperDnmc:stl.mapWrapperN,
//                     userUnitDnmc:stl.userUnitN,
//                     userWriteModeDnmc:stl.userWriteModeN,
//                     moreUserUnitsDnmc:stl.moreUserUnitsN,
//                 });
//                 return;
//             case 'MORNING':
//                 setThemes({...themes,
//                     userPageDnmc: stl.usersPageM,
//                     generalHeaderDnmc:stl.generalHeaderM,
//                     pagBTNDnmc:stl.pagBTN_M,
//                     paginationSelectedDnmc:stl.paginationSelectedM,
//                     paginationDnmc:stl.paginationM,
//                     searchInputDnmc:stl.searchInputM,
//                     userAvaDnmc:stl.userAvaM,
//                     followBTNDnmc:stl.followBTN_M,
//                     followBTN_ERR_DNMC:stl.followBTN_ERR_M,
//                     userNameDnmc:stl.userNameM,
//                     mapWrapperDnmc:stl.mapWrapperM,
//                     userUnitDnmc:stl.userUnitM,
//                     userWriteModeDnmc:stl.userWriteModeM,
//                     moreUserUnitsDnmc:stl.moreUserUnitsM,
//                 });
//                 return;
//             case 'DAY':
//                 setThemes({...themes,
//                     userPageDnmc: stl.usersPageD,
//                     generalHeaderDnmc:stl.generalHeaderD,
//                     pagBTNDnmc:stl.pagBTN_D,
//                     paginationSelectedDnmc:stl.paginationSelectedD,
//                     paginationDnmc:stl.paginationD,
//                     searchInputDnmc:stl.searchInputD,
//                     userAvaDnmc:stl.userAvaD,
//                     followBTNDnmc:stl.followBTN_D,
//                     followBTN_ERR_DNMC:stl.followBTN_ERR_D,
//                     userNameDnmc:stl.userNameD,
//                     mapWrapperDnmc:stl.mapWrapperD,
//                     userUnitDnmc:stl.userUnitD,
//                     userWriteModeDnmc:stl.userWriteModeD,
//                     moreUserUnitsDnmc:stl.moreUserUnitsD
//                 });
//                 return;
//             case 'EVENING':
//                 setThemes({...themes,
//                     userPageDnmc: stl.usersPageE,
//                     generalHeaderDnmc:stl.generalHeaderE,
//                     pagBTNDnmc:stl.pagBTN_E,
//                     paginationSelectedDnmc:stl.paginationSelectedE,
//                     paginationDnmc:stl.paginationE,
//                     searchInputDnmc:stl.searchInputE,
//                     userAvaDnmc:stl.userAvaE,
//                     followBTNDnmc:stl.followBTN_E,
//                     followBTN_ERR_DNMC:stl.followBTN_ERR_E,
//                     userNameDnmc:stl.userNameE,
//                     mapWrapperDnmc:stl.mapWrapperE,
//                     userUnitDnmc:stl.userUnitE,
//                     userWriteModeDnmc:stl.userWriteModeE,
//                     moreUserUnitsDnmc:stl.moreUserUnitsE,
//                 });
//                 return;
//             default: return {...themes}
//         }
//     },[props.state.smartData.colorTheme]);

//     return <Users
//         usersInfo                                       = { props.state.smartData      }
//         themes                                          = { themes                     }

//         followThunkToggler                              = { followThunkToggler         }

//         setCurrentPage                                  = { setCurrentPage             }
//         updateSearchField                               = { updateSearchField          }
//         getCertainUserThunk                             = { getCertainUserThunk        }
//         sendMessageToUserThunk                          = { sendMessageToUserThunk     }
//         feedBackWindowCloser                            = { feedBackWindowCloser       }
//         feedbackRefPush                                 = { feedbackRefPush            }
//         setErrorToNull                                  = { setErrorToNull             }
//     />
// }

// // let AuthRedirectComponent = withAuthRedirect(UsersClassContainer);
// const mapStateToProps = (state) => {
//     // console.log('mstp')
//     return {
//         smartData:  getSmartUsersMediaData  (state),

//         dialogsACs: getDialogsACs_compUsers (state),
//         usersACs:   getUsersACs             (state),
//         getLogIn:   getHeaderAC             (state),

//     }
// };
// const mergeProps = (stateProps, dispatchProps) => {
//     // console.log(stateProps);
//     // console.log(dispatchProps );
//     const state = stateProps;
//     const {dispatch} = dispatchProps;

//     const getUsersThunk      = (pageSize,currentPage)     => dispatch ( state.usersACs.getUsersThunkAC(pageSize, currentPage));
//     const setCurrentPageThunk= (pageSize,currentPage)     => dispatch ( state.usersACs.setCurrentPageThunkAC(pageSize, currentPage));

//     const followThunkToggler     = (userId,isFollowed)    => dispatch ( state.usersACs.followThunkTogglerAC(userId,isFollowed));


//     const setUsersThunk          = ()                     => dispatch ( state.usersACs.setUsersThunkAC());

//     const getCertainUserThunk    = (pageSize, userName,pageOfEquals)=>{
//                                                              dispatch ( state.usersACs.getCertainUserThunkAC(pageSize,userName,pageOfEquals))};

//     const updateSearchField      = (text)                 => dispatch ( state.usersACs.updateSearchFieldAC(text));
//     const sendMessageToUserThunk = (userId,body,actionKey,userName) =>
//                                                              dispatch ( state.dialogsACs.sendMessageToUserThunkAC(userId,body,actionKey,userName));
//     const feedBackWindowCloser   = (arrIndex)             => dispatch ( state.dialogsACs.feedBackWindowCloserAC(arrIndex));
//     const feedbackRefPush        = (el_id)                => dispatch ( state.dialogsACs.feedbackRefPushAC( el_id));
//     const setErrorToNull         = ()                     => dispatch ( state.usersACs.setErrorToNullAC() )

//     return {state,getUsersThunk,setUsersThunk,setCurrentPageThunk,getCertainUserThunk,/*toggleUserSearchMode,*/updateSearchField,
//         sendMessageToUserThunk,feedBackWindowCloser,feedbackRefPush,setErrorToNull,followThunkToggler};
// };

// // let withUrlDataProfileContainer = withRouter(AuthRedirectComponent);
// // const UsersContainer = connect(mapStateToProps, null, mergeProps)(AuthRedirectComponent);
// // export default UsersContainer;

// export default  compose(
//     connect(mapStateToProps, null, mergeProps),
//     withRouter,
//     // withAuthRedirect,
// )(UsersFuncContainer);
