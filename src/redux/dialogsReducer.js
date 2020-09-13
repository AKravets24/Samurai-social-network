import { usersApi }                 from './app'
import maleProfilePic               from './img/defaultUserAvas/male.jpg'
import certainDialogLoader          from './loader/dialogs/loader_green_spinner.gif'
import allDialogsLoader             from './loader/dialogs/spinner_yellow.gif'
import envelope                     from './loader/dialogs/envelope.gif'
import meetLines                    from './loader/dialogs/lGreenMeetLines.gif'

const SEND_MESSAGE_TO_USER          = "SEND-MESSAGE-TO-USER";
const SET_MY_COMPANIONS_LIST        = 'SET_MY_COMPANIONS_LIST';
const SET_TALK_WITH_USER            = 'SET_TALK_WITH_USER';
const CREATE_AND_SET_NEW_DIALOG     = 'CREATE_AND_SET_NEW_DIALOG';
const TOGGLE_IS_LOADING             = 'TOGGLE_IS_LOADING';
const CLEAR_CERTAIN_USER_DIALOG     = 'CLEAR_CERTAIN_USER_DIALOG';
const SET_SELECTED_MESSAGES         = 'SET_SELECTED_MESSAGES';
const SET_SPAM_MESSAGE              = 'SET_SPAM_MESSAGE';
const DELETE_MESSAGE                = 'DELETE_MESSAGE';
const GET_NEW_MESSAGES_UPDATE       = 'GET_NEW_MESSAGES_UPDATE';
const BTN_STATE_TOGGLER             = 'BTN_STATE_TOGGLER';
const ADDED_PREVIOUS_MSGS           = 'ADDED_PREVIOUS_MSGS';
const PREV_MSGS_LOADING_TOGGLER     = 'PREV_MSGS_LOADING_TOGGLER';

const setMyCompanions               = (data) =>                      ({type: SET_MY_COMPANIONS_LIST, data});
const getMyNegotiatorsListThunkAC   = () =>                          (dispatch) => {
    usersApi.getMyNegotiatorsList()
        .then(data=>
            dispatch(setMyCompanions(data)))
};
const setTalkWithUser               = (data)=>                       ({type: SET_TALK_WITH_USER, data});
const toggleIsLoadingAC             = (allDialogIsLoading) =>        ({type: TOGGLE_IS_LOADING, allDialogIsLoading});
const setEmptyCertainUserDialog     = () =>                          ({type: CLEAR_CERTAIN_USER_DIALOG})
const getTalkWithUserThunkAC        = (userId) =>                    (dispatch) => {
    dispatch(setEmptyCertainUserDialog())
    dispatch(toggleIsLoadingAC(true))
    usersApi.getTalkWithUser(userId) .then(data=> {
        dispatch(setTalkWithUser(data))
        dispatch(toggleIsLoadingAC(false))
    })

};
const addPrevMSGS                   = (prevMsgs) =>                  ({ type: ADDED_PREVIOUS_MSGS, prevMsgs });
const prevMsgsloadingTogglerAC      = (prevMsgsIsLoading)  =>        ({type: PREV_MSGS_LOADING_TOGGLER, prevMsgsIsLoading});

const addPrevMessagesThunkAC        = (userId,msgCount,pageNumber) =>(dispatch) => {
    dispatch(prevMsgsloadingTogglerAC(true));
    usersApi.getTalkWithUser(userId,  msgCount, pageNumber )
        .then(data =>  {
            dispatch(addPrevMSGS(data))
            dispatch(prevMsgsloadingTogglerAC(false));
        })
};

const sendMsgAC                     = (data) =>                      ({type: SEND_MESSAGE_TO_USER, data: data.data.message})
const sendMessageToUserThunkAC      = (userId, body) =>              (dispatch) => {
    usersApi.sendMsgToTalker(userId,body)
        .then(data => dispatch(sendMsgAC(data)))
        .catch(error => console.log(error))
};
const createNewDialogAC             = (userId, fullName, photos) =>  ({type: CREATE_AND_SET_NEW_DIALOG, userId, fullName, photos});
const talkedBeforeThunkAC           = (userId) =>                    (dispatch) => {
    usersApi.getMyNegotiatorsList()
        .then(data => {
            if  (data.find(el=> (el.id === +userId))) {
                dispatch(toggleIsLoadingAC(true));
                return  usersApi.getTalkWithUser(userId).then(data=> {
                    dispatch(setTalkWithUser(data))
                    dispatch(toggleIsLoadingAC(false));
                })

            } else {
                dispatch(toggleIsLoadingAC(true))
                return usersApi.getProfile(userId) .then(data => {
                    let { fullName, photos} = data; dispatch( createNewDialogAC(+userId, fullName, photos))
                    dispatch(toggleIsLoadingAC(false))
                    })
            }}
        )
};
const setSelectedMessagesAC         = (messageId) =>                 ({type: SET_SELECTED_MESSAGES, messageId});
const deleteMessageAC               = (messageId, index) =>          ({type: DELETE_MESSAGE, messageId, index});
const deleteMessageThunkAC          = (messageId) =>                 (dispatch) => {
   usersApi.deleteMessage(messageId)
       .then(data => {
           console.log(data)
           dispatch (deleteMessageAC(messageId))
           }
       )
};
const setAsSpamMessage              = (messageId, index) =>          ({type: SET_SPAM_MESSAGE, messageId, index});
const setSpamMessagesThunkAC        = (messageId) =>                 (dispatch) => {
    usersApi.setAsSpamMessage(messageId)
        .then(data => {
            // console.log(data)
            dispatch(setAsSpamMessage(messageId))
        })
};
const getNewMessagesUpdate          = (messagesCount) =>             ({type: GET_NEW_MESSAGES_UPDATE, messagesCount});
const getNewMSGSBTNToggler          = (isDisabled) =>                ({type: BTN_STATE_TOGGLER, isDisabled});

const getNewMessagesRequestThunkAC  = () =>                          (dispatch) => {
    dispatch(getNewMSGSBTNToggler(true))
    usersApi.getNewMessages()
        .then(data => {
            // console.log(data)
            dispatch(getNewMessagesUpdate(data))
            dispatch(getNewMSGSBTNToggler(false));
        })
}


const dialogActions = {getMyNegotiatorsListThunkAC, getTalkWithUserThunkAC, sendMessageToUserThunkAC, createNewDialogAC,
    talkedBeforeThunkAC, setSelectedMessagesAC, setSpamMessagesThunkAC, deleteMessageThunkAC, getNewMessagesRequestThunkAC,
    addPrevMessagesThunkAC};

export const dialogACs = (state = dialogActions)=> { return state };

let initialDialogsState = {
    dialogsList:           [],
    certainDialog:         {},
    allDialogsIsLoading:   false,
    defaultAvatar:         maleProfilePic,
    certainDialogLoader,
    allDialogsLoader,
    newMessagesCounter:    0,
    newMessageBTNDisabled: false,
    msgLoader:             envelope,
    prevMsgsIsLoading:     false,
    prevMsgsLoader:        meetLines,
};

export const dialogsReducer = ( state = initialDialogsState, action, date, time ) => {
    let stateCopy = {...state};
    switch (action.type) {

        case GET_NEW_MESSAGES_UPDATE:
            // console.log('GET_NEW_MESSAGES_UPDATE')
            return {...state, newMessagesCounter: action.messagesCount}

        case BTN_STATE_TOGGLER:
            // console.log('BTN_STATE_TOGGLER')
            return {...state, newMessageBTNDisabled: action.isDisabled}

        case SEND_MESSAGE_TO_USER:      stateCopy.certainDialog.items.push(action.data); return stateCopy;
        case SET_MY_COMPANIONS_LIST:    return {...state, dialogsList: action.data}
        case CLEAR_CERTAIN_USER_DIALOG: delete stateCopy.certainDialog['items']; return stateCopy;
        case SET_TALK_WITH_USER:        return {...state, certainDialog: action.data}
        case TOGGLE_IS_LOADING:         return {...state, dialogIsLoading: action.dialogIsLoading}
        case CREATE_AND_SET_NEW_DIALOG:
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
            stateCopy = {...state, certainDialog: {items: []}}
            return stateCopy;

        case SET_SELECTED_MESSAGES:
            let item = state.selectedMsgs.findIndex((el)=> (el === action.messageId));
            item ===-1 ? state.selectedMsgs.push(action.messageId) : state.selectedMsgs.splice(item, 1);
            return stateCopy;

        case DELETE_MESSAGE: state.certainDialog.items.splice(action.index, 1); return stateCopy;

        case ADDED_PREVIOUS_MSGS:
            // debugger
            // console.log('ADDED_PREVIOUS_MSGS')
            let reverseItems = action.prevMsgs.items.reverse();
            reverseItems.forEach(el=>  state.certainDialog.items.unshift(el))
            // state.certainDialog.items.unshift(action.prevMsgs.items)
            return  stateCopy;

        case PREV_MSGS_LOADING_TOGGLER :
            // console.log('PREV_MSGS_LOADING_TOGGLER')
            return {...state, prevMsgsIsLoading: action.prevMsgsIsLoading}


        default:
            return stateCopy;
    }
};
