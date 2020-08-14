import React from 'react';
// import UnAuthorised from "../unAuthorised/unAuthorised";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({isAuth: state.appAuthReducer.isAuth});
export const withAuthRedirect = Component => {
    class RedirectComponent extends React.Component {
        // render() {if (!this.props.isAuth) return <Redirect to={`login`} />; else return <Component {...this.props}/> }
        render() {if (!this.props.isAuth) return null /*<UnAuthorised/>*/; else return <Component {...this.props}/> }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)( RedirectComponent );
    return ConnectedAuthRedirectComponent;
};

