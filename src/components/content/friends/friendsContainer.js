import React,{useEffect,useMemo}  from "react";
import {connect}                  from 'react-redux';
import {Friends}                  from './friends'
import {compose}                  from 'redux';
import {withRouter}               from 'react-router-dom';
import {getUsersInfo} from "../../../redux/selectors";


function FriendsFuncContainer (props) {
    // console.log(props)

    useEffect(()=> {props.getMyFriendsListThunk()},[]);

    return <Friends
        friendsList         = { props.state.friendsList         }
        errOnGettingFriends = { props.state.errOnGettingFriends }
        usersInfo           = { props.state.usersInfo           }
        defaultAvatar       = { props.state.defaultAvatar       }
        followingInProgress = { props.state.followingInProgress }
        colorTheme          = { props.state.colorTheme          }

        followThunkToggler  = { props.followThunkToggler        }
        getMyFriendsList = { props.getMyFriendsListThunk     }

    />
}

const mapStateToProps = (state) => {
    // console.log(state.friendsReducer.followingInProgress);
    return {
        friendsList:          state.friendsReducer.fiendsList,
        errOnGettingFriends:  state.friendsReducer.errOnGettingFriends,
        defaultAvatar:        state.friendsReducer.defaultAvatar,
        friendsACs:           state.friendsACs,
        followingInProgress:  state.friendsReducer.followingInProgress,
        colorTheme:           state.backgroundReducer.theme,
        usersInfo:            state.friendsReducer,
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const state = stateProps;
    const {dispatch} = dispatchProps;
    // console.log( stateProps );

    const getMyFriendsListThunk = ()                => dispatch (state.friendsACs.getMyFriendsListThunkAC() );

    const followThunkToggler = (userId,isFollowed) => dispatch(state.friendsACs.followThunkTogglerAC(userId,isFollowed));

    return { state, getMyFriendsListThunk, followThunkToggler  }
};

export default compose(
    connect(mapStateToProps ,null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(FriendsFuncContainer);
