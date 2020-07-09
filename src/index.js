import React from 'react';
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import {store} from "./redux/redux-store";
import './index.css';
import {Provider} from 'react-redux';
// import {Provider} from './components/storeContext';

// console.log(Provider)

let reRender = (store) => {
    // console.log(store.getState())

    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store} >
                    <App/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>, document.getElementById('root')
    )
};

reRender(store);
