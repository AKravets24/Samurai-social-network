import React from "react";
import Users from './users';
import {connect} from 'react-redux';
import UnAuthorised from "../unAuthorised/unAuthorised";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class UsersClassContainer extends React.Component {
    constructor(props) { super(props); console.log(props)};

    componentDidMount  =()=>      {this.props.getUsersThunk(this.props.state.pageSize, this.props.state.currentPage)};
    setPageListener    =(page)=>  {this.props.setCurrentPageThunk(this.props.state.pageSize, page )};
    followListener     =(e)=>     {let userId = e.target.id; this.props.followThunk(userId) };
    unFollowListener   =(e)=>     {let userId = e.target.id; this.props.unFollowThunk(userId) };
    showMoreListener   =()=>      {this.props.setUsersThunk(this.props.state.pageSize, 1)  };

    render() {
        return <Users
            totalCount={this.props.state.totalCount}
            usersInfo={this.props.state.usersInfo}
            pageSize={this.props.state.pageSize}
            currentPage={this.props.state.currentPage}

            showMoreListener={this.showMoreListener}
            followListener={this.followListener}
            unFollowListener={this.unFollowListener}
            setPageListener={this.setPageListener}
        />
    }
}

// let AuthRedirectComponent = withAuthRedirect(UsersClassContainer);
const mapStateToProps = (state) => {
    // console.log(state.authReducer.isAuth);
    return {
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

// let withUrlDataProfileContainer = withRouter(AuthRedirectComponent);
// const UsersContainer = connect(mapStateToProps, null, mergeProps)(AuthRedirectComponent);
// export default UsersContainer;

export default compose(
    connect(mapStateToProps, null, mergeProps),
    withRouter,
    withAuthRedirect,
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
