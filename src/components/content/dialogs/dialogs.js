import React, {useState, useEffect, useRef}  from "react";
import {connect}                             from "react-redux";
import {compose}                             from 'redux';
import {withRouter, NavLink}                 from 'react-router-dom';
import {Formik}                              from 'formik';
import stl                                   from './dialogs.module.css';
import {
    getColorTheme,
    getDialogsACs_compDialogs,
    getDialogsReducer,
    getMyId, getSmartDialogsReducer
} from "../../../redux/selectors";


function DialogFuncContainer (props) {
    // console.log(props)
    useEffect(()=> {
        props.getMyNegotiatorsListThunk();
        let userId = props.match.params.userId;
        if (userId) props.talkedBeforeThunk(userId)
    },[])

    let setSelectedMessages = (messageId) => { props.state.dialogACs.setSelectedMessagesAC(messageId) };

    let [themes, setThemes] = useState({dialogDynamic:'',firstScroller:'',talkerBlockTheme:'',activeLink:'', talkerBlockA:'',msgMeDynamic:'',msgUserDynamic:'',dialogAreaBackgroundNSecondScroll:'', textAreaDynamic:'',sendBTNDynamic:''})
    useEffect(()=> {
        switch (props.state.colorTheme) {
            case 'NIGHT'  :return setThemes({...themes,dialogDynamic:stl.dialogN,firstScroller:stl.dialogListN,talkerBlockTheme:stl.talkerBlockN,activeLink:stl.activeLinkN, talkerBlockA:stl.talkerBlockA_N,msgMeDynamic:stl.myMsgN,
                    msgUserDynamic:stl.userMsgN,dialogAreaBackgroundNSecondScroll:stl.dialogAreaN,textAreaDynamic:stl.textareaN,sendBTNDynamic:stl.sendBTN_N,});
            case 'MORNING':return setThemes({...themes,dialogDynamic:stl.dialogM,firstScroller:stl.dialogListM,talkerBlockTheme:stl.talkerBlockM,activeLink:stl.activeLinkM, talkerBlockA:stl.talkerBlockA_M,msgMeDynamic:stl.myMsgM,
                    msgUserDynamic:stl.userMsgM,dialogAreaBackgroundNSecondScroll:stl.dialogAreaM,textAreaDynamic:stl.textareaM,sendBTNDynamic:stl.sendBTN_M,});
            case 'DAY'    :return setThemes({...themes,dialogDynamic:stl.dialogD,firstScroller:stl.dialogListD,talkerBlockTheme:stl.talkerBlockD,activeLink:stl.activeLinkD, talkerBlockA:stl.talkerBlockA_D,msgMeDynamic:stl.myMsgD,
                    msgUserDynamic:stl.userMsgD,dialogAreaBackgroundNSecondScroll:stl.dialogAreaD,textAreaDynamic:stl.textareaD,sendBTNDynamic:stl.sendBTN_D,});
            case'EVENING' :return setThemes({...themes,dialogDynamic:stl.dialogE,firstScroller: stl.dialogListE,talkerBlockTheme:stl.talkerBlockE,activeLink:stl.activeLinkE, talkerBlockA:stl.talkerBlockA_E,msgMeDynamic:stl.myMsgE,
                    msgUserDynamic:stl.userMsgE,dialogAreaBackgroundNSecondScroll:stl.dialogAreaE,textAreaDynamic:stl.textareaE,sendBTNDynamic:stl.sendBTN_E,});
        }},[props.state.colorTheme])

    return themes.dialogDynamic && <Dialogs state                   =  { props.state.props            }
                    getTalkWithUserThunk    =  { props.getTalkWithUserThunk   }
                    sendMessageToUserThunk  =  { props.sendMessageToUserThunk }
                    userIdInURL             =  { props.match.params.userId    }
                    myId                    =  { props.state.myId             }
                    dialogIsLoading         =  { props.state.dialogIsLoading  }
                    setSelectedMessages     =  { props.setSelectedMessages    }
                    setSpamMessagesThunk    =  { props.setSpamMessagesThunk   }
                    deleteMessageThunk      =  { props.deleteMessageThunk     }
                    addPrevMessagesThunk    =  { props.addPrevMessagesThunk   }
                    colorTheme              =  { props.state.colorTheme       }
                    themes                  =  { themes                       }
    />;
}

function Dialogs(props) {
    console.log('render');

    const dialogArea  = useRef(null);
    const bufferBlock = useRef('');

    let [dialogId,         setDialogId]          = useState(+props.userIdInURL);
    let [visibility,       setVisibility]        = useState(stl.visibility); // !!!normally must be  stl.visibility !! else - null
    let [pageNumber,       setPageNumber]        = useState(2);
    let [msgsMapDone,      setMsgsMapDone]       = useState(false);
    let [dialogAreaHeight, setDialogAreaHeight]  = useState(0);
    let [userNameInHeader, setUserNameInHeader]  = useState('')

    let usePrevious=(value)=> {let ref=useRef();useEffect(()=>{ref.current=value});return ref.current;};
    let prevCount = usePrevious(dialogAreaHeight);
    let sendMessageListener = (userId,msg)=>{setDialogId(dialogId=userId);props.sendMessageToUserThunk(userId,msg.substring(0, msg.length-1))};
    let getTalk = (userId) => {setDialogId(dialogId=userId); props.getTalkWithUserThunk(dialogId)};
    let scrollToDown = (bufferBlock) => {bufferBlock.current&&bufferBlock.current.scrollIntoView({behavior: "auto"})};

    let oldMsgLazyLoader=()=>{let msgCount=5;props.addPrevMessagesThunk(dialogId,msgCount,pageNumber);setPageNumber(pageNumber+1)};

    useEffect(()=> {!props.state.prevMsgsIsLoading && dialogArea.current.scrollTo(0,dialogAreaHeight-prevCount)
    },[props.state.prevMsgsIsLoading])

    useEffect( ()=>{setDialogAreaHeight(dialogAreaHeight=dialogArea.current.scrollHeight);
    return setDialogAreaHeight(0);
    }, [props.state] );

    useEffect( ()=>{ /*msgsMapDone &&*/ scrollToDown(bufferBlock)},[msgsMapDone])

    return <>
        <div className={`${stl.dialogsPage} ${props.themes.dialogDynamic}`}>
            <div className={stl.dialogListAndArea}>
                <div className={`${stl.dialogList} ${props.themes.firstScroller}`}>
                {props.state.dialogsList.length === 0 ?
                    <img className={stl.certainLoader} src={props.state.allDialogsLoader} alt="Err"/> :
                     props.state.dialogsList
                    .map((user, i) =>
                        <div className={`${stl.talkerBlock} ${props.themes.talkerBlockTheme}`} key={i} >
                            <NavLink to={`/profile/${user.id}`} >
                                <img  src={user.photos.large || props.state.defaultAvatar} alt="err"/>
                            </NavLink>
                            <NavLink to={`/dialogs/${user.id}`}
                                     onClick={() => {getTalk(user.id); setVisibility(stl.visibility);setUserNameInHeader(user.userName)}}
                                     className={props.themes.talkerBlockA}
                                     activeClassName={props.themes.activeLink}>
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
                <div className={`${stl.dialogArea} ${props.themes.dialogAreaBackgroundNSecondScroll}`}
                     ref={dialogArea} onScroll={()=>!dialogArea.current.scrollTop && oldMsgLazyLoader()}>
                <div className={stl.oldMsgsLoader}>
                    {props.state.prevMsgsIsLoading && <img src={props.state.prevMsgsLoader} alt=""/>}
                </div>
                {Object.keys(props.state.certainDialog).length === 0 && props.userIdInURL ||
                !props.state.certainDialog.items && props.userIdInURL ?
                <img src={props.state.certainDialogLoader} alt="err"/>  :
                props.state.certainDialog.items && props.state.certainDialog.items
                   .map((msg, i,arr) =>{
                      if(msgsMapDone===false&&i===arr.length-1){return setMsgsMapDone(true)}
                      if(i===arr.length-1){scrollToDown(bufferBlock)}
                      return <div
                           key={i} className={+msg.senderId === +props.myId ?
                           `${stl.messageBlockMe} ${props.themes.msgMeDynamic} ` : `${stl.messageBlockUser} ${props.themes.msgUserDynamic}`}
                           id={msg.id}
                           onDoubleClick={()=> visibility ? setVisibility(null) : setVisibility(stl.visibility) }
                      >
                          <p className={stl.messageBody} >{msg.body}</p>
                          <p className={+msg.senderId === +props.myId ?
                              stl.messageBlockTimeMe : stl.messageBlockTimeUser} >{msg.addedAt}, {msg.viewed ? 'seen':'x'}</p>
                          <div className={stl.editWrapper}>
                              <div className={visibility}>
                                  <button onClick={()=> props.deleteMessageThunk(msg.id, i)} > Delete now! </button>
                                  {+msg.senderId !== +props.myId &&
                                  <button onClick={()=>props.setSpamMessagesThunk(msg.id, i)}> To spam now!</button>}
                              </div>
                          </div>
                      </div>
                   })}
                    <div ref={bufferBlock}/>
                </div>
                    <div className={stl.sender}>
                    <Formik initialValues={{text:''}} validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
                            onSubmit={(values,{setSubmitting})=>{sendMessageListener(dialogId,values.text);values.text='';setSubmitting(false);
                            }}>
                        {({values, errors,handleChange,handleSubmit,isSubmitting,}) => (
                            <form onSubmit={handleSubmit}>
                                <textarea name="text" onChange={handleChange} value={values.text} placeholder={errors.text}
                                className={`${props.themes.textAreaDynamic}`}
                                onKeyUp={e=>{e.keyCode===13&&sendMessageListener(dialogId,values.text);values.text=''
                                }}
                                    />
                                <button type="submit" disabled={isSubmitting} className={`${stl.sendBTN} ${props.themes.sendBTNDynamic}` }
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


let mapStateToProps = (state) => {
    return {
        // props:      getDialogsReducer         (state),
        props:      getSmartDialogsReducer    (state),
        dialogACs:  getDialogsACs_compDialogs (state),
        myId:       getMyId                   (state),
        colorTheme: getColorTheme             (state),
    }
};

let mergeProps = (stateProps, dispatchProps) => { const  state  = stateProps; const { dispatch } = dispatchProps;
    const getMyNegotiatorsListThunk = ()           => dispatch(state.dialogACs.getMyNegotiatorsListThunkAC ()          );
    const getTalkWithUserThunk      = (userId)     => dispatch(state.dialogACs.getTalkWithUserThunkAC      (userId)    );
    const sendMessageToUserThunk    = (userId,msg) => dispatch(state.dialogACs.sendMessageToUserThunkAC    (userId,msg));
    const talkedBeforeThunk         = (userId)     => dispatch(state.dialogACs.talkedBeforeThunkAC         (userId)    );
    const setSelectedMessages       = (messageId)  => dispatch(state.dialogACs.setSelectedMessagesAC       (messageId) );
    const setSpamMessagesThunk      = (messageId)  => dispatch(state.dialogACs.setSpamMessagesThunkAC      (messageId) );
    const deleteMessageThunk        = (messageId)  => dispatch(state.dialogACs.deleteMessageThunkAC        (messageId) );
    const addPrevMessagesThunk      = (dialogId, msgCount, pageNumber) =>
                                       dispatch(state.dialogACs.addPrevMessagesThunkAC(dialogId, msgCount, pageNumber) );

    return {state, getMyNegotiatorsListThunk, getTalkWithUserThunk, sendMessageToUserThunk,
        talkedBeforeThunk, setSelectedMessages, setSpamMessagesThunk, deleteMessageThunk, addPrevMessagesThunk }
};

export const DialogsComposer = compose (
    connect(mapStateToProps, null, mergeProps),
    withRouter
    )(DialogFuncContainer);

// const sendMessage = (msg) => {
//     let date = new Date();
//     let data=`${("0"+date.getDate()).slice(-2)}.${("0"+(date.getMonth()+1)).slice(-2)}.${(date.getFullYear()-2000)}`;
//     let time=`${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`;
//     dispatch(state.dialogACs.sendMessageToUserAC(msg, data, time))
// };