import React, { useState, useEffect, useRef } from 'react';
import stl from './unAuthorised.module.css';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { getSmartAppAuthReducer } from "../../../redux/selectors";
import { AppStateType } from '../../../redux/redux-store';
import { appStateType, App_ACs_Type } from '../../../redux/appReducer';
// import { App_ACs_Type, InitialStateType } from '../../../redux/appReducer';


type ContainerProps_Type = {
  actions: MergeProps_Type['actions']
  state: MSTP_Type
}

let LoginContainer: React.FC<ContainerProps_Type> = ({ actions, state }) => {

  // console.log(props);

  let setMeLogin = (email: string, password: string, rememberMe: boolean, captchaCode: string) => {
    actions.setMeLoginThunk(email, password, rememberMe, captchaCode)
  };

  let updateCaptcha = () => { actions.getCaptchaThunk() }



  return <Login
    actions={actions}
    authErr={state.appAuthReducer.authErr}
    captcha={state.appAuthReducer.captchaPic}
    errCaptchaGet={state.appAuthReducer.errCaptchaGet}
  />
}

type LoginProps_Type = { actions: MergeProps_Type['actions'], authErr: string, captcha: string, errCaptchaGet: string }

const Login: React.FC<LoginProps_Type> = ({ authErr, captcha, errCaptchaGet, actions }) => {


  const loginListener = (email: string, password: string, rememberMe: boolean, captchaCode: string) => { actions.setMeLoginThunk(email, password, rememberMe, captchaCode) };

  let [crownExtraClass, setCrownExtraClass] = useState(stl.redCrown)

  type FormikErrors_Type = { email?: string, password?: string, captchaCode?: string }
  type Value_Type = { text: string, email: string, password: string, captchaCode: string, rememberMe: boolean }

  let validator = (values: Value_Type) => {


    const errors: FormikErrors_Type = {};
    if (!values.email) { errors.email = 'Required Field'; }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { errors.email = 'Invalid email address'; }
    if (!values.password) { errors.password = 'Required Field'; }
    else if (values.password.length < 3) { errors.password = 'Set longer pass'; }

    if (captcha) if (!values.captchaCode) { errors.captchaCode = errCaptchaGet }

    Object.keys(errors).length === 0 ? setCrownExtraClass(stl.blueCrown) : setCrownExtraClass(stl.redCrown)
    return errors;
  }

  let submitter = (values: Value_Type, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    let { email, password, rememberMe, captchaCode } = values;
    loginListener(email, password, rememberMe, captchaCode)
    captchaCode = '';
    setSubmitting(false)
    // setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     setSubmitting(false);
    // }, 400);
  }

  return <div className={stl.loginBackground}>
    <div className={`${stl.reactCrown} ${crownExtraClass}`} />

    <h1>Sign in, samurai!</h1>
    <Formik initialValues={{ text: '', email: '', password: '', rememberMe: true, captchaCode: '' }} validate={validator} onSubmit={submitter} >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={stl.AllFormsWrapper}>
          <div className={stl.formsWrapper}>
            <Field className={stl.formInput} type="email" name="email" placeholder='Your eMail' onChange={handleChange} onBlur={handleBlur} value={values.email} />
            <div className={stl.errorsContainers}>
              <h3> {errors.email && touched.email && errors.email} </h3>
            </div>
          </div>

          <div className={stl.formsWrapper}>
            <input className={stl.formInput} type="password" name="password" placeholder='Set your password'
              onChange={handleChange} onBlur={handleBlur} value={values.password} />
            <div className={stl.errorsContainers}>
              <h3> {errors.password && touched.password && errors.password} </h3>
              {!captcha && <div className={stl.formsWrapper}><h3> {authErr} </h3></div>}
            </div>
          </div>

          {captcha &&
            <div className={stl.captchaDiv}>
              <img src={captcha} alt='err' />
              <input className={stl.formInput} type="captchaCode" name="captchaCode" placeholder={errors.captchaCode || 'Insert captcha symbols here'}
                onChange={handleChange} onBlur={handleBlur} value={values.captchaCode} />
            </div>
          }
          <div className={stl.formsWrapper}>
            <Field type="checkbox" name="rememberMe" />
            <label htmlFor="rememberMe" /> Remember Me
          </div>
          <div className={stl.formsWrapper}>
            <button type="submit" disabled={isSubmitting} className={stl.formInput}>Login!</button>
          </div>
          {captcha && <div className={stl.formsWrapper}><h3> {authErr} </h3></div>}
        </form>
      )}
    </Formik>
    <div className={stl.epigraph}>
      <h4>You was born in the land of courage and valor</h4>
      <h4>You must fight, samurai, don't give up like a maiden...</h4>
    </div>
  </div>
};

type MSTP_Type = { appAC: App_ACs_Type, appAuthReducer: appStateType }

const mapStateToProps = (state: AppStateType): MSTP_Type => { //console.log(state)
  return {
    appAC: state.appAC,
    appAuthReducer: getSmartAppAuthReducer(state),
  }
}

type MapDispatchToProps_type = null
const mapDispatchToProps: MapDispatchToProps_type = null

type MergeProps_Type = {
  state: MSTP_Type
  actions: {
    setMeLoginThunk: (email: string, password: string, rememberMe: boolean, captchaCode: string) => void
    getCaptchaThunk: () => void
  }
}


type DispatchProps_Type = { dispatch: (action: any) => void }


const mergeProps = (stateProps: MSTP_Type, dispatchProps: DispatchProps_Type): MergeProps_Type => {
  // console.log(stateProps);
  // console.log(dispatchProps );

  const state = stateProps;
  const { dispatch } = dispatchProps;

  const setMeLoginThunk = (email: string, password: string, rememberMe: boolean, captchaCode: string) => dispatch(state.appAC.setMeLoginThunkAC(email, password, rememberMe, captchaCode))
  const getCaptchaThunk = () => dispatch(state.appAC.getCaptchaThunkAC())

  const actions = { setMeLoginThunk, getCaptchaThunk }

  return { state, actions }
}

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginContainer) as React.ComponentType









// export default Login;


// import React, {useState,useEffect} from 'react';
// import stl             from './unAuthorised.module.css';
// import {Formik, Field} from 'formik';
// import {connect}       from 'react-redux'
// import {Redirect}      from "react-router-dom";
// import {getSmartAppAuthReducer}   from "./../../../redux/selectors";


// let LoginContainer = (props) => {

//     // console.log(props.state.appAuthReducer);

//     let setMeLogin = (email, password, rememberMe,captchaCode) => { props.setMeLoginThunk(email, password, rememberMe, captchaCode) };

//     return <Login setMeLogin={setMeLogin} 
//     authErr={props.state.appAuthReducer.authErr} 
//     captcha={props.state.appAuthReducer.captchaPic}
//     errCaptchaGet = {props.state.appAuthReducer.errCaptchaGet}
//     />
// }


// const Login = ({authErr,captcha,errCaptchaGet,setMeLogin}) => {
//     console.log(errCaptchaGet)

//     const loginListener = (email,password,rememberMe,captchaCode) => { setMeLogin(email,password,rememberMe,captchaCode) };

//     let [crownExtraClass, setCrownExtraClass] = useState(stl.redCrown)

//     return  <div className={stl.loginBackground}>
//         <div className={`${stl.reactCrown} ${crownExtraClass}`}/>

//         <h1>Sign in, samurai!</h1>
//         <Formik
//             initialValues={{email:'', password:'', rememberMe: true, captchaCode:''}}
//             validate={values => {
//                 const errors = {};
//                 if (!values.email) {
//                     errors.email = 'Required Field';
//                 } else if (
//                     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//                 ) {
//                     errors.email = 'Invalid email address';
//                 }
//                 if (!values.password) {
//                     errors.password = 'Required Field';

//                 } else if (values.password.length < 3) {
//                     errors.password = 'Set longer pass';
//                 }

//                 if(captcha) if (!values.captchaCode){
//                     errors.captchaCode = errCaptchaGet}

//                 Object.keys(errors).length !== 0 ? setCrownExtraClass(stl.blueCrown) : setCrownExtraClass(stl.redCrown)
//                 // console.log(1)
//                 return errors;
//             }}
//             onSubmit={(values, {setSubmitting}) => {
//                 let {email, password, rememberMe, captchaCode} = values
//                 loginListener(email, password, rememberMe, captchaCode)
//                 captchaCode='';
//                 setSubmitting(false)
//                 // setTimeout(() => {
//                 //     alert(JSON.stringify(values, null, 2));
//                 //     setSubmitting(false);
//                 // }, 400);
//             }}
//         >
//             {({
//                     values,
//                     errors,
//                     touched,
//                     handleChange,
//                     handleBlur,
//                     handleSubmit,
//                     isSubmitting,
//                     /* and other goodies */
//                 }) => (
//                 <form onSubmit={handleSubmit} className={stl.AllFormsWrapper}>
//                     <div className={stl.formsWrapper}>
//                         <input
//                             className={stl.formInput}
//                             type="email"
//                             name="email"
//                             placeholder='Your eMail'
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.email}
//                         />
//                         <div className={stl.errorsContainers}>
//                             <h3> {errors.email && touched.email && errors.email} </h3>
//                         </div>
//                     </div>

//                     <div className={stl.formsWrapper}>
//                         <input
//                             className={stl.formInput}
//                             type="password"
//                             name="password"
//                             placeholder='Set your password'
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.password}
//                         />
//                         <div className={stl.errorsContainers}>
//                             <h3> {errors.password && touched.password && errors.password} </h3>
//                         </div>
//                     </div>

//                     {captcha &&
//                     <div className = {stl.captchaDiv}>
//                         <img src={captcha} alt='err'/>
//                         <input
//                             className={stl.formInput}
//                             type="captchaCode"
//                             name="captchaCode"
//                             placeholder={errors.captchaCode ||'Insert captcha symbols here'}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.captchaCode}
//                         />
//                     </div>
//                      }
//                     <div className={stl.formsWrapper}>
//                         <Field type="checkbox" name="rememberMe"/>
//                         <label htmlFor="rememberMe"/> Remember Me
//                     </div>
//                     <div className={stl.formsWrapper}>
//                         <button type="submit" disabled={isSubmitting} className={stl.formInput}>Login!</button>
//                     </div>
//                     <div className={stl.formsWrapper}><h3> {authErr} </h3></div>
//                 </form>
//             )}

//         </Formik>
//         <div className={stl.epigraph}>
//             <h4>You was born in the land of courage and valor</h4>
//             <h4>You must fight, samurai, don't give up like a maiden...</h4>
//         </div>
//             </div>
// };

// const mapStateToProps = state => {
//     // console.log(state)

//     return {
//         appAC:          state.appAC,
//         appAuthReducer: getSmartAppAuthReducer(state),
//     }
// }

// const mergeProps = (stateProps, dispatchProps) => {
//     // console.log(stateProps);
//     // console.log(dispatchProps );
//     const state = stateProps;
//     const {dispatch} = dispatchProps;

//     const setMeLoginThunk=(email,password,rememberMe,captchaCode)=>dispatch(state.appAC.setMeLoginThunkAC(email,password,rememberMe,captchaCode))

//     const getCaptchaThunk=()=> dispatch(state.appAC.getCaptchaThunkAC())

//     return {state, setMeLoginThunk, getCaptchaThunk}

// }

// export default connect(mapStateToProps, null, mergeProps)(LoginContainer)


// // export default Login;