import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, NavLink, useRouteMatch } from 'react-router-dom';
import { Field, Formik } from 'formik';
import stl from './dialogs.module.css';
import {
  getColorTheme, getDialogsACs_compDialogs,
  getMyId, getSmartDialogsReducer
} from "../../../redux/selectors";
import { DialogActions_Type, InitialDialogsState_Type } from '../../../redux/dialogsReducer'
import { MatchHook_Type } from "../../RouterHooksTypes";

type DialogsActions_Types = {
  getMyNegotiatorsListThunk: () => void
  getTalkWithUserThunk: (userId: number) => void
  sendMessageToUserThunk: (userId: number, msg: string, actionKey: string, userName: string) => void
  talkedBeforeThunk: (userId: number) => void
  setSelectedMessages: (messageId: string) => void
  setSpamMessagesThunk: (messageId: string, index: number) => void
  deleteMessageThunk: (messageId: string, index: number) => void
  addPrevMessagesThunk: (dialogId: number, msgCount: number, pageNumber: number) => void
}

type Themes_Type = {
  activeLink: string, dialogAreaBackgroundNSecondScroll: string, dialogDynamic: string, firstScroller: string, msgMeDynamic: string, msgUserDynamic: string, sendBTNDynamic: string, talkerBlockA: string, talkerBlockTheme: string, textAreaDynamic: string
}

let DialogFuncContainer = () => {
  let match: MatchHook_Type = useRouteMatch();
  // console.log(match)

  let dialogsInfo = useSelector(getSmartDialogsReducer);
  let myId = useSelector(getMyId);
  let colorTheme = useSelector(getColorTheme);
  let dialogACs = useSelector(getDialogsACs_compDialogs);


  let dispatch = useDispatch();
  let dialogActions: DialogsActions_Types = {
    getMyNegotiatorsListThunk: () => dispatch(dialogACs.getMyNegotiatorsListThunkAC()),
    getTalkWithUserThunk: (userId: number) => dispatch(dialogACs.getTalkWithUserThunkAC(userId)),
    sendMessageToUserThunk: (userId: number, msg: string, actionKey: string, userName: string) =>
      dispatch(dialogACs.sendMessageToUserThunkAC(userId, msg, actionKey, userName)),
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

  let [themes, setThemes] = useState<Themes_Type>({ dialogDynamic: '', firstScroller: '', talkerBlockTheme: '', activeLink: '', talkerBlockA: '', msgMeDynamic: '', msgUserDynamic: '', dialogAreaBackgroundNSecondScroll: '', textAreaDynamic: '', sendBTNDynamic: '' })
  useEffect(() => {
    switch (colorTheme) {
      case 'NIGHT': return setThemes({
        ...themes, dialogDynamic: stl.dialogN, firstScroller: stl.dialogListN, talkerBlockTheme: stl.talkerBlockN, activeLink: stl.activeLinkN, talkerBlockA: stl.talkerBlockA_N, msgMeDynamic: stl.myMsgN,
        msgUserDynamic: stl.userMsgN, dialogAreaBackgroundNSecondScroll: stl.dialogAreaN, textAreaDynamic: stl.textareaN, sendBTNDynamic: stl.sendBTN_N,
      });
      case 'MORNING': return setThemes({
        ...themes, dialogDynamic: stl.dialogM, firstScroller: stl.dialogListM, talkerBlockTheme: stl.talkerBlockM, activeLink: stl.activeLinkM, talkerBlockA: stl.talkerBlockA_M, msgMeDynamic: stl.myMsgM,
        msgUserDynamic: stl.userMsgM, dialogAreaBackgroundNSecondScroll: stl.dialogAreaM, textAreaDynamic: stl.textareaM, sendBTNDynamic: stl.sendBTN_M,
      });
      case 'DAY': return setThemes({
        ...themes, dialogDynamic: stl.dialogD, firstScroller: stl.dialogListD, talkerBlockTheme: stl.talkerBlockD, activeLink: stl.activeLinkD, talkerBlockA: stl.talkerBlockA_D, msgMeDynamic: stl.myMsgD,
        msgUserDynamic: stl.userMsgD, dialogAreaBackgroundNSecondScroll: stl.dialogAreaD, textAreaDynamic: stl.textareaD, sendBTNDynamic: stl.sendBTN_D,
      });
      case 'EVENING': return setThemes({
        ...themes, dialogDynamic: stl.dialogE, firstScroller: stl.dialogListE, talkerBlockTheme: stl.talkerBlockE, activeLink: stl.activeLinkE, talkerBlockA: stl.talkerBlockA_E, msgMeDynamic: stl.myMsgE,
        msgUserDynamic: stl.userMsgE, dialogAreaBackgroundNSecondScroll: stl.dialogAreaE, textAreaDynamic: stl.textareaE, sendBTNDynamic: stl.sendBTN_E,
      });
    }
  }, [colorTheme])


  return themes.dialogDynamic ? <Dialogs
    state={dialogsInfo}
    userIdInURL={match?.params?.userId}
    myId={myId}
    themes={themes}
    actions={dialogActions}
  /> : null;
}

type DialogsProps_type = {
  myId: null | number
  state: InitialDialogsState_Type
  themes: Themes_Type
  userIdInURL: undefined | string | number
  actions: DialogsActions_Types
}

let Dialogs: React.FC<DialogsProps_type> = ({ myId, state, themes, userIdInURL, actions }) => {
  // console.log(typeof stl.visibility)

  const dialogArea = useRef<HTMLDivElement>(null);
  const bufferBlock = useRef<HTMLDivElement>(null);

  interface AreaHeight { }
  type Error_Type = { text?: string }

  let [dialogId, setDialogId] = useState(userIdInURL === undefined ? 0 : +userIdInURL);
  let [visibility, setVisibility] = useState<any>(stl.visibility); // !!!normally must be  stl.visibility !! else - null
  let [pageNumber, setPageNumber] = useState(2);
  let [msgsMapDone, setMsgsMapDone] = useState(false);
  let [dialogAreaHeight, setDialogAreaHeight] = useState<AreaHeight | any>(0);
  let [userNameInHeader, setUserNameInHeader] = useState('');

  type usePrevious = { current: number }

  // let usePrevious=(value:number)=> {let ref=useRef<object>();useEffect(()=>{ref.current=value});return ref.current;};             // пересмотреть логику работы!!
  // let prevCount:number = usePrevious(dialogAreaHeight);
  let prevCount = 0;

  let getTalk = (userId: number) => { setDialogId(dialogId = userId); actions.getTalkWithUserThunk(dialogId) };
  let scrollToDown = (bufferBlock: any) => { bufferBlock.current && bufferBlock.current.scrollIntoView({ behavior: "auto" }) };

  let oldMsgLazyLoader = () => { let msgCount = 5; actions.addPrevMessagesThunk(dialogId, msgCount, pageNumber); setPageNumber(pageNumber + 1) };

  useEffect(() => {
    dialogArea?.current &&
      !state.prevMsgsIsLoading && dialogArea.current.scrollTo(0, dialogAreaHeight - prevCount)
  }, [state.prevMsgsIsLoading])

  useEffect(() => {
    dialogArea?.current &&
      setDialogAreaHeight(dialogAreaHeight = dialogArea.current.scrollHeight);
    return setDialogAreaHeight(0);
  }, [state]);
  useEffect(() => { /*msgsMapDone &&*/ scrollToDown(bufferBlock) }, [msgsMapDone])

  // console.log(props.state.certainDialog);

  type Value_Type = { text: string }
  let submitter = (values: Value_Type, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    // actions.sendMessageToUserThunk(dialogId, values.text.substring(0, values.text.length - 1), '', '')
    actions.sendMessageToUserThunk(dialogId, values.text, '', ''); values.text = ''; setSubmitting(false);
  }

  let keyCodeChecker = (e: KeyboardEvent, values: Value_Type, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    if (e.keyCode == 13 && e.shiftKey) { return } // для переноса строки =)
    else if (e.keyCode === 13) {
      submitter(values, { setSubmitting })
    }
  }

  let validator = (values: Value_Type) => { let errors: Error_Type = {}; if (!values.text) { errors.text = 'Required' } return errors }

  return <>
    <div className={`${stl.dialogsPage} ${themes.dialogDynamic}`}>
      <div className={stl.dialogListAndArea}>
        <div className={`${stl.dialogList} ${themes.firstScroller}`}>
          {state.dialogsList.length === 0 && !state.errNegotiatorsListGet ?
            <img className={stl.certainLoader} src={state.allDialogsLoader} alt="Err" />
            :
            state.errNegotiatorsListGet ?
              <div className={stl.errorBlock}>
                <h2>Error!</h2>
                <div>
                  <img /* onLoad={true} */ src={state.errNegotiatorsListPIC} alt="Err" />
                </div>
                <p>{state.errNegotiatorsListGet} Connection lost!</p>
                <button className={`${stl.errBTN} ${themes.sendBTNDynamic}`}
                  onClick={() => actions.getMyNegotiatorsListThunk()}
                >Try again</button>
              </div>
              :
              state.dialogsList
                .map((user, i) =>
                  <div className={`${stl.talkerBlock} ${themes.talkerBlockTheme}`} key={i} >
                    <NavLink to={`/profile/${user.id}`} >
                      <img src={user.photos.large || state.defaultAvatar} alt="err" />
                    </NavLink>
                    <NavLink to={`/dialogs/${user.id}`}
                      onClick={() => { getTalk(user.id); setVisibility(stl.visibility); setUserNameInHeader(user.userName) }}
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
            <div className={`${stl.editBlock} ${visibility}`} >
              <h3>On button click makes immediate action</h3>
            </div>
          </div>
          <div className={`${stl.dialogArea} ${themes.dialogAreaBackgroundNSecondScroll}`}
            ref={dialogArea}
            onScroll={() => !dialogArea?.current?.scrollTop && oldMsgLazyLoader()}
          >
            <div className={stl.oldMsgsLoader}>
              {state.prevMsgsIsLoading && <img src={state.prevMsgsLoader} alt="" />}
            </div>

            {state.certainDialogIsLoading ? <img src={state.certainDialogLoader} alt="err" /> :
              state.errCertainDialogGet ? <div className={stl.errorBlock}> {state.errCertainDialogGet}</div> :
                state?.certainDialog?.items
                  .map((msg, i, arr) => {
                    if (msgsMapDone === false && i === arr.length - 1) { return setMsgsMapDone(true) }
                    if (i === arr.length - 1) { scrollToDown(bufferBlock) }
                    return <div
                      key={i}
                      className={myId !== null && +msg.senderId === +myId ?
                        `${stl.messageBlockMe} ${themes.msgMeDynamic} ` : `${stl.messageBlockUser} ${themes.msgUserDynamic}`}
                      id={msg.id}
                      onDoubleClick={() => visibility ? setVisibility(null) : setVisibility(stl.visibility)}
                    >
                      <p className={stl.messageBody} >{msg.body}</p>
                      <p className={myId !== null && +msg.senderId === +myId ?
                        stl.messageBlockTimeMe : stl.messageBlockTimeUser} >{msg.addedAt}, {msg.viewed ? 'seen' : 'x'}</p>
                      <div className={stl.editWrapper}>
                        <div className={visibility}>
                          <button onClick={() => actions.deleteMessageThunk(msg.id, 0)} > Delete now! </button>             {/* second argument is fake!!! */}
                          {myId !== null && +msg.senderId !== +myId &&
                            <button onClick={() => actions.setSpamMessagesThunk(msg.id, 0)}> To spam now!</button>}            {/* second argument is fake!!! */}
                        </div>
                      </div>
                    </div>
                  })}
            <div ref={bufferBlock} />
          </div>
          <div className={stl.sender}>

            <Formik initialValues={{ text: '' }} validate={validator} onSubmit={submitter} >
              {({ values, errors, handleChange, handleSubmit, isSubmitting, setSubmitting }) => (
                <form onSubmit={handleSubmit} >
                  <Field name="text" onChange={handleChange} value={values.text} placeholder={errors.text} as='textarea' className={`${stl.txtAreaField} ${themes.textAreaDynamic}`} disabled={!dialogId}
                    onKeyDown={(e: KeyboardEvent) => (keyCodeChecker(e, values, {
                      setSubmitting
                    }))}
                  />
                  {dialogId ?
                    <button disabled={isSubmitting} className={`${stl.sendBTN} ${themes.sendBTNDynamic}`}
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


// export default compose(withRouter)(DialogFuncContainer);
export default DialogFuncContainer;


