import React,{useState,useEffect,useMemo}  from "react";
import {connect}                  from 'react-redux';
import {Friends}                  from './friends'
import {compose}                  from 'redux';
import {withRouter}               from 'react-router-dom';
//@ts-ignore
// import {getUsersInfo} from "../../../redux/selectors";
import stl                        from './../users/users.module.css'
import { getColorTheme, GetSmartFriendsReducer,getFriendsACs, getDialogsACs_compUsers } from "../../../redux/selectors";
import { InitialFriendsInfo_Type, FriendsACs } from "../../../redux/friendsReducer";
import { AppStateType }           from "../../../redux/redux-store"
import { DialogActions_Type } from "../../../redux/dialogsReducer";

type FriendsContProps_Type ={
    history:       any  //comes from withRouter
    location:      any  //comes from withRouter
    match:         any  //comes from withRouter
    staticContext: any  //comes from withRouter    

    actions: MRGProps_Type['actions']
    state:   MSTP_Type
}

export type PalsThemes_Type = {friendsGeneralDnmc:string,pagBTNDnmc:string,paginationSelectedDnmc:string,paginationDnmc:string, searchInputDnmc:string,userAvaDnmc:string,
    followBTNDnmc:string,followBTN_ERR_DNMC:string,userNameDnmc:string,mapWrapperDnmc:string, userUnitDnmc:string,userWriteModeDnmc:string, moreUserUnitsDnmc:string}


let  FriendsFuncContainer:React.FC<FriendsContProps_Type> = ({ actions,state }) => {
    console.log(state)

    useEffect(()=> {actions.getMyFriendsListThunk()},[]);


    let [themes, setThemes] = useState<PalsThemes_Type>({friendsGeneralDnmc:'',pagBTNDnmc:'',paginationSelectedDnmc:'',paginationDnmc:'', searchInputDnmc:'',userAvaDnmc:'',
    followBTNDnmc:'',followBTN_ERR_DNMC:'',userNameDnmc:'',mapWrapperDnmc:'', userUnitDnmc:'',userWriteModeDnmc:'', moreUserUnitsDnmc:'',
});

useEffect(()=> {
    switch (state.colorTheme) {
        case 'NIGHT':
            return setThemes({...themes,
                friendsGeneralDnmc: stl.friendsGeneralN,
                pagBTNDnmc:stl.pagBTN_N,
                paginationSelectedDnmc:stl.paginationSelectedN,
                paginationDnmc:stl.paginationN,
                searchInputDnmc:stl.searchInputN,
                userAvaDnmc:stl.userAvaN,
                followBTNDnmc:stl.followBTN_N,
                followBTN_ERR_DNMC:stl.followBTN_ERR_N,
                userNameDnmc:stl.userNameN,
                mapWrapperDnmc:stl.mapWrapperN,
                userUnitDnmc:stl.userUnitN,
                userWriteModeDnmc:stl.userWriteModeN,
                moreUserUnitsDnmc:stl.moreUserUnitsN,
            });
        case 'MORNING':
            return setThemes({...themes,
                friendsGeneralDnmc: stl.friendsGeneralM,
                pagBTNDnmc:stl.pagBTN_M,
                paginationSelectedDnmc:stl.paginationSelectedM,
                paginationDnmc:stl.paginationM,
                searchInputDnmc:stl.searchInputM,
                userAvaDnmc:stl.userAvaM,
                followBTNDnmc:stl.followBTN_M,
                followBTN_ERR_DNMC:stl.followBTN_ERR_M,
                userNameDnmc:stl.userNameM,
                mapWrapperDnmc:stl.mapWrapperM,
                userUnitDnmc:stl.userUnitM,
                userWriteModeDnmc:stl.userWriteModeM,
                moreUserUnitsDnmc:stl.moreUserUnitsM,
            });
        case 'DAY':
            return setThemes({...themes,
                friendsGeneralDnmc: stl.friendsGeneralD,
                pagBTNDnmc:stl.pagBTN_D,
                paginationSelectedDnmc:stl.paginationSelectedD,
                paginationDnmc:stl.paginationD,
                searchInputDnmc:stl.searchInputD,
                userAvaDnmc:stl.userAvaD,
                followBTNDnmc:stl.followBTN_D,
                followBTN_ERR_DNMC:stl.followBTN_ERR_D,
                userNameDnmc:stl.userNameD,
                mapWrapperDnmc:stl.mapWrapperD,
                userUnitDnmc:stl.userUnitD,
                userWriteModeDnmc:stl.userWriteModeD,
                moreUserUnitsDnmc:stl.moreUserUnitsD
            });
        case 'EVENING':
            return setThemes({...themes,
                friendsGeneralDnmc: stl.friendsGeneralE,
                pagBTNDnmc:stl.pagBTN_E,
                paginationSelectedDnmc:stl.paginationSelectedE,
                paginationDnmc:stl.paginationE,
                searchInputDnmc:stl.searchInputE,
                userAvaDnmc:stl.userAvaE,
                followBTNDnmc:stl.followBTN_E,
                followBTN_ERR_DNMC:stl.followBTN_ERR_E,
                userNameDnmc:stl.userNameE,
                mapWrapperDnmc:stl.mapWrapperE,
                userUnitDnmc:stl.userUnitE,
                userWriteModeDnmc:stl.userWriteModeE,
                moreUserUnitsDnmc:stl.moreUserUnitsE,
            });
    }
},[state.colorTheme]);

    return <Friends
        themes    = {     themes      }
        palsFuncs = {     actions     }
        palsInfo  = { state.smartData }
    />
}

type MSTP_Type = {
    smartData:  InitialFriendsInfo_Type
    friendsACs: FriendsACs
    dialogsACs: DialogActions_Type
    colorTheme: string
}

const mapStateToProps = (state:AppStateType):MSTP_Type => {
    // console.log(state);
    return {
        smartData:   GetSmartFriendsReducer(state),
        friendsACs:  getFriendsACs(state),
        dialogsACs:  getDialogsACs_compUsers (state),
        colorTheme:  getColorTheme(state),
    }
};

type DispatchProps_Type = {dispatch: (action:any)=> void}

export type MRGProps_Type = {
    state: MSTP_Type
    actions: {
        getMyFriendsListThunk: () => void
        followThunkToggler   : (userId:number,isFollowed:boolean) => void
        sendMessageToUserThunk:(userId:number,body:string,actionKey:string,userName:string) => void
    }
}

const mergeProps = (stateProps:MSTP_Type, dispatchProps:DispatchProps_Type):MRGProps_Type => {
    const state = stateProps;
    const {dispatch} = dispatchProps;

    const getMyFriendsListThunk = () => dispatch (state.friendsACs.getMyFriendsListThunkAC() );
    const followThunkToggler = (userId:number,isFollowed:boolean) => 
                                        dispatch (state.friendsACs.followThunkTogglerAC(userId,isFollowed));
    const sendMessageToUserThunk = (userId:number,body:string,actionKey:string,userName:string) =>
                                        dispatch (state.dialogsACs.sendMessageToUserThunkAC(userId,body,actionKey,userName));

    const actions = { getMyFriendsListThunk, followThunkToggler, sendMessageToUserThunk }

    return { state, actions }
};

export default compose(
    //@ts-ignore
    connect(mapStateToProps ,null, mergeProps),
    withRouter,
    // withAuthRedirect,
)(FriendsFuncContainer);




// import React,{useEffect,useMemo}  from "react";
// import {connect}                  from 'react-redux';
// import {Friends}                  from './friends'
// import {compose}                  from 'redux';
// import {withRouter}               from 'react-router-dom';
// import {getUsersInfo} from "../../../redux/selectors";


// function FriendsFuncContainer (props) {
//     // console.log(props)

//     useEffect(()=> {props.getMyFriendsListThunk()},[]);

//     return <Friends
//         friendsList         = { props.state.friendsList         }
//         errOnGettingFriends = { props.state.errOnGettingFriends }
//         usersInfo           = { props.state.usersInfo           }
//         defaultAvatar       = { props.state.defaultAvatar       }
//         followingInProgress = { props.state.followingInProgress }
//         colorTheme          = { props.state.colorTheme          }

//         followThunkToggler  = { props.followThunkToggler        }
//         getMyFriendsList = { props.getMyFriendsListThunk     }

//     />
// }

// const mapStateToProps = (state) => {
//     // console.log(state.friendsReducer.followingInProgress);
//     return {
//         friendsList:          state.friendsReducer.fiendsList,
//         errOnGettingFriends:  state.friendsReducer.errOnGettingFriends,
//         defaultAvatar:        state.friendsReducer.defaultAvatar,
//         friendsACs:           state.friendsACs,
//         followingInProgress:  state.friendsReducer.followingInProgress,
//         colorTheme:           state.backgroundReducer.theme,
//         usersInfo:            state.friendsReducer,
//     }
// };

// const mergeProps = (stateProps, dispatchProps) => {
//     const state = stateProps;
//     const {dispatch} = dispatchProps;
//     // console.log( stateProps );

//     const getMyFriendsListThunk = ()               => dispatch (state.friendsACs.getMyFriendsListThunkAC() );

//     const followThunkToggler = (userId,isFollowed) => dispatch(state.friendsACs.followThunkTogglerAC(userId,isFollowed));

//     return { state, getMyFriendsListThunk, followThunkToggler  }
// };

// export default compose(
//     connect(mapStateToProps ,null, mergeProps),
//     withRouter,
//     // withAuthRedirect,
// )(FriendsFuncContainer);
