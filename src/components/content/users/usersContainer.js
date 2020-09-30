import React, {useState ,useEffect} from "react";
import Users                        from './users';
import {connect}                    from 'react-redux';
import {withAuthRedirect}           from "../HOC/withAuthRedirect";
import { withRouter }               from 'react-router-dom';
import { compose }                  from 'redux';
import {getCurrentPage, getHeaderAC, getPageSize, getTotalCount, getUsersACs, getUsersInfo, getColorThemeAC,
    getDialogsACs,getMSGStat}
                                    from "../../../redux/users-selector";

function UsersFuncContainer (props) { /*console.log(props)*/

    useEffect( ()=>{ props.getUsersThunk(props.state.pageSize, props.state.currentPage)},[] );

    let setCurrentPage         =(page)=>        { props.setCurrentPageThunk(props.state.pageSize,page)    };
    let followListener         =(e)=>           { let userId = e.target.id; props.followThunk(userId)     };
    let unFollowListener       =(e)=>           { let userId = e.target.id; props.unFollowThunk(userId)   };
    let updateSearchField      =(text)=>        { props.updateSearchField(text)                           };
    let getCertainUserThunk    =(userName) =>   { props.getCertainUserThunk(userName)                     };
    let toggleUserSearchMode   =(flag)=>        { props.toggleUserSearchMode(flag)                        };
    let sendMessageToUserThunk =(userId,body)=> { props.sendMessageToUserThunk(userId,body)               };

    return <Users
        totalCount                            = { props.state.totalCount     }
        usersInfo                             = { props.state.usersInfo      }
        pageSize                              = { props.state.pageSize       }
        currentPage                           = { props.state.currentPage    }
        sendingMSGStat                        = { props.state.sendingMSGStat }

        followListener                        = { followListener             }
        unFollowListener                      = { unFollowListener           }
        setCurrentPage                        = { setCurrentPage             }
        updateSearchField                     = { updateSearchField          }
        getCertainUserThunk                   = { getCertainUserThunk        }
        toggleUserSearchMode                  = { toggleUserSearchMode       }
        sendMessageToUserThunk                = { sendMessageToUserThunk     }
    />
}

// let AuthRedirectComponent = withAuthRedirect(UsersClassContainer);
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        dialogsACs:       getDialogsACs   (state),
        usersInfo:        getUsersInfo    (state),
        usersACs:         getUsersACs     (state),
        pageSize:         getPageSize     (state),
        totalCount:       getTotalCount   (state),
        currentPage:      getCurrentPage  (state),
        getLogIn:         getHeaderAC     (state),
        colorTheme:       getColorThemeAC (state),
        sendingMSGStat:   getMSGStat      (state),
    }
};
const mergeProps = (stateProps, dispatchProps) => {
    // console.log(stateProps);
    // console.log(dispatchProps );
    const state = stateProps;
    const {dispatch} = dispatchProps;

    const getUsersThunk      = (pageSize,currentPage)=> dispatch ( state.usersACs.getUsersThunkAC(pageSize, currentPage));
    const setCurrentPageThunk= (pageSize,currentPage)=> dispatch ( state.usersACs.setCurrentPageThunkAC(pageSize, currentPage));
    const followThunk            = (userId)          => dispatch ( state.usersACs.followThunkAC(userId));
    const unFollowThunk          = (userId)          => dispatch ( state.usersACs.unFollowThunkAC(userId));
    const setUsersThunk          = ()                => dispatch ( state.usersACs.setUsersThunkAC());
    const getCertainUserThunk    = (userName)        => dispatch ( state.usersACs.getCertainUserThunkAC(userName));
    const toggleUserSearchMode   = (userSearchMode)  => {
        dispatch(state.usersACs.toggleUserSearchModeAC(userSearchMode))};
    const updateSearchField      = (text)            => dispatch( state.usersACs.updateSearchFieldAC(text));
    const sendMessageToUserThunk = (userId,body)     => dispatch( state.dialogsACs.sendMessageToUserThunkAC(userId,body));

    return { state, getUsersThunk, setUsersThunk, setCurrentPageThunk, followThunk, unFollowThunk, getCertainUserThunk,
        toggleUserSearchMode, updateSearchField,sendMessageToUserThunk};
};

// let withUrlDataProfileContainer = withRouter(AuthRedirectComponent);
// const UsersContainer = connect(mapStateToProps, null, mergeProps)(AuthRedirectComponent);
// export default UsersContainer;

export default compose(
    connect(mapStateToProps, null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(UsersFuncContainer);
