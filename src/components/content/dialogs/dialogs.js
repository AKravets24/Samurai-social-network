import React from 'react';
import stl from './dialogs.module.css';
import {NavLink} from 'react-router-dom';

function Dialogs(props) {
    // console.log(props.state.isAuth);
    const DialogItem = (props) => { let path = '/dialogs/' + props.id;
                return <div> <NavLink to={path}> {props.name} </NavLink> </div> };

   const bodyMessageOnChangeListener = (e) => { let msg = e.target.value; props.bodyMessageChanger(msg) };

   const sendMessageListener = ()=> { props.sendMessage(props.state.props.messageField) };

    return <>
            <div className={stl.dialogsPage}>
                <div className={stl.dialogList}>
                    <ul>
                        {props.state.props.dialogs
                            .map(user => <DialogItem name={user.name} key={user.id} id={user.id}/>)}
                    </ul>
                </div>
                <div className={stl.dialogsAreaAndSender}>
                    <div className={stl.dialogArea}>
                    {/*=========== Блок со списком сообщений юзера =========================*/}
                        {props.state.props.messages[0]
                            .map(msg => <div className={stl.messageBlock} key={msg.id}>
                                    <p className={stl.messageBody}>{msg.message} </p>
                                    <p className={stl.messageBlockTime}>{msg.date} at {msg.time} </p>
                                </div>
                            )}
                    </div>
                    <div className={stl.sender}>
                <textarea
                    value={props.state.props.messageField}
                    onChange={bodyMessageOnChangeListener}
                    placeholder='Enter some sweety words ))'/>
                        <button  onClick={sendMessageListener}  className={stl.sendBTN}> Send </button>
                    </div>
                </div>
            </div>
    </>
}

export default Dialogs;