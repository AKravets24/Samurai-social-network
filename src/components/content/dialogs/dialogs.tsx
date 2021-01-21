import React, {useState, useEffect, useRef}  from "react";
import {connect}                             from "react-redux";
import {compose}                             from 'redux';
import {withRouter, NavLink}                 from 'react-router-dom';
import {Formik}                              from 'formik';
import stl                                   from './dialogs.module.css';
import {
    getColorTheme,getDialogsACs_compDialogs,
    getMyId, getSmartDialogsReducer}         from "../../../redux/selectors";
import { DialogActions_Type, InitialDialogsState_Type } from '../../../redux/dialogsReducer'

import { AppStateType } from "../../../redux/redux-store";



type DialogContainerProps_Type = {
    history:  any                                                              // comes from WithRouter
    location: {pathname:string, search:string, hash:string, state:any}         // comes from WithRouter
    match:    any                                                              // comes from WithRouter
    staticContext: any                                                         // comes from WithRouter ?

    state:    MSTP_Type
    actions:  MRGProps_Type['actions']
   
}

type Themes_Type = {
    activeLink:       string
    dialogAreaBackgroundNSecondScroll: string
    dialogDynamic:    string
    firstScroller:    string
    msgMeDynamic:     string
    msgUserDynamic:   string
    sendBTNDynamic:   string
    talkerBlockA:     string
    talkerBlockTheme: string
    textAreaDynamic:  string
}

let DialogFuncContainer = ({state,actions,history,location,match,staticContext}:DialogContainerProps_Type)=> { 
    // console.log(match)

    useEffect(()=> {
        match.params.userId ? actions.talkedBeforeThunk(match.params.userId) : actions.getMyNegotiatorsListThunk();
    },[])

    let [themes, setThemes] = useState<Themes_Type>({dialogDynamic:'',firstScroller:'',talkerBlockTheme:'',activeLink:'', talkerBlockA:'',msgMeDynamic:'',msgUserDynamic:'',dialogAreaBackgroundNSecondScroll:'', textAreaDynamic:'',sendBTNDynamic:''})
    useEffect(()=> {
        switch (state.colorTheme) {
            case 'NIGHT'  :return setThemes({...themes,dialogDynamic:stl.dialogN,firstScroller:stl.dialogListN,talkerBlockTheme:stl.talkerBlockN,activeLink:stl.activeLinkN, talkerBlockA:stl.talkerBlockA_N,msgMeDynamic:stl.myMsgN,
                    msgUserDynamic:stl.userMsgN,dialogAreaBackgroundNSecondScroll:stl.dialogAreaN,textAreaDynamic:stl.textareaN,sendBTNDynamic:stl.sendBTN_N,});
            case 'MORNING':return setThemes({...themes,dialogDynamic:stl.dialogM,firstScroller:stl.dialogListM,talkerBlockTheme:stl.talkerBlockM,activeLink:stl.activeLinkM, talkerBlockA:stl.talkerBlockA_M,msgMeDynamic:stl.myMsgM,
                    msgUserDynamic:stl.userMsgM,dialogAreaBackgroundNSecondScroll:stl.dialogAreaM,textAreaDynamic:stl.textareaM,sendBTNDynamic:stl.sendBTN_M,});
            case 'DAY'    :return setThemes({...themes,dialogDynamic:stl.dialogD,firstScroller:stl.dialogListD,talkerBlockTheme:stl.talkerBlockD,activeLink:stl.activeLinkD, talkerBlockA:stl.talkerBlockA_D,msgMeDynamic:stl.myMsgD,
                    msgUserDynamic:stl.userMsgD,dialogAreaBackgroundNSecondScroll:stl.dialogAreaD,textAreaDynamic:stl.textareaD,sendBTNDynamic:stl.sendBTN_D,});
            case'EVENING' :return setThemes({...themes,dialogDynamic:stl.dialogE,firstScroller: stl.dialogListE,talkerBlockTheme:stl.talkerBlockE,activeLink:stl.activeLinkE, talkerBlockA:stl.talkerBlockA_E,msgMeDynamic:stl.myMsgE,
                    msgUserDynamic:stl.userMsgE,dialogAreaBackgroundNSecondScroll:stl.dialogAreaE,textAreaDynamic:stl.textareaE,sendBTNDynamic:stl.sendBTN_E,});
    }},[state.colorTheme])
    

    return themes.dialogDynamic && <Dialogs
        // dialogIsLoading            =  { props.state.dialogIsLoading     }
        state       =  { state.props         }
        userIdInURL =  { match.params.userId }
        myId        =  { state.myId          }
        themes      =  { themes              }
        actions     =  { actions             }                 
    />;
}

type DialogsProps_type = {
    myId:        null|number
    state:       InitialDialogsState_Type
    themes:      Themes_Type 
    userIdInURL: undefined | string                                                                                   
    actions:     MRGProps_Type['actions']                                                                    
}


let Dialogs:React.FC<DialogsProps_type> =({myId,state,themes,userIdInURL,actions}) => {
    // console.log(typeof stl.visibility)

    const dialogArea  = useRef<HTMLDivElement>(null);
    const bufferBlock = useRef<HTMLDivElement>(null);

    interface AreaHeight {}
    type Error_Type   = {text?:string}

    let [dialogId,         setDialogId]         = useState(userIdInURL===undefined ? 0 : +userIdInURL);
    let [visibility,       setVisibility]       = useState<any>(stl.visibility); // !!!normally must be  stl.visibility !! else - null
    let [pageNumber,       setPageNumber]       = useState(2);
    let [msgsMapDone,      setMsgsMapDone]      = useState(false);
    let [dialogAreaHeight, setDialogAreaHeight] = useState<AreaHeight|any>(0);
    let [userNameInHeader, setUserNameInHeader] = useState('');

    type usePrevious = {current:number}

    // let usePrevious=(value:number)=> {let ref=useRef<object>();useEffect(()=>{ref.current=value});return ref.current;};             // пересмотреть логику работы!!
    // let prevCount:number = usePrevious(dialogAreaHeight);
    let prevCount = 0;
    let sendMessageListener = (userId:number,msg:string)=>{
        setDialogId(dialogId=userId);actions.sendMessageToUserThunk(userId,msg.substring(0, msg.length-1),'','')};
    let getTalk = (userId:number) => {setDialogId(dialogId=userId); actions.getTalkWithUserThunk(dialogId)};
    let scrollToDown = (bufferBlock:any) => {bufferBlock.current&&bufferBlock.current.scrollIntoView({behavior: "auto"})};

    let oldMsgLazyLoader=()=>{let msgCount=5;actions.addPrevMessagesThunk(dialogId,msgCount,pageNumber);setPageNumber(pageNumber+1)};

    useEffect(()=>{dialogArea?.current &&
        !state.prevMsgsIsLoading && dialogArea.current.scrollTo(0,dialogAreaHeight-prevCount)
    },[state.prevMsgsIsLoading])

    useEffect(()=>{dialogArea?.current &&
        setDialogAreaHeight(dialogAreaHeight=dialogArea.current.scrollHeight);
    return setDialogAreaHeight(0);
    }, [state] );
    useEffect(()=>{ /*msgsMapDone &&*/ scrollToDown(bufferBlock)},[msgsMapDone])

    // console.log(props.state.certainDialog);

    let submitter = (values:any) => {
        console.log(values)
    };

    // console.log( props.state.certainDialog )

    return <>
        <div className={`${stl.dialogsPage} ${themes.dialogDynamic}`}>
            <div className={stl.dialogListAndArea}>
                <div className={`${stl.dialogList} ${themes.firstScroller}`}>
                {state.dialogsList.length=== 0  && !state.errNegotiatorsListGet ?
                    <img className={stl.certainLoader} src={state.allDialogsLoader} alt="Err"/>
                    :
                    state.errNegotiatorsListGet?
                        <div className={stl.errorBlock}>
                            <h2>Error!</h2>
                            <div>
                                <img /* onLoad={true} */ src={state.errNegotiatorsListPIC} alt="Err"/>
                            </div>
                            <p>{state.errNegotiatorsListGet} Connection lost!</p>
                            <button className={`${stl.errBTN} ${themes.sendBTNDynamic}`}
                                    onClick={()=>actions.getMyNegotiatorsListThunk()}
                            >Try again</button>
                        </div>
                    :
                     state.dialogsList
                    .map((user, i) =>
                        <div className={`${stl.talkerBlock} ${themes.talkerBlockTheme}`} key={i} >
                            <NavLink to={`/profile/${user.id}`} >
                                <img  src={user.photos.large || state.defaultAvatar} alt="err"/>
                            </NavLink>
                            <NavLink to={`/dialogs/${user.id}`}
                                     onClick={() => {getTalk(user.id); setVisibility(stl.visibility);setUserNameInHeader(user.userName)}}
                                     className={themes.talkerBlockA}
                                     activeClassName={themes.activeLink}>
                                {user.userName}{user.hasNewMessages &&
                            <span>({user.newMessagesCount})</span> }
                            </NavLink>
                        </div>)}
            </div>
                <div className={stl.dialogsAreaAndSender}>
                    <div className={stl.editWrapper}>
                        <h2>{userNameInHeader}</h2>
                    <div className={ `${stl.editBlock} ${visibility}` } >
                        <h3>On button click makes immediate action</h3>
                    </div>
                </div>
                <div className={`${stl.dialogArea} ${themes.dialogAreaBackgroundNSecondScroll}`}
                     ref={dialogArea} 
                     onScroll={()=>!dialogArea?.current?.scrollTop && oldMsgLazyLoader()}
                     >
                <div className={stl.oldMsgsLoader}>
                    {state.prevMsgsIsLoading && <img src={state.prevMsgsLoader} alt=""/>}
                </div>

                { state.certainDialogIsLoading ? <img src={state.certainDialogLoader} alt="err"/>                                                         :
                  state.errCertainDialogGet  ? <div className={stl.errorBlock}> {state.errCertainDialogGet}</div> :
                  state?.certainDialog?.items
                   .map((msg, i,arr) =>{
                      if(msgsMapDone===false&&i===arr.length-1){return setMsgsMapDone(true)}
                      if(i===arr.length-1){scrollToDown(bufferBlock)}
                      return <div
                           key={i} 
                           className={myId!==null && +msg.senderId === +myId ?
                           `${stl.messageBlockMe} ${themes.msgMeDynamic} ` : `${stl.messageBlockUser} ${themes.msgUserDynamic}`}
                           id={msg.id}
                           onDoubleClick={()=> visibility ? setVisibility(null) : setVisibility(stl.visibility) }
                      >
                          <p className={stl.messageBody} >{msg.body}</p>
                          <p className={myId!==null && +msg.senderId === +myId ?
                              stl.messageBlockTimeMe : stl.messageBlockTimeUser} >{msg.addedAt}, {msg.viewed ? 'seen':'x'}</p>
                          <div className={stl.editWrapper}>
                              <div className={visibility}>
                                  <button onClick={()=> actions.deleteMessageThunk(msg.id,0)} > Delete now! </button>             {/* second argument is fake!!! */}
                                  {myId!==null && +msg.senderId !== +myId &&
                                  <button onClick={()=>actions.setSpamMessagesThunk(msg.id,0)}> To spam now!</button>}            {/* second argument is fake!!! */}
                              </div>
                          </div>
                      </div>
                   })}
                    <div ref={bufferBlock}/>
                </div>
                    <div className={stl.sender}>
                    <Formik initialValues={{text:''}} validate={values=>{const errors:Error_Type={};if(!values.text){errors.text='Required'} return errors}}
                            // onSubmit={(values,{setSubmitting})=>{sendMessageListener(dialogId,values.text);values.text='';setSubmitting(false);
                            onSubmit={ (values)=> submitter(values) }
                                >
                        {({values, errors,handleChange,handleSubmit,isSubmitting,}) => (
                            <form onSubmit={handleSubmit}>
                                <textarea name="text" onChange={handleChange} value={values.text} placeholder={errors.text}
                                className={`${themes.textAreaDynamic}`}
                                // onKeyUp={e=>{e.keyCode===13&&sendMessageListener(dialogId,values.text);values.text=''}}
                                />
                                <button type="submit" disabled={isSubmitting} className={`${stl.sendBTN} ${themes.sendBTNDynamic}` }
                                // onClick={()=>sendMessageListener(dialogId,values.text)}
                                > Send </button>
                            </form>
                        )}
                    </Formik>
                </div>
                </div>
            </div>
        </div>
    </>
};

type MSTP_Type = {
    props:      InitialDialogsState_Type 
    dialogACs:  DialogActions_Type
    myId:       null|number  
    colorTheme: string 
}

let mapStateToProps = (state:AppStateType):MSTP_Type => {
    return {
        // props:      getDialogsReducer         (state),
        props:      getSmartDialogsReducer    (state),
        dialogACs:  getDialogsACs_compDialogs (state),
        myId:       getMyId                   (state),
        colorTheme: getColorTheme             (state),
    }
};

type DispatchProps_Type = {dispatch: (action:any)=> void}

type MRGProps_Type = {
    state : MSTP_Type
    actions: {
    getMyNegotiatorsListThunk:() => void
    getTalkWithUserThunk     :(userId:number) => void
    sendMessageToUserThunk   :(userId:number,msg:string,actionKey:string,userName:string) => void                      
    talkedBeforeThunk        :(userId:number) => void
    setSelectedMessages      :(messageId:string) => void
    setSpamMessagesThunk     :(messageId:string, index:number) => void
    deleteMessageThunk       :(messageId:string, index:number) => void
    addPrevMessagesThunk     :(dialogId:number, msgCount:number, pageNumber:number) => void
    }
}

let mergeProps = (stateProps:MSTP_Type, dispatchProps:DispatchProps_Type):MRGProps_Type => {     
    const  state  = stateProps; const { dispatch } = dispatchProps;
    const getMyNegotiatorsListThunk = ()           => dispatch(state.dialogACs.getMyNegotiatorsListThunkAC ()          );
    const getTalkWithUserThunk      = (userId:number)     => dispatch(state.dialogACs.getTalkWithUserThunkAC      (userId)    );
    const sendMessageToUserThunk    = (userId:number,msg:string,actionKey:string,userName:string) => 
                                         dispatch(state.dialogACs.sendMessageToUserThunkAC    (userId,msg,actionKey,userName));
    const talkedBeforeThunk         = (userId:number)     => dispatch(state.dialogACs.talkedBeforeThunkAC         (userId)    );
    const setSelectedMessages       = (messageId:string)  => dispatch(state.dialogACs.setSelectedMessagesAC       (messageId) );
    const setSpamMessagesThunk      = (messageId:string, index:number)  => dispatch(state.dialogACs.setSpamMessagesThunkAC (messageId,index) );
    const deleteMessageThunk        = (messageId:string, index:number)  => dispatch(state.dialogACs.deleteMessageThunkAC   (messageId,index) );
    const addPrevMessagesThunk      = (dialogId:number, msgCount:number, pageNumber:number) =>
                                       dispatch(state.dialogACs.addPrevMessagesThunkAC(dialogId, msgCount, pageNumber) );
    const actions = {getMyNegotiatorsListThunk, getTalkWithUserThunk, sendMessageToUserThunk,
        talkedBeforeThunk, setSelectedMessages, setSpamMessagesThunk, deleteMessageThunk, addPrevMessagesThunk}

    return { state, actions }
};

export default compose (
  //@ts-ignore
    connect<MSTP_Type, {}, MRGProps_Type, AppStateType>(mapStateToProps, null, mergeProps),
    withRouter
    )(DialogFuncContainer);



    // state: {
    //     props: {
    //         allDialogsIsLoading: boolean
    //         allDialogsLoader:string
    //         certainDialog: CertainDialog_Type
    //         certainDialogIsLoading: boolean
    //         certainDialogLoader: string
    //         defaultAvatar: string
    //         dialogsList: DialogsList_Type[]
    //         errCertainDialogGet: string
    //         errGettingNewMSGSCount: boolean
    //         errNegotiatorsListGet: number
    //         errNegotiatorsListPIC: string
    //         feedbackArr: string[]
    //         keyArr: number[]
    //         msgLoader: string
    //         newMessageBTNDisabled: boolean
    //         newMessagesCounter: number
    //         onError: string
    //         onSendMSGStatArr: any[]
    //         prevMsgsIsLoading: boolean
    //         prevMsgsLoader: string
    //     }, 
    //     dialogACs: DialogActions_Type
    //     // {
    //     //     addPrevMessagesThunkAC: (userId:number, msgCount:number, pageNumber:number) => void
    //     //     createNewDialogAC: (userId:number, fullName:string, photos) => {…}
    //     //     deleteMessageThunkAC: (messageId, index) => {…}
    //     //     feedBackWindowCloserAC: arrIndex => ({ type: FEEDBACK_WINDOW_CLOSER, arrIndex })
    //     //     feedbackRefPushAC: el => ({ type: FEEDBACK_REF_PUSH, el })
    //     //     getMyNegotiatorsListThunkAC: () => {…}
    //     //     getNewMessagesRequestThunkAC: () => {…}
    //     //     getTalkWithUserThunkAC: userId => {…}
    //     //     sendMessageToUserThunkAC: (userId, body, actionKey, userName) => {…}
    //     //     setSelectedMessagesAC: messageId => {…}
    //     //     setSpamMessagesThunkAC: (messageId, index) => {…}
    //     //     talkedBeforeThunkAC: userId => {…}
    //     // }, 
    //     myId: number, 
    //     colorTheme: 'NIGHT' | "MORNING" | "DAY" | "EVENING"
    // }


// import React, {useState, useEffect, useRef}  from "react";
// import {connect}                             from "react-redux";
// import {compose}                             from 'redux';
// import {withRouter, NavLink}                 from 'react-router-dom';
// import {Formik}                              from 'formik';
// import stl                                   from './dialogs.module.css';
// import {
//     getColorTheme,
//     getDialogsACs_compDialogs,
//     getDialogsReducer,
//     getMyId, getSmartDialogsReducer
// } from "../../../redux/selectors";


// function DialogFuncContainer (props) { /*console.log(props.state.props.errNegotiatorsListGet)*/
//     useEffect(()=> {
//         let userId = props.match.params.userId;
//         userId ? props.talkedBeforeThunk(userId) : props.getMyNegotiatorsListThunk();
//     },[])

//     let [themes, setThemes] = useState({dialogDynamic:'',firstScroller:'',talkerBlockTheme:'',activeLink:'', talkerBlockA:'',msgMeDynamic:'',msgUserDynamic:'',dialogAreaBackgroundNSecondScroll:'', textAreaDynamic:'',sendBTNDynamic:''})
//     useEffect(()=> {
//         switch (props.state.colorTheme) {
//             case 'NIGHT'  :return setThemes({...themes,dialogDynamic:stl.dialogN,firstScroller:stl.dialogListN,talkerBlockTheme:stl.talkerBlockN,activeLink:stl.activeLinkN, talkerBlockA:stl.talkerBlockA_N,msgMeDynamic:stl.myMsgN,
//                     msgUserDynamic:stl.userMsgN,dialogAreaBackgroundNSecondScroll:stl.dialogAreaN,textAreaDynamic:stl.textareaN,sendBTNDynamic:stl.sendBTN_N,});
//             case 'MORNING':return setThemes({...themes,dialogDynamic:stl.dialogM,firstScroller:stl.dialogListM,talkerBlockTheme:stl.talkerBlockM,activeLink:stl.activeLinkM, talkerBlockA:stl.talkerBlockA_M,msgMeDynamic:stl.myMsgM,
//                     msgUserDynamic:stl.userMsgM,dialogAreaBackgroundNSecondScroll:stl.dialogAreaM,textAreaDynamic:stl.textareaM,sendBTNDynamic:stl.sendBTN_M,});
//             case 'DAY'    :return setThemes({...themes,dialogDynamic:stl.dialogD,firstScroller:stl.dialogListD,talkerBlockTheme:stl.talkerBlockD,activeLink:stl.activeLinkD, talkerBlockA:stl.talkerBlockA_D,msgMeDynamic:stl.myMsgD,
//                     msgUserDynamic:stl.userMsgD,dialogAreaBackgroundNSecondScroll:stl.dialogAreaD,textAreaDynamic:stl.textareaD,sendBTNDynamic:stl.sendBTN_D,});
//             case'EVENING' :return setThemes({...themes,dialogDynamic:stl.dialogE,firstScroller: stl.dialogListE,talkerBlockTheme:stl.talkerBlockE,activeLink:stl.activeLinkE, talkerBlockA:stl.talkerBlockA_E,msgMeDynamic:stl.myMsgE,
//                     msgUserDynamic:stl.userMsgE,dialogAreaBackgroundNSecondScroll:stl.dialogAreaE,textAreaDynamic:stl.textareaE,sendBTNDynamic:stl.sendBTN_E,});
//         }},[props.state.colorTheme])


//     return themes.dialogDynamic && <Dialogs
//                     state                      =  { props.state.props               }
//                     getTalkWithUserThunk       =  { props.getTalkWithUserThunk      }
//                     getMyNegotiatorsListThunk  =  { props.getMyNegotiatorsListThunk }
//                     sendMessageToUserThunk     =  { props.sendMessageToUserThunk    }
//                     userIdInURL                =  { props.match.params.userId       }
//                     myId                       =  { props.state.myId                }
//                     dialogIsLoading            =  { props.state.dialogIsLoading     }
//                     setSelectedMessages        =  { props.setSelectedMessages       }
//                     setSpamMessagesThunk       =  { props.setSpamMessagesThunk      }
//                     deleteMessageThunk         =  { props.deleteMessageThunk        }
//                     addPrevMessagesThunk       =  { props.addPrevMessagesThunk      }
//                     colorTheme                 =  { props.state.colorTheme          }
//                     themes                     =  { themes                          }
//     />;
// }

// function Dialogs(props) {
//     // console.log('render');

//     // console.log(props.state.certainDialogIsLoading)

//     const dialogArea  = useRef(null);
//     const bufferBlock = useRef('');

//     let [dialogId,         setDialogId]          = useState(+props.userIdInURL);
//     let [visibility,       setVisibility]        = useState(stl.visibility); // !!!normally must be  stl.visibility !! else - null
//     let [pageNumber,       setPageNumber]        = useState(2);
//     let [msgsMapDone,      setMsgsMapDone]       = useState(false);
//     let [dialogAreaHeight, setDialogAreaHeight]  = useState(0);
//     let [userNameInHeader, setUserNameInHeader]  = useState('');

//     let usePrevious=(value)=> {let ref=useRef();useEffect(()=>{console.log(ref); ref.current=value});return ref.current;};
//     let prevCount = usePrevious(dialogAreaHeight);
//     let sendMessageListener = (userId,msg)=>{debugger;setDialogId(dialogId=userId);props.sendMessageToUserThunk(userId,msg.substring(0, msg.length-1))};
//     let getTalk = (userId) => {setDialogId(dialogId=userId); props.getTalkWithUserThunk(dialogId)};
//     let scrollToDown = (bufferBlock) => {bufferBlock.current&&bufferBlock.current.scrollIntoView({behavior: "auto"})};

//     let oldMsgLazyLoader=()=>{let msgCount=5;props.addPrevMessagesThunk(dialogId,msgCount,pageNumber);setPageNumber(pageNumber+1)};

//     useEffect(()=>{!props.state.prevMsgsIsLoading && dialogArea.current.scrollTo(0,dialogAreaHeight-prevCount)
//     },[props.state.prevMsgsIsLoading])
//     useEffect(()=>{setDialogAreaHeight(dialogAreaHeight=dialogArea.current.scrollHeight);
//     return setDialogAreaHeight(0);
//     }, [props.state] );
//     useEffect(()=>{ /*msgsMapDone &&*/ scrollToDown(bufferBlock)},[msgsMapDone])

//     // console.log(props.state.certainDialog);

//     let submitter = (values) => {
//         console.log(values)
//     };

//     // console.log( props.state.certainDialog )

//     return <>
//         <div className={`${stl.dialogsPage} ${props.themes.dialogDynamic}`}>
//             <div className={stl.dialogListAndArea}>
//                 <div className={`${stl.dialogList} ${props.themes.firstScroller}`}>
//                 {props.state.dialogsList.length=== 0  && !props.state.errNegotiatorsListGet ?
//                     <img className={stl.certainLoader} src={props.state.allDialogsLoader} alt="Err"/>
//                     :
//                     props.state.errNegotiatorsListGet?
//                         <div className={stl.errorBlock}>
//                             <h2>Error!</h2>
//                             <div>
//                                 <img onLoad={true} src={props.state.errNegotiatorsListPIC} alt="Err"/>
//                             </div>
//                             <p>{props.state.errNegotiatorsListGet} Connection lost!</p>
//                             <button className={`${stl.errBTN} ${props.themes.sendBTNDynamic}`}
//                                     onClick={()=>props.getMyNegotiatorsListThunk()}
//                             >Try again</button>
//                         </div>
//                     :
//                      props.state.dialogsList
//                     .map((user, i) =>
//                         <div className={`${stl.talkerBlock} ${props.themes.talkerBlockTheme}`} key={i} >
//                             <NavLink to={`/profile/${user.id}`} >
//                                 <img  src={user.photos.large || props.state.defaultAvatar} alt="err"/>
//                             </NavLink>
//                             <NavLink to={`/dialogs/${user.id}`}
//                                      onClick={() => {getTalk(user.id); setVisibility(stl.visibility);setUserNameInHeader(user.userName)}}
//                                      className={props.themes.talkerBlockA}
//                                      activeClassName={props.themes.activeLink}>
//                                 {user.userName}{user.hasNewMessages &&
//                             <span>({user.newMessagesCount})</span> }
//                             </NavLink>
//                         </div>)}
//             </div>
//                 <div className={stl.dialogsAreaAndSender}>
//                     <div className={stl.editWrapper}>
//                         <h2>{userNameInHeader}</h2>
//                     <div className={ `${stl.editBlock} ${visibility}` } >
//                         <h3>On button click makes immediate action</h3>
//                     </div>
//                 </div>
//                 <div className={`${stl.dialogArea} ${props.themes.dialogAreaBackgroundNSecondScroll}`}
//                      ref={dialogArea} onScroll={()=>!dialogArea.current.scrollTop && oldMsgLazyLoader()}>
//                 <div className={stl.oldMsgsLoader}>
//                     {props.state.prevMsgsIsLoading && <img src={props.state.prevMsgsLoader} alt=""/>}
//                 </div>

//                 { props.state.certainDialogIsLoading ? <img src={props.state.certainDialogLoader} alt="err"/>                                                         :
//                   props.state.errCertainDialogGet  ? <div className={stl.errorBlock}> {props.state.errCertainDialogGet}</div> :
//                   props.state.certainDialog.items
//                    .map((msg, i,arr) =>{
//                       if(msgsMapDone===false&&i===arr.length-1){return setMsgsMapDone(true)}
//                       if(i===arr.length-1){scrollToDown(bufferBlock)}
//                       return <div
//                            key={i} className={+msg.senderId === +props.myId ?
//                            `${stl.messageBlockMe} ${props.themes.msgMeDynamic} ` : `${stl.messageBlockUser} ${props.themes.msgUserDynamic}`}
//                            id={msg.id}
//                            onDoubleClick={()=> visibility ? setVisibility(null) : setVisibility(stl.visibility) }
//                       >
//                           <p className={stl.messageBody} >{msg.body}</p>
//                           <p className={+msg.senderId === +props.myId ?
//                               stl.messageBlockTimeMe : stl.messageBlockTimeUser} >{msg.addedAt}, {msg.viewed ? 'seen':'x'}</p>
//                           <div className={stl.editWrapper}>
//                               <div className={visibility}>
//                                   <button onClick={()=> props.deleteMessageThunk(msg.id, i)} > Delete now! </button>
//                                   {+msg.senderId !== +props.myId &&
//                                   <button onClick={()=>props.setSpamMessagesThunk(msg.id, i)}> To spam now!</button>}
//                               </div>
//                           </div>
//                       </div>
//                    })}
//                     <div ref={bufferBlock}/>
//                 </div>
//                     <div className={stl.sender}>
//                     <Formik initialValues={{text:''}} validate={values=>{const errors={};if(!values.text){errors.text='Required'} return errors}}
//                             // onSubmit={(values,{setSubmitting})=>{sendMessageListener(dialogId,values.text);values.text='';setSubmitting(false);
//                             onSubmit={ (values)=> submitter(values) }
//                                 >
//                         {({values, errors,handleChange,handleSubmit,isSubmitting,}) => (
//                             <form onSubmit={handleSubmit}>
//                                 <textarea name="text" onChange={handleChange} value={values.text} placeholder={errors.text}
//                                 className={`${props.themes.textAreaDynamic}`}
//                                 // onKeyUp={e=>{e.keyCode===13&&sendMessageListener(dialogId,values.text);values.text=''}}
//                                 />
//                                 <button type="submit" disabled={isSubmitting} className={`${stl.sendBTN} ${props.themes.sendBTNDynamic}` }
//                                 // onClick={()=>sendMessageListener(dialogId,values.text)}
//                                 > Send </button>
//                             </form>
//                         )}
//                     </Formik>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     </>
// };


// let mapStateToProps = (state) => {
//     return {
//         // props:      getDialogsReducer         (state),
//         props:      getSmartDialogsReducer    (state),
//         dialogACs:  getDialogsACs_compDialogs (state),
//         myId:       getMyId                   (state),
//         colorTheme: getColorTheme             (state),
//     }
// };

// let mergeProps = (stateProps, dispatchProps) => { const  state  = stateProps; const { dispatch } = dispatchProps;
//     const getMyNegotiatorsListThunk = ()           => dispatch(state.dialogACs.getMyNegotiatorsListThunkAC ()          );
//     const getTalkWithUserThunk      = (userId)     => dispatch(state.dialogACs.getTalkWithUserThunkAC      (userId)    );
//     const sendMessageToUserThunk    = (userId,msg) => dispatch(state.dialogACs.sendMessageToUserThunkAC    (userId,msg));
//     const talkedBeforeThunk         = (userId)     => dispatch(state.dialogACs.talkedBeforeThunkAC         (userId)    );
//     const setSelectedMessages       = (messageId)  => dispatch(state.dialogACs.setSelectedMessagesAC       (messageId) );
//     const setSpamMessagesThunk      = (messageId)  => dispatch(state.dialogACs.setSpamMessagesThunkAC      (messageId) );
//     const deleteMessageThunk        = (messageId)  => dispatch(state.dialogACs.deleteMessageThunkAC        (messageId) );
//     const addPrevMessagesThunk      = (dialogId, msgCount, pageNumber) =>
//                                        dispatch(state.dialogACs.addPrevMessagesThunkAC(dialogId, msgCount, pageNumber) );

//     return {state, getMyNegotiatorsListThunk, getTalkWithUserThunk, sendMessageToUserThunk,
//         talkedBeforeThunk, setSelectedMessages, setSpamMessagesThunk, deleteMessageThunk, addPrevMessagesThunk }
// };

// export default compose (
//     connect(mapStateToProps, null, mergeProps),
//     withRouter
//     )(DialogFuncContainer);



// const sendMessage = (msg) => {
//     let date = new Date();
//     let data=`${("0"+date.getDate()).slice(-2)}.${("0"+(date.getMonth()+1)).slice(-2)}.${(date.getFullYear()-2000)}`;
//     let time=`${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`;
//     dispatch(state.dialogACs.sendMessageToUserAC(msg, data, time))
// };