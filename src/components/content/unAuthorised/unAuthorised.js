import React, {useState} from 'react';
import stl from './unAuthorised.module.css';
import {Formik, Field} from 'formik';
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";
import samurai from './../../../redux/img/login/honor.jpg'
import logo from './../../../redux/img/login/logo.png'


class LoginContainer extends React.Component {
    constructor(props) {
        super(props)
        // console.log(props)
    }

    setMeLogin = (email, password, rememberMe) => {
        this.props.setMeLoginThunk(email, password, rememberMe)
    };

    render() {
        return <Login setMeLogin={this.setMeLogin} authErr={this.props.state.authErr}
                      isAuth={this.props.state.isAuth} id={this.props.state.id}
        />
    }
}

const Login = (props) => {
    // console.log(props.isAuth)

    let crownPosition = ['0px 6px', '-100px 6px'];

    let [crown, setCrown] = useState(crownPosition[0]);
    let styles = {
        background: {
            backgroundImage: `url(${samurai})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            opacity: 0.9
        },
        reactCrown: {
            backgroundImage: `url(${logo})`,
            backgroundSize: '200px',
            backgroundPosition: crown,
            // backgroundPosition: '0px 6px',
            // backgroundPosition: '-100px 6px',
            backgroundRepeat: "no-repeat",
            overflow: 'hidden',
        }
    };


    const loginListener = (email, password, rememberMe) => {
        // console.log(email, password, rememberMe)
        props.setMeLogin(email, password, rememberMe)
    };

    if (props.isAuth === true) {
        console.log(props.isAuth)
        return <Redirect to={`/profile/${props.id}`}/>
    }


    return  <div style={styles.background} className={stl.loginBackground}>
                <div style={styles.reactCrown} className={stl.reactCrown}/>

                <h1>Sign in, samurai!</h1>
                <Formik
                    initialValues={{email: '', password: '', rememberMe: true, crown}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required Field';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';

                        }
                        if (!values.password) {
                            errors.password = 'Required Field';

                        } else if (values.password.length < 3) {
                            errors.password = 'Set longer pass';
                        }
                        if (Object.keys(errors).length !== 0) {
                            setCrown(crown = crownPosition[1])
                        } else {
                            setCrown(crown = crownPosition[0])
                        }
                        // console.log(1)
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        let {email, password, rememberMe} = values
                        loginListener(email, password, rememberMe)
                        setSubmitting(false)
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        //     setSubmitting(false);
                        // }, 400);
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit} className={stl.AllFormsWrapper}>
                            <div className={stl.formsWrapper}>
                                <input
                                    className={stl.formInput}
                                    type="email"
                                    name="email"
                                    placeholder='Your eMail'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <div className={stl.errorsContainers}>
                                    <h3> {errors.email && touched.email && errors.email} </h3>
                                </div>
                            </div>

                            <div className={stl.formsWrapper}>
                                <input
                                    className={stl.formInput}
                                    type="password"
                                    name="password"
                                    placeholder='Set your password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <div className={stl.errorsContainers}>
                                    <h3> {errors.password && touched.password && errors.password} </h3>
                                </div>
                            </div>

                            <div className={stl.formsWrapper}>
                                <Field type="checkbox" name="rememberMe"/>
                                <label htmlFor="rememberMe"/> Remember Me
                            </div>
                            <div className={stl.formsWrapper}>
                                <button type="submit" disabled={isSubmitting} className={stl.formInput}>Login!</button>
                            </div>
                            <div className={stl.formsWrapper}><h3> {props.authErr} </h3></div>

                        </form>
                    )}

                </Formik>
                <div className={stl.epigraph}>
                    <h4>You was born in the land of courage and valor</h4>
                    <h4>You must fight, samurai don't give up like a maiden...</h4>
                </div>
            </div>
};

const mapStateToProps = state => {
    // console.log(state)

    return {
        appAC: state.appAC, authErr: state.appAuthReducer.authErr, isAuth: state.appAuthReducer.isAuth,
        id: state.appAuthReducer.id
    }
}

const mergeProps = (stateProps, dispatchProps) => {
    // console.log(stateProps);
    // console.log(dispatchProps );
    const state = stateProps;
    const {dispatch} = dispatchProps;

    const setMeLoginThunk = (email, password, rememberMe) => dispatch(state.appAC.setMeLoginThunkAC(email, password, rememberMe))

    return {state, setMeLoginThunk}

}

export default connect(mapStateToProps, null, mergeProps)(LoginContainer)


// export default Login;