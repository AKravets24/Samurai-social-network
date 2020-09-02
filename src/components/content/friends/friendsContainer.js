import React from "react";
import {connect} from 'react-redux';
import {Friends} from './friends'
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';


class friendsClassContainer extends React.Component { constructor(props) { super(props);
        // console.log(props)
    }

    componentDidMount() { this.props.getMyFriendsListThunk() }

    render() {
        return (
            <Friends
            friendsList         = { this.props.state.friendsList         }
            defaultAvatar       = { this.props.state.defaultAvatar       }
            followThunk         = { this.props.followThunk               }
            unFollowThunk       = { this.props.unFollowThunk             }
            followingInProgress = { this.props.state.followingInProgress }
            />
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.friendsReducer.followingInProgress);
    return {
        friendsList:          state.friendsReducer.fiendsList,
        defaultAvatar:        state.friendsReducer.defaultAvatar,
        friendsACs:           state.friendsACs,
        followingInProgress:  state.friendsReducer.followingInProgress,
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const state = stateProps;
    const {dispatch} = dispatchProps;
    // console.log( stateProps );

    const getMyFriendsListThunk = () =>        dispatch (state.friendsACs.getMyFriendsListThunkAC() );
    const followThunk           = (userId) =>  dispatch (state.friendsACs.followThunkAC(userId)     )
    const unFollowThunk         = (userId) =>  dispatch (state.friendsACs.unFollowThunkAC(userId)   )

    return { state, getMyFriendsListThunk, followThunk, unFollowThunk,  }
};


export default compose(
    connect(mapStateToProps ,null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(friendsClassContainer);

