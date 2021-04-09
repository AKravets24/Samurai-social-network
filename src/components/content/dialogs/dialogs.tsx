import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, NavLink, useRouteMatch } from 'react-router-dom';
import { Field, Formik } from 'formik';
import stl from './dialogs.module.css';
import {
  getColorTheme, getDialogsACs_compDialogs,
  getMyId, getSmartDialogsReducer, getThemesDelayFlag
} from "../../../redux/selectors";
import { DialogActions_Type, InitialDialogsState_Type } from '../../../redux/dialogsReducer';
import { DialoguesThemes_Type } from '../../../redux/backGroundSetter';
import { getSmartDialogsLoaders } from '../../../redux/selectors';
import { MatchHook_Type } from "../../RouterHooksTypes";
import { MessageData_Type } from "../../../redux/app";
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames/bind';


type DialogsActions_Types = {
  getMyNegotiatorsListThunk: () => void
  getTalkWithUserThunk: (userId: number) => void
  sendMessageToUserThunk: (userId: number, msg: string, actionKey: string, userName: string, senderId: number) => void
  talkedBeforeThunk: (userId: number) => void
  setSelectedMessages: (messageId: string) => void
  setSpamMessagesThunk: (messageId: string, index: number) => void
  deleteMessageThunk: (messageId: string, index: number) => void
  addPrevMessagesThunk: (dialogId: number, msgCount: number, pageNumber: number) => void
}

type Themes_Type = {
  activeLink: string, dialogAreaBackgroundNSecondScroll: string, dialogDnmc: string, firstScroller: string, msgMeDnmc: string, msgUserDnmc: string, sendBTNDnmc: string, talkerBlockA: string, talkerBlockTheme: string, textAreaDnmc: string
}

let DialogFuncContainer = () => {
  let match: MatchHook_Type = useRouteMatch();
  // console.log(match)

  let dialogsInfo = useSelector(getSmartDialogsReducer);
  let myId = useSelector(getMyId);
  let themesDelayFlag = useSelector(getThemesDelayFlag);
  let colorTheme = useSelector(getColorTheme);
  let dialogACs = useSelector(getDialogsACs_compDialogs);
  let loaders = useSelector(getSmartDialogsLoaders)



  let dispatch = useDispatch();
  let dialogActions: DialogsActions_Types = {
    getMyNegotiatorsListThunk: () => dispatch(dialogACs.getMyNegotiatorsListThunkAC()),
    getTalkWithUserThunk: (userId: number) => dispatch(dialogACs.getTalkWithUserThunkAC(userId)),
    sendMessageToUserThunk: (userId: number, msg: string, actionKey: string, userName: string, senderId: number) =>
      dispatch(dialogACs.sendMessageToUserThunkAC(userId, msg, actionKey, userName, senderId)),
    talkedBeforeThunk: (userId: number) => dispatch(dialogACs.talkedBeforeThunkAC(userId)),
    setSelectedMessages: (messageId: string) => dispatch(dialogACs.setSelectedMessagesAC(messageId)),
    setSpamMessagesThunk: (messageId: string, index: number) => dispatch(dialogACs.setSpamMessagesThunkAC(messageId, index)),
    deleteMessageThunk: (messageId: string, index: number) => dispatch(dialogACs.deleteMessageThunkAC(messageId, index)),
    addPrevMessagesThunk: (dialogId: number, msgCount: number, pageNumber: number) =>
      dispatch(dialogACs.addPrevMessagesThunkAC(dialogId, msgCount, pageNumber)),
  }


  useEffect(() => {
    match?.params?.userId ? dialogActions.talkedBeforeThunk(+match.params.userId) : dialogActions.getMyNegotiatorsListThunk();
  }, [])

  let [themes, setThemes] = useState<Themes_Type>({ dialogDnmc: '', firstScroller: '', talkerBlockTheme: '', activeLink: '', talkerBlockA: '', msgMeDnmc: '', msgUserDnmc: '', dialogAreaBackgroundNSecondScroll: '', textAreaDnmc: '', sendBTNDnmc: '', })
  useEffect(() => {
    switch (colorTheme) {
      case 'NIGHT': return setThemes({
        ...themes, dialogDnmc: stl.dialogN, firstScroller: stl.dialogListN, talkerBlockTheme: stl.talkerBlockN, activeLink: stl.activeLinkN, talkerBlockA: stl.talkerBlockA_N, msgMeDnmc: stl.myMsgN,
        msgUserDnmc: stl.userMsgN, dialogAreaBackgroundNSecondScroll: stl.dialogAreaN, textAreaDnmc: stl.textareaN, sendBTNDnmc: stl.sendBTN_N,
      });
      case 'MORNING': return setThemes({
        ...themes, dialogDnmc: stl.dialogM, firstScroller: stl.dialogListM, talkerBlockTheme: stl.talkerBlockM, activeLink: stl.activeLinkM, talkerBlockA: stl.talkerBlockA_M, msgMeDnmc: stl.myMsgM,
        msgUserDnmc: stl.userMsgM, dialogAreaBackgroundNSecondScroll: stl.dialogAreaM, textAreaDnmc: stl.textareaM, sendBTNDnmc: stl.sendBTN_M,
      });
      case 'DAY': return setThemes({
        ...themes, dialogDnmc: stl.dialogD, firstScroller: stl.dialogListD, talkerBlockTheme: stl.talkerBlockD, activeLink: stl.activeLinkD, talkerBlockA: stl.talkerBlockA_D, msgMeDnmc: stl.myMsgD,
        msgUserDnmc: stl.userMsgD, dialogAreaBackgroundNSecondScroll: stl.dialogAreaD, textAreaDnmc: stl.textareaD, sendBTNDnmc: stl.sendBTN_D,
      });
      case 'EVENING': return setThemes({
        ...themes, dialogDnmc: stl.dialogE, firstScroller: stl.dialogListE, talkerBlockTheme: stl.talkerBlockE, activeLink: stl.activeLinkE, talkerBlockA: stl.talkerBlockA_E, msgMeDnmc: stl.myMsgE,
        msgUserDnmc: stl.userMsgE, dialogAreaBackgroundNSecondScroll: stl.dialogAreaE, textAreaDnmc: stl.textareaE, sendBTNDnmc: stl.sendBTN_E,
      });
    }
  }, [colorTheme])

  return themes.dialogDnmc ? <Dialogs
    state={dialogsInfo}
    userIdInURL={match?.params?.userId}
    myId={myId}
    delayFlag={themesDelayFlag}
    themes={themes}
    actions={dialogActions}
    loaders={loaders}
  /> : null;
}

type DialogsProps_Type = {
  myId: null | number
  state: InitialDialogsState_Type
  delayFlag: boolean
  themes: Themes_Type
  userIdInURL: undefined | string | number
  actions: DialogsActions_Types
  loaders: DialoguesThemes_Type
}

type ModalMsgs_Type = {
  msgArr: MessageData_Type[], servInfo: { flag?: boolean, isMyMsg?: boolean, myId?: any, dialogId?: number, wasError?: boolean, }[]
}

let Dialogs: React.FC<DialogsProps_Type> = ({ myId, state, themes, userIdInURL, actions, loaders, delayFlag }) => {
  // console.log(loaders)

  const dialogArea = useRef<HTMLDivElement | any>(null);
  const bufferBlock = useRef<HTMLDivElement>(null);

  interface AreaHeight { }
  type Error_Type = { text?: string }

  let [dialogId, setDialogId] = useState(userIdInURL === undefined ? 0 : +userIdInURL);
  let [pageNumber, setPageNumber] = useState(2);
  let [msgsMapDone, setMsgsMapDone] = useState(0); //диалог:  0 = не загружен, 1 = загружен первично, 2 = загрузка предыдущей части 3 = загружена предыдущая часть
  let [dialogAreaHeight, setDialogAreaHeight] = useState<AreaHeight | any>(0);
  let [userNameInHeader, setUserNameInHeader] = useState('');


  let getTalk = (userId: number) => { setDialogId(dialogId = userId); setPageNumber(2); actions.getTalkWithUserThunk(dialogId) };

  let oldMsgLazyLoader = () => {
    actions.addPrevMessagesThunk(dialogId, 10, pageNumber);
    setMsgsMapDone(2)
    setPageNumber(pageNumber + 1)
  };


  useEffect(() => {            // логика, отвечающая за работу скроллбара и активного имени в шапке 
    if (msgsMapDone === 1) {
      scrollToDown(bufferBlock)
    }
    else if (msgsMapDone === 3 && !state.prevMsgsIsLoading) {
      dialogArea?.current?.scrollTo(0, dialogArea?.current?.scrollHeight - dialogAreaHeight)
    }

    if (dialogId) {
      let user = state.dialogsList.find(el => el.id === dialogId)
      if (user) return setUserNameInHeader(user.userName)
    }
  }, [msgsMapDone, !state.prevMsgsIsLoading])


  type Value_Type = { text: string }
  let submitter = (values: Value_Type, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    actions.sendMessageToUserThunk(dialogId, values.text, uuidv4() as string, '', myId as number); values.text = ''; setSubmitting(false);
  }

  let keyCodeChecker = (e: KeyboardEvent, values: Value_Type, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    if (e.keyCode == 13 && e.shiftKey) { return } // для переноса строки =)
    else if (e.keyCode === 13) {
      submitter(values, { setSubmitting })
    }
  }
  let validator = (values: Value_Type) => { let errors: Error_Type = {}; if (!values.text) { errors.text = 'Required' } return errors }



  let [modalMsggs, setModalMsggs] = useState<ModalMsgs_Type>({ msgArr: [], servInfo: [] })
  let onRightClickListener = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number, arr: MessageData_Type[]) => {
    e.preventDefault();
    let newArr: MessageData_Type[] = [...arr]
    let newServInfo = [...modalMsggs.servInfo]

    if (newServInfo[i] === undefined) { newServInfo[i] = {} }
    if (newServInfo[i]?.flag === undefined) { newServInfo[i].flag = true; }
    else if (newServInfo[i].flag === true) { newServInfo[i].flag = false; }
    else if (newServInfo[i].flag === false) { newServInfo[i].flag = true; }

    let isMyMsg = myId === arr[i].senderId
    newServInfo[i].isMyMsg = isMyMsg;
    newServInfo[i].myId = myId;
    newServInfo[i].dialogId = dialogId;
    newServInfo[i].wasError = state.errInSendingArr.some(el => el.actionKey === arr[i].actionKey)


    let finalState = { msgArr: newArr, servInfo: newServInfo }
    setModalMsggs(modalMsggs = finalState)
  }

  let servInfoCorrecter = (index: number) => {
    let newServInfo = [...modalMsggs.servInfo]
    let newMsgArr = [...modalMsggs.msgArr]
    newServInfo[index].flag = false
    let finalState = { msgArr: newMsgArr, servInfo: newServInfo }
    setModalMsggs(modalMsggs = finalState)
  }

  window.onkeyup = ({ key }: KeyboardEvent) => {
    if (key === "Escape") {
      let newServInfo = [...modalMsggs.servInfo]
      let newMsgArr = [...modalMsggs.msgArr]
      newServInfo.forEach(el => { if (el !== undefined) el.flag = false })
      // newServInfo.forEach(el => console.log(el))
      let finalState = { msgArr: newMsgArr, servInfo: newServInfo }
      setModalMsggs(modalMsggs = finalState)
    }
  };


  let scrollToDown = (bufferBlock: any) => { bufferBlock.current && bufferBlock.current.scrollIntoView({ behavior: "auto" }) };




  return <>
    <div className={cn(stl.dialogsPage, themes.dialogDnmc, delayFlag && stl.delay)}>
      <div className={stl.dialogListAndArea}>
        <div className={cn(stl.dialogList, themes.firstScroller, delayFlag && stl.delay)}>
          {/* {state.dialogsList.length === 0 && !state.errNegotiatorsListGet ? */}
          {state.allDialogsIsLoading ?                                                 // диалоги загружаются?
            <div className={stl.dialogListLoaderWrapper}>
              <img className={stl.dialogListLoader} src={loaders.halfCircle_GIF} alt="Err" />
              <img className={stl.dialogListLoader} src={loaders.interSector_GIF} alt="Err" />
              <img className={stl.dialogListLoader} src={loaders.halfCircle_GIF} alt="Err" />
            </div>
            :
            state.errNegotiatorsListGet ?                                               // есть оштбки при загрузке?
              <div className={stl.errorBlock}>
                <h2>Error!</h2>
                <div>
                  <img /* onLoad={true} */ src={state.errNegotiatorsListPIC} alt="Err" />
                </div>
                <p>{state.errNegotiatorsListGet} Connection lost!</p>
                <button className={`${stl.errBTN} ${themes.sendBTNDnmc}`}
                  onClick={() => actions.getMyNegotiatorsListThunk()}
                >Try again</button>
              </div>
              :
              state.dialogsList
                .map((user, i) =>
                  <div className={cn(stl.talkerBlock, themes.talkerBlockTheme, delayFlag && stl.delay)} key={i} >
                    <NavLink to={`/profile/${user.id}`} >
                      <img src={user.photos.large || state.defaultAvatar} alt="err" />
                    </NavLink>
                    <NavLink to={`/dialogs/${user.id}`}
                      onClick={() => { getTalk(user.id); setMsgsMapDone(0) }}
                      className={themes.talkerBlockA}
                      activeClassName={themes.activeLink}>
                      {user.userName}{user.hasNewMessages &&
                        <span>({user.newMessagesCount})</span>}
                    </NavLink>
                  </div>)}
        </div>
        <div className={stl.dialogsAreaAndSender}>
          <div className={stl.editWrapper}>
            <h2>{userNameInHeader}</h2>
          </div>
          <div className={cn(stl.dialogArea, themes.dialogAreaBackgroundNSecondScroll, delayFlag && stl.delay)}
            ref={dialogArea}
            onScroll={() => {
              !dialogArea?.current?.scrollTop && state?.certainDialog.items.length !== state.certainDialog.totalCount &&
                !state.prevMsgsIsLoading && oldMsgLazyLoader()
            }}
            onContextMenu={e => e.preventDefault()}
          >
            {!state.dialogsList.length && !state.allDialogsIsLoading && !state.errNegotiatorsListGet &&            // если ни с кем еще не было диалогов
              <div className={stl.noDialogsList}>
                <p>No dialogs here so far...</p>
              </div>}
            <div className={stl.oldMsgsLoader}>
              {state.prevMsgsIsLoading && <img src={loaders.prevMSGLDR_GIF} alt="Err" />}
            </div>
            {state.certainDialogIsLoading ? <div className={stl.certainLDRWrapper}><img src={loaders.certainLDR_GIF} alt="err" /></div> :
              state.errCertainDialogGet ? <div className={stl.errorBlock}> {state.errCertainDialogGet}</div> :
                state?.certainDialog?.items
                  .map((msg, i, arr) => {
                    if (msgsMapDone === 0 && i === arr.length - 1) { setMsgsMapDone(1); setDialogAreaHeight(dialogArea?.current?.scrollHeight) }
                    if (msgsMapDone === 2 && i === arr.length - 1) { setMsgsMapDone(3); setDialogAreaHeight(dialogArea?.current?.scrollHeight) }
                    // if (i === arr.length - 1) { scrollToDown(bufferBlock) }

                    return <div
                      // key={msg.id}
                      key={uuidv4()}
                      className={cn(myId !== null && +msg.senderId === +myId ? `${stl.messageBlockMe} ${themes.msgMeDnmc} ${delayFlag && stl.delay} ` : `${stl.messageBlockUser} ${themes.msgUserDnmc} ${delayFlag && stl.delay}`)}
                      id={msg.id}
                      // onDoubleClick={() => visibility ? setVisibility(null) : setVisibility(stl.visibility)}
                      onContextMenu={(e) => { return state.sendndigInProgress.some(el => el === msg.actionKey) ? null : onRightClickListener(e, i, arr) }}
                    >
                      <p className={stl.messageBody} >{msg.body}</p>

                      <div className={stl.msgStatWrapper}>
                        {state.sendndigInProgress.some(el => el === msg.actionKey) && <img className={stl.ldrAndErr} src={state.msgLoaderGIF} alt="Err" />}
                        {state.errInSendingArr.some(el => el.actionKey === msg.actionKey) && <img className={stl.ldrAndErr} src={state.onError} alt="Err" />}
                        <p className={cn(
                          state.errInSendingArr.some(el => el.actionKey === msg.actionKey) ? stl.errorMarker :
                            myId !== null && +msg.senderId === +myId ? stl.messageBlockTimeMe : stl.messageBlockTimeUser)}
                        > {state.sendndigInProgress.some(el => el === msg.actionKey) ? 'loading...' :                                       // сообщение  отправляется? 
                          state.errInSendingArr.some(el => el.actionKey === msg.actionKey) ?                                                // пришла ошибка от сервера? 
                            state.errInSendingArr.map(el => { if (el.actionKey === msg.actionKey) return `Error: ${el.error}!` }) :
                            `${msg.addedAt.substring(2, 10)}  ${msg.addedAt.substring(11, 16)}`                                             // тогда рендерим инфо
                          } </p>
                        {state.sendndigInProgress.some(el => el === msg.actionKey) === false && state.errInSendingArr.some(el => el.actionKey === msg.actionKey) === false &&
                          <img className={stl.checkMark} src={msg.viewed ? state.msgSeenFlagPIC : state.msgDeliveredFlagPIC} alt="Err" />}
                      </div>

                      {modalMsggs.servInfo[i]?.flag ? <ModalMenu
                        index={i}
                        msgs={arr[i]}
                        servInfo={modalMsggs.servInfo[i]}

                        deleteMsg={actions.deleteMessageThunk}
                        markAsSpam={actions.setSpamMessagesThunk}
                        sendMsg={actions.sendMessageToUserThunk}
                        servInfoCorrecter={servInfoCorrecter}
                      /> : null}
                    </div>
                  })}
            <div ref={bufferBlock} />
          </div>
          <div className={stl.sender}>
            <Formik initialValues={{ text: '' }} validate={validator} onSubmit={submitter} >
              {({ values, errors, handleChange, handleSubmit, isSubmitting, setSubmitting }) => (
                <form onSubmit={handleSubmit} >
                  <Field name="text" onChange={handleChange} value={values.text} placeholder={errors.text} as='textarea'
                    className={cn(stl.txtAreaField, themes.textAreaDnmc, delayFlag && stl.delay)} disabled={!dialogId}
                    onKeyDown={(e: KeyboardEvent) => (keyCodeChecker(e, values, {
                      setSubmitting
                    }))}
                  />
                  {dialogId ?
                    <button disabled={isSubmitting} className={cn(stl.sendBTN, themes.sendBTNDnmc)}
                    > Send </button> : null}
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  </>
};


type ModalMenuProps_Type = {
  index: number, msgs: MessageData_Type, servInfo: ModalMsgs_Type['servInfo'][] | any,
  deleteMsg: (messageId: string, index: number) => void,
  markAsSpam: (messageId: string, index: number) => void,
  sendMsg: (userId: number, msg: string, actionKey: string, userName: string, senderId: number) => void,
  servInfoCorrecter: (index: number) => void
}

let ModalMenu = React.memo((props: ModalMenuProps_Type) => {

  console.log(props)

  let spamMarker = (msgId: string, index: number) => { props.markAsSpam(msgId, index); props.servInfoCorrecter(props.index) }
  let msgDeleter = (msgId: string, index: number) => { props.deleteMsg(msgId, index); props.servInfoCorrecter(props.index) }
  let msgSender = (dialogId: number, mesgBody: string, actionKey: string, userName: string, myId: number) => { props.sendMsg(dialogId, mesgBody, actionKey, userName, myId); props.servInfoCorrecter(props.index) }

  return <div className={cn(props.servInfo.isMyMsg ? `${stl.contextMenu} ${stl.contMenuMyMsg}` : `${stl.contextMenu} ${stl.contMenuFriendMsg}`)}>
    <div className={stl.contextMenuUpper} >
      <div className={stl.repeatNSpam} onClick={() => spamMarker(props.msgs.id, props.index)}>Mark as spam</div>
      <button onClick={() => props.servInfoCorrecter(props.index)}>X</button>
    </div>
    <div className={stl.deleteMsg} onClick={() => props.servInfo.wasError ? msgSender(props.servInfo.dialogId, props.msgs.body, props.msgs.actionKey, '', props.servInfo.myId) : msgDeleter(props.msgs.id, props.index)}>
      {props.servInfo.wasError ? 'Resend' : 'Delete message'}</div>
  </div>
}, function areEqual(prevProps, nextProps) {
  console.log('prevProps:', prevProps);
  console.log('nextProps:', nextProps);
  // нужно доработать
  return true
})

// export default compose(withRouter)(DialogFuncContainer);
export default DialogFuncContainer;

