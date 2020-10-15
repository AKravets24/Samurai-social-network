import React,{useState,useEffect} from "react";
import {Formik}                   from 'formik';
import {NavLink}                  from 'react-router-dom';
import stl                        from './profile.module.css';
import Post                       from './post/post';
import {StatusCompFunc}              from "./statusBlock";


const Profile = React.memo(props => {
    // console.log(props.state.profileMedia)
    // console.log(props.state.profileMedia)
    // props.state.profile, props.state.props.loader, props.state.props.myAvatarLarge, props.state.myId,
    // props.state.props
    let userId = props.state.profileMedia.profileData.userId;

    let [themes, setThemes] = useState({profileDynamic:'',profileInfoDnmc:'',BTNs: '',writePostDnmc:'',textInput:'',})
    useEffect(()=> {
        if     (props.state.colorTheme==='NIGHT'  ){ setThemes({...themes,profileDynamic:stl.profileN,
            profileInfoDnmc:stl.profileInfoN,BTNs:stl.BTNsN,writePostDnmc:stl.writePostN,textInput: stl.inputN,})}
        else if(props.state.colorTheme==='MORNING'){ setThemes({...themes,profileDynamic:stl.profileM,
            profileInfoDnmc:stl.profileInfoM, BTNs:stl.BTNsM,writePostDnmc:stl.writePostM,textInput: stl.inputM,})}
        else if(props.state.colorTheme==='DAY'    ){ setThemes({...themes,profileDynamic:stl.profileD,
            profileInfoDnmc:stl.profileInfoD,BTNs:stl.BTNsD,writePostDnmc:stl.writePostD,textInput: stl.inputD,})}
        else if(props.state.colorTheme==='EVENING'){ setThemes({...themes,profileDynamic:stl.profileE,
            profileInfoDnmc:stl.profileInfoE,BTNs:stl.BTNsE,writePostDnmc:stl.writePostE, textInput: stl.inputE,})}
    },[props.colorTheme])

    const addPostListener = (finalPost) => { props.addPost(finalPost) };
    const getContacts     = (obj)       => { const result = [];
        for (let key in obj) { if (!obj[key]) { obj[key] = 'nope' } result.push({title:key,value:obj[key]})}
        return ( result.map((el, i) =>  <li key={i}> {el.title} : {el.value} </li> ) ) };
    const photoSaver      = (e)         => { props.updateMyAvatarThunk(e.target.files[0]) };

    // const [panorama, setPanorama] = useState({panoramaClass:stl.panoramaGIF,panoramaSrc:props.state.panorama_LDR_GIF})
    const [panorama, setPanorama] = useState({panoramaClass:stl.panoramaPic,panoramaSrc:props.state.panoramaPic})

    return <>
       {!userId &&
        <div className={stl.loaderDiv}>
            <img className={stl.loader} src={props.state.auth_LDR_GIF} alt="Err"/>
        </div>
        }
        {userId &&
        <div className={`${stl.profile} ${themes.profileDynamic}`}>
            <div className={stl.panorama}>
                    <img
                        // onLoad={()=>{setPanorama({panoramaClass:stl.panoramaPic,panoramaSrc:props.state.panoramaPic})}}
                         className={panorama.panoramaClass}
                         src={panorama.panoramaSrc} alt="Err"
                    />
            </div>
            <div className={stl.profileWrapper}>
                <div className={stl.profileDetails}>
                    <div className={stl.profilePicNBTN}>
                        <div>
                            <img src={!userId?props.ava_LDR_GIF:props.state.profileMedia.profileData.photos.large||props.state.profileMedia.myAvatarLarge} alt="Err"/>
                        </div>
                        <input disabled={!userId} type="file" name="image" id='file' onChange={photoSaver} className={stl.fileInput}/>
                        {!userId                                                                        ?
                            <label htmlFor="file" className={`${stl.fileChooser} ${themes.BTNs}`}
                            ><img src={props.BTN_LDR_GIF} alt="err"/></label>                           :
                            props.state.myId === userId                                                 ?
                            <label htmlFor="file" className={`${stl.fileChooser} ${themes.BTNs}`}
                            >   <div> Choose your new picture</div>
                                <div> Choose your <s>destiny!</s></div>
                            </label>                                                                    :
                            <label htmlFor="file" className={`${stl.fileChooser} ${themes.BTNs}`}>
                            <NavLink className={stl.writeMessage} to={`/dialogs/${userId}` }
                            > Write Message
                            </NavLink>
                        </label>
                        }
                    </div>
                    <div className={`${stl.profileInfo} ${themes.profileInfoDnmc}` }>
                        <h2> {props.state.profileMedia.profileData.fullName}</h2>
                        <ul>
                            {props.state.profileMedia.profileData.contacts && getContacts(props.state.profileMedia.profileData.contacts)}
                        </ul>
                        <div className={stl.statusBlock}>
                            <StatusCompFunc
                                isMe                     = { props.state.myId === userId                       }
                                isLoading                = { !userId                                           }
                                loader                   = { props.status_LDR_GIF                              }
                                statusField              = { props.state.profileMedia.statusField              }
                                previousStatus           = { props.state.profileMedia.previousStatus           }
                                updateStatusThunk        = { props.updateStatusThunk                           }
                                letterBalanceCounter     = { props.letterBalanceCounter                        }
                                statusFieldMaxLength     = { props.state.profileMedia.statusFieldMaxLength     }
                                statusFieldBalanceLength = { props.state.profileMedia.statusFieldBalanceLength }
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`${stl.writePost} ${themes.writePostDnmc}` }>
                        <h2>My posts</h2>
                        <div className={stl.inputBox}>
                            <Formik initialValues={{text:''}} validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
                                onSubmit={(values,{setSubmitting})=>{addPostListener(values.text);values.text='';setSubmitting(false);
                                }}>
                                    {({values, errors,handleChange, handleSubmit,  isSubmitting,}) => (
                                      <form onSubmit={handleSubmit}>
                                          <textarea name="text" className={themes.textInput}
                                                    onChange={handleChange} value={values.text} placeholder={errors.text} />
                                          <button type="submit" disabled={isSubmitting} className={`${themes.BTNs}`}> Send </button>
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
},
    function areEqual (prevProps, nextProps) {
    return prevProps.state.profileMedia.isLoading === nextProps.state.profileMedia.isLoading;

})
export default Profile;

// {!props.state.profileMedia.profileData.userId ?
//     <label htmlFor="file" className={`${stl.fileChooser} ${themes.BTNs}`} onMouseEnter={funnyHover} onMouseLeave={funnyUnHover}
//     > {props.BTN_LDR_GIF} </label> :
//     props.state.myId === props.state.profileMedia.profileData.userId       ?
//         <label htmlFor="file" className={`${stl.fileChooser} ${themes.BTNs}`} onMouseEnter={funnyHover} onMouseLeave={funnyUnHover}
//         >Choose your {funnyText}</label> :
//         <NavLink className={stl.writeMessage} to={`/dialogs/${props.state.profileMedia.profileData.userId}` }
//         > Write Message </NavLink> }

//function areEqual (prevProps, nextProps) {
//
//     // if ( prevProps.state.profileMedia !== nextProps.state.profileMedia ) {
//     if ( prevProps.state.profileMedia.isLoading !== nextProps.state.profileMedia.isLoading ) {
//         return false
//     } else return true
//
// }