import {usersApi} from "./app";
import {timerAC} from './backGroundSetter'
import {SetLogOutUserDataAC_Type} from "./headerReducer";

const INITIALISED_SUCCESSFULLY =  'INITIALISED_SUCCESSFULLY';
const SET_USER_DATA            =  'SET_USER_DATA';
const AUTH_ERR_CATCHER         =  'AUTH_ERR_CATCHER';
const SET_LOGOUT_USER_DATA     =  'SET_LOGOUT_USER_DATA';
const GET_CAPTCHA              =  'GET_CAPTCHA';
const ERR_GET_CAPTCHA          =  'ERR_GET_CAPTCHA';

type InitialisedSuccessAC_Type = {type: typeof INITIALISED_SUCCESSFULLY }                                              // typeof в TS здесь берет ЗНАЧЕНИЕ константы INITIALISED_SUCCESSFULLY
type SetUserDataAC_Type        = {type: typeof SET_USER_DATA, data:{id:number, email:string, login:string}}
type AuthErrCatcherAC_Type     = {type: typeof AUTH_ERR_CATCHER, authErr:string }
type CaptchaSetterAC_Type      = {type: typeof GET_CAPTCHA, captcha:string}
type ErrGetCaptchaAC_Type      = {type: typeof ERR_GET_CAPTCHA, error:string}


const initialisedSuccessAC     = (): InitialisedSuccessAC_Type                            =>({type: INITIALISED_SUCCESSFULLY  });
const setUserDataAC            = (id:number,email:string,login:string):SetUserDataAC_Type =>({type: SET_USER_DATA, data: {id, email, login}});
const authErrCatcherAC         = (authErr:string):AuthErrCatcherAC_Type                   =>({type: AUTH_ERR_CATCHER, authErr });
const captchaSetterAC          = (captcha:string):CaptchaSetterAC_Type                    =>({type: GET_CAPTCHA, captcha      }) 
const errGetCaptchaAC          = (error:string):ErrGetCaptchaAC_Type                      =>({type: ERR_GET_CAPTCHA, error    })                                              



type ActionTypes = InitialisedSuccessAC_Type | SetUserDataAC_Type | AuthErrCatcherAC_Type | SetLogOutUserDataAC_Type | 
CaptchaSetterAC_Type | ErrGetCaptchaAC_Type ;


const getLogInThunkAC      = () =>                             async (dispatch:any) => {
    let response = await usersApi.getLogIn();
    let {id, email, login} = response.data.data;
    response.status===200 ?
        dispatch(setUserDataAC(id, email, login)) :
        dispatch(authErrCatcherAC(response.message))
};
const setMeLoginThunkAC    = (email:string,password:string,rememberMe:boolean, captchaCode:string) => async (dispatch:any) => {
    let response = await usersApi.setMeLogin(email, password, rememberMe,captchaCode)
    console.log(response);    
    response.data.resultCode===0  ? dispatch(getLogInThunkAC()):
    response.data.resultCode===10 ? dispatch(getCaptchaThunkAC())&& dispatch(errGetCaptchaAC(response.data.messages[0])):
    dispatch(authErrCatcherAC(response.message))  
};
const getCaptchaThunkAC    = () =>                             async (dispatch:any) => {
   let response = await usersApi.getCaptcha();
   console.log(response);
   response.status===200 ? dispatch(captchaSetterAC(response.data.url)):dispatch(errGetCaptchaAC(response))
}
const initializeAppThunkAC = (timer:number) =>                 async (dispatch:any) => {
    dispatch(timerAC(timer))
    dispatch(getLogInThunkAC())
    .then( () => { dispatch(initialisedSuccessAC());})
};

export type App_ACs_Type = {
    getLogInThunkAC:      ()=> void
    setMeLoginThunkAC:    (email:string,password:string,rememberMe:boolean, captchaCode:string)=>void
    getCaptchaThunkAC:    ()=> void
    initializeAppThunkAC: (timer:number) => void
}
const actionCreators:App_ACs_Type = {getLogInThunkAC,setMeLoginThunkAC,getCaptchaThunkAC,initializeAppThunkAC};
export const appAC = (state=actionCreators) => state;


const initialState = {
    appIsInitialized: false as boolean,
    id:               null  as null | number,
    email:            ''    as null | string,
    login:            ''    as null | string,
    isAuth:           false as boolean,
    authErr:          ''    as string,      // вынести в редюсер с логинизацией
    captchaPic:       ''    as string,
    errCaptchaGet:    ''    as string,
    // funnyLoader:      ['tectonic configuration...', 'filling the oceans...',
    //                   'planting flora...', 'fauna breeding...',
    //                   'crusades...', 'witch-hunting...',
    //                   'transition into the renaissance era...',
    //                   'scientific and technological revolution...',
    //                   'Client: Synchronization...',] as string[],
};

export type InitialStateType = typeof initialState;

export const appAuthReducer = (state = initialState, action:ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALISED_SUCCESSFULLY: return {...state, appIsInitialized: true      };
        case SET_USER_DATA:            return {...state, ...action.data, isAuth: true};
        case SET_LOGOUT_USER_DATA:     return {...state, ...action.data              };
        case AUTH_ERR_CATCHER:         return {...state, authErr: action.authErr     };
        case GET_CAPTCHA:              return {...state, captchaPic:action.captcha   };
        case ERR_GET_CAPTCHA:          return {...state, errCaptchaGet: action.error };
        default:                       return state;
    }
};







// import {usersApi} from "./app";
// import {timerAC} from './backGroundSetter'
//
// const SET_USER_DATA            =  'SET_USER_DATA';
// const SET_LOGOUT_USER_DATA     =  'SET_LOGOUT_USER_DATA';
// const AUTH_ERR_CATCHER         =  'AUTH_ERR_CATCHER';
// const INITIALISED_SUCCESSFULLY =  'INITIALISED_SUCCESSFULLY';
//
// const initialisedSuccessAC     = ()                  =>  ({ type: INITIALISED_SUCCESSFULLY});
// const setUserDataAC            = (id, email, login)  =>  ({ type: SET_USER_DATA, data: {id, email, login}});
// const authErrCatcherAC         = (authErr)           =>  ({ type: AUTH_ERR_CATCHER, authErr });
//
// const getLogInThunkAC          = () =>                             async (dispatch) => {
//     let response = await usersApi.getLogIn();
//     let {id, email, login} = response.data.data
//     response.status===200 ?
//         dispatch(setUserDataAC(id, email, login)) :
//         dispatch(authErrCatcherAC(response.message))
// };
// const setMeLoginThunkAC        = (email, password, rememberMe ) => async (dispatch) => {
//     let response = await usersApi.setMeLogin(email, password, rememberMe)
//     response.status===200 ? dispatch(getLogInThunkAC()):dispatch(authErrCatcherAC(response.message))
// };
// const initializeAppThunkAC     = () =>                             async (dispatch) => {
//     dispatch(timerAC())
//     dispatch(getLogInThunkAC())
//         .then( () => { dispatch(initialisedSuccessAC());})
// };
//
// const initialState = {
//     appIsInitialized: false,
//     id:               null,
//     email:            null,
//     login:            null,
//     isAuth:           false,
//     authErr:          '',      // вынести в редюсер с логинизацией
//     funnyLoader:      ['tectonic configuration...', 'filling the oceans...',
//         'planting flora...', 'fauna breeding...',
//         'crusades...', 'witch-hunting...',
//         'transition into the renaissance era...',
//         'scientific and technological revolution...',
//         'Client: Synchronization...',]
// };
// export const appAuthReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case INITIALISED_SUCCESSFULLY: return {...state, appIsInitialized: true};
//         case SET_USER_DATA:            return {...state, ...action.data, isAuth: true};
//         case SET_LOGOUT_USER_DATA:     return {...state, ...action.data };
//         case AUTH_ERR_CATCHER:         return {...state, authErr : action.authErr };
//         default:                       return state;
//     }
// };
// const actionCreators = { getLogInThunkAC, setMeLoginThunkAC, initializeAppThunkAC };
// export const appAC = (state=actionCreators) => state;
