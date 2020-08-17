import React          from "react";
import {Formik}       from 'formik';
import {NavLink}      from 'react-router-dom';
import stl            from './profile.module.css';
import Post           from './post/post';
import {StatusClass}  from "./statusBlock";

function Profile(props) {
    // console.log(props)

    const addPostListener = (finalPost) => { props.addPost(finalPost) };
    const getContacts     = (obj)       => { const result = [];
        for (let key in obj) { if (!obj[key]) { obj[key] = 'nope' } result.push({title: key, value: obj[key]}) }
        return ( result.map((el, i) =>  <li key={i}> {el.title} : {el.value} </li> ) ) };
    const photoSaver = (e) => { props.updateMyAvatarThunk(e.target.files[0]) };

    return <>
        {!props.state.profile &&
        <div className={stl.loaderDiv}>
            <img className={stl.loader} src={props.state.props.loader} alt="Err"/>
        </div>
        }
        {props.state.profile &&
        <div className={stl.profile}>
            <div className={stl.panorama}>
                <img src={props.state.profilePics.panoramaPic} alt="Err"/>
            </div>
            <div className={stl.profileWrapper}>
                <div className={stl.profileDetails}>
                    <div className={stl.profilePicNBTN}>
                        <img src={ props.state.profile.photos.large || props.state.props.myAvatarLarge   } alt="Err"/>
                        <input type="file" name="image" id='file' onChange={photoSaver} className={stl.fileInput}/>
                        { props.state.myId === props.state.profile.userId       &&
                        <label htmlFor="file" className={stl.fileChooser}>Choose your new picture...</label>
                        }
                        { props.state.myId !== props.state.profile.userId       &&
                        <NavLink className={stl.writeMessage} to={`/dialogs/${props.state.profile.userId}` }> Write Message </NavLink>
                        }
                    </div>
                    <div className={stl.profileInfo}>
                        <h2> {props.state.props.profile.fullName}</h2>
                        <ul>
                            {props.state.profile.contacts && getContacts(props.state.profile.contacts)}
                        </ul>
                        <div className={stl.statusBlock}>
                            <StatusClass
                                isMe = {props.state.myId === props.state.profile.userId}
                                statusField={props.state.props.statusField}
                                previousStatus={props.state.props.previousStatus}
                                updateStatusThunk={props.updateStatusThunk}
                                stateChanger={props.stateChanger}
                                letterBalanceCounter={props.letterBalanceCounter}
                                statusFieldMaxLength={props.state.props.statusFieldMaxLength}
                                statusFieldBalanceLength={props.state.props.statusFieldBalanceLength}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={stl.writePost}>
                        <h2>My posts</h2>
                        <div className={stl.inputBox}>
                            <Formik initialValues={{text:''}} validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
                                onSubmit={(values,{setSubmitting})=>{addPostListener(values.text);values.text='';setSubmitting(false);
                                }}>
                                {({values, errors,handleChange, handleSubmit,  isSubmitting,}) => (
                                    <form onSubmit={handleSubmit}>
                                        <textarea name="text" onChange={handleChange} value={values.text} placeholder={errors.text} />
                                        <button type="submit" disabled={isSubmitting}> Send </button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <Post props={props.state.props.wallPosts}/>
            </div>
        </div>
        }
    </>
}
export default Profile;

