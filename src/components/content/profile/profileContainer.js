import React from "react";
import Profile from './profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from 'redux';

class profileClassContainer extends React.Component {
    constructor(props) { super(props);  /*console.log(props.state.dynamicPanoramaPic);*/
        this.state = { myId: this.props.state.myId, comparativeId: +this.props.match.params.userId, }
    };

    profileSelector = () => {
        let {myId, comparativeId} = this.state;
        if  ( myId  === comparativeId || !comparativeId ){
                this.props.getMyProfileThunk    (myId);
                this.props.getMyStatusThunk     (myId);
                this.props.history.push         (`/profile/${myId}`);
        } else
        if (+comparativeId && +comparativeId !== myId){
                this.props.getProfileThunk      (comparativeId);
                this.props.getUserStatusThunk   (comparativeId);
        }
    };

    componentDidMount = () => { this.profileSelector() };

    componentDidUpdate(prevProps, prevState,snapshot) {
        let thisPropsId = +this.props.match.params.userId; // меняется динамически !!
        let prevPropsId = +prevProps.match.params.userId
        if (thisPropsId !== prevPropsId) {
            this.props.getMyProfileThunk    (thisPropsId);
            this.props.getMyStatusThunk     (thisPropsId);
            this.props.history.push         (`/profile/${thisPropsId}`);
        }
    };

    render() {
        // console.log(this.props.match.params)
        return <Profile
            addPost              = { this.props.addPost                 }
            onPostChange         = { this.props.onPostChange            }
            state                = { this.props.state                   }
            match                = { this.props.match                   }
            stateChanger         = { this.props.stateChanger            }
            updateStatusThunk    = { this.props.updateStatusThunk       }
            updateMyAvatarThunk  = { this.props.updateMyAvatarThunk     }
            getMyStatusThunk     = { this.props.getMyStatusThunk        }
            loader               = { this.props.state.loader            }
            panoramaPic          = {this.props.state.dynamicPanoramaPic }
        />
    }
}

let mapStateToProps = (state)=> {
    // console.log(state.backgroundReducer.profilePanoramaPic);
    return {
        myId:               state.appAuthReducer.id,
        profilePics:        state.profilePics,
        dynamicPanoramaPic: state.backgroundReducer.profilePanoramaPic,
        props:              state.profileReducer,
        profileACs:         state.profileACs,
        profile:            state.profileReducer.profile,
        loader:             state.backgroundReducer.userLoaderTheme,
    }
};
let mergeProps = (stateProps, dispatchProps)=>{
    const  state  = stateProps;
    const { dispatch } = dispatchProps;
    // console.log(state);

    const addPost               = (finalPost) =>   {
        let date = new Date();
        let data=`${("0"+date.getDate()).slice(-2)}.${("0"+(date.getMonth()+1)).slice(-2)}.${(date.getFullYear()-2000)}`;
        let time=`${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`;
        dispatch(state.profileACs.addPostAC(finalPost, data, time));
    };
    const getProfileThunk       = (userId) =>      { dispatch (state.profileACs.getProfileThUnkAC      (userId)      )};
    const stateChanger          = (text) =>        { dispatch (state.profileACs.statusChangeAC         (text)        )};
    const updateStatusThunk     = (text)=>         { dispatch (state.profileACs.updateStatusThunkAC    (text)        )};
    const getMyStatusThunk      = (status, myId)=> { dispatch (state.profileACs.getMyStatusThunkAC     (status,myId) )};
    const updateMyAvatarThunk   = (image)=>        { dispatch (state.profileACs.updateMyAvatarThunkAC  (image)       )};
    const getMyProfileThunk     = (myId) =>        { dispatch (state.profileACs.getMyProfileThunkAC    (myId)        )};
    const getUserStatusThunk    = (userId)=>       { dispatch (state.profileACs.getUserStatusThunkAC   (userId)      )};

    return { state, addPost, getProfileThunk, stateChanger, updateStatusThunk,
            getMyStatusThunk, updateMyAvatarThunk, getMyProfileThunk, getUserStatusThunk}
};

export default compose (
    connect(mapStateToProps, null, mergeProps),
    withRouter,
    withAuthRedirect,
)(profileClassContainer);
