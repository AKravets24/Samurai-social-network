import { CertainDialog_Type, DialogsList_Type, MessageData_Type, usersApi } from './app';
import maleProfilePic from './img/dialogs/male.png';
import errorPic from './img/dialogs/error.png';
import radioTowerPIC from './img/dialogs/radioTower1.png';
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from './redux-store';


type FeedBackWindowCloserAC_Type = { type: 'FEEDBACK_WINDOW_CLOSER', arrIndex: number }
type SetSelectedMessagesAC_Type = { type: 'SET_SELECTED_MESSAGES', messageId: string }
type FeedbackRefPushAC_Type = { type: 'FEEDBACK_REF_PUSH', el: any }
type CreateNewDialogAC_Type = { type: 'CREATE_AND_SET_NEW_DIALOG', userId: number, fullName: string, photos: Photos_Type }
type Photos_Type = { large: null | string, small: null | string }


const actions = {
  setDialogsAreLoadingToggleAC: (allDialogs: boolean, certainDialog: boolean) => ({ type: 'DIALOGS_ARE_LOADING_TOGGLER', allDialogs, certainDialog } as const),
  setMyCompanions: (data: DialogsList_Type[]) => ({ type: 'SET_MY_COMPANIONS_LIST', data } as const),
  setErrMyNegotiatorsList: (errorCode: number) => ({ type: 'ERR_NEGOTIATORS_LIST_GET', errorCode } as const),
  setTalkWithUser: (data: CertainDialog_Type) => ({ type: 'SET_TALK_WITH_USER', data } as const),
  addPrevMSGS: (prevMsgs: MessageData_Type[]) => ({ type: 'ADDED_PREVIOUS_MSGS', prevMsgs } as const),
  prevMsgsloadingTogglerAC: (prevMsgsIsLoading: boolean) => ({ type: 'PREV_MSGS_LOADING_TOGGLER', prevMsgsIsLoading } as const),
  sendMsgAC: (msgItem: MessageData_Type) => ({ type: 'SEND_MESSAGE_TO_USER', msgItem } as const),
  onSendingMSGEStatusAC: (number: number, userId: number, actionKey: string, userName: string) => ({ type: 'ON_SENDING_MSG_STATUS', number, userId, actionKey, userName } as const),
  feedBackWindowCloserAC: (arrIndex: number) => ({ type: 'FEEDBACK_WINDOW_CLOSER', arrIndex } as const),
  createNewDialogAC: (userId: number, fullName: string, photos: Photos_Type) => ({ type: 'CREATE_AND_SET_NEW_DIALOG', userId, fullName, photos } as const),
  setErrCertainDialogGetAC: (error: string) => ({ type: 'ERR_CERTAIN_DIALOG_GET', error } as const),
  newMsgActonCombiner: (newMessagesCount: number, BTNIsDisabled: boolean, hasErr: boolean) => ({ type: 'NEW_MSG_ACTTION_COMBINER', newMessagesCount, BTNIsDisabled, hasErr } as const),
  feedbackRefPushAC: (el: any) => ({ type: 'FEEDBACK_REF_PUSH', el } as const),
  setSelectedMessagesAC: (messageId: string) => ({ type: 'SET_SELECTED_MESSAGES', messageId } as const),
  deleteMessageAC: (messageId: string, index: number) => ({ type: 'DELETE_MESSAGE', messageId, index } as const),
  setAsSpamMessage: (messageId: string, index: number) => ({ type: 'SET_SPAM_MESSAGE', messageId, index } as const),
}

type ActionTypes = InferActionsTypes<typeof actions>
type Dispatch_Type = Dispatch<ActionTypes>;
type ThunkAC_Type = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>


const getMyNegotiatorsListThunkAC = (): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  dispatch(actions.setDialogsAreLoadingToggleAC(true, false))
  try {
    let response = await usersApi.getMyNegotiatorsList();
    console.log(response)
    if (response.status === 200) dispatch(actions.setMyCompanions(response.data))
  }
  catch (err) {
    // console.log(JSON.stringify(err.message).replace(/\D+/g, ""))
    dispatch(actions.setErrMyNegotiatorsList(parseInt(JSON.stringify(err.message).replace(/\D+/g, "")))); // errorCode
  }
  // dispatch(setErrMyNegotiatorsList(parseInt(JSON.stringify(response.message).replace(/\D+/g,"")))); // errorCode
  dispatch(actions.setDialogsAreLoadingToggleAC(false, false))
};
const getTalkWithUserThunkAC = (userId: number): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  dispatch(actions.setDialogsAreLoadingToggleAC(false, true))
  try {
    let response = await usersApi.getTalkWithUser(userId);
    console.log(response)
    if (response.status === 200) dispatch(actions.setTalkWithUser(response.data))
  }
  catch (err) { dispatch(actions.setErrCertainDialogGetAC(JSON.stringify(err.message))) };
  dispatch(actions.setDialogsAreLoadingToggleAC(false, false))
};
const talkedBeforeThunkAC = (userId: number): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  dispatch(actions.setDialogsAreLoadingToggleAC(true, true))
  try {
    let response = await usersApi.getMyNegotiatorsList()                                                            // получаем список диалогов
    if (response.status === 200) {
      dispatch(actions.setMyCompanions(response.data))
      if (response.data.find((el: DialogsList_Type) => (el.id === +userId))) {                                          // если в списке диалогов есть нужный юзер
        try {
          let responseCertainUser = await usersApi.getTalkWithUser(userId)                                        // то запрашиваем диалог с ним
          responseCertainUser.status === 200 && dispatch(actions.setTalkWithUser(responseCertainUser.data)) /* && console.log(responseCertainUser) */
        }
        catch (err) { dispatch(actions.setErrCertainDialogGetAC(JSON.stringify(err.message))) };                    //error
      } else {
        let getProfileResponse = await usersApi.getProfile(userId);
        console.log(getProfileResponse)
        let { fullName, photos } = getProfileResponse.data;
        dispatch(actions.createNewDialogAC(+userId, fullName, photos))
      }
    }
  } catch (err) {
    dispatch(actions.setErrMyNegotiatorsList(parseInt(JSON.stringify(err.message).replace(/\D+/g, "")))); // errorCode
    dispatch(actions.setErrCertainDialogGetAC(JSON.stringify(err.message)));                                                   // error
    // dispatch(setErrMyNegotiatorsList(parseInt(JSON.stringify(response).replace(/\D+/g,"")))); // errorCode
    // dispatch(setErrCertainDialogGetAC(JSON.stringify(response)));                                                   // error
  }
  dispatch(actions.setDialogsAreLoadingToggleAC(false, false))
};
const addPrevMessagesThunkAC = (userId: number, msgCount: number, pageNumber: number): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  dispatch(actions.prevMsgsloadingTogglerAC(true));
  let response = await usersApi.getTalkWithUser(userId, msgCount, pageNumber)
  dispatch(actions.addPrevMSGS(response.data.items))
  dispatch(actions.prevMsgsloadingTogglerAC(false));

};
const deleteMessageThunkAC = (messageId: string, index: number): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  try {
    let response = await usersApi.deleteMessage(messageId)
    if (response.status === 200) dispatch(actions.deleteMessageAC(messageId, index))
  }
  catch (err) { console.log(err); }
};
const setSpamMessagesThunkAC = (messageId: string, index: number): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  try {
    let response = await usersApi.setAsSpamMessage(messageId)
    if (response.status === 200) dispatch(actions.setAsSpamMessage(messageId, index))
  }
  catch (err) { console.log(err) }
};
const getNewMessagesRequestThunkAC = (): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  dispatch(actions.newMsgActonCombiner(0, true, false))
  try {
    let response = await usersApi.getNewMessages()
    if (response.status === 200) dispatch(actions.newMsgActonCombiner(response.data, false, false))
  }
  catch (err) { dispatch(actions.newMsgActonCombiner(0, false, true)) };
};

const sendMessageToUserThunkAC = (userId: number, body: string, actionKey: string, userName: string, senderId: number): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
  // console.log(actionKey)
  dispatch(actions.onSendingMSGEStatusAC(0, userId, actionKey, userName));
  let pseudoMsg = {
    body, actionKey, senderId, addedAt: '', deletedByRecipient: false, deletedBySender: false, distributionId: null, id: '', isSpam: false, recipientId: -1, recipientName: '', senderName: '', translatedBody: null, viewed: false
  }

  dispatch(actions.sendMsgAC(pseudoMsg))
  try {
    let response = await usersApi.sendMsgToTalker(userId, body)
    let modifiedmsgItem = response.data.data.message;
    modifiedmsgItem.actionKey = actionKey
    // console.log(modifiedmsgItem)
    if (response.status === 200) dispatch(actions.onSendingMSGEStatusAC(1, userId, actionKey, userName)) && dispatch(actions.sendMsgAC(modifiedmsgItem)) // response.data.data.message
  }
  catch (err) {
    dispatch(actions.onSendingMSGEStatusAC(2, userId, actionKey, userName)) /* && console.log('error') */
  }
};

// const sendMessageToUserThunkAC = (userId: number, body: string, actionKey: string, userName: string): ThunkAC_Type => async (dispatch: Dispatch_Type) => {
//   dispatch(actions.onSendingMSGEStatusAC(0, userId, actionKey, userName));
//   let response = await usersApi.sendMsgToTalker(userId, body)
//   console.log(response.data);
//   response.status === 200 ?
//     dispatch(actions.onSendingMSGEStatusAC(1, userId, actionKey, userName)) && dispatch(actions.sendMsgAC(response.data.data.message.body)) :
//     dispatch(actions.onSendingMSGEStatusAC(2, userId, actionKey, userName)) && console.log('error')
// };

export type DialogActions_Type = {
  getMyNegotiatorsListThunkAC: () => ThunkAC_Type
  getTalkWithUserThunkAC: (userId: number) => ThunkAC_Type
  sendMessageToUserThunkAC: (userId: number, body: string, actionKey: string, userName: string, senderId: number) => ThunkAC_Type
  createNewDialogAC: (userId: number, fullName: string, photos: Photos_Type) => CreateNewDialogAC_Type
  talkedBeforeThunkAC: (userId: number) => ThunkAC_Type
  setSelectedMessagesAC: (messageId: string) => SetSelectedMessagesAC_Type
  setSpamMessagesThunkAC: (messageId: string, index: number) => ThunkAC_Type
  deleteMessageThunkAC: (messageId: string, index: number) => ThunkAC_Type
  getNewMessagesRequestThunkAC: () => ThunkAC_Type
  addPrevMessagesThunkAC: (userId: number, msgCount: number, pageNumber: number) => ThunkAC_Type
  feedBackWindowCloserAC: (arrIndex: number) => FeedBackWindowCloserAC_Type
  feedbackRefPushAC: (el: any) => FeedbackRefPushAC_Type
}

const dialogActions: DialogActions_Type = {
  getMyNegotiatorsListThunkAC, getTalkWithUserThunkAC, sendMessageToUserThunkAC, createNewDialogAC: actions.createNewDialogAC,
  talkedBeforeThunkAC, setSelectedMessagesAC: actions.setSelectedMessagesAC, setSpamMessagesThunkAC, deleteMessageThunkAC, getNewMessagesRequestThunkAC,
  addPrevMessagesThunkAC, feedBackWindowCloserAC: actions.feedBackWindowCloserAC, feedbackRefPushAC: actions.feedbackRefPushAC
};

export const dialogACs = (state = dialogActions) => { return state };



let initialDialogsState = {
  dialogsList: [] as DialogsList_Type[],
  certainDialog: { items: [], totalCount: 0, error: null } as CertainDialog_Type,
  allDialogsIsLoading: false as boolean,
  certainDialogIsLoading: false as boolean,
  defaultAvatar: maleProfilePic as string,
  newMessagesCounter: 0 as number,
  newMessageBTNDisabled: false as boolean,
  prevMsgsIsLoading: false as boolean,
  onError: errorPic as string,
  errGettingNewMSGSCount: false as boolean,
  onSendMSGStatArr: [] as any[],  // вроде как нафиг не нужен
  keyArr: [] as string[],
  feedbackArr: [] as { statNum: number, userId: number, userName: string, actionKey: string }[],
  errNegotiatorsListGet: 0 as number,
  errNegotiatorsListPIC: radioTowerPIC as string,
  errCertainDialogGet: '' as string,
};

export type InitialDialogsState_Type = typeof initialDialogsState;

let ForUsersSomeAttrs1 = {
  // onSendMSGStatArr: initialDialogsState.onSendMSGStatArr,
  feedbackArr: initialDialogsState.feedbackArr,
}
export type ForUsersSomeAttrs = typeof ForUsersSomeAttrs1


export const dialogsReducer = (state = initialDialogsState, action: ActionTypes, /* date:string, time:string */): InitialDialogsState_Type => {
  let stateCopy = { ...state };
  switch (action.type) {
    case 'NEW_MSG_ACTTION_COMBINER':
      return {
        ...state, newMessagesCounter: action.newMessagesCount, newMessageBTNDisabled: action.BTNIsDisabled,
        errGettingNewMSGSCount: action.hasErr
      };

    case 'SEND_MESSAGE_TO_USER':
      let totalMsgCount: number = 0;                                                                                    // этот колхоз из=за TS, ибо object possibly undefined
      if (state?.certainDialog?.totalCount) totalMsgCount = state.certainDialog.totalCount + 1                          // и этот 

      let duplicateIndex = state.certainDialog.items.findIndex(item => item.actionKey === action.msgItem.actionKey);
      let finalArr: MessageData_Type[] = [...state.certainDialog.items];
      duplicateIndex === -1 ? finalArr = [...state.certainDialog.items, action.msgItem] : finalArr[duplicateIndex] = action.msgItem
      return { ...state, certainDialog: { items: finalArr } }

    case 'SET_MY_COMPANIONS_LIST': return { ...state, dialogsList: action.data };
    case 'ERR_NEGOTIATORS_LIST_GET': return { ...state, errNegotiatorsListGet: action.errorCode };
    case 'DIALOGS_ARE_LOADING_TOGGLER': return { ...state, allDialogsIsLoading: action.allDialogs, certainDialogIsLoading: action.certainDialog }
    case 'ERR_CERTAIN_DIALOG_GET': return { ...state, errCertainDialogGet: action.error.substr(1, action.error.length - 2) };
    case 'SET_TALK_WITH_USER': return { ...state, certainDialog: action.data };
    case 'CREATE_AND_SET_NEW_DIALOG':
      console.log(action)

      type Photos_Type = { small: string, large: string }
      type NewDialogListItem_Type = {
        hasNewMessages: boolean,
        id: number,
        lastDialogActivityDate: null | string,
        lastUserActivityDate: null | string,
        newMessagesCount: number,
        photos: Photos_Type,
        userName: string,
      }
      let newDialogListItem: any | NewDialogListItem_Type = {
        hasNewMessages: false,
        id: action.userId,
        lastDialogActivityDate: null,
        lastUserActivityDate: null,
        newMessagesCount: 0,
        photos: { small: action.photos.small, large: action.photos.large },
        userName: action.fullName,
      };

      stateCopy.dialogsList.unshift(newDialogListItem);
      stateCopy = { ...state, certainDialog: { items: [] } }
      return stateCopy;

    case 'DELETE_MESSAGE': state.certainDialog.items.splice(action.index, 1); return stateCopy;

    case 'ADDED_PREVIOUS_MSGS':
      let reverseItems = action.prevMsgs.reverse();
      reverseItems.forEach((el: MessageData_Type) => state.certainDialog.items.unshift(el))
      return stateCopy;

    case 'PREV_MSGS_LOADING_TOGGLER':
      // console.log('PREV_MSGS_LOADING_TOGGLER')
      return { ...state, prevMsgsIsLoading: action.prevMsgsIsLoading };

    case 'ON_SENDING_MSG_STATUS':
      // let index = state.keyArr.findIndex((el) => (el === action.actionKey));
      let index = state.feedbackArr.findIndex((el) => (el.actionKey === action.actionKey));
      // console.log(action);


      let newFeedbackArr = [...state.feedbackArr]

      index === -1 ?
        newFeedbackArr.unshift({ statNum: action.number, userId: action.userId, userName: action.userName, actionKey: action.actionKey }) :
        newFeedbackArr[index].statNum = action.number;
      return { ...state, feedbackArr: newFeedbackArr };


    // case 'ON_SENDING_MSG_STATUS':
    //   // let index = state.keyArr.findIndex((el) => (el === action.actionKey));
    //   let index = state.keyArr.findIndex((el) => (el === action.actionKey));
    //   console.log(action)
    //   console.log(index)

    //   let newKeyArr = [...state.keyArr]

    //   if (index === -1) {
    //     state.keyArr.unshift(action.actionKey);
    //     state.onSendMSGStatArr.unshift({ statNum: action.number, userId: action.userId, userName: action.userName });
    //   } else {
    //     // for (let key in state.onSendMSGStatArr[index]) {
    //     state.onSendMSGStatArr[index].statNum = action.number;
    //     state.onSendMSGStatArr[index].userId = action.userId;
    //     state.onSendMSGStatArr[index].userName = action.userName;
    //     // }
    //   }
    //   return { ...state };

    case 'FEEDBACK_WINDOW_CLOSER':
      // console.log(1);
      let arrDelItem = [...state.feedbackArr]
      arrDelItem.splice(action.arrIndex, 1)
      // state.onSendMSGStatArr.splice(action.arrIndex, 1);
      // state.keyArr.splice(action.arrIndex, 1);
      return { ...state, feedbackArr: arrDelItem };

    case 'FEEDBACK_REF_PUSH':
      console.log(2);
      // state.feedbackArr.push(action.el)
      return { ...state }

    default: return stateCopy;
  }
};

