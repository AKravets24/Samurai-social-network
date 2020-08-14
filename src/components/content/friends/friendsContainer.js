import React from "react";
import {connect} from 'react-redux';
import {Friends} from './friends'
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';


class friendsClassContainer extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props.state.friendsList)
    }

    componentDidMount() {
        this.props.getMyFriendsListThunk()
    }

    render() {
        return (
            <Friends
            friendsList   = { this.props.state.friendsList   }
            defaultAvatar = { this.props.state.defaultAvatar }
            />
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.friendsReducer.fiendsList);
    return {
        friendsList: state.friendsReducer.fiendsList,
        defaultAvatar: state.friendsReducer.defaultAvatar,
        friendsACs: state.friendsACs,
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const state = stateProps;
    const {dispatch} = dispatchProps;
    // console.log( stateProps );

    const getMyFriendsListThunk = () => { dispatch(state.friendsACs.getMyFriendsListThunkAC()) };

    return { state, getMyFriendsListThunk  }
};


export default compose(
    connect(mapStateToProps ,null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(friendsClassContainer);

