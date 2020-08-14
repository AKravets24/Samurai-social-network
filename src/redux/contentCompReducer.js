const SET_MY_ID = 'SET_MY_ID';

const setMyIdAC = (myId) => ({type: SET_MY_ID, myId});

const actionsCreators = {setMyIdAC}
export const contentCompACs = (state = actionsCreators) => {return state };

let initialProfileState = {
    myId: null
};

export const contentCompReducer = (state = initialProfileState, action) => {
    switch (action.type) {
        case SET_MY_ID:
            console.log('setmyid')
            return {...state, myId: action.myId}
        default:
            return state
    }
};