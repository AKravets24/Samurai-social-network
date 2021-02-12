import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import stl from './App.module.css';
import HeaderConnector from './header/header';
import NavBarConnector from './navBar/navBar';
import ContentComposer from './content/contentComp';
import StoreContext from './storeContext';
import {
    geSmartInitialized, getBackGroundReducer, getAppACs, getBackGroundSetterACs,
    getInitialized, getSmartBackGroundReducer, GetSmartBGR_type
}
    from "../redux/selectors";
import { AppStateType } from '../redux/redux-store';
import { BG_ACs_Type, TimerAC_Type } from '../redux/backGroundSetter';
import { App_ACs_Type } from '../redux/appReducer';

type ATDC_Type = {
    state: MSTP1_Type
    timeSetter: (timer: number) => TimerAC_Type
}

let AppTimeDeterminationContainer = ({ state, timeSetter }: ATDC_Type) => {
    // console.log(state)
    let timer = new Date().getHours() * 60 + new Date().getMinutes();
    useEffect(() => { timeSetter(timer) }, []);                                // ф-я отправляет количество минут с начала суток в редюсер
    useEffect(() => {
        document.body.style.backgroundImage = `url(${state.backgroundReducer.backgroundPic})`
    }, [state.backgroundReducer.backgroundPic]);

    // return timeKeeper && <AppContainer timeKeeper={timeKeeper} themeUpdater={themeUpdater} state={props.state} getInitializeAppThunk={props.getInitializeAppThunk}/>
    return state.backgroundReducer.timeToChangeTheme && state.backgroundReducer.backgroundPic !== '' && <AppContainerConnector />
};


type MSTP1_Type = {
    backgroundReducer: GetSmartBGR_type
    backGroundSetterACs: BG_ACs_Type
}

const mapStateToProps1 = (state: AppStateType): MSTP1_Type => {
    // console.log(state)
    return {
        backgroundReducer: getSmartBackGroundReducer(state),
        backGroundSetterACs: getBackGroundSetterACs(state),
    }
};

type DispatchProps_Type = { dispatch: (action: any) => TimerAC_Type }

const mergeProps1 = (stateProps: MSTP1_Type, dispatchProps: DispatchProps_Type) => {
    // console.log(2)
    const state = stateProps;
    const { dispatch } = dispatchProps;
    // console.log(state)
    const timeSetter = (timer: number): TimerAC_Type => dispatch(state.backGroundSetterACs.timerAC(timer));

    return { state, timeSetter }
};

//@ts-ignore
export const AppConnector = connect(mapStateToProps1, null, mergeProps1)(AppTimeDeterminationContainer);




type MSTP2_Type = {
    backGroundSetterACs: BG_ACs_Type
    backgroundReducer: GetSmartBGR_type
    appAC: App_ACs_Type
    appInitialized: boolean
}

const mapStateToProps2 = (state: AppStateType): MSTP2_Type => {
    // console.log(123);

    return {
        backGroundSetterACs: getBackGroundSetterACs(state),
        backgroundReducer: getSmartBackGroundReducer(state),
        appAC: getAppACs(state),
        appInitialized: getInitialized(state),
    }
};

type DispatchProps2_Type = { dispatch: (action: any) => void }

export type MRGProps_Type = {
    state: MSTP2_Type
    functions: {
        timeSetter: (timer: number) => TimerAC_Type
        getInitializeAppThunk: (timer: number) => void
    }
}

const mergeProps2 = (stateProps: MSTP2_Type, dispatchProps: DispatchProps2_Type) => {
    const state = stateProps;
    const { dispatch } = dispatchProps;

    const timeSetter = (timer: number) => dispatch(state.backGroundSetterACs.timerAC(timer)); // timeSetter определяет количество минут с начала суток
    const getInitializeAppThunk = (timer: number) => dispatch(state.appAC.initializeAppThunkAC(timer));

    const functions = { timeSetter, getInitializeAppThunk }

    return { state, functions }
};


type APPContainerProps_Type = {
    state: MSTP2_Type
    functions: MRGProps_Type['functions']

}

let AppContainer: React.FC<APPContainerProps_Type> = ({ state, functions }) => {
    console.log(state)
    let timeKeeper = state.backgroundReducer.timeToChangeTheme * 60000;                           // преобразование минут в милисекунды
    let timer = new Date().getHours() * 60 + new Date().getMinutes();

    let themeUpdater = () => { functions.timeSetter(timer) };                                         // ф-я отправляет количество минут с начала суток в редюсер
    useEffect(() => { functions.getInitializeAppThunk(timer);                                  /*this.props.getLogInThunk()*/ }, []);
    setInterval(() => { themeUpdater() }, timeKeeper);

    return <App appInitialized={state.appInitialized} auth_LDR_GIF={state.backgroundReducer.auth_LDR_GIF} />
}

//@ts-ignore
const AppContainerConnector = connect(mapStateToProps2, null, mergeProps2)(AppContainer)


function App(props: any) {
    console.log(props)
    return <>
        <StoreContext.Consumer>
            {() => {
                return !props.appInitialized ?
                    <div className={stl.loaderBlock}>
                        <img src={props.auth_LDR_GIF} alt="err" />
                        <h1>Client: Synchronization...</h1>
                    </div>
                    :
                    <div className={stl.container}>
                        <div className={stl.header}> <HeaderConnector /> </div>
                        <div className={stl.navBar}> <NavBarConnector /> </div>
                        <div className={stl.content1}> <ContentComposer /> </div>
                    </div>
            }}
        </StoreContext.Consumer>
    </>
}


// import React, {useState, useEffect}  from 'react';
// import { connect }                   from 'react-redux';
// import stl                           from './App.module.css';
// import HeaderConnector               from './header/header';
// import NavBarConnector               from './navBar/navBar';
// import ContentComposer               from './content/contentComp';
// import StoreContext                  from './storeContext';
// import {geSmartInitialized, getBackGroundReducer, getAppACs, getBackGroundSetterACs, getInitialized, getSmartBackGroundReducer}
//                                      from "../redux/selectors";

// const mapStateToProps1 = (state) =>{
//     // console.log(1)
//     return {
//         backgroundReducer:   getSmartBackGroundReducer  (state),
//         backGroundSetterACs: getBackGroundSetterACs     (state),
//     }
// };
// const mergeProps1 = (stateProps, dispatchProps) => {
//     // console.log(2)
//     const state                = stateProps;
//     const {dispatch}           = dispatchProps;
//     // console.log(state)
//     const timeSetter = (timer) => dispatch (state.backGroundSetterACs.timerAC(timer) );

//     return { state, timeSetter }
// };
// export const AppConnector = connect (mapStateToProps1, null, mergeProps1)(AppTimeDeterminationContainer);

// function AppTimeDeterminationContainer(props) {
//     // console.log(props)
//     let timer=new Date().getHours()*60+new Date().getMinutes();
//     useEffect(()=>{props.timeSetter(timer)},[]);                                // ф-я отправляет количество минут с начала суток в редюсер
//     useEffect(()=>{document.body.style.backgroundImage=`url(${props.state.backgroundReducer.backgroundPic})`
//     },[props.state.backgroundReducer.backgroundPic]);

//     // return timeKeeper && <AppContainer timeKeeper={timeKeeper} themeUpdater={themeUpdater} state={props.state} getInitializeAppThunk={props.getInitializeAppThunk}/>
//     return props.state.backgroundReducer.timeToChangeTheme && props.state.backgroundReducer.backgroundPic!=='' && <AppContainerConnector/>
// };

// const mapStateToProps2 = (state) => {
//     return {
//         backGroundSetterACs:   getBackGroundSetterACs     (state),
//         backgroundReducer:     getSmartBackGroundReducer  (state),
//         appAC:                 getAppACs                  (state),
//         appInitialized:        getInitialized             (state),
//     }
// };
// const mergeProps2 = (stateProps, dispatchProps) => {
//     const state              = stateProps;
//     const {dispatch}         = dispatchProps;
//     const timeSetter              = (timer) => dispatch ( state.backGroundSetterACs.timerAC(timer) ); // timeSetter определяет количество минут с начала суток
//     const getInitializeAppThunk   = () =>      dispatch ( state.appAC.initializeAppThunkAC () );

//     return {state,timeSetter,getInitializeAppThunk }
// };
// const AppContainerConnector = connect(mapStateToProps2,null,mergeProps2)(AppContainer)

// function AppContainer(props) {
//     // console.log(props.state.backgroundReducer)
//     let timeKeeper = props.state.backgroundReducer.timeToChangeTheme*60000;                              // преобразование минут в милисекунды

//     let themeUpdater=()=>{let timer=new Date().getHours()*60+new Date().getMinutes();props.timeSetter(timer)};        // ф-я отправляет количество минут с начала суток в редюсер
//     useEffect  ( ()=> {props.getInitializeAppThunk();/*this.props.getLogInThunk()*/},[]);
//     setInterval(()=>{themeUpdater()}, timeKeeper);

//     return <App appInitialized={props.state.appInitialized} auth_LDR_GIF={props.state.backgroundReducer.auth_LDR_GIF}/>
// }

// function App (props) {
//     // console.log(props)
//     return <>
//         <StoreContext.Consumer>
//             {() => {
//                 return !props.appInitialized ?
//                     <div className={stl.loaderBlock}>
//                         <img src={props.auth_LDR_GIF} alt="err"/>
//                         <h1>Client: Synchronization...</h1>
//                     </div>
//                     :
//                     <div className={stl.container}>
//                         <div className = {stl.header}  > <HeaderConnector/> </div>
//                         <div className = {stl.navBar}  > <NavBarConnector/> </div>
//                         <div className = {stl.content1}> <ContentComposer/> </div>
//                     </div>
//             }}
//         </StoreContext.Consumer>
//     </>
// }


