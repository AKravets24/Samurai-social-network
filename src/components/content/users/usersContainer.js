import React from "react";
import Users from './users';
import {connect} from 'react-redux';
// import UnAuthorised from "../unAuthorised/unAuthorised";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {getUsersInfo} from "../../../redux/users-selector";

class UsersClassContainer extends React.Component {
    constructor(props) { super(props); /*console.log(props)*/};

    componentDidMount              =()=>                {this.props.getUsersThunk(
        this.props.state.pageSize, this.props.state.currentPage)                                                       };
    setCurrentPage                 =(page)=>            {this.props.setCurrentPageThunk(this.props.state.pageSize,page)};
    followListener                 =(e)=>               {let userId = e.target.id; this.props.followThunk(userId)      };
    unFollowListener               =(e)=>               {let userId = e.target.id; this.props.unFollowThunk(userId)    };
    updateSearchField              =(text)=>            {this.props.updateSearchField(text)};
    getCertainUserThunk            =(userName) =>       {this.props.getCertainUserThunk(userName)};
    toggleUserSearchMode           =(flag)=>            {this.props.toggleUserSearchMode(flag)}

    render() {
        return <Users
            totalCount                     = { this.props.state.totalCount    }
            usersInfo                      = { this.props.state.usersInfo     }
            pageSize                       = { this.props.state.pageSize      }
            currentPage                    = { this.props.state.currentPage   }

            showMoreListener               = { this.showMoreListener          }
            followListener                 = { this.followListener            }
            unFollowListener               = { this.unFollowListener          }
            setCurrentPage                 = { this.setCurrentPage            }
            updateSearchField              = { this.updateSearchField         }
            getCertainUserThunk            = { this.getCertainUserThunk       }
            toggleUserSearchMode           = { this.toggleUserSearchMode      }
        />
    }
}

// let AuthRedirectComponent = withAuthRedirect(UsersClassContainer);
const mapStateToProps = (state) => {
    // console.log(state.authReducer.isAuth);
    return {
        // usersInfo: state.usersReducer,
        usersInfo: getUsersInfo(state),
        usersActionsCreators: state.usersActionCreators,
        pageSize: state.usersReducer.pageSize,
        totalCount: state.usersReducer.totalCount,
        currentPage: state.usersReducer.currentPage,
        getLogIn: state.headerAC,
    }
};
const mergeProps = (stateProps, dispatchProps) => {
    // console.log(stateProps);
    // console.log(dispatchProps );
    const state = stateProps;
    const {dispatch} = dispatchProps;

    const getUsersThunk        = (pageSize, currentPage) =>
        dispatch ( state.usersActionsCreators.getUsersThunkAC(pageSize, currentPage));
    const setCurrentPageThunk  = (pageSize, currentPage) =>
        dispatch ( state.usersActionsCreators.setCurrentPageThunkAC(pageSize, currentPage));
    const followThunk          = (userId) =>   dispatch ( state.usersActionsCreators.followThunkAC(userId));
    const unFollowThunk        = (userId) =>   dispatch ( state.usersActionsCreators.unFollowThunkAC(userId));
    const setUsersThunk        = ()=>          dispatch(state.usersActionsCreators.setUsersThunkAC());
    const getCertainUserThunk  = (userName) => dispatch(state.usersActionsCreators.getCertainUserThunkAC(userName));
    const toggleUserSearchMode = (userSearchMode) => {
        dispatch(state.usersActionsCreators.toggleUserSearchModeAC(userSearchMode))};
    const updateSearchField    = (text) =>     dispatch( state.usersActionsCreators.updateSearchFieldAC(text));

    return { state, getUsersThunk, setUsersThunk, setCurrentPageThunk, followThunk, unFollowThunk, getCertainUserThunk,
        toggleUserSearchMode, updateSearchField};
};

// let withUrlDataProfileContainer = withRouter(AuthRedirectComponent);
// const UsersContainer = connect(mapStateToProps, null, mergeProps)(AuthRedirectComponent);
// export default UsersContainer;

export default compose(
    connect(mapStateToProps, null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(UsersClassContainer);





/*
const mapStateToProps = (state) => {
    // console.log(state.authReducer.isAuth);
    return {
        isAuth: state.authReducer.isAuth,
        usersInfo: state.usersReducer,
        usersActionsCreators: state.usersActionCreators,
        pageSize: state.usersReducer.pageSize,
        totalCount: state.usersReducer.totalCount,
        currentPage: state.usersReducer.currentPage,
        getLogIn: state.headerAC,
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    // console.log(stateProps);
    // console.log(dispatchProps );
    const state = stateProps;
    const {dispatch} = dispatchProps;

    const getUsersThunk = (pageSize, currentPage) =>
        dispatch ( state.usersActionsCreators.getUsersThunkAC(pageSize, currentPage));
    const setCurrentPageThunk = (pageSize, currentPage) =>
        dispatch ( state.usersActionsCreators.setCurrentPageThunkAC(pageSize, currentPage));
    const followThunk = (userId) => dispatch ( state.usersActionsCreators.followThunkAC(userId));
    const unFollowThunk = (userId) => dispatch ( state.usersActionsCreators.unFollowThunkAC(userId));
    const setUsersThunk = ()=> dispatch(state.usersActionsCreators.setUsersThunkAC());

    return { state, getUsersThunk, setUsersThunk, setCurrentPageThunk, followThunk, unFollowThunk }
};

const UsersContainer = connect(mapStateToProps, null, mergeProps)(UsersClassContainer);
export default UsersContainer;*/
