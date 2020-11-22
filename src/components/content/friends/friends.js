import React, {useState, useEffect} from 'react';
import {NavLink}                    from 'react-router-dom';
import stl                          from './../users/users.module.css'
import {Formik}                     from 'formik';

export const Friends1 = React.memo(function MyComponent(props) {

    // console.log(props)
    const followListener   = (userId) => { props.followThunk   (userId) };
    const unFollowListener = (userId) => { props.unFollowThunk (userId) };

    let [themes, setThemes] = useState({friendsGeneralDnmc:'',userAvaDnmc:'',followBTNDnmc:'',userBlockInfoDnmc:'',})
    useEffect(()=> {
        switch (props.colorTheme) {
            case 'NIGHT':
                setThemes({...themes,friendsGeneralDnmc:stl.friendsGeneralN,userAvaDnmc:stl.userAvaNight,
                    followBTNDnmc:stl.followBTNNight,userBlockInfoDnmc:stl.userBlockInfoNight,
                })
                return;
            case 'MORNING':
                setThemes({...themes,friendsGeneralDnmc:stl.friendsGeneralM,userAvaDnmc:stl.userAvaMorning,
                    followBTNDnmc:stl.followBTNMorning,userBlockInfoDnmc:stl.userBlockInfoMorning,
                })
                return;
            case 'DAY':
                setThemes({...themes,friendsGeneralDnmc: stl.friendsGeneralD,userAvaDnmc:stl.userAvaDay,
                    followBTNDnmc:stl.followBTNDay, userBlockInfoDnmc:stl.userBlockInfoDay,
                })
                return;
            case'EVENING':
                setThemes({...themes,friendsGeneralDnmc: stl.friendsGeneralE,userAvaDnmc:stl.userAvaEvening,
                    followBTNDnmc:stl.followBTNEvening, userBlockInfoDnmc:stl.userBlockInfoEvening,
                })
                return;
        }},[props.colorTheme])

    return <div className={`${stl.friendsGeneral} ${themes.friendsGeneralDnmc}`}>
        <h2 className={stl.userHeader}>Friends</h2>
        {props.friendsList.map((user, i) =>

            <div key={i} className={stl.userUnit}>
                <div className={stl.picAndButton}>
                    <NavLink to={`/profile/${user.id}`}>
                        <img src={user.photos.large||props.defaultAvatar} alt='err' className={`${themes.userAvaDnmc}`}/>
                    </NavLink>
                    <button disabled={props.followingInProgress.some(id=>id==user.id)} className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                            onClick={user.followed?()=>unFollowListener(user.id):()=>followListener(user.id)}
                    > {user.followed?'unFollow':'Follow'} </button>
                </div>
                <div className={`${stl.userBlockInfo} ${themes.userBlockInfoDnmc}`}>
                    <div className={stl.nameAndState}>
                        <NavLink to={`/profile/${user.id}`}><h2>{user.name}</h2></NavLink>
                        <p>{user.status} </p>
                    </div>
                </div>
            </div>

        )}
    </div>
});


export function Friends (props) {
    console.log(props)

    // let [themes, setThemes] = useState({friendsGeneralDnmc:'',})
    useEffect(()=> {
        switch (props.colorTheme) {
            case 'NIGHT':
                setThemes({...themes,friendsGeneralDnmc: stl.friendsGeneralN,
                })
                return;
            case 'MORNING':
                setThemes({...themes,friendsGeneralDnmc: stl.friendsGeneralM,
                })
                return;
            case 'DAY':
                setThemes({...themes,friendsGeneralDnmc: stl.friendsGeneralD,
                })
                return;
            case'EVENING':
                setThemes({...themes,friendsGeneralDnmc: stl.friendsGeneralE,
                })
                return;
        }},[props.colorTheme]);

    let [themes, setThemes] = useState({friendsGeneralDnmc:'',pagBTNDnmc:'',
        paginationSelectedDnmc:'',paginationDnmc:'', searchInputDnmc:'',userAvaDnmc:'',
        followBTNDnmc:'',userNameDnmc:'',mapWrapperDnmc:'', userUnitDnmc:'',userWriteModeDnmc:'', moreUserUnitsDnmc:'',
    });

    useEffect(()=> {
        switch (props.colorTheme) {
            case 'NIGHT':
                setThemes({...themes,
                    friendsGeneralDnmc: stl.friendsGeneralN,
                    pagBTNDnmc:stl.pagBTN_N,
                    paginationSelectedDnmc:stl.paginationSelectedN,
                    paginationDnmc:stl.paginationN,
                    searchInputDnmc:stl.searchInputN,
                    userAvaDnmc:stl.userAvaN,
                    followBTNDnmc:stl.followBTN_N,
                    userNameDnmc:stl.userNameN,
                    mapWrapperDnmc:stl.mapWrapperN,
                    userUnitDnmc:stl.userUnitN,
                    userWriteModeDnmc:stl.userWriteModeN,
                    moreUserUnitsDnmc:stl.moreUserUnitsN,
                });
                return;
            case 'MORNING':
                setThemes({...themes,
                    friendsGeneralDnmc: stl.friendsGeneralM,
                    pagBTNDnmc:stl.pagBTN_M,
                    paginationSelectedDnmc:stl.paginationSelectedM,
                    paginationDnmc:stl.paginationM,
                    searchInputDnmc:stl.searchInputM,
                    userAvaDnmc:stl.userAvaM,
                    followBTNDnmc:stl.followBTN_M,
                    userNameDnmc:stl.userNameM,
                    mapWrapperDnmc:stl.mapWrapperM,
                    userUnitDnmc:stl.userUnitM,
                    userWriteModeDnmc:stl.userWriteModeM,
                    moreUserUnitsDnmc:stl.moreUserUnitsM,
                });
                return;
            case 'DAY':
                setThemes({...themes,
                    friendsGeneralDnmc: stl.friendsGeneralD,
                    pagBTNDnmc:stl.pagBTN_D,
                    paginationSelectedDnmc:stl.paginationSelectedD,
                    paginationDnmc:stl.paginationD,
                    searchInputDnmc:stl.searchInputD,
                    userAvaDnmc:stl.userAvaD,
                    followBTNDnmc:stl.followBTN_D,
                    userNameDnmc:stl.userNameD,
                    mapWrapperDnmc:stl.mapWrapperD,
                    userUnitDnmc:stl.userUnitD,
                    userWriteModeDnmc:stl.userWriteModeD,
                    moreUserUnitsDnmc:stl.moreUserUnitsD
                });
                return;
            case 'EVENING':
                setThemes({...themes,
                    friendsGeneralDnmc: stl.friendsGeneralE,
                    pagBTNDnmc:stl.pagBTN_E,
                    paginationSelectedDnmc:stl.paginationSelectedE,
                    paginationDnmc:stl.paginationE,
                    searchInputDnmc:stl.searchInputE,
                    userAvaDnmc:stl.userAvaE,
                    followBTNDnmc:stl.followBTN_E,
                    userNameDnmc:stl.userNameE,
                    mapWrapperDnmc:stl.mapWrapperE,
                    userUnitDnmc:stl.userUnitE,
                    userWriteModeDnmc:stl.userWriteModeE,
                    moreUserUnitsDnmc:stl.moreUserUnitsE,
                });
                return;
            default: return {...themes}
        }
    },[props.colorTheme]);

    let [isDisabled, setIsDisabled]       = useState(false);
    let [userName, setUserName]           = useState('');
    let [msgStat, setMsgStat]             = useState(null);
    let [feedBack,setFeedBack]            = useState(false);
    let [feedBackClass, setFeedBackClass] = useState(stl.feedBackVisible); // false normal
    let [wrapperLocker, setWrapperLocker] = useState('');

    let firstBlockClass  = `${stl.userUnit} ${themes.userUnitDnmc} ${stl.userUnitShowed}`;
    let secondBlockClass = `${stl.userWriteMode} ${themes.userWriteModeDnmc} ${stl.userUnitShowed}`;

    const followListener   = (userId) => { props.followThunk   (userId) };
    const unFollowListener = (userId) => { props.unFollowThunk (userId) };


    let writeMsg = (userId,text,userName)=> {
        setUserName(userName)
        props.sendMessageToUserThunk(userId, text);
        setWrapperLocker('');
        setIsDisabled(false);
    };
    let userIdTalkModeOff =e=> {
        setWrapperLocker('');
        setIsDisabled(false);
        e.target.parentElement.parentElement.parentElement.children[0].className=firstBlockClass;
        e.target.parentElement.parentElement.parentElement.children[1].className=stl.userUnitHidden;
    };
    let userIdTalkModeOn  =e=> {
        setWrapperLocker(stl.wrapperLocked);
        setIsDisabled(true);
        e.target.parentElement.parentElement.parentElement.parentElement.children[0].className=stl.userUnitHidden;
        e.target.parentElement.parentElement.parentElement.parentElement.children[1].className=secondBlockClass;
    };

    return <div className={`${stl.friendsGeneral} ${themes.friendsGeneralDnmc}`}>
        <h2 className={stl.userHeader}>Friends</h2>
        <div className={`${stl.mapWrapper} ${themes.mapWrapperDnmc} ${wrapperLocker}`}>
            {props.friendsList.map((user, i) =>
                <div className={stl.userUnitContainer} key={user.id}>
                    <div className={`${stl.userUnit} ${themes.userUnitDnmc} ${stl.userUnitShowed}`} >
                        <div className={stl.avaDiv}>
                            <NavLink to={`/profile/${user.id}`}>
                                <img src={user.photos.large || props.usersInfo.defaultAvatar} alt='err'
                                     className={`${themes.userAvaDnmc}`}/>
                            </NavLink>
                        </div>
                        <div className={stl.nameStateBTNs}>
                            <div className={`${stl.userBlockInfo} ${themes.userBlockInfoDnmc}`}>
                                <NavLink to={`/profile/${user.id}`}>
                                    <h2 className={`${stl.userName} ${themes.userNameDnmc}`}>{user.name} </h2>
                                </NavLink>
                                <p className={`${themes.userNameDnmc}`}>{user.status}</p>
                            </div>
                            <div className={stl.followNWriteBTNS}>
                                <button
                                    disabled={props.usersInfo.followingInProgress.some(id=>id==user.id)}
                                    id={user.id}
                                    className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                                    onClick={user.followed?props.unFollowListener:props.followListener}>
                                    {user.followed?'unFollow':'Follow'}
                                </button>
                                <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                                        disabled={isDisabled}
                                        onClick={e=>userIdTalkModeOn(e,user.id, user.name)}
                                >
                                    Write message
                                </button>
                            </div>
                        </div>
                    </div>
                    <div  className={`${stl.userUnitHidden}`}>
                        <div className={stl.miniHeadWrapper}>
                            <h2 className={`${stl.userName} ${themes.userNameDnmc}`}>{user.name}</h2>
                            <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}>Go to chat</button>
                            <button className={`${stl.closeBTN} ${stl.followBTN} ${themes.followBTNDnmc}`}
                                    onClick={e=>{userIdTalkModeOff(e)}}
                            >X</button>
                        </div>
                        <div className={stl.textAreaWrapper}>
                            <Formik initialValues={{text:''}}validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
                                    onSubmit={(values,{setSubmitting})=>{writeMsg(user.id,values.text,user.name);values.text='';setSubmitting(false);
                                    }}>
                                {({values,errors,handleChange,handleSubmit,isSubmitting})=>(
                                    <form onSubmit={handleSubmit}>
                                                <textarea name="text" className={stl.talkTextarea}
                                                          onChange={handleChange} value={values.text} placeholder={errors.text} />
                                        <button type="submit" disabled={isSubmitting} className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                                        > Send Msg </button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div >
            )}
        </div>
    </div>
};

// {user.followed
//     ?
//     <button
//         disabled={props.followingInProgress.some(id => id == user.id)}
//         id={user.id}
//         className={stl.followBTN}
//         onClick={()=>unFollowListener(user.id)}>unFollow
//     </button>
//     :
//     <button
//         disabled={props.followingInProgress.some(id => id == user.id)}
//         id={user.id}
//         className={stl.followBTN}
//         onClick={()=>followListener(user.id)}>Follow
//     </button>
// }