import React            from "react";
import {connect}        from "react-redux";
import { compose }      from 'redux';
import {NavLink}        from 'react-router-dom';
import {Formik}         from 'formik';
import { withRouter }   from 'react-router-dom';
import stl              from './dialogs.module.css';

function Dialogs(props) { console.log(props.state);
    const DialogItem = (props) => { let path = `/dialogs/${props.id}`;
        return <div>
            {/*<img src={props.photos.large || props.defaultAvatar} alt="err"/>*/}
            <img src={props.defaultAvatar} alt="err"/>
            <NavLink to={path}> {props.name} </NavLink>
        </div> };

    const sendMessageListener = (userId, msg)=> { props.sendMessageToUserThunk(userId, msg) };

    const getTalk = (userId) => { props.getTalkWithUserThunk(userId)};

    return <>
        <div className={stl.dialogsPage}>
            <div className={stl.dialogList}>
                <ul>
                    {props.state.dialogsList && props.state.dialogsList
                        .map((user,i) =>
                            <div className={stl.talkerBlock} key={i} >
                                <NavLink to={`/profile/${user.id}`}>
                                    <img  src={user.photos.large || props.state.defaultAvatar} alt="err"/>
                                </NavLink>
                                <button onClick={() => getTalk(user.id)} >{user.userName}</button>
                            </div>)}
                </ul>
            </div>
            <div className={stl.dialogsAreaAndSender}>
                <div className={stl.dialogArea}>
                    { props.state.certainDialog.items && props.state.certainDialog.items
                        .map(msg =>
                            <div className={stl.messageBlock} key={msg.id}>
                                <p className={stl.messageBody}>{msg.body}</p>
                                <p className={stl.messageBlockTime}>{msg.addedAt}, viewed: {msg.viewed?'yup':'nope'}</p>
                            </div>
                        )}
                </div>
                <div className={stl.sender}>
                    <Formik initialValues={{text:''}} validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
                            onSubmit={(values,{setSubmitting})=>{sendMessageListener(7180, values.text);values.text='';setSubmitting(false);
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

class DialogFuncContainer extends React.Component { constructor(props) {
    super(props);
    // console.log(props)
}
    componentDidMount() {
        this.props.getMyNegotiatorsListThunk()
    }

    render() {
        return <Dialogs state={this.props.state.props}
                        sendMessage={this.props.sendMessage}
                        getTalkWithUserThunk={this.props.getTalkWithUserThunk}
                        sendMessageToUserThunk={this.props.sendMessageToUserThunk}
        />;
    }
}

let mapStateToProps = (state) => {
    // console.log(state)
    return {
        props: state.dialogsReducer,
        dialogACs: state.dialogACs
    }
};
let mergeProps = (stateProps, dispatchProps) => { const  state  = stateProps; const { dispatch } = dispatchProps;

    // console.log(state)

    const getMyNegotiatorsListThunk = ()           => {dispatch(state.dialogACs.getMyNegotiatorsListThunkAC()         )};
    const getTalkWithUserThunk      = (userId)     => {dispatch(state.dialogACs.getTalkWithUserThunkAC(userId)        )};
    const sendMessageToUserThunk    = (userId,msg) => {dispatch(state.dialogACs.sendMessageToUserThunkAC(userId,msg)  )};

    // const sendMessage = (msg) => {
    //     let date = new Date();
    //     let data=`${("0"+date.getDate()).slice(-2)}.${("0"+(date.getMonth()+1)).slice(-2)}.${(date.getFullYear()-2000)}`;
    //     let time=`${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`;
    //     dispatch(state.dialogACs.sendMessageToUserAC(msg, data, time))
    // };
    return {state, /*sendMessage,*/ getMyNegotiatorsListThunk, getTalkWithUserThunk, sendMessageToUserThunk }
};

export default compose( connect(mapStateToProps, null, mergeProps), )(DialogFuncContainer);

