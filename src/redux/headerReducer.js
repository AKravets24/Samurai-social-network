import {usersApi} from "./app";

const SET_LOGOUT_USER_DATA = 'SET_LOGOUT_USER_DATA';

const setLogOutUserDataAC = () => ({type: SET_LOGOUT_USER_DATA, data: {id:null, email:null, login:null, isAuth: false}})

const setMeLogOutThunkAC = () => async (dispatch) => {
    let data = await usersApi.setMeLogOut()
            data.resultCode === 0 ? dispatch(setLogOutUserDataAC()) : console.log(data)
};

const actionCreators = { setMeLogOutThunkAC };
export const headerAC = (state= actionCreators) => state;