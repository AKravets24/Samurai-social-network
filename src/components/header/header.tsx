// import React, {useState, useEffect}                         from "react";
// import stl                                                  from './header.module.css'
// import logo                                                 from './img/logo.jpg'
// import logout                                               from './img/logout.png'
// import {NavLink,}                                           from 'react-router-dom';
// import {connect}                                            from 'react-redux';
// import {getColorTheme, getHeaderAC, getSmartAppAuthReducer} from "../../redux/selectors";

// function Header(props) {  /*console.log(props)*/
//     const logOutListener = () => { props.setMeLogOutThunk() };

//     return <div className={`${stl.header} ${props.themes.headerDynamic}`}>
//                <div className={stl.buffer}/>
//                <div className={stl.logotype}>
//                    <img src={logo} alt="#err"/>
//                    <h1 className={props.themes.logotypeH1} >Rocket Network</h1>
//                </div>
//                <div className={stl.login}>
//                    {props.isAuth ?
//                        <div className={stl.loginTrue}>
//                            <h4 className={props.themes.loginH4}> {props.logIn} (It's you) </h4>
//                            <img src={logout} alt="err" onClick={logOutListener} />
//                        </div>
//                        :
//                        <NavLink to={'login'}> <h3 className={props.themes.loginHref}>Login</h3> </NavLink>
//                    }
//                </div>
//            </div>
// }

// function HeaderContainer (props) {  /*console.log(props)*/

//     let [themes, setThemes] = useState(null)
//     useEffect(()=> {
//         switch (props.state.colorTheme) {
//          case 'NIGHT'  :return setThemes({...themes,headerDynamic:stl.headerN,logotypeH1:stl.logoTypeH1N,loginH4:stl.loginH4N,loginHref:stl.loginHrefN});
//          case 'MORNING':return setThemes({...themes,headerDynamic:stl.headerM,logotypeH1:stl.logoTypeH1M,loginH4:stl.loginH4M,loginHref:stl.loginHrefM});
//          case 'DAY'    :return setThemes({...themes,headerDynamic:stl.headerD,logotypeH1:stl.logoTypeH1D,loginH4:stl.loginH4D,loginHref:stl.loginHrefD});
//          case 'EVENING':return setThemes({...themes,headerDynamic:stl.headerE,logotypeH1:stl.logoTypeH1E,loginH4:stl.loginH4E,loginHref:stl.loginHrefE});
//         }
//     },[props.state.colorTheme]);

//     return  themes &&
//         <Header
//             setMeLogOutThunk={props.setMeLogOutThunk}
//             isAuth={props.state.authData.isAuth}
//             logIn={props.state.authData.login}
//             themes={themes}
//             // authData         = { props.state.authData   } // надо посмотреть как реакция компоненты на динамическую смену темы
//             // colorTheme       = { props.state.colorTheme } // надо посмотреть как реакция компоненты на динамическую смену темы
//         />
// }

// const mapStateToProps = (state) => {  // console.log(getSmartAppAuthReducer(state));
//     return {
//         authData:   getSmartAppAuthReducer(state),
//         colorTheme: getColorTheme(state),
//         headerAC:   getHeaderAC(state),
//     }
// };

// const mergeProps = (stateProps, dispatchProps) => {
//     const state = stateProps;
//     const {dispatch} = dispatchProps;
//     const setMeLogOutThunk = () => dispatch( state.headerAC.setMeLogOutThunkAC ()  );
//     return { state, setMeLogOutThunk }
// };

// const HeaderConnector = connect(mapStateToProps, null, mergeProps)(HeaderContainer)
// export default HeaderConnector;


import React, {useState,
     useEffect}              from "react";
import stl                   from './header.module.css';
import cn                    from 'classnames/bind';
import logo                  from './img/logo.jpg';
import logout                from './img/logout.png';
import {NavLink}             from 'react-router-dom';
import {connect}             from 'react-redux';
import {getColorTheme, 
    getHeaderAC, 
    getSmartAppAuthReducer}  from "../../redux/selectors";
import {AppStateType}        from '../../redux/redux-store';
import { appStateType }      from "../../redux/appReducer";
import { HeaderAC_type }     from "../../redux/headerReducer";


type PropsTypes = {isAuth:boolean,logIn:string,setMeLogOutThunk: ()=>void ,themes:{headerDynamic:string,logotypeH1:string,loginH4:string,loginHref:string}}

// let Header: React.FC<PropsTypes> =(props:PropsTypes) => {  

    let Header: React.FC<PropsTypes> =({isAuth,logIn,setMeLogOutThunk,themes}) => {  
    // console.log(props)
    const logOutListener = () => { setMeLogOutThunk() };


    return <div className={cn(stl.header,themes.headerDynamic)}>
               <div className={cn(stl.buffer)}/>
               <div className={cn(stl.logotype)}>
                   <img src={logo} alt="#err"/>
                   <h1 className={cn(themes.logotypeH1)} >Rocket Network</h1>
               </div>
               <div className={cn(stl.login)}>
                   {isAuth ?
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



type StateType = {authData: {appIsInitialized: boolean, id:number, isAuth: boolean, login: string}, colorTheme:string}
type ContainerPropsType = {setMeLogOutThunk:any, state:StateType}

function HeaderContainer (props:ContainerPropsType) {  
    // console.log(props)

    let [themes, setThemes] = useState({headerDynamic:'',logotypeH1:'',loginH4:'',loginHref:''})
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

type MSTP_Type = {
    authData:   appStateType
    colorTheme: string
    headerAC:   HeaderAC_type
}

const mapStateToProps = (state:AppStateType):MSTP_Type => {  // console.log(getSmartAppAuthReducer(state));
    // console.log(state);
    
    return {
        authData:   getSmartAppAuthReducer (state),
        colorTheme: getColorTheme          (state),
        headerAC:   getHeaderAC            (state),
    }
};

type MRGProps_Type = {state: MSTP_Type, setMeLogOutThunk:()=> void}
type DispatchProps_Type = {dispatch: (action:any)=> void}

const mergeProps = (stateProps:MSTP_Type, dispatchProps:DispatchProps_Type):MRGProps_Type => {                                                   //ANY!!!!!!!!!!!!!!!!!!!!
    const state = stateProps;
    const {dispatch} = dispatchProps;
    const setMeLogOutThunk = () => dispatch( state.headerAC.setMeLogOutThunkAC ()  );
    return { state, setMeLogOutThunk }
};
//@ts-ignore
const HeaderConnector = connect<MSTP_Type, {}, MRGProps_Type, AppStateType>(mapStateToProps, null, mergeProps) (HeaderContainer) as React.ComponentType
export default HeaderConnector;

