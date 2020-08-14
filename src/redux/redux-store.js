import { createStore, combineReducers, applyMiddleware } from "redux";
import { profileReducer, profileACs, profilePics} from "./profileReducer";
import { dialogsReducer, dialogActionsCreators} from "./dialogsReducer";
import { usersReducer, usersActionCreators} from "./usersReducer";
import { backGroundSetter} from "./backGroundSetter";
import { headerAC } from "./headerReducer";
import { friendsReducer, friendsACs} from './friendsReducer';
import { contentCompReducer, contentCompACs} from './contentCompReducer';
import thunkMiddleWare  from 'redux-thunk';
import {appAC, appAuthReducer} from "./appReducer";


let reducers = combineReducers({
    profileReducer,    profilePics,             profileACs,
    dialogsReducer,    dialogActionsCreators,
    usersReducer,      usersActionCreators,
    friendsReducer,    friendsACs,
    backGroundSetter,
    headerAC,
    appAC,  appAuthReducer,
    // contentCompReducer, contentCompACs  // вроде они нафиг не нужны
});

export let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;
// console.log(store.getState());

//createStore создает вокруг себя state, в котором лежат наши редьюсеры
