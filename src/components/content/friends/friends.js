import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import stlHeader from './friends.module.css'
import stl from './../users/users.module.css'

export function Friends(props) {
    // console.log(props.defaultAvatar)
    return (
        <div className={stl.friendsGeneral}>
            <h2 className={stl.userHeader}>Friends</h2>
            <ul>
                {props.friendsList.map((user, i) =>
                    <li key={i}>
                        <div className={stl.userUnit}>
                            <div className={stl.picAndButton}>
                                <NavLink to={`/profile/${user.id}`}>
                                    <img src={user.photos.large || props.defaultAvatar} alt='err'/>
                                </NavLink>
                                {user.followed
                                    ?
                                    <button
                                        // disabled={props.usersInfo.followingInProgress.some(id =>
                                        //     id == user.id)}
                                        id={user.id}
                                        className={stl.followBTN}
                                        onClick={props.unFollowListener}>unFollow
                                    </button>
                                    :
                                    <button
                                        // disabled={props.usersInfo.followingInProgress.some(id =>
                                        //     id == user.id)}
                                        id={user.id}
                                        className={stl.followBTN}
                                        onClick={props.followListener}>Follow
                                    </button>
                                }
                            </div>
                            <div className={stl.userBlockInfo}>
                                <div className={stl.nameAndState}>
                                    <NavLink to={`/profile/${user.id}`}>
                                        <h2>{user.name} </h2>
                                    </NavLink>
                                    <p>{user.status} </p>
                                </div>
                            </div>
                        </div>
                    </li>
                )
                }
            </ul>
        </div>
    )
};