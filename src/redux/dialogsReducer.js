import { usersApi }                from './app';
import maleProfilePic              from './img/dialogs/male.png';
import errorPic                    from './img/dialogs/error.png';
import certainDialogLoaderGIF      from './loader/dialogs/loader_green_spinner.gif';
import allDialogsLoadeGIF          from './loader/dialogs/spinner_yellow.gif';
import envelopeGIF                 from './loader/dialogs/envelope.gif';
import meetLinesGIF                from './loader/dialogs/lGreenMeetLines.gif';
import radioTowerPIC               from './img/dialogs/radioTower1.png';

const SEND_MESSAGE_TO_USER         = "SEND-MESSAGE-TO-USER";
const SET_MY_COMPANIONS_LIST       = 'SET_MY_COMPANIONS_LIST';
const SET_TALK_WITH_USER           = 'SET_TALK_WITH_USER';
const CREATE_AND_SET_NEW_DIALOG    = 'CREATE_AND_SET_NEW_DIALOG';
const SET_SELECTED_MESSAGES        = 'SET_SELECTED_MESSAGES';
const SET_SPAM_MESSAGE             = 'SET_SPAM_MESSAGE';
const DELETE_MESSAGE               = 'DELETE_MESSAGE';
const ADDED_PREVIOUS_MSGS          = 'ADDED_PREVIOUS_MSGS';
const PREV_MSGS_LOADING_TOGGLER    = 'PREV_MSGS_LOADING_TOGGLER';
const ON_SENDING_MSG_STATUS        = 'ON_SENDING_MSG_STATUS';
const FEEDBACK_WINDOW_CLOSER       = 'FEEDBACK_WINDOW_CLOSER';
const FEEDBACK_REF_PUSH            = 'FEEDBACK_REF_PUSH';
const NEW_MSG_ACTTION_COMBINER     = 'NEW_MSG_ACTTION_COMBINER';
const ERR_NEGOTIATORS_LIST_GET     = 'ERR_NEGOTIATORS_LIST_GET';
const ERR_CERTAIN_DIALOG_GET       = 'ERR_CERTAIN_DIALOG_GET';
const DIALOGS_ARE_LOADING_TOGGLER  = 'DIALOGS_ARE_LOADING_TOGGLER';

const setDialogsAreLoadingToggleAC = (allDialogs, certainDialog) => ({type: DIALOGS_ARE_LOADING_TOGGLER, allDialogs, certainDialog})
const setMyCompanions              = (data)  =>                     ({type: SET_MY_COMPANIONS_LIST, data});
const setErrMyNegotiatorsList      = (errorCode) =>                 ({type: ERR_NEGOTIATORS_LIST_GET, errorCode});
const setTalkWithUser              = (data)=>                       ({type: SET_TALK_WITH_USER, data});
const addPrevMSGS                  = (prevMsgs) =>                  ({type: ADDED_PREVIOUS_MSGS, prevMsgs });
const prevMsgsloadingTogglerAC     = (prevMsgsIsLoading)  =>        ({type: PREV_MSGS_LOADING_TOGGLER, prevMsgsIsLoading});
const sendMsgAC                    = (msg) =>                       ({type: SEND_MESSAGE_TO_USER,msg:msg.data.message});
const onSendingMSGEStatusAC        = (number,userId,actionKey,userName)=>
                                                                    ({type: ON_SENDING_MSG_STATUS,number,userId,actionKey,userName});
const feedBackWindowCloserAC       = (arrIndex) =>                  ({type:FEEDBACK_WINDOW_CLOSER, arrIndex})
const createNewDialogAC            = (userId, fullName, photos) =>  ({type: CREATE_AND_SET_NEW_DIALOG, userId, fullName, photos});
const setErrCertainDialogGetAC     = (error)                    =>  ({type: ERR_CERTAIN_DIALOG_GET, error});
const newMsgActonCombiner          = (newMessagesCount,BTNIsDisabled,hasErr) =>
                                                                    ({type:NEW_MSG_ACTTION_COMBINER,newMessagesCount,BTNIsDisabled,hasErr});
const feedbackRefPushAC            = (el)  =>                       ({type: FEEDBACK_REF_PUSH, el});
const setSelectedMessagesAC        = (messageId) =>                 ({type: SET_SELECTED_MESSAGES, messageId});
const deleteMessageAC              = (messageId, index) =>          ({type: DELETE_MESSAGE, messageId, index});
const setAsSpamMessage             = (messageId, index) =>          ({type: SET_SPAM_MESSAGE, messageId, index});

const getMyNegotiatorsListThunkAC  = () =>                          async (dispatch) => {
    dispatch(setDialogsAreLoadingToggleAC(true, false))
    let response = await usersApi.getMyNegotiatorsList();
    response.status===200 ? dispatch(setMyCompanions(response.data)) :
    dispatch(setErrMyNegotiatorsList(parseInt(JSON.stringify(response.message).replace(/\D+/g,"")))); // errorCode
    dispatch(setDialogsAreLoadingToggleAC(false, false))
};
const getTalkWithUserThunkAC       = (userId) =>                    async (dispatch) => {
    dispatch(setDialogsAreLoadingToggleAC(false, true))
    let response = await usersApi.getTalkWithUser(userId);
        response.status===200 ? dispatch(setTalkWithUser(response.data)):
        dispatch(setErrCertainDialogGetAC(JSON.stringify(response.message)));
    dispatch(setDialogsAreLoadingToggleAC(false, false))
};
const talkedBeforeThunkAC          = (userId) =>                    async (dispatch) => {
    dispatch(setDialogsAreLoadingToggleAC(true, true))
    let response = await usersApi.getMyNegotiatorsList()                                                                // получаем список диалогов
        if(response.status===200) {
            dispatch(setMyCompanions(response.data))
            if(response.data.find(el=>(el.id===+userId))) {                                                             // если в списке диалогов есть нужный юзер
                let responseCertainUser = await usersApi.getTalkWithUser(userId)                                        // то запрашиваем диалог с ним
                responseCertainUser.status===200 ? dispatch(setTalkWithUser(responseCertainUser.data))        :
                    dispatch(setErrCertainDialogGetAC(JSON.stringify(responseCertainUser.message)));                    //error
            } else {
                let getProfileResponse = await usersApi.getProfile(userId);
                let { fullName, photos } = getProfileResponse.data;
                dispatch(createNewDialogAC(+userId, fullName, photos))
            }
        }
        else {
            dispatch(setErrMyNegotiatorsList(parseInt(JSON.stringify(response.message).replace(/\D+/g,"")))); // errorCode
            dispatch(setErrCertainDialogGetAC(JSON.stringify(response.message)));                                                   // error
        }
    dispatch(setDialogsAreLoadingToggleAC(false, false))
};
const addPrevMessagesThunkAC       = (userId,msgCount,pageNumber)=> async (dispatch) => {
    dispatch(prevMsgsloadingTogglerAC(true));
    let response = await usersApi.getTalkWithUser(userId,  msgCount, pageNumber )
    dispatch(addPrevMSGS(response.data))
    dispatch(prevMsgsloadingTogglerAC(false));

};
const deleteMessageThunkAC         = (messageId) =>                 async (dispatch) => {
   let data = await usersApi.deleteMessage(messageId)
       data.status===200 ? dispatch (deleteMessageAC(messageId)): console.log(data);
};
const setSpamMessagesThunkAC       = (messageId) =>                 async (dispatch) => {
    let data = await usersApi.setAsSpamMessage(messageId)
        data.response===200? dispatch(setAsSpamMessage(messageId)) : console.log(data)};
const getNewMessagesRequestThunkAC = () =>                          async (dispatch) => {
    dispatch(newMsgActonCombiner(0,true,false))
    let response = await usersApi.getNewMessages()
    response.status === 200 ? dispatch(newMsgActonCombiner(response.data,false,null)) :
        dispatch(newMsgActonCombiner(0,false,true));
};
const sendMessageToUserThunkAC     = (userId,body,actionKey,userName)=>
                                                                    async (dispatch) => {
    dispatch(onSendingMSGEStatusAC(0, userId,actionKey,userName));
    let response = await usersApi.sendMsgToTalker(userId,body,userName)
        response.status === 200 ?
            dispatch(onSendingMSGEStatusAC(1,userId,actionKey,userName)) && dispatch(sendMsgAC(response.data)) :
            dispatch(onSendingMSGEStatusAC(2,userId,actionKey,userName))
};


const dialogActions = {getMyNegotiatorsListThunkAC, getTalkWithUserThunkAC, sendMessageToUserThunkAC, createNewDialogAC,
    talkedBeforeThunkAC, setSelectedMessagesAC, setSpamMessagesThunkAC, deleteMessageThunkAC, getNewMessagesRequestThunkAC,
    addPrevMessagesThunkAC, feedBackWindowCloserAC, feedbackRefPushAC};

export const dialogACs = (state = dialogActions)=> { return state };

let initialDialogsState = {
    dialogsList:            [],                     certainDialog:          {items:[]},
    allDialogsIsLoading:    false,                  certainDialogIsLoading: false,
    defaultAvatar:          maleProfilePic,         certainDialogLoader:    certainDialogLoaderGIF,
    allDialogsLoader:       allDialogsLoadeGIF,     newMessagesCounter:     0,
    newMessageBTNDisabled:  false,                  msgLoader:              envelopeGIF,
    prevMsgsIsLoading:      false,                  prevMsgsLoader:         meetLinesGIF,
    onError:                errorPic,               errGettingNewMSGSCount: false,
    onSendMSGStatArr:       [],                     keyArr:                 [],
    feedbackArr:            [],                     errNegotiatorsListGet:  '',
    errNegotiatorsListPIC:  radioTowerPIC,          errCertainDialogGet:    '',
};

export const dialogsReducer = ( state = initialDialogsState, action, date, time ) => {
    let stateCopy = {...state};
    switch (action.type) {
        case NEW_MSG_ACTTION_COMBINER:
            // console.log(action)
            return {...state,newMessagesCounter:action.newMessagesCount,newMessageBTNDisabled:action.BTNIsDisabled,
                errGettingNewMSGSCount:action.hasErr};

        case SEND_MESSAGE_TO_USER:          stateCopy.certainDialog.items.push(action.msg); return stateCopy;
        case SET_MY_COMPANIONS_LIST:        return {...state, dialogsList: action.data};
        case ERR_NEGOTIATORS_LIST_GET:      return {...state, errNegotiatorsListGet: action.errorCode};

        case DIALOGS_ARE_LOADING_TOGGLER:   return {...state, dialogIsLoading: action.allDialogs, certainDialogIsLoading: action.certainDialog}

        case ERR_CERTAIN_DIALOG_GET:        return {...state, errCertainDialogGet: action.error.substr(1 ,action.error.length-2)};
        case SET_TALK_WITH_USER:            return {...state, certainDialog: action.data};
        case CREATE_AND_SET_NEW_DIALOG:
            console.log(action)
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
            let item =   state.selectedMsgs.findIndex((el)=> (el === action.messageId));
            item ===-1 ? state.selectedMsgs.push(action.messageId) : state.selectedMsgs.splice(item, 1);
            return stateCopy;

        case DELETE_MESSAGE: state.certainDialog.items.splice(action.index, 1); return stateCopy;

        case ADDED_PREVIOUS_MSGS:
            let reverseItems = action.prevMsgs.items.reverse();
            reverseItems.forEach(el=>  state.certainDialog.items.unshift(el))
            return  stateCopy;

        case PREV_MSGS_LOADING_TOGGLER :
            // console.log('PREV_MSGS_LOADING_TOGGLER')
            return {...state, prevMsgsIsLoading: action.prevMsgsIsLoading};

        case ON_SENDING_MSG_STATUS:
            // console.log(ON_SENDING_MSG_STATUS, action.number, action.userId,action.actionKey);
            let index = state.keyArr.findIndex((el)=>(el===action.actionKey));
            if (index ===-1){
                state.keyArr.unshift(action.actionKey);
                state.onSendMSGStatArr.unshift({statNum:action.number,userId:action.userId, userName:action.userName});
            } else { for(let key in state.onSendMSGStatArr[index]){
                    state.onSendMSGStatArr[index].statNum  = action.number;
                    state.onSendMSGStatArr[index].userId   = action.userId;
                    state.onSendMSGStatArr[index].userName = action.userName;
            }
            }
            // console.log(state.keyArr)
            // console.log(state.onSendMSGStatArr)
            return {...state};

        case FEEDBACK_WINDOW_CLOSER:
            // console.log('FEEDBACK_WINDOW_CLOSER')
            state.onSendMSGStatArr.splice(action.arrIndex,1);
            state.keyArr.splice(action.arrIndex,1);
            return {...state};

        case FEEDBACK_REF_PUSH:
            state.feedbackArr.push(action.el)
            return  {...state}

        default: return stateCopy;
    }
};

// case ON_SENDING_MSG_STATUS:
//     // console.log(ON_SENDING_MSG_STATUS, action.number, action.userId,action.actionKey);
//     let index = state.keyArr.findIndex((el)=>(el===action.actionKey));
//     if (index ===-1){
//         state.keyArr.push(action.actionKey);
//         state.onSendMSGStatArr.push({[action.actionKey]:{statNum:action.number,userId:action.userId}});
//     } else { for(let key in state.onSendMSGStatArr[index]){
//             if (key===action.actionKey){
//                 state.onSendMSGStatArr[index][key].statNum  = action.number;
//                 state.onSendMSGStatArr[index][key].userId   = action.userId;
//                 state.onSendMSGStatArr[index][key].userName = action.userName;
//             }
//         }
//     }
//     // console.log(state.keyArr)
//     // console.log(state.onSendMSGStatArr)
//     return {...state};


// const talkedBeforeThunkAC         = (userId) =>                    (dispatch) => {
//     dispatch(toggleIsLoadingAC(true));
//     usersApi.getMyNegotiatorsList()                               // получаем список диалогов
//         .then(response => {
//                 if  (response.status===200) {
//                     dispatch(setMyCompanions(response.data))
//                     if  (response.data.find(el=> (el.id === +userId))) {
//                         return  usersApi.getTalkWithUser(userId).then(
//                             response=> {
//                                 if  (response.status===200) {
//                                     dispatch(setTalkWithUser(response.data));
//                                     dispatch(toggleIsLoadingAC(false));
//                                 } else {
//                                     let error=JSON.stringify(response.message);
//                                     dispatch(setErrCertainDialogGetAC(error));
//                                     dispatch(toggleIsLoadingAC(false));
//                                 }
//                             })
//                     } else {
//                         dispatch(toggleIsLoadingAC(true));
//                         return usersApi.getProfile(userId)
//                             .then(response => {
//                                 let { fullName, photos } = response.data; dispatch( createNewDialogAC(+userId, fullName, photos))
//                                 dispatch(toggleIsLoadingAC(false))
//                             })
//                     }
//                 }
//                 else {
//                     let errorCode=parseInt(JSON.stringify(response.message).replace(/\D+/g,""));
//                     let error=JSON.stringify(response.message);
//                     dispatch(setErrMyNegotiatorsList(errorCode));
//                     dispatch(setErrCertainDialogGetAC(error));
//                     dispatch(toggleIsLoadingAC(false));
//                 }
//             }
//         )
// };