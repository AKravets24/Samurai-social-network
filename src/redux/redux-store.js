import { createStore, combineReducers, applyMiddleware }  from "redux";
import thunkMiddleWare                                    from 'redux-thunk';
import { profileReducer, profileACs, profilePics}         from "./profileReducer";
import { dialogsReducer, dialogACs}                       from "./dialogsReducer";
import { usersReducer, usersACs}                          from "./usersReducer";
import { backgroundReducer, backGroundSetterACs}          from "./backGroundSetter";
import { headerAC }                                       from "./headerReducer";
import { friendsReducer, friendsACs }                     from './friendsReducer';
import { appAC, appAuthReducer }                          from "./appReducer";


let reducers = combineReducers({
    profileReducer,    profilePics,             profileACs,
    dialogsReducer,    dialogACs,
    usersReducer,      usersACs,
    friendsReducer,    friendsACs,
    backgroundReducer, backGroundSetterACs,
    headerAC,
    appAC,  appAuthReducer,
});

export let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;
// console.log(store.getState());

//createStore создает вокруг себя state, в котором лежат наши редьюсеры
