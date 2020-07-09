import React from 'react';
import stl from './App.css';
import HeaderConnector from './header/header';
import NavBarConnector from './navBar/navBar';
import Content from "./content/contentComp";
import StoreContext from "./storeContext";
// import {store} from "../redux/redux-store";

function App() {
    return<>
    <StoreContext.Consumer>
        {
            () => {
                return (
                    <div className='container'>
                        <div className="header">
                            <HeaderConnector/>
                        </div>
                        <div className="navBar">
                            <NavBarConnector/>
                        </div>
                        <div className="content">
                            <Content/>
                        </div>
                    </div>
                )
            }
        }
        </StoreContext.Consumer>
    </>
}

export default App;
