import React, {useState, useEffect}  from 'react';
import { connect }                   from 'react-redux';
import stl                           from './App.module.css';
import HeaderConnector               from './header/header';
import NavBarConnector               from './navBar/navBar';
import ContentComposer               from './content/contentComp';
import StoreContext                  from './storeContext';

function App (props) {
    // console.log(props)
    return <>
        <StoreContext.Consumer>
            {() => {
                return !props.appInitialized ?
                    <div className={stl.loaderBlock}>
                        <img src={props.initLoader} alt="err"/>
                        <h1>Client: Synchronization...</h1>
                    </div>
                    :
                    <div className={stl.container}>
                        <div className = {stl.header}> <HeaderConnector/> </div>
                        <div className = {stl.navBar}> <NavBarConnector/> </div>
                        <div className={stl.content1}> <ContentComposer/> </div>
                    </div>
            }}
        </StoreContext.Consumer>
    </>
}

function AppTimeDeterminationContainer(props) {
    // console.log(props)
    let [timeKeeper, setTimeKeeper] = useState(0);
    let themeUpdater=()=>{let timer=new Date().getHours()*60+new Date().getMinutes();props.timeSetter(timer)};

    useEffect(()=>{themeUpdater()},[]);
    useEffect(()=>{setTimeKeeper(timeKeeper=props.state.backgroundReducer.timeToChangeTheme*60000)
    },[props.state.backgroundReducer.timeToChangeTheme]);
    useEffect(()=>{document.body.style.backgroundImage=`url(${props.state.backgroundReducer.backgroundPic})`
    },[props.state.backgroundReducer.backgroundPic]);

    return timeKeeper &&
        <AppContainer timeKeeper={timeKeeper} themeUpdater={themeUpdater} state={props.state} getInitializeAppThunk={props.getInitializeAppThunk}
        />

}

function AppContainer(props) {
    // console.log(props.timeKeeper)
    useEffect(()=>{props.getInitializeAppThunk();/*this.props.getLogInThunk()*/},[]);
    setInterval(()=>{props.themeUpdater()}, props.timeKeeper); // РАБОТАЕТ(?) НЕОПТИМАЛЬНО
    return <App appInitialized={props.state.appInitialized} initLoader={props.state.backgroundReducer.userLoaderTheme}/>

}

const mapStateToProps = (state) =>{
    // console.log(state.appAuthReducer.appInitialized)
        return {
        appInitialized:      state.appAuthReducer.appInitialized,
        appAC:               state.appAC,
        backgroundReducer:   state.backgroundReducer, //бывший  backGroundSetter
        backGroundSetterACs: state.backGroundSetterACs,
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const state                   = stateProps;
    const {dispatch}              = dispatchProps;
    // console.log(state)

    const getLogInThunk           = () => dispatch ( state.appAC.getLogInThunkAC      () );
    const getInitializeAppThunk   = () => dispatch ( state.appAC.initializeAppThunkAC () );
    const timeSetter    = (timer) => dispatch ( state.backGroundSetterACs.timerAC(timer) );

    return { state, getLogInThunk, getInitializeAppThunk, timeSetter }
};
export default connect (mapStateToProps, null, mergeProps) (AppTimeDeterminationContainer)



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