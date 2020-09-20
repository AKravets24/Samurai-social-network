import React, {useEffect} from "react";
import stl from './header.module.css'
import logo from './img/logo.jpg'
import {NavLink, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

function Header(props) {
    // console.log(props)
    const logOutListener = () => {
        props.setMeLogOutThunk()
    };

    return <>
        <div
            style={props.state.headerThemes.header}
            className={stl.header}>

            <div className={stl.boofer}/>

            <div className={stl.logotype}>
                <img src={logo} alt="#err"/>
                <h1
                    style={props.state.headerThemes.logotypeH1}
                >Rocket Network</h1>
            </div>
            <div className={stl.login}>
                {props.state.authData.isAuth ?
                    <div className={stl.loginTrue}>
                        <h4
                            style={props.state.headerThemes.loginH4}
                        >
                            {props.state.authData.login} (It's you) </h4>
                        <button className={stl.logOutBTN}
                            onClick={() => logOutListener()}
                        >X</button>
                    </div>
                    :
                    <NavLink to={'login'}><h3
                        style={props.state.headerThemes.loginHref}
                        className={stl.loginHref}>Login</h3></NavLink>
                }
            </div>
        </div>
    </>
}

function HeaderContainer(props) {
        return <>
            <Header {...props}/>
        </>
}

const mapStateToProps = (state) => {
    // console.log(state.backgroundReducer);
    return {
        authData: state.appAuthReducer,
        headerAC: state.headerAC,
        backgroundReducer: state.backgroundReducer,
        headerThemes: state.backgroundReducer.themesPack.header,
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const state = stateProps;
    const {dispatch} = dispatchProps;
    // console.log( state );

    const setMeLogOutThunk = () => dispatch( state.headerAC.setMeLogOutThunkAC ()  );

    return {
        state, setMeLogOutThunk
    }
};

const HeaderConnector = connect(mapStateToProps, null, mergeProps)(HeaderContainer)
export default HeaderConnector;
