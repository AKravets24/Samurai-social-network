import React, {useState ,useEffect} from "react";
import {Users}                      from './users';
import {connect}                    from 'react-redux';
import {withAuthRedirect}           from "../HOC/withAuthRedirect";
import { withRouter }               from 'react-router-dom';
import { compose }                  from 'redux';
import { getHeaderAC,
         getUsersACs,
         getDialogsACs,
    getDialogsACs_compUsers,
         getSmartUsersMediaData}    from "../../../redux/selectors";
import stl from "./users.module.css";

function UsersFuncContainer (props) {
    // console.log(props)

    useEffect( ()=>{ props.getUsersThunk(props.state.smartData.pageSize, props.state.currentPage)},[] );

    let setCurrentPage         =(page)=>                  { props.setCurrentPageThunk(props.state.smartData.pageSize,page)};

    let followThunkToggler     =(userId,isFollowed)=>     { props.followThunkToggler(userId,isFollowed) };


    let updateSearchField      =(text)=>                  { props.updateSearchField(text)                           };
    let getCertainUserThunk    =(pageSize, userName,pageOfEquals)=> {props.getCertainUserThunk(pageSize, userName,pageOfEquals)        };
    let sendMessageToUserThunk =(userId,body,actionKey,userName)=>
                                                      { props.sendMessageToUserThunk(userId,body,actionKey,userName)};
    let feedBackWindowCloser   =(arrIndex)=>              { props.feedBackWindowCloser(arrIndex)                    };
    let feedbackRefPush        =(el_id)=>                 { props.feedbackRefPush(el_id)                            };
    let setErrorToNull         =()     =>                 { props.setErrorToNull()                                  };

    let [themes, setThemes] = useState({userPageDnmc:'',generalHeaderDnmc:'',pagBTNDnmc:'',paginationSelectedDnmc:'',paginationDnmc:'',searchInputDnmc:'',userAvaDnmc:'',
        followBTNDnmc:'',followBTN_ERR_DNMC:'',userNameDnmc:'',mapWrapperDnmc:'', userUnitDnmc:'',userWriteModeDnmc:'',moreUserUnitsDnmc:'',
    });
    useEffect(()=>{
        switch (props.state.smartData.colorTheme) {
            case 'NIGHT':
                setThemes({...themes,
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
                return;
            case 'MORNING':
                setThemes({...themes,
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
                return;
            case 'DAY':
                setThemes({...themes,
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
                return;
            case 'EVENING':
                setThemes({...themes,
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
                return;
            default: return {...themes}
        }
    },[props.state.smartData.colorTheme]);

    return <Users
        usersInfo                                       = { props.state.smartData      }
        themes                                          = { themes                     }

        followThunkToggler                              = { followThunkToggler         }

        setCurrentPage                                  = { setCurrentPage             }
        updateSearchField                               = { updateSearchField          }
        getCertainUserThunk                             = { getCertainUserThunk        }
        sendMessageToUserThunk                          = { sendMessageToUserThunk     }
        feedBackWindowCloser                            = { feedBackWindowCloser       }
        feedbackRefPush                                 = { feedbackRefPush            }
        setErrorToNull                                  = { setErrorToNull             }
    />
}

// let AuthRedirectComponent = withAuthRedirect(UsersClassContainer);
const mapStateToProps = (state) => {
    // console.log('mstp')
    return {
        smartData:  getSmartUsersMediaData  (state),

        dialogsACs: getDialogsACs_compUsers (state),
        usersACs:   getUsersACs             (state),
        getLogIn:   getHeaderAC             (state),

    }
};
const mergeProps = (stateProps, dispatchProps) => {
    // console.log(stateProps);
    // console.log(dispatchProps );
    const state = stateProps;
    const {dispatch} = dispatchProps;

    const getUsersThunk      = (pageSize,currentPage)     => dispatch ( state.usersACs.getUsersThunkAC(pageSize, currentPage));
    const setCurrentPageThunk= (pageSize,currentPage)     => dispatch ( state.usersACs.setCurrentPageThunkAC(pageSize, currentPage));

     const followThunkToggler     = (userId,isFollowed)    => dispatch ( state.usersACs.followThunkTogglerAC(userId,isFollowed));


    const setUsersThunk          = ()                     => dispatch ( state.usersACs.setUsersThunkAC());

    const getCertainUserThunk    = (pageSize, userName,pageOfEquals)=>{
                                                             dispatch ( state.usersACs.getCertainUserThunkAC(pageSize,userName,pageOfEquals))};

    const updateSearchField      = (text)                 => dispatch ( state.usersACs.updateSearchFieldAC(text));
    const sendMessageToUserThunk = (userId,body,actionKey,userName) =>
                                                             dispatch ( state.dialogsACs.sendMessageToUserThunkAC(userId,body,actionKey,userName));
    const feedBackWindowCloser   = (arrIndex)             => dispatch ( state.dialogsACs.feedBackWindowCloserAC(arrIndex));
    const feedbackRefPush        = (el_id)                => dispatch ( state.dialogsACs.feedbackRefPushAC( el_id));
    const setErrorToNull         = ()                     => dispatch ( state.usersACs.setErrorToNullAC() )

    return {state,getUsersThunk,setUsersThunk,setCurrentPageThunk,getCertainUserThunk,/*toggleUserSearchMode,*/updateSearchField,
        sendMessageToUserThunk,feedBackWindowCloser,feedbackRefPush,setErrorToNull,followThunkToggler};
};

// let withUrlDataProfileContainer = withRouter(AuthRedirectComponent);
// const UsersContainer = connect(mapStateToProps, null, mergeProps)(AuthRedirectComponent);
// export default UsersContainer;

export default compose(
    connect(mapStateToProps, null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(UsersFuncContainer);
