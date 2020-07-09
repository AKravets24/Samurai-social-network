import {usersApi} from "./app";

const SET_USER_DATA = 'SET_USER_DATA';
const setUserDataAC  = (id, email, login) => ({type: SET_USER_DATA, data: {id, email, login}});
const getLogInThunkAC = () => (dispatch) =>
        usersApi.getLogIn()
        .then(data => {
            if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setUserDataAC(id, email, login))
            }
        });

const initialState = {
        id: null,
        email: null,
        login: null,
        isAuth: false,};
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:    return {...state, ...action.data, isAuth: true};
        default:               return state;
    }
};
const actionCreators = { getLogInThunkAC, };
export const headerAC = (state=actionCreators) => state;