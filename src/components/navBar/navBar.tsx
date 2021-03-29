import React, { DOMElement, useEffect, useState } from "react";
import stl from './navBar.module.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { withAuthRedirect } from "../content/HOC/withAuthRedirect";

import { getDialogACs, getMyId, getSmartPartialDialogReducer, getSmartDialogsReducer, getTheme, getUsersACs } from "../../redux/selectors";
import { AppStateType } from "../../redux/redux-store";
import * as queryString from 'querystring'

type ContainerPropsTypes = {
  getNewMessagesRequestThunk: () => void,
  setCurrentPageThunk: (pageSize: number, page: number) => void
  getCertainUserThunk: (pageSize: number, userSearchName: string, page: number) => void
  state: {
    colorTheme: string,
    myId: number,
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

function NavBarContainer(props: ContainerPropsTypes) {
  // console.log(props)

  let [themes, setThemes] = useState({ dynamicActiveClass: '', dynamicClass: 'stl.linkNight  ', blockMenu: '', counter: '', });
  useEffect(() => {
    switch (props.state.colorTheme) {
      case 'NIGHT': return setThemes({ ...themes, dynamicActiveClass: stl.activeLinkN, dynamicClass: stl.linkN, blockMenu: stl.blockMenuN, counter: stl.counterN, });
      case 'MORNING': return setThemes({ ...themes, dynamicActiveClass: stl.activeLinkM, dynamicClass: stl.linkM, blockMenu: stl.blockMenuM, counter: stl.counterM, });
      case 'DAY': return setThemes({ ...themes, dynamicActiveClass: stl.activeLinkD, dynamicClass: stl.linkD, blockMenu: stl.blockMenuD, counter: stl.counterD, });
      case 'EVENING': return setThemes({ ...themes, dynamicActiveClass: stl.activeLinkE, dynamicClass: stl.linkE, blockMenu: stl.blockMenuE, counter: stl.counterE, });
    }
  }, [props.state.colorTheme]);

  let { newMessageBTNDisabled: btnIsDisabled, newMessagesCounter: newMSGSCounter, msgLoader, errGettingNewMSGSCount, onError: onErrorPic, envelope_GIF } = props.state.partDialogReducer;


  useEffect(() => { props.state.myId && props.getNewMessagesRequestThunk() }, []);

  return themes.dynamicActiveClass && <NavBar
    myId={props.state.myId}
    getNewMessages={props.getNewMessagesRequestThunk}
    setCurrentPage={props.setCurrentPageThunk}
    getCertainUser={props.getCertainUserThunk}
    themes={themes}

    btnIsDisabled={btnIsDisabled}
    newMSGSCounter={newMSGSCounter}
    msgLoader={msgLoader}
    errGettingNewMSGSCount={errGettingNewMSGSCount}
    onErrorPic={onErrorPic}
    envelope_GIF={envelope_GIF}
  />
}

type PropsTypes = {
  btnIsDisabled: boolean,
  errGettingNewMSGSCount: boolean,
  getNewMessages: () => void,
  setCurrentPage: (pageSize: number, page: number) => void,
  getCertainUser: (pageSize: number, userSearchName: string, page: number) => void,
  msgLoader: string,
  myId: number,
  newMSGSCounter: number,
  onErrorPic: string,
  envelope_GIF: string,
  themes: {
    blockMenu: string,
    counter: string,
    dynamicActiveClass: string,
    dynamicClass: string,
  }
}

// function NavBar(props:PropsTypes) {
let NavBar: React.FC<PropsTypes> = (props) => {
  console.log(props)

  // let [isHiddenBTN, setIsHiddenBTN] = useState(stl.hidden);
  let isHiddenBTN = stl.hidden;
  let [element, setElement] = useState<any>(null);

  useEffect(() => { BTNRenderSelector() }, [props.btnIsDisabled, props.errGettingNewMSGSCount]);

  const BTNRenderSelector = () => {
    if (props.btnIsDisabled) {
      // setIsHiddenBTN(stl.hidden);
      isHiddenBTN = stl.hidden;
      setElement(<img src={props.envelope_GIF} alt="err" />); // лодер конверта
      return element
    }
    else if (props.errGettingNewMSGSCount) {
      // setIsHiddenBTN(stl.showed)
      isHiddenBTN = stl.showed;
      setElement(<img className={stl.errorImg} src={props.onErrorPic} alt='err' />); // пиктограмма ошибки
      return element
    }
    else {
      setElement(<span className={props.themes.dynamicClass}> +1? </span>)
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
      props.getCertainUser(50, parsedString['term'], 1)
      history.push({ pathname: 'users', search: `?page=1&term=${parsedString['term']}` })
    } else {
      props.setCurrentPage(50, 1)
      history.push({ pathname: 'users', search: `?page=1` })
    }
  }

  // console.log(props)

  return <>
    <div className={`${stl.blockMenu}  ${props.themes.blockMenu}`}>
      <ul className={stl.menu}>
        {!props.myId && <li><NavLink to={`/login`} className={props.themes.dynamicClass} activeClassName={props.themes.dynamicActiveClass}
        >Get Login</NavLink></li>}
        {props.myId && <li><NavLink to={`/profile`} className={props.themes.dynamicClass} activeClassName={props.themes.dynamicActiveClass}
        > Profile </NavLink></li>}
        {props.myId && <li><NavLink to={'/friends'} className={props.themes.dynamicClass} activeClassName={props.themes.dynamicActiveClass}
        > Friends </NavLink></li>}

        {props.myId && <li className={stl.dialogsSpan}>
          <button disabled={props.btnIsDisabled} onClick={props.getNewMessages} className={isHiddenBTN}>
            {element}
            {/* { props.btnIsDisabled && !props.errGettingNewMSGSCount ?  <img src={props.msgLoader} alt="err"/>  :
                            <span className={themes.dynamicClass}> '+1?'</span>}*/}
          </button>
          <NavLink to={'/dialogs'}
            className={props.themes.dynamicClass}
            activeClassName={props.themes.dynamicActiveClass}>
            Dialogs </NavLink>
          <p className={`${props.themes.counter}`} hidden={!props.newMSGSCounter}>({props.newMSGSCounter})</p>
        </li>}
        {props.myId && <li><NavLink to={'/chat'}
          className={props.themes.dynamicClass}
          activeClassName={props.themes.dynamicActiveClass}> Chat </NavLink></li>}
        {/* {props.myId && <li><NavLink to={'/users'} */}
        {props.myId && <li><NavLink to={history.location.pathname !== `/users` ? '/users' : history.location.pathname + history.location.search}
          // {props.myId && <li><NavLink to={history.location.pathname + history.location.search}
          className={props.themes.dynamicClass}
          activeClassName={props.themes.dynamicActiveClass}
          onClick={(e) => history.location.pathname === `/users` ? finalUsersLink() : null}
        > Users </NavLink></li>}
        <li><NavLink to='/news'
          className={props.themes.dynamicClass}
          activeClassName={props.themes.dynamicActiveClass}> News </NavLink></li>
        <li><NavLink to='/music'
          className={props.themes.dynamicClass}
          activeClassName={props.themes.dynamicActiveClass}> Music </NavLink></li>
        <li><NavLink to='/settings'
          className={props.themes.dynamicClass}
          activeClassName={props.themes.dynamicActiveClass}> Settings </NavLink></li>
      </ul>
    </div>
  </>
}

const mapStateToProps = (state: AppStateType) => {
  // console.log(state);
  return {
    myId: getMyId(state),
    colorTheme: getTheme(state),
    dialogACs: getDialogACs(state),
    usersACs: getUsersACs(state),
    partDialogReducer: getSmartPartialDialogReducer(state),
    // partDialogReducer:     getSmartDialogsReducer(state), 
  }
};

const mergeProps = (stateProps: any, dispatchProps: any) => {                                                   // ANY !!!!!!!!!!!!!!!!!!!
  const state = stateProps;
  // console.log(stateProps);

  const { dispatch } = dispatchProps;
  // console.log(state)

  const getNewMessagesRequestThunk = () => dispatch(state.dialogACs.getNewMessagesRequestThunkAC());
  const setCurrentPageThunk = (pageSize: number, page: number) => dispatch(state.usersACs.setCurrentPageThunkAC(pageSize, page))
  const getCertainUserThunk = (pageSize: number, userSearchName: string, page: number) => dispatch(state.usersACs.getCertainUserThunkAC(pageSize, userSearchName, page))

  return { state, getNewMessagesRequestThunk, setCurrentPageThunk, getCertainUserThunk }
};

// @ts-ignore
const navBarConnector = connect(mapStateToProps, null, mergeProps)(NavBarContainer) as React.ComponentType         // упорно ts выплёвывает ошибку непонятного генеза
export default navBarConnector;
