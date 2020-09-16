import React, {useEffect} from 'react';
import { connect }        from 'react-redux';
import stl                from './App.module.css';
import HeaderConnector    from './header/header';
import NavBarConnector    from './navBar/navBar';
import ContentComposer    from './content/contentComp';
import StoreContext       from './storeContext';

function App (props) {
    // console.log(props.state.backGroundSetter.funcSetTheme)
    // useEffect( ()=> {props.getInitializeAppThunk();/*this.props.getLogInThunk()*/},[] )
    // useEffect( ()=> {
    //     let themeRebootTimer = props.state.backGroundSetter.timeToChangeTheme * 60 * 1000;
    //     setInterval(props.state.backGroundSetter.funcSetTheme , themeRebootTimer);
    //     // console.log(themeRebootTimer)
    // }, [] );

    return <>
        <StoreContext.Consumer>
            {() => {
                return !props.state.authData.appInitialized ?
                    <div className={stl.loaderBlock}>
                        <img src={props.state.initLoader} alt="err"/>
                        <h1>Client: Synchronization...</h1>
                    </div>
                    :
                    <div className={stl.container}>
                        <div className={stl.header}>
                            <HeaderConnector/>
                        </div>
                        <div className= {stl.navBar}>
                            <NavBarConnector/>
                        </div>
                        <div className={stl.content1}>
                            <ContentComposer/>
                        </div>
                    </div>
            }}
        </StoreContext.Consumer>
    </>
}

function AppContainer(props) {

    // console.log(props.state.backGroundSetter.backgroundThemeSelector)
    props.state.backGroundSetter.backgroundThemeSelector()
     // props.state.backGroundSetter

    useEffect( ()=> {props.getInitializeAppThunk();/*this.props.getLogInThunk()*/},[] )
    useEffect( ()=> {
        let themeRebootTimer = props.state.backGroundSetter.timeToChangeTheme * 60 * 1000;
        setInterval(props.state.backGroundSetter.funcSetTheme , themeRebootTimer);
        // console.log(themeRebootTimer)
    }, [] );
    return <App {...props} />
}

const mapStateToProps = (state) =>{
    // console.log(state.profileReducer.loader)

    return {
        authData:          state.appAuthReducer,
        appAC:             state.appAC,
        backGroundSetter:  state.backGroundSetter,
        initLoader:        state.profileReducer.loader
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const state = stateProps;
    const {dispatch} = dispatchProps;
    const getLogInThunk           = () => dispatch ( state.appAC.getLogInThunkAC      () );
    const getInitializeAppThunk   = () => dispatch ( state.appAC.initializeAppThunkAC () );

    return { state, getLogInThunk, getInitializeAppThunk }
};
export default connect (mapStateToProps, null, mergeProps) (AppContainer)


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