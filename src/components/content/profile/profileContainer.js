import React from "react";
import Profile from './profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from 'redux';

class profileClassContainer extends React.Component {
    constructor(props) { super(props);
    console.log(props)
    };
    componentDidMount = () => {
        // let userId = this.props.match.params.userId;
        // this.props.getProfileThunk(userId);
        this.props.getMyStatusThunk();
        this.props.getMyProfileThunk();

    };
    render() {
        // console.log(this.props.match.params)
        return <Profile
                    // isAuth = {this.props.state.isAuth}
                    addPost              = { this.props.addPost              }
                    onPostChange         = { this.props.onPostChange         }
                    state                = { this.props.state                }
                    profile              = { this.props.state.profile        }
                    stateChanger         = { this.props.stateChanger         }
                    statusEditOn         = { this.props.statusEditOn         }
                    statusEditOff        = { this.props.statusEditOff        }
                    updateStatusThunk    = { this.props.updateStatusThunk    }
                    updateMyAvatarThunk  = { this.props.updateMyAvatarThunk  }
                    letterBalanceCounter = { this.props.letterBalanceCounter }
        />
    }
}

let mapStateToProps = (state)=> {
    // console.log(state.profileReducer.myId);
    return {
        myId: state.authReducer.id,
        profilePics: state.profilePics,
        props: state.profileReducer,
        profileACs: state.profileACs,
        profile: state.profileReducer.profile,
    }
};
let mergeProps = (stateProps, dispatchProps)=>{
    const  state  = stateProps;
    const { dispatch } = dispatchProps;
    // console.log(state);

    const onPostChange           = (newSomeText) =>  { dispatch(state.profileACs.updatePostFieldAC(newSomeText)) };
    const addPost                = (finalPost) =>    {
        let dataObj = new Date();
        let date = `${("0" + dataObj.getDate()).slice(-2)}.${("0" + (dataObj.getMonth() +
            + 1)).slice(-2)}.${(dataObj.getFullYear() - 2000)}`;
        let time = `${("0" + dataObj.getHours()).slice(-2)}:${("0" + dataObj.getMinutes()).slice(-2)}`;
        dispatch(state.profileACs.addPostAC(finalPost, date, time));
    };
    // const getProfileThunk     = (userId) =>       { dispatch (state.profileACs.getProfileThUnkAC(userId)) };
    const statusEditOn           = () =>             { dispatch (state.profileACs.statusEditOnAC())};
    const stateChanger           = (text) =>         { dispatch (state.profileACs.statusChangeAC(text))};
    const statusEditOff          = () =>             { dispatch (state.profileACs.statusEditOffAC())};
    const updateStatusThunk      = (text)=>          { dispatch (state.profileACs.updateStatusThunkAC(text))};
    const getMyStatusThunk       = (status)=>        { dispatch (state.profileACs.getMyStatusThunkAC(status))};
    const updateMyAvatarThunk    = (image)=>         { dispatch (state.profileACs.updateMyAvatarThunkAC(image)) };
    const getMyProfileThunk      = () =>             { dispatch (state.profileACs.getMyProfileThunkAC()) };
    const letterBalanceCounter   = (number)=>        { dispatch (state.profileACs.letterBalanceCounterAC(number)) }

    return { state, onPostChange, addPost, /*getProfileThunk,*/ statusEditOn, stateChanger,statusEditOff, updateStatusThunk,
            getMyStatusThunk, updateMyAvatarThunk, getMyProfileThunk, letterBalanceCounter}
};

export default compose (
    connect(mapStateToProps, null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(profileClassContainer);
