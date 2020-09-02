import React, {useState}      from "react";
import {connect}              from "react-redux";
import { compose }            from 'redux';
import {withRouter, NavLink}  from 'react-router-dom';
import {Formik}               from 'formik';
import stl                    from './dialogs.module.css';

function Dialogs(props) {
    // console.log(props.userIdInURL);

    let [dialogId, setDialogId]            = useState(+props.userIdInURL);
    let [visibility,  setVisibility]       = useState(stl.visibility); // !!!normally must be  stl.visibility !! else - null
    let selectedMsg = null;
    selectedMsg ? selectedMsg = null : selectedMsg = stl.selectedMsg;

    const sendMessageListener = (userId, msg)=> { setDialogId(dialogId=userId); props.sendMessageToUserThunk(userId, msg)};
    const getTalk = (userId) => { setDialogId(dialogId=userId); props.getTalkWithUserThunk(dialogId) };

    return <>
        <div className={stl.dialogsPage}>
            <div className={stl.dialogListAndArea}>
                <div className={stl.dialogList}>
                {props.state.dialogsList.length === 0 ?
                    <img className={stl.certainLoader} src={props.state.allDialogsLoader} alt="Err"/> :
                     props.state.dialogsList
                    .map((user, i) =>
                        <div className={stl.talkerBlock} key={i} >
                            <NavLink to={`/profile/${user.id}`}>
                                <img  src={user.photos.large || props.state.defaultAvatar} alt="err"/>
                            </NavLink>
                            <NavLink to={`/dialogs/${user.id}`}
                                     onClick={() => {getTalk(user.id); setVisibility(stl.visibility)}}
                                     activeClassName={stl.activeLink}>
                                {user.userName}{user.hasNewMessages &&
                            <span>({user.newMessagesCount})</span> }
                            </NavLink>
                        </div>)}
            </div>
                <div className={stl.dialogsAreaAndSender}>
                <div className={stl.editWrapper}>
                    <div className={ `${stl.editBlock} ${visibility}` } >
                        <h3>On button click makes immediate action</h3>
                    </div>
                </div>

                <div className={stl.dialogArea} >
                    {Object.keys(props.state.certainDialog).length === 0 && props.userIdInURL ||
                    !props.state.certainDialog.items && props.userIdInURL ?
                    <img src={props.state.certainDialogLoader} alt="err"/>  :
                    props.state.certainDialog.items && props.state.certainDialog.items
                        .map((msg, i) =>
                            <div  key={i} className={+msg.senderId === +props.myId ?
                                `${stl.messageBlockMe} ` : `${stl.messageBlockUser}` }
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
                                </div></div>
                            </div>
                        )}
                </div>
                <div className={stl.sender}>
                    <Formik initialValues={{text:''}} validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
                            onSubmit={(values,{setSubmitting})=>{sendMessageListener(dialogId, values.text);values.text='';setSubmitting(false);
                            }}>
                        {({values, errors,handleChange, handleSubmit, isSubmitting,}) => (
                            <form onSubmit={handleSubmit}>
                                <textarea name="text" onChange={handleChange} value={values.text} placeholder={errors.text}
                                onKeyUp={ (e)=>{ e.keyCode === 13
                                    &&  sendMessageListener(dialogId, values.text); values.text=''; }}
                                />
                                <button type="submit" disabled={isSubmitting} className={stl.sendBTN}> Send </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            </div>
        </div>
    </>
};

class DialogFuncContainer extends React.Component { constructor(props) {super(props);
    // console.log(props.state.dialogACs)
}
    componentDidMount() {
        this.props.getMyNegotiatorsListThunk();
        let userId = this.props.match.params.userId;
        // if (userId) this.props.getTalkWithUserThunk(userId)
        if (userId) this.props.talkedBeforeThunk(userId)
    }
    setSelectedMessages = (messageId) => { this.props.state.dialogACs.setSelectedMessagesAC(messageId) };

    render() {
        return <Dialogs state                   =  { this.props.state.props            }
                        getTalkWithUserThunk    =  { this.props.getTalkWithUserThunk   }
                        sendMessageToUserThunk  =  { this.props.sendMessageToUserThunk }
                        userIdInURL             =  { this.props.match.params.userId    }
                        myId                    =  { this.props.state.myId             }
                        dialogIsLoading         =  { this.props.state.dialogIsLoading  }
                        setSelectedMessages     =  { this.props.setSelectedMessages    }
                        setSpamMessagesThunk    =  { this.props.setSpamMessagesThunk   }
                        deleteMessageThunk      =  { this.props.deleteMessageThunk     }
        />;
    }
}

let mapStateToProps = (state) => {
    //     // console.log(state)
    return {
        props: state.dialogsReducer,
        dialogACs: state.dialogACs,
        myId: state.appAuthReducer.id,
    }
};
let mergeProps = (stateProps, dispatchProps) => { const  state  = stateProps; const { dispatch } = dispatchProps;
    // console.log(state)
    const getMyNegotiatorsListThunk = ()           => dispatch(state.dialogACs.getMyNegotiatorsListThunkAC ()          );
    const getTalkWithUserThunk      = (userId)     => dispatch(state.dialogACs.getTalkWithUserThunkAC      (userId)    );
    const sendMessageToUserThunk    = (userId,msg) => dispatch(state.dialogACs.sendMessageToUserThunkAC    (userId,msg));
    const talkedBeforeThunk         = (userId)     => dispatch(state.dialogACs.talkedBeforeThunkAC         (userId)    );
    const setSelectedMessages       = (messageId)  => dispatch(state.dialogACs.setSelectedMessagesAC       (messageId) );
    const setSpamMessagesThunk      = (messageId)  => dispatch(state.dialogACs.setSpamMessagesThunkAC      (messageId) );
    const deleteMessageThunk        = (messageId)  => dispatch(state.dialogACs.deleteMessageThunkAC        (messageId) );

    return {state, getMyNegotiatorsListThunk, getTalkWithUserThunk, sendMessageToUserThunk,
        talkedBeforeThunk, setSelectedMessages, setSpamMessagesThunk, deleteMessageThunk }
};

export default compose (
    connect(mapStateToProps, null, mergeProps),
    withRouter
    )(DialogFuncContainer);

// const sendMessage = (msg) => {
//     let date = new Date();
//     let data=`${("0"+date.getDate()).slice(-2)}.${("0"+(date.getMonth()+1)).slice(-2)}.${(date.getFullYear()-2000)}`;
//     let time=`${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`;
//     dispatch(state.dialogACs.sendMessageToUserAC(msg, data, time))
// };