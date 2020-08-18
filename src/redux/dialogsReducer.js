import { usersApi }                  from './app'
import maleProfilePic                from './img/defaultUserAvas/male.jpg'

const SEND_MESSAGE_TO_USER        =  "SEND-MESSAGE-TO-USER";
const SET_MY_COMPANIONS_LIST      =  'SET_MY_COMPANIONS_LIST';
const SET_TALK_WITH_USER          =  'SET_TALK_WITH_USER';
const CREATE_AND_SET_NEW_DIALOG   =  'CREATE_AND_SET_NEW_DIALOG';

const setMyCompanions               = (data) =>                           ({type: SET_MY_COMPANIONS_LIST, data});
const getMyNegotiatorsListThunkAC   = () =>                 (dispatch) => {
    usersApi.getMyNegotiatorsList()
        .then(data=>
            dispatch(setMyCompanions(data)))
};
const setTalkWithUser               = (data)=>                             ({type: SET_TALK_WITH_USER, data});
const getTalkWithUserThunkAC        = (userId) =>           (dispatch) => {
    usersApi.getTalkWithUser(userId) .then(data=> dispatch(setTalkWithUser(data)) )
};
const sendMsgAC                     = (data) =>                     ({type: SEND_MESSAGE_TO_USER, data: data.data.message})
const sendMessageToUserThunkAC      = (userId, body) =>     (dispatch) => {
    usersApi.sendMsgToTalker(userId,body)
        .then(data => dispatch(sendMsgAC(data)))
        .catch(error => console.log(error))
};
const createNewDialogAC             = (userId, fullName, photos) => ({type: CREATE_AND_SET_NEW_DIALOG, userId, fullName, photos});
const talkedBeforeThunkAC           = (userId) =>          (dispatch) => {
    usersApi.getMyNegotiatorsList()
        .then(data => {
            if  (data.find(el=> (el.id === +userId))) {
                return  usersApi.getTalkWithUser(userId).then(data=> dispatch(setTalkWithUser(data)) )
            } else {
                return usersApi.getProfile(userId) .then(data => {
                    let { fullName, photos} = data; dispatch( createNewDialogAC(+userId, fullName, photos))
                    })
            }}
        )
};
const dialogActions = {getMyNegotiatorsListThunkAC, getTalkWithUserThunkAC, sendMessageToUserThunkAC, createNewDialogAC,
    talkedBeforeThunkAC};

export const dialogACs = (state = dialogActions)=> { return state };

let initialDialogsState = {
    dialogsList:    [{photos: {small: null, large: null}}],
    certainDialog:  {items: []},
    defaultAvatar:  maleProfilePic,
};

export const dialogsReducer = ( state = initialDialogsState, action, date, time ) => {
    let stateCopy = {...state};
    switch (action.type) {

        case SEND_MESSAGE_TO_USER:
            console.log('SEND_MESSAGE_TO_USER')
            stateCopy.certainDialog.items.push(action.data)
            return stateCopy;

        case SET_MY_COMPANIONS_LIST:
            // console.log('SET_MY_COMPANIONS_LIST')
            console.log(action.data)
            return {...state, dialogsList: action.data}

        case SET_TALK_WITH_USER:
            console.log(`SET_TALK_WITH_USER `)
            console.log(action.data)
            return {...state, certainDialog: action.data}

        case CREATE_AND_SET_NEW_DIALOG:
            console.log('CREATE_NEW_DIALOG')
            let newDialogListItem = {
                hasNewMessages: false,
                id: action.userId,
                lastDialogActivityDate: null,
                lastUserActivityDate: null,
                newMessagesCount: 0,
                photos: { small: action.photos.small, large: action.photos.large },
                userName: action.fullName,
            };
            stateCopy.dialogsList.unshift(newDialogListItem);
            // stateCopy = {...state, certainDialog: {items: [] }}
            return stateCopy;

        default:
            return stateCopy;
    }
};

// dialogs1: [
//     {"id": 1, "name": "Anya"},
//     {"id": 2, "name": "Igor"},
//     {"id": 3, "name": "Vasya"},
//     {"id": 4, "name": "Kirill"},
//     {"id": 5, "name": "Seryoga"},
//     {"id": 6, "name": "Vanya"},
//     {"id": 7, "name": "Stas"},
// ],

//messages: [
//         [
//             {"id": 1, "date": "28.04.20", "time": "12:01", "message": 'Hello my dear!!'},
//             {"id": 2, "date": "28.04.20", "time": "12:03", "message": 'How are u doing honey?'},
//             {"id": 3, "date": "28.04.20", "time": "12:05", "message": 'I Miss you soo much..'},
//             {"id": 4, "date": "28.04.20", "time": "12:09", "message": 'Let`s see each other?!'},
//             {"id": 5, "date": "28.04.20", "time": "12:10", "message": 'Hope you fine!'},
//             {"id": 6, "date": "28.04.20", "time": "12:12", "message": 'Many kisses to you =))'},
//         ],
//
//         [
//             {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hi man!'},
//             {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'How r u?'},
//             {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'Making eat now)'},
//         ],
//
//         [
//             {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hello dude!'},
//             {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'Nice weather'},
//             {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'Let`s go ride some bicycles'},
//             {"id": 4, "date": "28.04.20", "time": "12:10", "message": 'Me at Moose island!'},
//         ],
//
//         [
//             {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hi Temich!'},
//             {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'Do you heared new song of Northern fleet?'},
//         ],
//
//         [
//             {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'heyho!!'},
//             {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'Let`s go at that bunker tomorrow?'},
//             {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'after dinner?'},
//         ],
//
//         [
//             {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hey'},
//             {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'I quit my work yesterday'},
//         ],
//
//         [
//             {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hello'},
//             {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'We are riding at those abandon village tomorrow!'},
//             {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'Do you want with us?'},
//             {"id": 4, "date": "28.04.20", "time": "12:10", "message": 'It should be interesting!'},
//         ],
//
//     ],