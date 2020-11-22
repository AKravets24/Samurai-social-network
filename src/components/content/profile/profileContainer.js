import React,{useState,useEffect} from "react";
// import { Profile }                from './profile';
import { connect }                from 'react-redux';
import { withRouter,NavLink }     from 'react-router-dom';
import { withAuthRedirect }       from "../HOC/withAuthRedirect";
import { compose }                from 'redux';
import {
    getMyId,
    getProfileACs,
    getProfilePics,
    getSmartProfileMediaData,
    getSmartPicsNLoaders,
    getUsersACs,
} from "../../../redux/selectors";

import { Formik }                   from 'formik';
import stl                          from './profile.module.css';
import Post                         from './post/post';
import { StatusCompFunc }           from "./statusBlock";
import { v4 as uuidv4 }             from 'uuid';



const ProfileFuncContainer = props => {
    // console.log(props)
    let myId=props.profileState.myId;
    let comparativeId=+props.match.params.userId;
    let colorTheme = props.profileState.picsNLoaders.colorTheme;
    let panoramaPicSrc = props.profileState.picsNLoaders.panoramaPic;

    useEffect(()=> {
        if(myId===comparativeId||!comparativeId){props.getProfileThunk(myId);props.history.push(`/profile/${myId}`);
        } else if (+comparativeId&&+comparativeId!==myId){props.getProfileThunk(comparativeId);}
    },[myId, comparativeId]);

    let [themes, setThemes] = useState({profileDnmc:'',panoramaSRC:'',profileInfoDnmc:'',BTNs:'',writePostDnmc:'',textInput:''})
    useEffect(()=> {
        switch (colorTheme) {
            case 'NIGHT'  :return setThemes({...themes,profileDnmc:stl.profileN,panoramaSRC:panoramaPicSrc,profileInfoDnmc:stl.profileInfoN,BTNs:stl.BTNsN,writePostDnmc:stl.writePostN,textInput: stl.inputN,})
            case 'MORNING':return setThemes({...themes,profileDnmc:stl.profileM,panoramaSRC:panoramaPicSrc,profileInfoDnmc:stl.profileInfoM,BTNs:stl.BTNsM,writePostDnmc:stl.writePostM,textInput: stl.inputM,})
            case 'DAY'    :return setThemes({...themes,profileDnmc:stl.profileD,panoramaSRC:panoramaPicSrc,profileInfoDnmc:stl.profileInfoD,BTNs:stl.BTNsD,writePostDnmc:stl.writePostD,textInput: stl.inputD,})
            case 'EVENING':return setThemes({...themes,profileDnmc:stl.profileE,panoramaSRC:panoramaPicSrc,profileInfoDnmc:stl.profileInfoE,BTNs:stl.BTNsE,writePostDnmc:stl.writePostE,textInput: stl.inputE,})
        }
    },[colorTheme]);

    return themes.profileDnmc && <Profile
        state               = { props.profileState          } // нужен рефактор
        match               = { props.match                 }
        addPost             = { props.addPost               }
        updateStatusThunk   = { props.updateStatusThunk     }
        updateMyAvatarThunk = { props.updateMyAvatarThunk   }
        followUserThunk     = { props.followUserThunk       }
        unFollowUserThunk   = { props.unFollowUserThunk     }
        themes              = { themes                      }
        followThunkToggler  = { props.followThunkToggler    }
    />
};

const Profile = props => {
    // console.log('render');
    console.log(props)

    let userId = props.state.profileMedia.profileData.userId;

    const addPostListener = (finalPost) => { props.addPost(finalPost) };
    const getContacts     = (obj,logos)       => {const result = [];
        let {faceBookLogo,gitHubLogo,instagramLogo,mainLinkLogo,twitterLogo,vkLogo,websiteLogo,youTubeLogo}=logos;
        let {facebook,github,instagram,mainLink,twitter,vk,website,youtube}=obj;
        result.push({title:faceBookLogo,value:facebook},{title:gitHubLogo,value:github},{title:instagramLogo,value:instagram},
            {title:mainLinkLogo,value:mainLink}, {title:twitterLogo,value:twitter},{title:vkLogo,value:vk},
            {title:websiteLogo,value:website},{title:youTubeLogo,value:youtube})
        // console.log(result)

        for (let key in obj) {if (!obj[key]){obj[key]='nope'}}
        return ( result.map((el)=><li key={uuidv4()}> <img src={el.title} alt="err"/>  {el.value==='nope'? <p>{el.value}</p> :
            <a href={el.value}>{el.value}</a> }</li>))
    };
    props.state.profileMedia.profileData.contacts && getContacts(props.state.profileMedia.profileData.contacts, props.state.profilePics)

    const photoSaver      = (e)         => { props.updateMyAvatarThunk(e.target.files[0]) };

    let [writeMode, setWriteMode] = useState(false)

    return <>
        {writeMode &&
        <div  className={`${stl.writeWindow} ${props.themes.profileDnmc}`}>
            <div className={stl.miniHeadWrapper}>
                <h2 className={`${stl.userName} ${props.themes.userNameDnmc}`}>{props.state.profileMedia.profileData.fullName}</h2>
                <NavLink className={`${stl.followBTN} ${props.themes.BTNs}`} to={`/dialogs/${userId}` }
                > Go to chat
                </NavLink>
                <button className={`${stl.closeBTN} ${stl.followBTN} ${props.themes.BTNs}`}
                        onClick={()=>{setWriteMode(false)}}
                >X</button>
            </div>
            <div className={stl.textAreaWrapper}>
                <Formik initialValues={{text:''}}validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
                        onSubmit={(values,{setSubmitting})=>{/*writeMsg(user.id,values.text,user.name)*/;values.text='';setSubmitting(false);
                        }}>
                    {({values,errors,handleChange,handleSubmit,isSubmitting})=>(
                        <form onSubmit={handleSubmit}>
                                                <textarea name="text" className={`${stl.talkTextarea} ${props.themes.textInput}`}
                                                          onChange={handleChange} value={values.text} placeholder={errors.text} />
                            <button type="submit" disabled={isSubmitting} className={`${stl.followBTN} ${props.themes.BTNs}`}
                            > Send </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
        }
        {!userId &&
        <div className={stl.loaderDiv}>
            <img className={stl.loader} src={props.state.picsNLoaders.auth_LDR_GIF} alt="Err"/>
        </div>
        }
        {userId &&
        <div className={`${stl.profile} ${props.themes.profileDnmc}`}>
            <div className={stl.panorama}>
                <img
                    // onLoad={()=>{setPanorama({panoramaClass:stl.panoramaPic,panoramaSrc:props.state.panoramaPic})}}
                    className={stl.panoramaPic}
                    src={props.themes.panoramaSRC} alt="Err"
                />
            </div>
            <div className={stl.profileWrapper}>
                <div className={stl.profileDetails}>
                    <div className={stl.profilePicNBTN}>
                        <div>
                            <img src={!userId?props.state.picsNLoaders.ava_LDR_GIF:props.state.profileMedia.profileData.photos.large||
                                props.state.profileMedia.myAvatarLarge} alt="Err"/>
                        </div>
                        <input disabled={!userId} type="file" name="image" id='file' onChange={photoSaver} className={stl.fileInput}/>
                        {!userId                                                                        ?
                            <label htmlFor="file" className={`${stl.fileChooser} ${props.themes.BTNs}`}
                            ><img src={props.state.picsNLoaders.BTN_LDR_GIF} alt="err"/></label>                           :
                            props.state.myId === userId                                                 ?
                                <label htmlFor="file" className={`${stl.fileChooser} ${props.themes.BTNs}`}
                                >   <div> Choose your new picture</div>
                                    <div> Choose your <s>destiny!</s></div>
                                </label>                                                                    :
                                <button className={`${stl.writeMessage} ${props.themes.BTNs}`}
                                        disabled={writeMode} onClick={()=>setWriteMode(true)}
                                >Write Message</button>
                            //     <label htmlFor="file" className={`${stl.fileChooser} ${props.themes.BTNs}`}>
                            //     <NavLink className={stl.writeMessage} to={`/dialogs/${userId}` }
                            //     > Write Message
                            //     </NavLink>
                            // </label>
                        }
                    </div>
                    <div className={stl.profileInfo}>
                        <div className={`${stl.nameWrapper} ${props.themes.profileInfoDnmc}`}>
                            <h2> {props.state.profileMedia.profileData.fullName} {props.state.myId === userId&& '(it\'s you)'}</h2>
                            {props.state.myId !== userId &&
                            <button
                                className={`${stl.followBTN} ${props.themes.BTNs}`}
                                disabled={props.state.profileMedia.isFollowing}
                                onClick={props.state.profileMedia.isFollowed?
                                    ()=>props.unFollowUserThunk(userId):
                                    ()=>props.followUserThunk(userId)}
                            >{props.state.profileMedia.isFollowed?'Unfollow':'Follow'}</button>
                            }
                        </div>
                        <div className={stl.statusBlock}>
                            <StatusCompFunc
                                isMe                     = { props.state.myId === userId                       }// Я
                                isLoading                = { !userId                                           }
                                loader                   = { props.state.picsNLoaders.status_LDR_GIF           }
                                colorTheme               = { props.state.colorTheme                            }
                                statusField              = { props.state.profileMedia.statusField              }
                                previousStatus           = { props.state.profileMedia.previousStatus           }
                                updateStatusThunk        = { props.updateStatusThunk                           }
                                letterBalanceCounter     = { props.letterBalanceCounter                        }
                                statusFieldMaxLength     = { props.state.profileMedia.statusFieldMaxLength     }
                                statusFieldBalanceLength = { props.state.profileMedia.statusFieldBalanceLength }
                            />
                        </div>
                        <p className={stl.contactsH2}>Contacts:</p>
                        <ul>
                            {props.state.profileMedia.profileData.contacts &&
                            getContacts(props.state.profileMedia.profileData.contacts, props.state.profilePics)
                            }
                        </ul>
                        {props.state.profileMedia.profileData.lookingForAJobDescription &&
                        <div className={stl.jobSeeker}>
                            <p>Professional skills:</p>
                            <p>Skill stack: {props.state.profileMedia.profileData.lookingForAJobDescription}</p>
                            <p>Applicant: {props.state.profileMedia.profileData.lookingForAJob?'yup':'nope'}</p>
                            <p>About me: {props.state.profileMedia.profileData.aboutMe?props.state.profileMedia.profileData.aboutMe:'nope' }</p>
                        </div>}
                    </div>
                </div>

                <div>
                    <div className={`${stl.writePost} ${props.themes.writePostDnmc}` }>
                        <h2>My posts</h2>
                        <div className={stl.inputBox}>
                            <Formik initialValues={{text:''}} validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
                                    onSubmit={(values,{setSubmitting})=>{addPostListener(values.text);values.text='';setSubmitting(false);
                                    }}>
                                {({values, errors,handleChange, handleSubmit,  isSubmitting,}) => (
                                    <form onSubmit={handleSubmit}>
                                          <textarea name="text" className={props.themes.textInput}
                                                    onChange={handleChange} value={values.text} placeholder={errors.text} />
                                        <button type="submit" disabled={isSubmitting} className={`${props.themes.BTNs}`}> Send </button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <Post props={props.state.profileMedia.wallPosts}/>
            </div>
        </div>
        }
    </>
};


let mapStateToProps = (state)=> {
    // console.log('render');
    return {
        profileMedia:     getSmartProfileMediaData  (state),
        picsNLoaders:     getSmartPicsNLoaders      (state),
        myId:             getMyId                   (state),
        profilePics:      getProfilePics            (state),
        profileACs:       getProfileACs             (state),
    }
};
let mergeProps = (stateProps, dispatchProps)=>{
    const  profileState  = stateProps;
    const { dispatch }   = dispatchProps;

    const addPost              =(finalPost)=> {
        let date = new Date();
        let data=`${("0"+date.getDate()).slice(-2)}.${("0"+(date.getMonth()+1)).slice(-2)}.${(date.getFullYear()-2000)}`;
        let time=`${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`;
        dispatch(profileState.profileACs.addPostAC(finalPost, data, time));
    };
    const getProfileThunk      =(userId) =>   dispatch(profileState.profileACs.getProfileThUnkAC     (userId))    ;
    const updateStatusThunk    =(text)=>      dispatch(profileState.profileACs.updateStatusThunkAC   (text))      ;
    const updateMyAvatarThunk  =(image)=>     dispatch(profileState.profileACs.updateMyAvatarThunkAC (image))     ;
    const followUserThunk      =(userId)=>    dispatch(profileState.profileACs.followUserThunkAC     (userId))    ;
    const unFollowUserThunk    =(userId)=>    dispatch(profileState.profileACs.unFollowUserThunkAC   (userId))    ;


    return {profileState,addPost,getProfileThunk,updateStatusThunk,updateMyAvatarThunk,followUserThunk,unFollowUserThunk}
};

export const ProfileComposer = compose (connect(mapStateToProps, null, mergeProps), withRouter, withAuthRedirect)(ProfileFuncContainer);

