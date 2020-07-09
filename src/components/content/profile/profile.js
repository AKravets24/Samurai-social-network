import React from "react";
import stl from './profile.module.css';
import Post from './post/post';
import {dialogsReducer} from "../../../redux/dialogsReducer";


function Profile(props) {
    // console.log(props);
    let loaderShower = null;
    if (!props.state.profile) {
        return loaderShower =
            <div className={stl.loaderDiv}>
                <img className={stl.loader} src={props.state.props.loader} alt="Err"/>
            </div>
    }
    let textArea = React.createRef();
    const onPostChangeListener = () => {
        let newSomeText = textArea.current.value;
        props.onPostChange(newSomeText)
        console.log(textArea.current.maxLength - textArea.current.value.length)
        // console.log(textArea.current.value.length )
    };

    const addPostListener = () => { let finalPost = textArea.current.value; props.addPost(finalPost) };

    const getContacts = (obj) => {
        const result = [];
        for (let key in obj) {
            if (obj[key] !== null) {
                result.push({title: key, value: obj[key]})
            }
        }
        return (
            result.map((el, i) =>
                <li key={i}> {el.title} : {el.value} </li>
            )
        )
    };
    // const contacts = getContacts(props.state.profile.contacts);

    let statusArea = React.createRef();
    const statusChangeListener = () => {
        let text = statusArea.current.value;
        props.stateChanger(text);
        let number = props.state.props.statusFieldMaxLength - statusArea.current.value.length
        props.letterBalanceCounter(number)
    };

    let statusAreaBlock = React.createRef();

    window.onclick = (e) => {
        if (props.state.props.statusEdit === true  && e.target.id !== 'modalWindow' && e.target.id !== 'statusField'
            && e.target.id !== 'statusInput'  && e.target.id !== 'twoBTNs'){
            props.state.props.statusField = props.state.props.previousStatus; props.statusEditOff() }
    };

    window.onkeyup = (e) => {
        if (props.state.props.statusEdit === true && e.key === "Escape"){
            props.state.props.statusField = props.state.props.previousStatus; props.statusEditOff() }
    };

    const statusEditorOn = () => { props.statusEditOn()};

    const confirmStatus = (e) => {let text = statusArea.current.value;props.updateStatusThunk(text);props.statusEditOff() };

    const rejectStatus = () => {props.state.props.statusField = props.state.props.previousStatus; props.statusEditOff()};

    const photoSaver = (e) => {
        props.updateMyAvatarThunk(e.target.files[0])
    };

    return <>
        <div className={stl.profile}>
            {loaderShower}
            <div className={stl.panorama}>
                <img src={props.state.profilePics.panoramaPic} alt="Err"/>
            </div>
            <div className={stl.profileDetails}>
                <div className={stl.profilePic}>
                    <img src={props.state.props.myAvatarLarge} alt="Err"/>
                </div>

                <input type="file" name="image" onChange={photoSaver} />

                <div className={stl.profileInfo}>
                    <h2>Artem Kraver</h2>
                    <ul>
                        <li> Date of Birth: xxxx  </li>
                        <li> City: xxxx           </li>
                        <li> Education: xxxx      </li>
                        <li> Web Site: xxx        </li>
                    </ul>
                    <div className={stl.statusBlock}>
                        {props.state.props.statusEdit
                            ? <div className={stl.modalWindow}
                                   id='modalWindow'
                                   ref={statusAreaBlock}>

                                <textarea autoFocus={true}
                                          maxLength='300'
                                          className={stl.statusTextArea}
                                          ref={statusArea}
                                          id='statusInput'
                                          value={props.state.props.statusField}
                                          onChange={statusChangeListener}
                                          placeholder={'write your mind here'}
                                ></textarea>
                                <div>
                                    {props.state.props.statusFieldBalanceLength} symbols left
                                </div>
                                {/*<input  autoFocus={true}*/}
                                {/*        className={stl.statusInput}*/}
                                {/*        ref={statusArea} type="text"*/}
                                {/*        id='statusInput'*/}
                                {/*        value={props.state.props.statusField}*/}
                                {/*        onChange={statusChangeListener}/>*/}


                                <div className={stl.twoBTNs} id='twoBTNs'>
                                    <button className={stl.BTNChangeSaver}
                                             onClick={confirmStatus}> Apply changes </button>
                                    <button className={stl.BTNChangeReject}
                                            onClick={rejectStatus}> Reject changes </button>
                                </div>
                            </div>
                            :<div className={stl.statusWrapper}>
                                <h2 className={stl.statusField}
                                    id='statusField'
                                    onClick={statusEditorOn}> Status: {props.state.props.statusField}</h2>
                            </div>

                        }
                    </div>

                </div>
                {/*===========*/}
                <div className={stl.wallContainer}>

                    <div className={stl.writePost}>
                        <h2>My posts</h2>
                        <div className={stl.inputBox}>
                                <textarea
                                    ref={textArea}
                                    value={props.state.props.postField}
                                    onChange={onPostChangeListener}
                                />
                        </div>
                        <button onClick={addPostListener}> Send</button>
                    </div>
                </div>
            </div>
            <Post props={props.state.props.wallPosts}/>
        </div>
    </>
}

export default Profile;

{/*блок с подгружаемым профилем другого юзера*/
}
{/*<div className={stl.userInfo}>*/
}
{/*    <div className={stl.userAva}>*/
}
{/*        <img src={props.state.profile.photos.large} alt="Err"/>*/
}
{/*    </div>*/
}

{/*    <div className={stl.userContacts}>*/
}
{/*        <h2> Contacts:</h2>*/
}
{/*        <ul> {contacts}</ul>*/
}
{/*        <p>  {props.state.profile.lookingForAJobDescription}</p>*/
}
{/*    </div>*/
}
{/*    <div className={stl.aboutUser}>*/
}
{/*        <h2> About me: {props.state.profile.aboutMe} </h2>*/
}
{/*    </div>*/
}
{/*</div>*/
}