import React,{useState,useEffect} from "react";
import Profile from './profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from 'redux';

function ProfileFuncContainer (props) {
     console.log(props);

    // const [myId]          = useState(props.state.myId)
    // const [comparativeId] = useState(+props.match.params.userId)

    let myId = props.state.myId;
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
        addPost             = { props.addPost                  }
        state               = { props.state                    }
        match               = { props.match                    }
        stateChanger        = { props.stateChanger             }
        updateStatusThunk   = { props.updateStatusThunk        }
        updateMyAvatarThunk = { props.updateMyAvatarThunk      }
        getMyStatusThunk    = { props.getMyStatusThunk         }
        loader              = { props.state.loader             }
        panoramaPic         = { props.state.dynamicPanoramaPic }
        colorTheme          = { props.state.colorTheme         }
    />
}

let mapStateToProps = (state)=> {
    // console.log(state.backgroundReducer.theme);
    return {
        myId:               state.appAuthReducer.id,
        profilePics:        state.profilePics,
        dynamicPanoramaPic: state.backgroundReducer.profilePanoramaPic,
        props:              state.profileReducer,
        profileACs:         state.profileACs,
        profile:            state.profileReducer.profile,
        loader:             state.backgroundReducer.userLoaderTheme,
        colorTheme:         state.backgroundReducer.theme,
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
