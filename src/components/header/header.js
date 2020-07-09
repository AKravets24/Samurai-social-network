import React, {useEffect} from "react";
import stl from './header.module.css'
import logo from './img/logo.jpg'
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

function Header(props) {
    // console.log(props.state)
    return <>
        <div
            style={props.state.headerThemes.header}
             className={stl.header}>
            <div className={stl.boofer}></div>

            <div className={stl.logotype}>
                <img src={logo} alt="#err"/>
                <h1
                    style={props.state.headerThemes.logotypeH1}
                >Rocket Network</h1>
            </div>

            <div className={stl.login}>
                {props.state.authData.isAuth ?
                    <h4
                        style={props.state.headerThemes.loginH4}>
                        {props.state.authData.login} (It's you)</h4> :
                    <NavLink to={'login'}><h3 style={props.state.headerThemes.loginHref}
                        className={stl.loginHref}>Login</h3></NavLink>
                }
            </div>
        </div>
    </>
}

function HeaderContainer(props) {
    // console.log(props)
    useEffect( ()=> {
        props.getLogInThunk();
        let themeRebootTimer = props.state.backGroundSetter.timeToChangeTheme * 60 * 1000;
        setInterval(props.state.backGroundSetter.funcSetTheme , themeRebootTimer);
        // console.log(themeRebootTimer)
    }, [] );

    return <>
            <Header {...props} />
        </>
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        authData: state.authReducer,
        headerAC: state.headerAC,
        backGroundSetter: state.backGroundSetter,
        headerThemes: state.backGroundSetter.themes.header,
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const state = stateProps;
    const {dispatch} = dispatchProps;
    // console.log( state );

    const getLogInThunk = () => dispatch(state.headerAC.getLogInThunkAC());

    return {
        state, getLogInThunk,
    }
};

const HeaderConnector = connect(mapStateToProps, null, mergeProps)(HeaderContainer)
export default HeaderConnector;
