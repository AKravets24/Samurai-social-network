import userLoader from './loader/users/24.gif';
import maleProfilePic from './img/defaultUserAvas/male.jpg';
import {usersApi} from "./app";

const GOT_FRIENDS_LIST = 'GET_FRIENDS';

const getMyFriendsAC = (returnedList) => ({type: GOT_FRIENDS_LIST, returnedList})

const getMyFriendsListThunkAC = () => (dispatch) => {
    usersApi.getMyFriends()
        .then(data => {
            // console.log(data);
            dispatch(getMyFriendsAC(data.items))
        })
}

const actionCreators = {
    getMyFriendsListThunkAC
}

export const friendsACs = (state = actionCreators) => {
    return state
}

const initialFriendsInfo = {
    fiendsList: [],
    defaultAvatar: maleProfilePic,
};

export const friendsReducer = (state = initialFriendsInfo, action) => {

    switch (action.type) {
        case GOT_FRIENDS_LIST:
            // console.log('GOT_FRIENDS_LIST');
            return {...state, fiendsList: action.returnedList};
        default:
            return {...state}

    }
};