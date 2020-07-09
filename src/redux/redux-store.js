import {createStore, combineReducers, applyMiddleware } from "redux";
import {profileReducer, profileACs, profilePics} from "./profileReducer";
import {dialogsReducer, dialogActionsCreators} from "./dialogsReducer";
import {usersReducer, usersActionCreators} from "./usersReducer";
import {backGroundSetter} from "./backGroundSetter";
import {authReducer, headerAC} from "./headerReducer";
import thunkMiddleWare  from 'redux-thunk';


let reducers = combineReducers({
    profileReducer, dialogsReducer, usersReducer, authReducer,
    profilePics, backGroundSetter,
    profileACs, dialogActionsCreators, usersActionCreators, headerAC,
});

export let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;
// console.log(store.getState());

//createStore создает вокруг себя state, в котором лежат наши редьюсеры
