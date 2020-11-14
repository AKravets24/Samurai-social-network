import React,{useEffect,useMemo}  from "react";
import {connect}                  from 'react-redux';
import {Friends}                  from './friends'
import {compose}                  from 'redux';
import {withRouter}               from 'react-router-dom';
import {getUsersInfo} from "../../../redux/selectors";


function FriendsFuncContainer (props) {
    console.log(props)

    useEffect(()=> {props.getMyFriendsListThunk()},[]);

    return <Friends
        friendsList         = { props.state.friendsList         }
        usersInfo           = { props.state.usersInfo           }
        defaultAvatar       = { props.state.defaultAvatar       }
        followThunk         = { props.followThunk               }
        unFollowThunk       = { props.unFollowThunk             }
        followingInProgress = { props.state.followingInProgress }
        colorTheme          = { props.state.colorTheme          }
    />
}

const mapStateToProps = (state) => {
    // console.log(state.friendsReducer.followingInProgress);
    return {
        friendsList:          state.friendsReducer.fiendsList,
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

    const getMyFriendsListThunk = () =>        dispatch (state.friendsACs.getMyFriendsListThunkAC() );
    const followThunk           = (userId) =>  dispatch (state.friendsACs.followThunkAC(userId)     );
    const unFollowThunk         = (userId) =>  dispatch (state.friendsACs.unFollowThunkAC(userId)   );

    return { state, getMyFriendsListThunk, followThunk, unFollowThunk,  }
};

export default compose(
    connect(mapStateToProps ,null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(FriendsFuncContainer);

