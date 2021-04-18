import React, { useEffect, useState } from "react";
import stl from './navBar.module.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import cn from 'classnames/bind';
import { withAuthRedirect } from "../content/HOC/withAuthRedirect";

import { getDialogACs, getMyId, getSmartPartialDialogReducer, getSmartDialogsReducer, getTheme, getUsersACs, getThemesDelayFlag } from "../../redux/selectors";
import { AppStateType } from "../../redux/redux-store";
import * as queryString from 'querystring'
import { DialogActions_Type, PartDialogReducer_Type, ThunkAC_Type } from "../../redux/dialogsReducer";
import { UsersACs_Type } from "../../redux/usersReducer";

type ContainerProps_Types = {
  actions: {
    getNewMessagesRequestThunk: () => void,
    setCurrentPageThunk: (pageSize: number, page: number) => void
    getCertainUserThunk: (pageSize: number, userSearchName: string, page: number) => void
  }
  state: {
    colorTheme: string,
    myId: number,
    themesDelayFlag: boolean,
    partDialogReducer: {
      errGettingNewMSGSCount: boolean,
      msgLoader: string,
      newMessageBTNDisabled: boolean,
      newMessagesCounter: number,
      onError: string
      envelope_GIF: string
    }
  }
}

type ThemesNavbar_Type = {
  blockMenu: string,
  counter: string,
  dynamicActiveClass: string,
  dynamicClass: string,
}

let NavBarContainer: React.FC<ContainerProps_Types> = ({ state: { myId, colorTheme, themesDelayFlag, partDialogReducer }, actions }) => {
  // console.log(state)

  let [themes, setThemes] = useState({ dynamicActiveClass: '', dynamicClass: 'stl.linkNight  ', blockMenu: '', counter: '', });
  useEffect(() => {
    switch (colorTheme) {
      case 'NIGHT': return setThemes({ ...themes, dynamicActiveClass: stl.activeLinkN, dynamicClass: stl.linkN, blockMenu: stl.blockMenuN, counter: stl.counterN, });
      case 'MORNING': return setThemes({ ...themes, dynamicActiveClass: stl.activeLinkM, dynamicClass: stl.linkM, blockMenu: stl.blockMenuM, counter: stl.counterM, });
      case 'DAY': return setThemes({ ...themes, dynamicActiveClass: stl.activeLinkD, dynamicClass: stl.linkD, blockMenu: stl.blockMenuD, counter: stl.counterD, });
      case 'EVENING': return setThemes({ ...themes, dynamicActiveClass: stl.activeLinkE, dynamicClass: stl.linkE, blockMenu: stl.blockMenuE, counter: stl.counterE, });
    }
  }, [colorTheme]);



  useEffect(() => { myId && actions.getNewMessagesRequestThunk() }, []);

  return themes.dynamicActiveClass ? <NavBar
    myId={myId}
    themes={themes}
    delayFlag={themesDelayFlag}
    actions={actions}
    state={partDialogReducer}
  /> : null
}

type PropsTypes = {
  myId: number,
  delayFlag: boolean,

  themes: ThemesNavbar_Type
  actions: ContainerProps_Types['actions']
  state: ContainerProps_Types['state']['partDialogReducer']
}


let NavBar: React.FC<PropsTypes> = ({ myId, themes, state, actions, delayFlag }) => {
  // console.log(delayFlag)

  // let [isHiddenBTN, setIsHiddenBTN] = useState(stl.hidden);
  let isHiddenBTN = stl.hidden;

  let [element, setElement] = useState<JSX.Element>(<span className={themes.dynamicClass}> +1? </span>);

  useEffect(() => { BTNRenderSelector() }, [state.newMessageBTNDisabled, state.errGettingNewMSGSCount]);

  const BTNRenderSelector = () => {
    if (state.newMessageBTNDisabled) {
      // setIsHiddenBTN(stl.hidden);
      isHiddenBTN = stl.hidden;
      setElement(<img src={state.envelope_GIF} alt="err" />); // лодер конверта
      return element
    }
    else if (state.errGettingNewMSGSCount) {
      // setIsHiddenBTN(stl.showed)
      isHiddenBTN = stl.showed;
      setElement(<img className={stl.errorImg} src={state.onError} alt='err' />); // пиктограмма ошибки
      return element
    }
    else {
      setElement(<span className={themes.dynamicClass}> +1? </span>)
      return element
    }
  };

  let queryRequest = useLocation().search;
  let history = useHistory()
  // console.log(history)
  // let usersLink = '/users'

  let finalUsersLink = () => {
    let parsedString = queryString.parse(queryRequest);
    if (parsedString['term'] && parsedString['term'] !== '') { // проверка второго необязательного параметра
      //@ts-ignore
      props.actions.setCurrentPageThunk(50, parsedString['term'], 1)
      history.push({ pathname: 'users', search: `?page=1&term=${parsedString['term']}` })
    } else {
      actions.setCurrentPageThunk(50, 1)
      history.push({ pathname: 'users', search: `?page=1` })
    }
  }

  // console.log(props)

  return <>
    <div className={cn(stl.blockMenu, themes.blockMenu, delayFlag && stl.delay)}>
      <ul className={stl.menu}>
        {!myId && <li><NavLink to={`/login`} className={themes.dynamicClass} activeClassName={themes.dynamicActiveClass}
        >Get Login</NavLink></li>}
        {myId && <li><NavLink to={`/profile`} className={themes.dynamicClass} activeClassName={themes.dynamicActiveClass}
        > Profile </NavLink></li>}
        {myId && <li><NavLink to={'/friends'} className={themes.dynamicClass} activeClassName={themes.dynamicActiveClass}
        > Friends </NavLink></li>}

        {myId && <li className={stl.dialogsSpan}>
          <button disabled={state.newMessageBTNDisabled} onClick={actions.getNewMessagesRequestThunk} className={isHiddenBTN}>
            {element}
          </button>
          <NavLink to={'/dialogs'}
            className={themes.dynamicClass}
            activeClassName={themes.dynamicActiveClass}>
            Dialogs </NavLink>
          <p className={`${themes.counter}`} hidden={!state.newMessagesCounter}>({state.newMessagesCounter})</p>
        </li>}
        {myId && <li><NavLink to={'/chat'}
          className={themes.dynamicClass}
          activeClassName={themes.dynamicActiveClass}> Chat </NavLink></li>}
        {/* {props.myId && <li><NavLink to={'/users'} */}

        {myId && <li><NavLink to={history.location.pathname !== `/users` ? '/users' : history.location.pathname + history.location.search}
          // {props.myId && <li><NavLink to={history.location.pathname + history.location.search}
          className={themes.dynamicClass}
          activeClassName={themes.dynamicActiveClass}
          onClick={(e) => history.location.pathname === `/users` ? finalUsersLink() : null}
        > Users </NavLink></li>}
        <li><NavLink to='/news'
          className={themes.dynamicClass}
          activeClassName={themes.dynamicActiveClass}> News </NavLink></li>
        <li><NavLink to='/music'
          className={themes.dynamicClass}
          activeClassName={themes.dynamicActiveClass}> Music </NavLink></li>
        <li><NavLink to='/settings'
          className={themes.dynamicClass}
          activeClassName={themes.dynamicActiveClass}> Settings </NavLink></li>
      </ul>
    </div>
  </>
}


type MSTP_Type = {
  myId: number | null,
  colorTheme: string,
  dialogACs: DialogActions_Type,
  usersACs: UsersACs_Type,
  partDialogReducer: PartDialogReducer_Type,
  themesDelayFlag: boolean,
}

const mapStateToProps = (state: AppStateType): MSTP_Type => {
  // console.log(state);
  return {
    myId: getMyId(state),
    colorTheme: getTheme(state),
    dialogACs: getDialogACs(state),
    usersACs: getUsersACs(state),
    partDialogReducer: getSmartPartialDialogReducer(state),
    themesDelayFlag: getThemesDelayFlag(state)
    // partDialogReducer:     getSmartDialogsReducer(state), 
  }
};

type DispatchProps_Type = { dispatch: (args: any) => ThunkAC_Type }

const mergeProps = (stateProps: MSTP_Type, dispatchProps: DispatchProps_Type) => {                                                   // 
  const state = stateProps;
  // console.log(dispatchProps);

  const { dispatch } = dispatchProps;
  // console.log(state)

  const getNewMessagesRequestThunk = () => dispatch(state.dialogACs.getNewMessagesRequestThunkAC());
  const setCurrentPageThunk = (pageSize: number, page: number) => dispatch(state.usersACs.setCurrentPageThunkAC(pageSize, page))
  const getCertainUserThunk = (pageSize: number, userSearchName: string, page: number) => dispatch(state.usersACs.getCertainUserThunkAC(pageSize, userSearchName, page))

  const actions = { getNewMessagesRequestThunk, setCurrentPageThunk, getCertainUserThunk }

  return { state, actions }
};

// @ts-ignore
const navBarConnector = connect(mapStateToProps, null, mergeProps)(NavBarContainer) as React.ComponentType         // упорно ts выплёвывает ошибку непонятного генеза
export default navBarConnector;
