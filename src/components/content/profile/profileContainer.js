import React,{useState,useEffect} from "react";
import Profile from './profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from 'redux';

const ProfileFuncContainer = React.memo( props => {
// function ProfileFuncContainer (props) {
//      console.log(props);

    let myId = props.profileState.myId;
    let comparativeId = +props.match.params.userId;

    useEffect( ()=> {
        if(myId ===comparativeId||!comparativeId){
            props.getMyProfileThunk(myId);
            props.getMyStatusThunk(myId);
            props.history.push(`/profile/${myId}`);
        } else if (+comparativeId && +comparativeId !== myId){
            props.getProfileThunk(comparativeId);
            props.getUserStatusThunk(comparativeId);}
    },[myId, comparativeId] );

    return <Profile
        addPost             = { props.addPost                       }
        state               = { props.profileState                      } // нужен рефактор
        match               = { props.match                         }
        updateStatusThunk   = { props.updateStatusThunk             }
        updateMyAvatarThunk = { props.updateMyAvatarThunk           }
        getMyStatusThunk    = { props.getMyStatusThunk              }
    />
})

let mapStateToProps = (state)=> {
    // console.log(state.backgroundReducer);
    return {
        myId:               state.appAuthReducer.id,
        profilePics:        state.profilePics,
        profileMedia:       state.profileReducer,
        profileACs:         state.profileACs,

        colorTheme:         state.backgroundReducer.theme,
        auth_LDR_GIF:       state.backgroundReducer.auth_LDR_GIF,
        ava_LDR_GIF:        state.backgroundReducer.profileThemes.ava_LDR_GIF,
        BTN_LDR_GIF:        state.backgroundReducer.profileThemes.BTN_LDR_GIF,
        status_LDR_GIF:     state.backgroundReducer.profileThemes.status_LDR_GIF,
        panoramaPic:        state.backgroundReducer.profileThemes.panoramaPic,
        panorama_LDR_GIF:   state.backgroundReducer.profileThemes.panorama_LDR_GIF,
    }
};
let mergeProps = (stateProps, dispatchProps)=>{
    const  profileState  = stateProps;
    const { dispatch } = dispatchProps;
    // console.log(state);

    const addPost               = (finalPost) =>   {
        let date = new Date();
        let data=`${("0"+date.getDate()).slice(-2)}.${("0"+(date.getMonth()+1)).slice(-2)}.${(date.getFullYear()-2000)}`;
        let time=`${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`;
        dispatch(profileState.profileACs.addPostAC(finalPost, data, time));
    };
    const getProfileThunk       = (userId) =>      { dispatch (profileState.profileACs.getProfileThUnkAC      (userId)      )};
    // const stateChanger          = (text) =>        { dispatch (state.profileACs.statusChangeAC         (text)        )};
    const updateStatusThunk     = (text)=>         { dispatch (profileState.profileACs.updateStatusThunkAC    (text)        )};
    const getMyStatusThunk      = (status, myId)=> { dispatch (profileState.profileACs.getMyStatusThunkAC     (status,myId) )};
    const updateMyAvatarThunk   = (image)=>        { dispatch (profileState.profileACs.updateMyAvatarThunkAC  (image)       )};
    const getMyProfileThunk     = (myId) =>        { dispatch (profileState.profileACs.getMyProfileThunkAC    (myId)        )};
    const getUserStatusThunk    = (userId)=>       { dispatch (profileState.profileACs.getUserStatusThunkAC   (userId)      )};

    return { profileState, addPost, getProfileThunk, /*stateChanger,*/ updateStatusThunk,
            getMyStatusThunk, updateMyAvatarThunk, getMyProfileThunk, getUserStatusThunk}
};

export default compose (
    connect(mapStateToProps, null, mergeProps),
    withRouter,
    withAuthRedirect,
)(ProfileFuncContainer);

// useEffect( ()=> {
//         props.getMyProfileThunk    (comparativeId);
//         props.getMyStatusThunk     (comparativeId);
//         props.history.push         (`/profile/${comparativeId}`);
// },[comparativeId] );

// class profileClassContainer extends React.Component {
//     constructor(props) { super(props);  console.log(props);
//         this.state = { myId: this.props.state.myId, comparativeId: +this.props.match.params.userId, }
//     };
//
//     profileSelector = () => {
//         let {myId, comparativeId} = this.state;
//         if  ( myId  === comparativeId || !comparativeId ){
//             this.props.getMyProfileThunk    (myId);
//             this.props.getMyStatusThunk     (myId);
//             this.props.history.push         (`/profile/${myId}`);
//         } else
//         if (+comparativeId && +comparativeId !== myId){
//             this.props.getProfileThunk      (comparativeId);
//             this.props.getUserStatusThunk   (comparativeId);
//         }
//     };
//
//     componentDidMount = () => { this.profileSelector() };
//
//     componentDidUpdate(prevProps, prevState,snapshot) {
//         let thisPropsId = +this.props.match.params.userId; // меняется динамически !!
//         let prevPropsId = +prevProps.match.params.userId
//         if (thisPropsId !== prevPropsId) {
//             this.props.getMyProfileThunk    (thisPropsId);
//             this.props.getMyStatusThunk     (thisPropsId);
//             this.props.history.push         (`/profile/${thisPropsId}`);
//         }
//     };
//
//     render() {
//         // console.log(this.props.match.params)
//         return <Profile
//             addPost             = { this.props.addPost                  }
//             onPostChange        = { this.props.onPostChange             }
//             state               = { this.props.state                    }
//             match               = { this.props.match                    }
//             stateChanger        = { this.props.stateChanger             }
//             updateStatusThunk   = { this.props.updateStatusThunk        }
//             updateMyAvatarThunk = { this.props.updateMyAvatarThunk      }
//             getMyStatusThunk    = { this.props.getMyStatusThunk         }
//             loader              = { this.props.state.loader             }
//             panoramaPic         = { this.props.state.dynamicPanoramaPic }
//             colorTheme          = { this.props.state.colorTheme         }
//         />
//     }
// }
