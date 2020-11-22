import React, {useState, useEffect}  from 'react';
import { connect }                   from 'react-redux';
import stl                           from './App.module.css';
import HeaderConnector               from './header/header';
import NavBarConnector               from './navBar/navBar';
import { ContentComposer }           from './content/contentComp';
import StoreContext                  from './storeContext';
import {geSmartInitialized, getBackGroundReducer, getAppACs, getBackGroundSetterACs, getInitialized, getSmartBackGroundReducer}
                                     from "../redux/selectors";

const mapStateToProps1 = (state) =>{
    // console.log(1)
    return {
        backgroundReducer:   getSmartBackGroundReducer  (state),
        backGroundSetterACs: getBackGroundSetterACs     (state),
    }
};
const mergeProps1 = (stateProps, dispatchProps) => {
    // console.log(2)
    const state                = stateProps;
    const {dispatch}           = dispatchProps;
    // console.log(state)
    const timeSetter = (timer) => dispatch (state.backGroundSetterACs.timerAC(timer) );

    return { state, timeSetter }
};
export const AppConnector = connect (mapStateToProps1, null, mergeProps1)(AppTimeDeterminationContainer);

function AppTimeDeterminationContainer(props) {
    // console.log(props)
    let timer=new Date().getHours()*60+new Date().getMinutes();
    useEffect(()=>{props.timeSetter(timer)},[]);                                // ф-я отправляет количество минут с начала суток в редюсер
    useEffect(()=>{document.body.style.backgroundImage=`url(${props.state.backgroundReducer.backgroundPic})`
    },[props.state.backgroundReducer.backgroundPic]);

    // return timeKeeper && <AppContainer timeKeeper={timeKeeper} themeUpdater={themeUpdater} state={props.state} getInitializeAppThunk={props.getInitializeAppThunk}/>
    return props.state.backgroundReducer.timeToChangeTheme && props.state.backgroundReducer.backgroundPic!=='' && <AppContainerConnector/>
};

const mapStateToProps2 = (state) => {
    return {
        backGroundSetterACs:   getBackGroundSetterACs     (state),
        backgroundReducer:     getSmartBackGroundReducer  (state),
        appAC:                 getAppACs                  (state),
        appInitialized:        getInitialized             (state),
    }
};
const mergeProps2 = (stateProps, dispatchProps) => {
    const state              = stateProps;
    const {dispatch}         = dispatchProps;
    const timeSetter              = (timer) => dispatch ( state.backGroundSetterACs.timerAC(timer) ); // timeSetter определяет количество минут с начала суток
    const getInitializeAppThunk   = () =>      dispatch ( state.appAC.initializeAppThunkAC () );

    return {state,timeSetter,getInitializeAppThunk }
};
const AppContainerConnector = connect(mapStateToProps2,null,mergeProps2)(AppContainer)

function AppContainer(props) {
    // console.log(props.state.backgroundReducer)
    let timeKeeper = props.state.backgroundReducer.timeToChangeTheme*60000;                              // преобразование минут в милисекунды

    let themeUpdater=()=>{let timer=new Date().getHours()*60+new Date().getMinutes();props.timeSetter(timer)};        // ф-я отправляет количество минут с начала суток в редюсер
    useEffect  ( ()=> {props.getInitializeAppThunk();/*this.props.getLogInThunk()*/},[]);
    setInterval(()=>{themeUpdater()}, timeKeeper);

    return <App appInitialized={props.state.appInitialized} auth_LDR_GIF={props.state.backgroundReducer.auth_LDR_GIF}/>
}

function App (props) {
    // console.log(props)
    return <>
        <StoreContext.Consumer>
            {() => {
                return !props.appInitialized ?
                    <div className={stl.loaderBlock}>
                        <img src={props.auth_LDR_GIF} alt="err"/>
                        <h1>Client: Synchronization...</h1>
                    </div>
                    :
                    <div className={stl.container}>
                        <div className = {stl.header}  > <HeaderConnector/> </div>
                        <div className = {stl.navBar}  > <NavBarConnector/> </div>
                        <div className = {stl.content1}> <ContentComposer/> </div>
                    </div>
            }}
        </StoreContext.Consumer>
    </>
}


// useEffect( ()=> {
//     let themeRebootTimer = props.state.backgroundReducer.timeToChangeTheme * 60 * 1000;
//     // setInterval(props.state.backgroundReducer, themeRebootTimer);
//     // console.log(themeRebootTimer)
// },[props.state.backgroundReducer.timeToChangeTheme]  );


// export default App;


// class App extends React.Component {
//     constructor(props) { super(props)
//         /*console.log(props.state.authData.funnyLoader)*/ }
//
//     componentDidMount() {
//         // this.props.getLogInThunk()
//         this.props.getInitializeAppThunk()
//
//     }
//
//     render() {
//
//         return <>
//             <StoreContext.Consumer>
//                 {() => {
//                     if (!this.props.state.authData.appInitialized) {
//                         return <div className={stl.loaderBlock}>
//                             <img src={this.props.state.initLoader} alt="err"/>
//                             <h1>Client: Synchronization...</h1>
//                         </div>
//                     }
//                     return (
//                         <div className={stl.container}>
//                             <div className={stl.header}>
//                                 <HeaderConnector/>
//                             </div>
//                             <div className= {stl.navBar}>
//                                 <NavBarConnector/>
//                             </div>
//                             <div className={stl.content1}>
//                                 <ContentComposer/>
//                             </div>
//                         </div>
//                     )
//                 }}
//             </StoreContext.Consumer>
//         </>
//     }
// }