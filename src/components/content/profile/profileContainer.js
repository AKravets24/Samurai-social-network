import React,{useEffect}          from "react";
import Profile                    from './profile';
import { connect }                from 'react-redux';
import { withRouter }             from 'react-router-dom';
import { withAuthRedirect }       from "../HOC/withAuthRedirect";
import { compose }                from 'redux';
import {
    getAuth_LDR_GIF, getAva_LDR_GIF, getBTN_LDR_GIF,
    getMyId, getPanorama_LDR_GIF, getPanoramaPic,
    getProfileACs,
    getProfilePics,
    getProfileReducer, getSmartProfileMediaData, getStatus_LDR_GIF,
    getTheme
} from "../../../redux/selectors";


const ProfileFuncContainer = props => {
//         console.log(props.profileState.profilePics)

    let myId=props.profileState.myId;
    let comparativeId=+props.match.params.userId;
    // let userFullName = props.profileState.profileMedia.profileData.fullName

    useEffect(()=> {
        if(myId===comparativeId||!comparativeId){props.getProfileThunk(myId);props.history.push(`/profile/${myId}`);
        } else if (+comparativeId&&+comparativeId!==myId){props.getProfileThunk(comparativeId);}
        // props.profileState.profileMedia.profileData.fullName &&
        // props.getUserIsFollowedThunk(props.profileState.profileMedia.profileData.fullName,comparativeId)
    },[myId, comparativeId]);

    return <Profile
        addPost             = { props.addPost               }
        state               = { props.profileState          } // нужен рефактор
        match               = { props.match                 }
        updateStatusThunk   = { props.updateStatusThunk     }
        updateMyAvatarThunk = { props.updateMyAvatarThunk   }
        followUserThunk     = { props.followUserThunk       }
        unFollowUserThunk   = { props.unFollowUserThunk     }
    />
}

let mapStateToProps = (state)=> {
    // console.log(getProfileReducer(state));
    return {
        profileMedia:      getSmartProfileMediaData(state),
        // profileMedia:       getProfileReducer   (state),

        myId:               getMyId             (state),
        profilePics:        getProfilePics      (state),
        profileACs:         getProfileACs       (state),

        colorTheme:         getTheme            (state),
        auth_LDR_GIF:       getAuth_LDR_GIF     (state),
        ava_LDR_GIF:        getAva_LDR_GIF      (state),
        BTN_LDR_GIF:        getBTN_LDR_GIF      (state),
        status_LDR_GIF:     getStatus_LDR_GIF   (state),
        panoramaPic:        getPanoramaPic      (state),
        panorama_LDR_GIF:   getPanorama_LDR_GIF (state),
    }
};
let mergeProps = (stateProps, dispatchProps)=>{
    const  profileState  = stateProps;
    const { dispatch } = dispatchProps;
    // console.log(profileState);

    const addPost               = (finalPost) =>   {
        let date = new Date();
        let data=`${("0"+date.getDate()).slice(-2)}.${("0"+(date.getMonth()+1)).slice(-2)}.${(date.getFullYear()-2000)}`;
        let time=`${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`;
        dispatch(profileState.profileACs.addPostAC(finalPost, data, time));
    };
    const getProfileThunk        =(userId) =>        {dispatch(profileState.profileACs.getProfileThUnkAC       (userId))         };
    const updateStatusThunk      =(text)=>           {dispatch(profileState.profileACs.updateStatusThunkAC     (text))           };
    const updateMyAvatarThunk    =(image)=>          {dispatch(profileState.profileACs.updateMyAvatarThunkAC   (image))          };
    const getUserIsFollowedThunk =(userName,userId)=>{dispatch(profileState.profileACs.getUserIsFollowedThunkAC(userName,userId))};
    const followUserThunk        =(userId)=>         {dispatch(profileState.profileACs.followUserThunkAC       (userId))         };
    const unFollowUserThunk      =(userId)=>         {dispatch(profileState.profileACs.unFollowUserThunkAC     (userId))         };


    return { profileState, addPost, getProfileThunk,  updateStatusThunk, updateMyAvatarThunk,getUserIsFollowedThunk,
        followUserThunk, unFollowUserThunk,
    }
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
