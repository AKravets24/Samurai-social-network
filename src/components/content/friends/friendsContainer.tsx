import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Friends } from './friends'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import stl from './../users/users.module.css'
import { getColorTheme, GetSmartFriendsReducer, getFriendsACs, getDialogsACs_compUsers } from "../../../redux/selectors";
import { InitialFriendsInfo_Type, FriendsACs } from "../../../redux/friendsReducer";
import { DialogActions_Type } from "../../../redux/dialogsReducer";


type FriendsContProps_Type = {
  history: any  //comes from withRouter
  location: any  //comes from withRouter
  match: any  //comes from withRouter
  staticContext: any  //comes from withRouter    
}

export type PalsThemes_Type = {
  friendsGeneralDnmc: string, pagBTNDnmc: string, paginationSelectedDnmc: string, paginationDnmc: string, searchInputDnmc: string, userAvaDnmc: string,
  followBTNDnmc: string, followBTN_ERR_DNMC: string, userNameDnmc: string, mapWrapperDnmc: string, userUnitDnmc: string, userWriteModeDnmc: string, moreUserUnitsDnmc: string
}

export type FriendsActions_Type = {
  getMyFriendsListThunk: () => void
  followThunkToggler: (userId: number, isFollowed: boolean) => void
  sendMessageToUserThunk: (userId: number, body: string, actionKey: string, userName: string) => void
}

let FriendsFuncContainer: React.FC<FriendsContProps_Type> = (props) => {
  // console.log(props)

  let colorTheme = useSelector(getColorTheme)
  let palsInfo: InitialFriendsInfo_Type = useSelector(GetSmartFriendsReducer)

  let dispatch = useDispatch();
  let friendsACs: FriendsACs = useSelector(getFriendsACs)
  let dialogsACs: DialogActions_Type = useSelector(getDialogsACs_compUsers)

  let getMyFriendsListThunk = () => { dispatch(friendsACs.getMyFriendsListThunkAC()) };
  let followThunkToggler = (userId: number, isFollowed: boolean) => { dispatch(friendsACs.followThunkTogglerAC(userId, isFollowed)) };
  let sendMessageToUserThunk = (userId: number, body: string, actionKey: string, userName: string) => {
    dispatch(dialogsACs.sendMessageToUserThunkAC(userId, body, actionKey, userName))
  }
  let palsFuncs: FriendsActions_Type = { getMyFriendsListThunk, followThunkToggler, sendMessageToUserThunk }

  useEffect(() => { getMyFriendsListThunk() }, []);


  let [themes, setThemes] = useState<PalsThemes_Type>({
    friendsGeneralDnmc: '', pagBTNDnmc: '', paginationSelectedDnmc: '', paginationDnmc: '', searchInputDnmc: '', userAvaDnmc: '', followBTNDnmc: '', followBTN_ERR_DNMC: '', userNameDnmc: '', mapWrapperDnmc: '', userUnitDnmc: '', userWriteModeDnmc: '', moreUserUnitsDnmc: '',
  });

  useEffect(() => {
    switch (colorTheme) {
      case 'NIGHT':
        return setThemes({
          ...themes,
          friendsGeneralDnmc: stl.friendsGeneralN,
          pagBTNDnmc: stl.pagBTN_N,
          paginationSelectedDnmc: stl.paginationSelectedN,
          paginationDnmc: stl.paginationN,
          searchInputDnmc: stl.searchInputN,
          userAvaDnmc: stl.userAvaN,
          followBTNDnmc: stl.followBTN_N,
          followBTN_ERR_DNMC: stl.followBTN_ERR_N,
          userNameDnmc: stl.userNameN,
          mapWrapperDnmc: stl.mapWrapperN,
          userUnitDnmc: stl.userUnitN,
          userWriteModeDnmc: stl.userWriteModeN,
          moreUserUnitsDnmc: stl.moreUserUnitsN,
        });
      case 'MORNING':
        return setThemes({
          ...themes,
          friendsGeneralDnmc: stl.friendsGeneralM,
          pagBTNDnmc: stl.pagBTN_M,
          paginationSelectedDnmc: stl.paginationSelectedM,
          paginationDnmc: stl.paginationM,
          searchInputDnmc: stl.searchInputM,
          userAvaDnmc: stl.userAvaM,
          followBTNDnmc: stl.followBTN_M,
          followBTN_ERR_DNMC: stl.followBTN_ERR_M,
          userNameDnmc: stl.userNameM,
          mapWrapperDnmc: stl.mapWrapperM,
          userUnitDnmc: stl.userUnitM,
          userWriteModeDnmc: stl.userWriteModeM,
          moreUserUnitsDnmc: stl.moreUserUnitsM,
        });
      case 'DAY':
        return setThemes({
          ...themes,
          friendsGeneralDnmc: stl.friendsGeneralD,
          pagBTNDnmc: stl.pagBTN_D,
          paginationSelectedDnmc: stl.paginationSelectedD,
          paginationDnmc: stl.paginationD,
          searchInputDnmc: stl.searchInputD,
          userAvaDnmc: stl.userAvaD,
          followBTNDnmc: stl.followBTN_D,
          followBTN_ERR_DNMC: stl.followBTN_ERR_D,
          userNameDnmc: stl.userNameD,
          mapWrapperDnmc: stl.mapWrapperD,
          userUnitDnmc: stl.userUnitD,
          userWriteModeDnmc: stl.userWriteModeD,
          moreUserUnitsDnmc: stl.moreUserUnitsD
        });
      case 'EVENING':
        return setThemes({
          ...themes,
          friendsGeneralDnmc: stl.friendsGeneralE,
          pagBTNDnmc: stl.pagBTN_E,
          paginationSelectedDnmc: stl.paginationSelectedE,
          paginationDnmc: stl.paginationE,
          searchInputDnmc: stl.searchInputE,
          userAvaDnmc: stl.userAvaE,
          followBTNDnmc: stl.followBTN_E,
          followBTN_ERR_DNMC: stl.followBTN_ERR_E,
          userNameDnmc: stl.userNameE,
          mapWrapperDnmc: stl.mapWrapperE,
          userUnitDnmc: stl.userUnitE,
          userWriteModeDnmc: stl.userWriteModeE,
          moreUserUnitsDnmc: stl.moreUserUnitsE,
        });
    }
  }, [colorTheme]);

  return <Friends themes={themes} palsFuncs={palsFuncs} palsInfo={palsInfo} />
}

let someThing = { a: 10, b: 'Arttm' }

export default compose(withRouter)(FriendsFuncContainer);


