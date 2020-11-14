import React, {useState ,useEffect} from "react";
import {Users}                      from './users';
import {connect}                    from 'react-redux';
import {withAuthRedirect}           from "../HOC/withAuthRedirect";
import { withRouter }               from 'react-router-dom';
import { compose }                  from 'redux';
import { getHeaderAC,
         getUsersACs,
         getDialogsACs,
         getSmartUsersMediaData}    from "../../../redux/selectors";

function UsersFuncContainer (props) {
    // console.log(props)

    useEffect( ()=>{ props.getUsersThunk(props.state.smartData.pageSize, props.state.currentPage)},[] );

    let setCurrentPage         =(page)=>                  { props.setCurrentPageThunk(props.state.pageSize,page)    };
    let followListener         =(e)=>                     { let userId = e.target.id; props.followThunk(userId)     };
    let unFollowListener       =(e)=>                     { let userId = e.target.id; props.unFollowThunk(userId)   };
    let updateSearchField      =(text)=>                  { props.updateSearchField(text)                           };
    let getCertainUserThunk    =(userName) =>             { props.getCertainUserThunk(userName)                     };
    let toggleUserSearchMode   =(flag)=>                  { props.toggleUserSearchMode(flag)                        };
    let sendMessageToUserThunk =(userId,body,actionKey,userName)=>
                                                      { props.sendMessageToUserThunk(userId,body,actionKey,userName)};
    let feedBackWindowCloser   =(arrIndex)=>              { props.feedBackWindowCloser(arrIndex)                    };
    let feedbackRefPush        =(el_id)=>                 { props.feedbackRefPush(el_id)                            };
    let setErrorToNull         =()     =>                 { props.setErrorToNull()                                  };

    return <Users
        usersInfo                                       = { props.state.smartData     }

        followListener                                  = { followListener             }
        unFollowListener                                = { unFollowListener           }
        setCurrentPage                                  = { setCurrentPage             }
        updateSearchField                               = { updateSearchField          }
        getCertainUserThunk                             = { getCertainUserThunk        }
        toggleUserSearchMode                            = { toggleUserSearchMode       }
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
        smartData:  getSmartUsersMediaData (state),

        dialogsACs: getDialogsACs          (state),
        usersACs:   getUsersACs            (state),
        getLogIn:   getHeaderAC            (state),

    }
};
const mergeProps = (stateProps, dispatchProps) => {
    // console.log(stateProps);
    // console.log(dispatchProps );
    const state = stateProps;
    const {dispatch} = dispatchProps;

    const getUsersThunk      = (pageSize,currentPage)     => dispatch ( state.usersACs.getUsersThunkAC(pageSize, currentPage));
    const setCurrentPageThunk= (pageSize,currentPage)     => dispatch ( state.usersACs.setCurrentPageThunkAC(pageSize, currentPage));
    const followThunk            = (userId)               => dispatch ( state.usersACs.followThunkAC(userId));
    const unFollowThunk          = (userId)               => dispatch ( state.usersACs.unFollowThunkAC(userId));
    const setUsersThunk          = ()                     => dispatch ( state.usersACs.setUsersThunkAC());
    const getCertainUserThunk    = (userName)             => dispatch ( state.usersACs.getCertainUserThunkAC(userName));
    const toggleUserSearchMode   = (userSearchMode)       => {
        dispatch(state.usersACs.toggleUserSearchModeAC(userSearchMode))};
    const updateSearchField      = (text)                 => dispatch ( state.usersACs.updateSearchFieldAC(text));
    const sendMessageToUserThunk = (userId,body,actionKey,userName) =>
                                                             dispatch ( state.dialogsACs.sendMessageToUserThunkAC(userId,body,actionKey,userName));
    const feedBackWindowCloser   = (arrIndex)             => dispatch ( state.dialogsACs.feedBackWindowCloserAC(arrIndex));
    const feedbackRefPush        = (el_id)                => dispatch ( state.dialogsACs.feedbackRefPushAC( el_id));
    const setErrorToNull         = ()                     => dispatch ( state.usersACs.setErrorToNullAC() )

    return { state, getUsersThunk, setUsersThunk, setCurrentPageThunk, followThunk, unFollowThunk, getCertainUserThunk,
        toggleUserSearchMode, updateSearchField,sendMessageToUserThunk,feedBackWindowCloser, feedbackRefPush, setErrorToNull};
};

// let withUrlDataProfileContainer = withRouter(AuthRedirectComponent);
// const UsersContainer = connect(mapStateToProps, null, mergeProps)(AuthRedirectComponent);
// export default UsersContainer;

export default compose(
    connect(mapStateToProps, null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(UsersFuncContainer);
