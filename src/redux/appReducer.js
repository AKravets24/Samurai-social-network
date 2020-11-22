import {usersApi} from "./app";
import {timerAC} from './backGroundSetter'

const SET_USER_DATA             =  'SET_USER_DATA';
const SET_LOGOUT_USER_DATA      =  'SET_LOGOUT_USER_DATA';
const AUTH_ERR_CATCHER          =  'AUTH_ERR_CATCHER';
const INITIALISED_SUCCESSFULLY  =  'INITIALISED_SUCCESSFULLY';

const initialisedSuccessAC      = ()                 =>  ({ type: INITIALISED_SUCCESSFULLY});
const setUserDataAC             = (id, email, login) =>  ({ type: SET_USER_DATA, data: {id, email, login}});
const authErrCatcherAC          = (authErr)          =>  ({ type: AUTH_ERR_CATCHER, authErr });
const getLogInThunkAC           = () => (dispatch)   =>  usersApi.getLogIn().then(response => {
    // if (data.resultCode === 0) { let {id, email, login} = data.data; dispatch(setUserDataAC(id, email, login))}
    if(response.data&&response.data.resultCode===0) {
        let {id, email, login} = response.data.data;
        dispatch(setUserDataAC(id, email, login))}
    else {
        dispatch(authErrCatcherAC(response.message));
    }
});
const setMeLoginThunkAC         = (email, password, rememberMe ) => (dispatch) => {
    usersApi.setMeLogin(email, password, rememberMe)
        .then(response => {
            response.data&&response.data.resultCode===0?dispatch(getLogInThunkAC()):dispatch(authErrCatcherAC(response.message))
        })
};

const initializeAppThunkAC      = () => (dispatch)   => {
    dispatch(timerAC())
    dispatch(getLogInThunkAC())
    .then( () => {
        dispatch(initialisedSuccessAC());
    })
};

const initialState = {
    appIsInitialized: false,
    id:               null,
    email:            null,
    login:            null,
    isAuth:           false,
    authErr:          '',      // вынести в редюсер с логинизацией
    funnyLoader:      ['tectonic configuration...', 'filling the oceans...',
                      'planting flora...', 'fauna breeding...',
                      'crusades...', 'witch-hunting...',
                      'transition into the renaissance era...',
                      'scientific and technological revolution...',
                      'Client: Synchronization...',]
};
export const appAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALISED_SUCCESSFULLY:
            // console.log('INITIALISED_SUCCESSFULLY')
            return {...state, appIsInitialized: true};

        case SET_USER_DATA:
            // console.log('SET_USER_DATA')
            return {...state, ...action.data, isAuth: true};
        // return 0;

        case SET_LOGOUT_USER_DATA:
            // console.log('SET_LOGOUT_USER_DATA')
            return {...state, ...action.data };

        case AUTH_ERR_CATCHER:
            // console.log(AUTH_ERR_CATCHER)
            console.log(action.authErr)
            return {...state, authErr : action.authErr };

        default:               return state;
    }
};
const actionCreators = { getLogInThunkAC, setMeLoginThunkAC, initializeAppThunkAC };
export const appAC = (state=actionCreators) => state;