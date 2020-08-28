import React, {useState}      from "react";
import {connect}              from "react-redux";
import { compose }            from 'redux';
import {withRouter, NavLink}  from 'react-router-dom';
import {Formik}               from 'formik';
import stl                    from './dialogs.module.css';

function Dialogs(props) {
    console.log(props);

    let [dialogId, setDialogId]            = useState(+props.userIdInURL);
    let [visibility,  setVisibility]       = useState(null); // !!!normally must be  stl.visibility !! else - null
    let [selectedMsgs, setSelectedMsgs]    = useState(0)

    // let messagesAccum = [];
    let messagesAccum = props.state.selectedMsgs;
    // console.log(messagesAccum)

    const sendMessageListener = (userId, msg)=> { setDialogId(dialogId=userId); props.sendMessageToUserThunk(userId, msg) };
    const getTalk = (userId) => { setDialogId(dialogId=userId); props.getTalkWithUserThunk(dialogId) };

    const messageSorter =(id) => {
        // debugger
        let item = messagesAccum.findIndex((el)=> (el === id));
        item ===-1 ? messagesAccum.push(id) : messagesAccum.splice(item, 1);
        console.log(messagesAccum.length)
        
        // setSelectedMsgs(selectedMsgs = messagesAccum.length)
    };

    let DialogItem = props => {   //console.log(props)
        let [selectedMsg, setSelectedMsg] = useState(null);
        const selectMsg = (e) => {  /*console.log(props.msg)*/
            selectedMsg ? setSelectedMsg(null) : setSelectedMsg(stl.selectedMsg);
            e.currentTarget.className = +props.msg.senderId === +props.myId ?
                `${stl.messageBlockMe} ${selectedMsg}` : `${stl.messageBlockUser} ${selectedMsg}`;
            messageSorter(props.msg.id)
        };

        return <>
            <div className={+props.msg.senderId === +props.myId ?
                `${stl.messageBlockMe} ${selectedMsg}` : `${stl.messageBlockUser} ${selectedMsg}` }
                 id={props.msg.id}
                 onDoubleClick={()=> setVisibility(null) }
                 onClick={(e)=>!visibility && selectMsg(e) }
            >
                <p className={stl.messageBody} >{props.msg.body}</p>
                <p className={+props.msg.senderId === +props.myId ?
                    stl.messageBlockTimeMe : stl.messageBlockTimeUser} >{props.msg.addedAt}, {props.msg.viewed ? 'seen':'x'}</p>
                <h3 >{props.msg.senderId}</h3>
            </div>
            </>
    }

    return <>
        <div className={stl.dialogsPage}>
            <div className={stl.dialogList}>
                {props.state.dialogsList.length === 0 ?
                    <img className={stl.certainLoader} src={props.state.allDialogsLoader} alt="Err"/> :
                     props.state.dialogsList
                    .map((user, i) =>
                        <div className={stl.talkerBlock} key={i} >
                            <NavLink to={`/profile/${user.id}`}>
                                <img  src={user.photos.large || props.state.defaultAvatar} alt="err"/>
                            </NavLink>
                            <NavLink to={`/dialogs/${user.id}`}  onClick={() => getTalk(user.id)} activeClassName={stl.activeLink}>
                                {user.userName}{user.hasNewMessages &&
                            <span>({user.newMessagesCount})</span> }
                            </NavLink>
                        </div>)}
            </div>
            <div className={stl.dialogsAreaAndSender}>

                <div className={stl.editWrapper}>

                    <div className={ `${stl.editBlock} ${visibility}` } >

                        <h4>Selected: {selectedMsgs}</h4>
                        <button>Delete</button>
                        <button>MarkAsSpam</button>
                        <button onClick={()=> setVisibility(stl.visibility)}>Close</button>

                    </div>
                </div>

                <div className={stl.dialogArea} >
                    {  Object.keys(props.state.certainDialog).length === 0 || !props.state.certainDialog.items  ?
                    <img src={props.state.certainDialogLoader} alt="err"/>  :
                     props.state.certainDialog.items
                        .map((msg, i) =>
                            <DialogItem msg = {msg} i={i} myId={+props.myId}  key={msg.id}/>
                        )}
                </div>
                <div className={stl.sender}>
                    <Formik initialValues={{text:''}} validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
                            onSubmit={(values,{setSubmitting})=>{sendMessageListener(dialogId, values.text);values.text='';setSubmitting(false);
                            }}>
                        {({values, errors,handleChange, handleSubmit,  isSubmitting,}) => (
                            <form onSubmit={handleSubmit}>
                                <textarea name="text" onChange={handleChange} value={values.text} placeholder={errors.text} />
                                <button type="submit" disabled={isSubmitting} className={stl.sendBTN}> Send </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </>
};

class DialogFuncContainer extends React.Component { constructor(props) {super(props);
    // console.log(props.state.props.certainDialogLoader)
}
    componentDidMount() {
        this.props.getMyNegotiatorsListThunk();
        let userId = this.props.match.params.userId;
        // if (userId) this.props.getTalkWithUserThunk(userId)
        if (userId) this.props.talkedBeforeThunk(userId)
    }

    render() {
        return <Dialogs state                   =  {this.props.state.props}
                        // sendMessage             =  {this.props.sendMessage}
                        getTalkWithUserThunk    =  {this.props.getTalkWithUserThunk}
                        sendMessageToUserThunk  =  {this.props.sendMessageToUserThunk}
                        userIdInURL             =  {this.props.match.params.userId}
                        myId                    =  {this.props.state.myId}
                        dialogIsLoading         =  {this.props.state.dialogIsLoading}
        />;
    }
}

let mapStateToProps = (state) => {
    // console.log(state)
    return {
        props: state.dialogsReducer,
        dialogACs: state.dialogACs,
        myId: state.appAuthReducer.id,
    }
};
let mergeProps = (stateProps, dispatchProps) => { const  state  = stateProps; const { dispatch } = dispatchProps;
    // console.log(state)
    const getMyNegotiatorsListThunk = ()           => {dispatch(state.dialogACs.getMyNegotiatorsListThunkAC()         )};
    const getTalkWithUserThunk      = (userId)     => {dispatch(state.dialogACs.getTalkWithUserThunkAC(userId)        )};
    const sendMessageToUserThunk    = (userId,msg) => {dispatch(state.dialogACs.sendMessageToUserThunkAC(userId,msg)  )};
    const talkedBeforeThunk         = (userId)     => {dispatch(state.dialogACs.talkedBeforeThunkAC (userId)          )};
    return {state, /*sendMessage,*/ getMyNegotiatorsListThunk, getTalkWithUserThunk, sendMessageToUserThunk, talkedBeforeThunk }
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