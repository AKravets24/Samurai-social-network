import React            from 'react';
import { connect }      from 'react-redux';
import stl              from './App.module.css';
import HeaderConnector  from './header/header';
import NavBarConnector  from './navBar/navBar';
import ContentComposer  from './content/contentComp';
import StoreContext     from './storeContext';

class App extends React.Component {

    componentDidMount() {
        // this.props.getLogInThunk()
        this.props.getInitializeAppThunk()
    }

    render() {
        return <>
            <StoreContext.Consumer>
                {
                    () => {
                        if (!this.props.state.authData.appInitialized) {
                            return 'NOT INITIALISED'
                        }
                            return (
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
                            )
                    }
                }
            </StoreContext.Consumer>
        </>
    }
}

const mapStateToProps = (state) =>{
    // console.log(state)

    return {
        authData: state.appAuthReducer,
        appAC: state.appAC,
        backGroundSetter: state.backGroundSetter,
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const state = stateProps;
    const {dispatch} = dispatchProps;
    const getLogInThunk = () => dispatch ( state.appAC.getLogInThunkAC    () );
    const getInitializeAppThunk   = () => dispatch ( state.appAC.initializeAppThunkAC () );

    return { state, getLogInThunk, getInitializeAppThunk }
};
export default connect (mapStateToProps, null, mergeProps) (App)


// export default App;
