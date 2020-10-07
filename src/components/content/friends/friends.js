import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import stlHeader from './friends.module.css'
import stl from './../users/users.module.css'


export const Friends = React.memo(function MyComponent(props) {

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


export function Friends1(props) {
    // console.log(props)

    const followListener   = (userId) => { props.followThunk   (userId) };
    const unFollowListener = (userId) => { props.unFollowThunk (userId) };

    let [themes, setThemes] = useState({friendsGeneralDnmc:'',})
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
        }},[props.colorTheme])

    return <div className={`${stl.friendsGeneral} ${themes.friendsGeneralDnmc}`}>
        <h2 className={stl.userHeader}>Friends</h2>
            {props.friendsList.map((user, i) =>
                <div key={i} className={stl.userUnit}>
                    <div className={stl.picAndButton}>
                        <NavLink to={`/profile/${user.id}`}><img src={user.photos.large||props.defaultAvatar} alt='err'/>
                        </NavLink>
                        <button disabled={props.followingInProgress.some(id=>id==user.id)} className={stl.followBTN}
                                onClick={user.followed?()=>unFollowListener(user.id):()=>followListener(user.id)}
                        >{user.followed?'unFollow':'Follow'}
                        </button>
                    </div>
                    <div className={stl.userBlockInfo}>
                        <div className={stl.nameAndState}>
                            <NavLink to={`/profile/${user.id}`}><h2>{user.name}</h2></NavLink>
                            <p>{user.status} </p>
                        </div>
                    </div>
                </div>
            )}
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