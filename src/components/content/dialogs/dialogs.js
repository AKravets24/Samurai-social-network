import React            from "react";
import {connect}        from "react-redux";
import { compose }      from 'redux';
import {NavLink}        from 'react-router-dom';
import {Formik}         from 'formik';
import { withRouter }   from 'react-router-dom';
import stl              from './dialogs.module.css';

function Dialogs(props) { /*console.log(props.state.isAuth);*/
    const DialogItem = (props) => { let path = '/dialogs/' + props.id;
        return <div> <NavLink to={path}> {props.name} </NavLink> </div> };

    const sendMessageListener = (msg)=> { props.sendMessage(msg) };

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
                    <Formik initialValues={{text:''}} validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
                            onSubmit={(values,{setSubmitting})=>{sendMessageListener(values.text);values.text='';setSubmitting(false);
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

const DialogFuncContainer = (props) =>  <Dialogs state={props.state} sendMessage={props.sendMessage}/> ;

let mapStateToProps = (state) => ({props: state.dialogsReducer, dialogACs: state.dialogACs});
let mergeProps = (stateProps, dispatchProps) => { const  state  = stateProps; const { dispatch } = dispatchProps;
    const sendMessage = (msg) => {
        let date = new Date();
        let data=`${("0"+date.getDate()).slice(-2)}.${("0"+(date.getMonth()+1)).slice(-2)}.${(date.getFullYear()-2000)}`;
        let time=`${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`;
        dispatch(state.dialogACs.sendMessageToUserAC(msg, data, time))
    };
    return {state, sendMessage }
};

export default compose( connect(mapStateToProps, null, mergeProps), )(DialogFuncContainer);

