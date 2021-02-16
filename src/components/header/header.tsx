import React, { useState, useEffect, } from "react";
import stl from './header.module.css';
import cn from 'classnames/bind';
import logo from './img/logo.jpg';
import logout from './img/logout.png';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getColorTheme, getHeaderAC, getSmartAppAuthReducer } from "../../redux/selectors";

type HeaderActions_Type = { setMeLogOutThunk: () => void }

export let HeaderContainer = () => {

  let authData = useSelector(getSmartAppAuthReducer);
  let colorTheme = useSelector(getColorTheme);
  let headerAC = useSelector(getHeaderAC);


  let headerState = { logIn: authData.login }

  let dispatch = useDispatch();
  let setMeLogOutThunk = () => dispatch(headerAC.setMeLogOutThunkAC());
  let headerActions: HeaderActions_Type = { setMeLogOutThunk }

  let [themes, setThemes] = useState({ headerDynamic: '', logotypeH1: '', loginH4: '', loginHref: '' })
  useEffect(() => {
    switch (colorTheme) {
      case 'NIGHT': return setThemes({ ...themes, headerDynamic: stl.headerN, logotypeH1: stl.logoTypeH1N, loginH4: stl.loginH4N, loginHref: stl.loginHrefN });
      case 'MORNING': return setThemes({ ...themes, headerDynamic: stl.headerM, logotypeH1: stl.logoTypeH1M, loginH4: stl.loginH4M, loginHref: stl.loginHrefM });
      case 'DAY': return setThemes({ ...themes, headerDynamic: stl.headerD, logotypeH1: stl.logoTypeH1D, loginH4: stl.loginH4D, loginHref: stl.loginHrefD });
      case 'EVENING': return setThemes({ ...themes, headerDynamic: stl.headerE, logotypeH1: stl.logoTypeH1E, loginH4: stl.loginH4E, loginHref: stl.loginHrefE });
    }
  }, [colorTheme]);

  return themes &&
    <Header actions={headerActions} state={headerState} themes={themes} />
}

type PropsTypes = { state: { logIn: string | null }, actions: { setMeLogOutThunk: () => void }, themes: { headerDynamic: string, logotypeH1: string, loginH4: string, loginHref: string } }

let Header: React.FC<PropsTypes> = ({ state: { logIn }, actions, themes }) => {
  const logOutListener = () => { actions.setMeLogOutThunk() };

  return <div className={cn(stl.header, themes.headerDynamic)}>
    <div className={cn(stl.buffer)} />
    <div className={cn(stl.logotype)}>
      <img src={logo} alt="#err" />
      <h1 className={cn(themes.logotypeH1)} >Rocket Network</h1>
    </div>
    <div className={cn(stl.login)}>
      {logIn ?
        <div className={cn(stl.loginTrue)}>
          <h4 className={cn(themes.loginH4)}> {logIn} (It's you) </h4>
          <img src={logout} alt="err" onClick={logOutListener} />
        </div>
        :
        <NavLink to={'login'}> <h3 className={cn(themes.loginHref)}>Login</h3> </NavLink>
      }
    </div>
  </div>
}


