import { usersApi }                 from './app'
import maleProfilePic               from './img/dialogs/male.png'
import errorPic                     from './img/dialogs/error.png'
import certainDialogLoaderGIF       from './loader/dialogs/loader_green_spinner.gif'
import allDialogsLoadeGIF           from './loader/dialogs/spinner_yellow.gif'
import envelopeGIF                  from './loader/dialogs/envelope.gif'
import meetLinesGIF                 from './loader/dialogs/lGreenMeetLines.gif'
import stl from "../components/content/users/users.module.css";

const SEND_MESSAGE_TO_USER          = "SEND-MESSAGE-TO-USER";
const SET_MY_COMPANIONS_LIST        = 'SET_MY_COMPANIONS_LIST';
const SET_TALK_WITH_USER            = 'SET_TALK_WITH_USER';
const CREATE_AND_SET_NEW_DIALOG     = 'CREATE_AND_SET_NEW_DIALOG';
const TOGGLE_IS_LOADING             = 'TOGGLE_IS_LOADING';
const CLEAR_CERTAIN_USER_DIALOG     = 'CLEAR_CERTAIN_USER_DIALOG';
const SET_SELECTED_MESSAGES         = 'SET_SELECTED_MESSAGES';
const SET_SPAM_MESSAGE              = 'SET_SPAM_MESSAGE';
const DELETE_MESSAGE                = 'DELETE_MESSAGE';
const ADDED_PREVIOUS_MSGS           = 'ADDED_PREVIOUS_MSGS';
const PREV_MSGS_LOADING_TOGGLER     = 'PREV_MSGS_LOADING_TOGGLER';
const ON_SENDING_MSG_STATUS         = 'ON_SENDING_MSG_STATUS';
const FEEDBACK_WINDOW_CLOSER        = 'FEEDBACK_WINDOW_CLOSER';
const FEEDBACK_REF_PUSH             = 'FEEDBACK_REF_PUSH';

const NEW_MSG_ACTTION_COMBINER      = 'NEW_MSG_ACTTION_COMBINER'

const setMyCompanions             = (data) =>                      ({type: SET_MY_COMPANIONS_LIST, data});
const getMyNegotiatorsListThunkAC = () =>                          (dispatch) => {
    usersApi.getMyNegotiatorsList()
        .then(data=>
            dispatch(setMyCompanions(data)))
};
const setTalkWithUser             = (data)=>                       ({type: SET_TALK_WITH_USER, data});
const toggleIsLoadingAC           = (allDialogIsLoading) =>        ({type: TOGGLE_IS_LOADING, allDialogIsLoading});
const setEmptyCertainUserDialog   = () =>                          ({type: CLEAR_CERTAIN_USER_DIALOG})
const getTalkWithUserThunkAC      = (userId) =>                    (dispatch) => {
    dispatch(setEmptyCertainUserDialog())
    dispatch(toggleIsLoadingAC(true))
    usersApi.getTalkWithUser(userId) .then(data=> {
        dispatch(setTalkWithUser(data))
        dispatch(toggleIsLoadingAC(false))
    })

};
const addPrevMSGS                 = (prevMsgs) =>                  ({ type: ADDED_PREVIOUS_MSGS, prevMsgs });
const prevMsgsloadingTogglerAC    = (prevMsgsIsLoading)  =>        ({type: PREV_MSGS_LOADING_TOGGLER, prevMsgsIsLoading});

const addPrevMessagesThunkAC      = (userId,msgCount,pageNumber) =>(dispatch) => {
    dispatch(prevMsgsloadingTogglerAC(true));
    usersApi.getTalkWithUser(userId,  msgCount, pageNumber )
        .then(data =>  {
            dispatch(addPrevMSGS(data))
            dispatch(prevMsgsloadingTogglerAC(false));
        })
};

const sendMsgAC                   = (msg) =>                             ({type: SEND_MESSAGE_TO_USER,msg:msg.data.message});
const onSendingMSGEStatusAC       = (number,userId,actionKey,userName)=> ({type: ON_SENDING_MSG_STATUS,number,userId,actionKey,userName});
const sendMessageToUserThunkAC    = (userId,body,actionKey,userName) =>
                                                                     (dispatch) => {
    dispatch(onSendingMSGEStatusAC(0, userId,actionKey,userName));
    usersApi.sendMsgToTalker(userId,body,userName)
        .then (response => {
            if( response.status === 200 ) {
                dispatch(onSendingMSGEStatusAC(1, userId,actionKey,userName));
                dispatch(sendMsgAC(response.data));
            }
            else { dispatch(onSendingMSGEStatusAC(2,userId,actionKey,userName)) }
        })
};
const feedBackWindowCloserAC      = (arrIndex) =>                  ({type:FEEDBACK_WINDOW_CLOSER, arrIndex})

const createNewDialogAC           = (userId, fullName, photos) =>  ({type: CREATE_AND_SET_NEW_DIALOG, userId, fullName, photos});
const talkedBeforeThunkAC         = (userId) =>                    (dispatch) => {
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
const setSelectedMessagesAC       = (messageId) =>                 ({type: SET_SELECTED_MESSAGES, messageId});
const deleteMessageAC             = (messageId, index) =>          ({type: DELETE_MESSAGE, messageId, index});
const deleteMessageThunkAC        = (messageId) =>                 (dispatch) => {
   usersApi.deleteMessage(messageId)
       .then(data => {
           console.log(data)
           dispatch (deleteMessageAC(messageId))
           }
       )
};
const setAsSpamMessage            = (messageId, index) =>          ({type: SET_SPAM_MESSAGE, messageId, index});
const setSpamMessagesThunkAC      = (messageId) =>                 (dispatch) => {
    usersApi.setAsSpamMessage(messageId)
        .then(data => {
            // console.log(data)
            dispatch(setAsSpamMessage(messageId))
        })
};

const newMsgActonCombiner         = (newMessagesCount,BTNIsDisabled,hasErr) =>({type:NEW_MSG_ACTTION_COMBINER,newMessagesCount,BTNIsDisabled,hasErr});

const getNewMessagesRequestThunkAC  = () =>                          (dispatch) => {
    dispatch(newMsgActonCombiner(0,true,false))
    usersApi.getNewMessages()
        .then(response => {
            if (response.status === 200) { dispatch(newMsgActonCombiner(response.data,false,null))
            } else { dispatch(newMsgActonCombiner(0,false,true))
            }})
};

const feedbackRefPushAC             = (el)  =>                    ({type: FEEDBACK_REF_PUSH, el});


const dialogActions = {getMyNegotiatorsListThunkAC, getTalkWithUserThunkAC, sendMessageToUserThunkAC, createNewDialogAC,
    talkedBeforeThunkAC, setSelectedMessagesAC, setSpamMessagesThunkAC, deleteMessageThunkAC, getNewMessagesRequestThunkAC,
    addPrevMessagesThunkAC, feedBackWindowCloserAC, feedbackRefPushAC};

export const dialogACs = (state = dialogActions)=> { return state };

let initialDialogsState = {
    dialogsList:            [],
    certainDialog:          {items:[]},
    allDialogsIsLoading:    false,
    defaultAvatar:          maleProfilePic,
    certainDialogLoader:    certainDialogLoaderGIF,
    allDialogsLoader:       allDialogsLoadeGIF,
    newMessagesCounter:     0,
    newMessageBTNDisabled:  false,
    msgLoader:              envelopeGIF,
    prevMsgsIsLoading:      false,
    prevMsgsLoader:         meetLinesGIF,
    onError:                errorPic,
    errGettingNewMSGSCount: false,
    // onSendingMSGEStatus:    null,
    onSendMSGStatArr:       [],
    keyArr:                 [],
    feedbackArr:            [],
};

export const dialogsReducer = ( state = initialDialogsState, action, date, time ) => {
    let stateCopy = {...state};
    switch (action.type) {
        case NEW_MSG_ACTTION_COMBINER:
            // console.log(action)
            return {...state,newMessagesCounter:action.newMessagesCount,newMessageBTNDisabled:action.BTNIsDisabled,
                errGettingNewMSGSCount:action.hasErr};

        case SEND_MESSAGE_TO_USER:      stateCopy.certainDialog.items.push(action.msg); return stateCopy;
        case SET_MY_COMPANIONS_LIST:    return {...state, dialogsList: action.data}
        case CLEAR_CERTAIN_USER_DIALOG: delete stateCopy.certainDialog['items']; return stateCopy;
        case SET_TALK_WITH_USER:        return {...state, certainDialog: action.data};
        case TOGGLE_IS_LOADING:         return {...state, dialogIsLoading: action.dialogIsLoading};
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
            let item =   state.selectedMsgs.findIndex((el)=> (el === action.messageId));
            item ===-1 ? state.selectedMsgs.push(action.messageId) : state.selectedMsgs.splice(item, 1);
            return stateCopy;

        case DELETE_MESSAGE: state.certainDialog.items.splice(action.index, 1); return stateCopy;

        case ADDED_PREVIOUS_MSGS:
            // console.log('ADDED_PREVIOUS_MSGS')
            let reverseItems = action.prevMsgs.items.reverse();
            reverseItems.forEach(el=>  state.certainDialog.items.unshift(el))
            // state.certainDialog.items.unshift(action.prevMsgs.items)
            return  stateCopy;

        case PREV_MSGS_LOADING_TOGGLER :
            // console.log('PREV_MSGS_LOADING_TOGGLER')
            return {...state, prevMsgsIsLoading: action.prevMsgsIsLoading};

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
        // console.log('FEEDBACK_REF_PUSH')
            state.feedbackArr.push(action.el)


            return  {...state}
        default:
            return stateCopy;
    }
};
