import React, {useState, useEffect}                         from "react";
import stl                                                  from './header.module.css'
import logo                                                 from './img/logo.jpg'
import logout                                               from './img/logout.png'
import {NavLink,}                                           from 'react-router-dom';
import {connect}                                            from 'react-redux';
import {getColorTheme, getHeaderAC, getSmartAppAuthReducer} from "../../redux/selectors";

function Header(props) {  /*console.log(props)*/
    const logOutListener = () => { props.setMeLogOutThunk() };

    return <div className={`${stl.header} ${props.themes.headerDynamic}`}>
               <div className={stl.buffer}/>
               <div className={stl.logotype}>
                   <img src={logo} alt="#err"/>
                   <h1 className={props.themes.logotypeH1} >Rocket Network</h1>
               </div>
               <div className={stl.login}>
                   {props.isAuth ?
                       <div className={stl.loginTrue}>
                           <h4 className={props.themes.loginH4}> {props.logIn} (It's you) </h4>
                           <img src={logout} alt="err" onClick={logOutListener} />
                       </div>
                       :
                       <NavLink to={'login'}> <h3 className={props.themes.loginHref}>Login</h3> </NavLink>
                   }
               </div>
           </div>
}

function HeaderContainer (props) {  /*console.log(props)*/

    let [themes, setThemes] = useState(null)
    useEffect(()=> {
        switch (props.state.colorTheme) {
         case 'NIGHT'  :return setThemes({...themes,headerDynamic:stl.headerN,logotypeH1:stl.logoTypeH1N,loginH4:stl.loginH4N,loginHref:stl.loginHrefN});
         case 'MORNING':return setThemes({...themes,headerDynamic:stl.headerM,logotypeH1:stl.logoTypeH1M,loginH4:stl.loginH4M,loginHref:stl.loginHrefM});
         case 'DAY'    :return setThemes({...themes,headerDynamic:stl.headerD,logotypeH1:stl.logoTypeH1D,loginH4:stl.loginH4D,loginHref:stl.loginHrefD});
         case 'EVENING':return setThemes({...themes,headerDynamic:stl.headerE,logotypeH1:stl.logoTypeH1E,loginH4:stl.loginH4E,loginHref:stl.loginHrefE});
        }
    },[props.state.colorTheme]);

    return  themes &&
        <Header
            setMeLogOutThunk={props.setMeLogOutThunk}
            isAuth={props.state.authData.isAuth}
            logIn={props.state.authData.login}
            themes={themes}
            // authData         = { props.state.authData   } // надо посмотреть как реакция компоненты на динамическую смену темы
            // colorTheme       = { props.state.colorTheme } // надо посмотреть как реакция компоненты на динамическую смену темы
        />
}

const mapStateToProps = (state) => {  // console.log(getSmartAppAuthReducer(state));
    return {
        authData:   getSmartAppAuthReducer(state),
        colorTheme: getColorTheme(state),
        headerAC:   getHeaderAC(state),
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const state = stateProps;
    const {dispatch} = dispatchProps;
    const setMeLogOutThunk = () => dispatch( state.headerAC.setMeLogOutThunkAC ()  );
    return { state, setMeLogOutThunk }
};

const HeaderConnector = connect(mapStateToProps, null, mergeProps)(HeaderContainer)
export default HeaderConnector;
