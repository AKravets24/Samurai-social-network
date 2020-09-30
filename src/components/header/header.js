import React, {useState, useEffect} from "react";
import stl                          from './header.module.css'
import logo                         from './img/logo.jpg'
import logout                       from './img/logout.png'
import {NavLink, Route, Redirect}   from 'react-router-dom';
import {connect}                    from 'react-redux';

function Header(props) {
    // console.log(props)
    const logOutListener = () => { props.setMeLogOutThunk() };

    let [themes, setThemes] = useState({})
    useEffect(()=> {
        if     (props.colorTheme==='NIGHT'  ){ setThemes({...themes, headerDynamic: stl.headerNight,
            logotypeH1:stl.logoTypeH1Night,loginH4:stl.loginH4Night, loginHref: stl.loginHrefNight})}
        else if(props.colorTheme==='MORNING'){ setThemes({...themes, headerDynamic: stl.headerMorning,
            logotypeH1:stl.logoTypeH1Morning,loginH4:stl.loginH4Morning, loginHref: stl.loginHrefMorning})}
        else if(props.colorTheme==='DAY'    ){ setThemes({...themes, headerDynamic: stl.headerDay,
            logotypeH1:stl.logoTypeH1Day,loginH4:stl.loginH4Day, loginHref: stl.loginHrefDay})}
        else if(props.colorTheme==='EVENING'){ setThemes({...themes, headerDynamic: stl.headerEvening,
            logotypeH1:stl.logoTypeH1Evening,loginH4:stl.loginH4Evening,loginHref:stl.loginHrefEvening})}
    },[props.colorTheme])

    return <>
        <div
            className={`${stl.header} ${themes.headerDynamic}`}>
            <div className={stl.buffer}/>
            <div className={stl.logotype}>
                <img src={logo} alt="#err"/>
                <h1 className={themes.logotypeH1}
                >Rocket Network</h1>
            </div>
            <div className={stl.login}>
                {props.authData.isAuth ?
                    <div className={stl.loginTrue}>
                        <h4 className={themes.loginH4}>
                            {props.authData.login} (It's you) </h4>
                            <img src={logout} alt="err" onClick={logOutListener} />
                    </div>
                    :
                    <NavLink to={'login'}><h3
                        className={themes.loginHref}>Login</h3></NavLink>
                }
            </div>
        </div>
    </>
}

function HeaderContainer (props) {
    // console.log(props)
    return <Header
        setMeLogOutThunk = { props.setMeLogOutThunk}
        authData         = { props.state.authData}
        colorTheme       = { props.state.colorTheme}
    />
}

const mapStateToProps = (state) => {
    // console.log(state.backgroundReducer);
    return {
        authData:           state.appAuthReducer,
        headerAC:           state.headerAC,
        colorTheme:         state.backgroundReducer.theme,
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const state = stateProps;
    const {dispatch} = dispatchProps;
    // console.log( state );

    const setMeLogOutThunk = () => dispatch( state.headerAC.setMeLogOutThunkAC ()  );

    return { state, setMeLogOutThunk }
};

const HeaderConnector = connect(mapStateToProps, null, mergeProps)(HeaderContainer)
export default HeaderConnector;
