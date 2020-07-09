import React from "react";
import Dialogs from "./dialogs";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from 'redux';

const DialogFuncContainer = (props) => {
    return <Dialogs state={props.state}
                    bodyMessageChanger={props.bodyMessageChanger}
                    sendMessage={props.sendMessage}/>
};

//state = store.getState() - в функциях mapStateToProps и mergeProps такая дефолтная замена рукопусному методу на библиотечный

// let AuthRedirectComponent = withAuthRedirect(DialogFuncContainer);

let mapStateToProps = (state) => ({props: state.dialogsReducer, dialogActionsCreators: state.dialogActionsCreators});
let mergeProps = (stateProps, dispatchProps) => {
    const  state  = stateProps;
    const { dispatch } = dispatchProps;
    const bodyMessageChanger = (newSomeMessageText) => {
        dispatch(state.dialogActionsCreators.updateMessageFieldActionCreator(newSomeMessageText));
    };
    const sendMessage = () => {
        let dataObj = new Date();
        let data = `${("0" + dataObj.getDate()).slice(-2)}.${("0" + (dataObj.getMonth() +
            + 1)).slice(-2)}.${(dataObj.getFullYear() - 2000)}`;
        let time = `${("0" + dataObj.getHours()).slice(-2)}:${("0" + dataObj.getMinutes()).slice(-2)}`;
        dispatch(state.dialogActionsCreators.sendMessageToUserActionCreator(
            state.props.messageField, data, time))
    };

    return {state: state, bodyMessageChanger, sendMessage }
};
// let withUrlDataProfileContainer = withRouter(AuthRedirectComponent);


// const DialogsConnector = connect(mapStateToProps, null, mergeProps)(withUrlDataProfileContainer);
// export default DialogsConnector;

export default compose(
    connect(mapStateToProps, null, mergeProps),
    withAuthRedirect,
)(DialogFuncContainer);



/*
let mapStateToProps = (state) => {
    // console.log(state.authReducer.isAuth)
    return {
        isAuth: state.authReducer.isAuth,
        props: state.dialogsReducer,
        dialogActionsCreators: state.dialogActionsCreators } };
let mergeProps = (stateProps, dispatchProps) => {
    const  state  = stateProps;
    const { dispatch } = dispatchProps;
    const bodyMessageChanger = (newSomeMessageText) => {
        dispatch(state.dialogActionsCreators.updateMessageFieldActionCreator(newSomeMessageText));
    };
    const sendMessage = () => {
        let dataObj = new Date();
        let data = `${("0" + dataObj.getDate()).slice(-2)}.${("0" + (dataObj.getMonth() +
            + 1)).slice(-2)}.${(dataObj.getFullYear() - 2000)}`;
        let time = `${("0" + dataObj.getHours()).slice(-2)}:${("0" + dataObj.getMinutes()).slice(-2)}`;
        dispatch(state.dialogActionsCreators.sendMessageToUserActionCreator(
            state.props.messageField, data, time))
    };

    return {state: state, bodyMessageChanger, sendMessage }
};

let AuthRedirectComponent = withAuthRedirect(DialogContainer);
let withUrlDataDialogContainer = withRouter(AuthRedirectComponent);

const DialogsConnector = connect(mapStateToProps, null, mergeProps)(withUrlDataDialogContainer);
export default DialogsConnector;*/
