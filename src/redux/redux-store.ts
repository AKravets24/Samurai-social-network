// import { createStore, combineReducers, applyMiddleware }  from "redux";
// import thunkMiddleWare                                    from 'redux-thunk';
// import { profileReducer, profileACs, profilePics}         from "./profileReducer";
// import { dialogsReducer, dialogACs}                       from "./dialogsReducer";
// import { usersReducer, usersACs}                          from "./usersReducer";
// import { backgroundReducer, backGroundSetterACs}          from "./backGroundSetter";
// import { headerAC }                                       from "./headerReducer";
// import { friendsReducer, friendsACs }                     from './friendsReducer';
// import { appAC, appAuthReducer }                          from "./appReducer";


// let reducers = combineReducers({
//     profileReducer,    profilePics,             profileACs,
//     dialogsReducer,    dialogACs,
//     usersReducer,      usersACs,
//     friendsReducer,    friendsACs,
//     backgroundReducer, backGroundSetterACs,
//     headerAC,
//     appAC,  appAuthReducer,
// });

// export let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

// window.store = store;
// // console.log(store.getState());

// //createStore создает вокруг себя state, в котором лежат наши редьюсеры


/* import { createStore, combineReducers, applyMiddleware }  from "redux";  // текущая версия
import thunkMiddleWare                                    from 'redux-thunk';
import { profileReducer, profileACs, profilePics}         from "./profileReducer";
import { dialogsReducer, dialogACs}                       from "./dialogsReducer";
import { usersReducer, usersACs}                          from "./usersReducer";
import { backgroundReducer, backGroundSetterACs}          from "./backGroundSetter";
import { headerAC }                                       from "./headerReducer";
import { friendsReducer, friendsACs }                     from './friendsReducer';
import { appAC, appAuthReducer }                          from "./appReducer";


let rootReducer = combineReducers({
    profileReducer,    profilePics,            profileACs,
    dialogsReducer,    dialogACs,
    usersReducer,      usersACs,
    friendsReducer,    friendsACs,
    backgroundReducer, backGroundSetterACs,
    headerAC,
    appAC,  appAuthReducer,
});

type RootReducersType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducersType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never  // infer - выводимый тип
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>        // дженерик тип 

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));



// @ts-ignore
window.store = store;
// console.log(store.getState());
//createStore создает вокруг себя state, в котором лежат наши редьюсеры */



import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleWare from 'redux-thunk';
import { profileReducer, profileACs, profilePics } from "./profileReducer";
import { dialogsReducer, dialogACs } from "./dialogsReducer";
import { usersReducer, usersACs } from "./usersReducer";
import { backgroundReducer, backGroundSetterACs } from "./backGroundSetter";
import { headerAC } from "./headerReducer";
import { friendsReducer, friendsACs } from './friendsReducer';
import { appAC, appAuthReducer } from "./appReducer";


let rootReducer = combineReducers({
  profileReducer, profilePics, profileACs,
  dialogsReducer, dialogACs,
  usersReducer, usersACs,
  friendsReducer, friendsACs,
  backgroundReducer, backGroundSetterACs,
  headerAC,
  appAC, appAuthReducer,
});

type RootReducersType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducersType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never  // infer - выводимый тип
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>       // дженерик тип 

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;                                       // это для того, чтобы подцепить Redux Dev Tools
export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleWare) // это для того, чтобы подцепить Redux Dev Tools
));

// export let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));



// @ts-ignore
window.store = store;
// console.log(store.getState());
//createStore создает вокруг себя state, в котором лежат наши редьюсеры