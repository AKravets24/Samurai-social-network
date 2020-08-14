import {usersApi} from "./app";

const SET_LOGOUT_USER_DATA = 'SET_LOGOUT_USER_DATA';

const setLogOutUserDataAC = () => ({type: SET_LOGOUT_USER_DATA, data: {id:null, email:null, login:null, isAuth: false}})

const setMeLogOutThunkAC = () => (dispatch) => {
    usersApi.setMeLogOut()
        .then(data => {
            if (data.resultCode === 0) {
                // console.log(data)
                dispatch(setLogOutUserDataAC())
            }
        })
};

const actionCreators = { setMeLogOutThunkAC };
export const headerAC = (state= actionCreators) => state;