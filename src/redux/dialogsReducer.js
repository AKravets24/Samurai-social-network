const SEND_MESSAGE_TO_USER = "SEND-MESSAGE-TO-USER";

const sendMessageToUserAC = (text, date, time) => ({type: SEND_MESSAGE_TO_USER, text, date, time });

const dialogActions = {sendMessageToUserAC};

export const dialogACs = (state = dialogActions)=> { return state };

let initialDialogsState = {
    dialogs: [
        {"id": 1, "name": "Anya"},
        {"id": 2, "name": "Igor"},
        {"id": 3, "name": "Vasya"},
        {"id": 4, "name": "Kirill"},
        {"id": 5, "name": "Seryoga"},
        {"id": 6, "name": "Vanya"},
        {"id": 7, "name": "Stas"},
    ],
    messages: [
        [
            {"id": 1, "date": "28.04.20", "time": "12:01", "message": 'Hello my dear!!'},
            {"id": 2, "date": "28.04.20", "time": "12:03", "message": 'How are u doing honey?'},
            {"id": 3, "date": "28.04.20", "time": "12:05", "message": 'I Miss you soo much..'},
            {"id": 4, "date": "28.04.20", "time": "12:09", "message": 'Let`s see each other?!'},
            {"id": 5, "date": "28.04.20", "time": "12:10", "message": 'Hope you fine!'},
            {"id": 6, "date": "28.04.20", "time": "12:12", "message": 'Many kisses to you =))'},
        ],

        [
            {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hi man!'},
            {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'How r u?'},
            {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'Making eat now)'},
        ],

        [
            {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hello dude!'},
            {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'Nice weather'},
            {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'Let`s go ride some bicycles'},
            {"id": 4, "date": "28.04.20", "time": "12:10", "message": 'Me at Moose island!'},
        ],

        [
            {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hi Temich!'},
            {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'Do you heared new song of Northern fleet?'},
        ],

        [
            {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'heyho!!'},
            {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'Let`s go at that bunker tomorrow?'},
            {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'after dinner?'},
        ],

        [
            {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hey'},
            {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'I quit my work yesterday'},
        ],

        [
            {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hello'},
            {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'We are riding at those abandon village tomorrow!'},
            {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'Do you want with us?'},
            {"id": 4, "date": "28.04.20", "time": "12:10", "message": 'It should be interesting!'},
        ],

    ],
    messageField: '',
};

export const dialogsReducer = ( state = initialDialogsState, action, date, time ) => {
    let stateCopy = {...state};
    switch (action.type) {

        case SEND_MESSAGE_TO_USER:
            let finishedMessage = {
                id: state.messages[0].length + 1,
                date: action.date,
                time: action.time,
                message: action.text,
            };
            stateCopy.messages[0].push(finishedMessage);
            stateCopy.messageField = '';
            // console.log(state.messages[0])
            return stateCopy;
        default:
            return stateCopy;
    }
};
