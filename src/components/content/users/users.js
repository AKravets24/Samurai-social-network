import React from "react";
import stl from './users.module.css';
import {NavLink} from 'react-router-dom';
import UnAuthorised from "../unAuthorised/unAuthorised";

function Users(props) {
    // console.log(props.isAuth);
    let pagesArr = [];
    let pagesCount = Math.ceil(props.totalCount / props.pageSize);
    for (let i = 1; i <= pagesCount; i++) { pagesArr.push(i)}
    return <>
        <div className={stl.usersPage}>
                {/*<img className={stl.loader} src={props.usersInfo.loader} alt="Err"/>*/}
                <div className={stl.userInfo}>
                    <h2 className={stl.userHeader}>Users</h2>
                    <div className={stl.paginationBlockOutside}>
                        {pagesArr.map((page, index) =>
                            <div key={index} className={stl.paginationBlockInside}>
                                {props.currentPage === page                                     ?
                                    <span  className={stl.paginationSelected}> {page} </span>   :
                                    <span  className={stl.pagination}  onClick={() => { props.setPageListener(page);
                                    }}> {page} </span> }
                            </div>
                        )}
                    </div>
                    <ul>
                        {props.usersInfo.isLoading ?
                            <div className={stl.loaderDiv}>
                                <img className={stl.loader} src={props.usersInfo.loader} alt="Err"/>
                            </div> :
                            props.usersInfo.initialUsersList
                                .map(user =>
                                    <li key={user.id}>
                                        <div className={stl.userUnit}>
                                            <div className={stl.picAndButton}>
                                                <NavLink to={`/profile/${user.id}`}>
                                                    {user.photos.large
                                                        ? <img src={user.photos.large} alt='err'/>
                                                        : <img src={props.usersInfo.defaultAvatar} alt='err'/>
                                                    }
                                                </NavLink>
                                                {user.followed
                                                    ?
                                                    <button
                                                        disabled={props.usersInfo.followingInProgress.some(id =>
                                                            id == user.id)}
                                                        id={user.id}
                                                        className={stl.followBTN}
                                                        onClick={props.unFollowListener}>unFollow
                                                    </button>
                                                    :
                                                    <button
                                                        disabled={props.usersInfo.followingInProgress.some(id =>
                                                            id == user.id)}
                                                        id={user.id}
                                                        className={stl.followBTN}
                                                        onClick={props.followListener}>Follow
                                                    </button>
                                                }
                                            </div>
                                            <div className={stl.userBlockInfo}>
                                                <div className={stl.nameAndState}>
                                                    <h2>{user.name} </h2>
                                                    <p>{user.status} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                        }
                    </ul>
                </div>
                <div className={stl.moreUserUnits}>
                    <button className={stl.moreUsersShower}
                            onClick={props.showMoreListener}>Show More
                    </button>
                </div>
            </div>

    </>
}

export default Users;

// let pagination = pagesArr.map((page, index) =>
//
// <div key={index} className={stl.paginationBlockInside}>
//     { props.currentPage === page
//         ?
//         <span
//               className={stl.paginationSelected}> {page} </span>
//         :
//         <span
//             className={stl.pagination}
//               onClick={() => {
//                   props.setPageListener(page);
//               }}> {page} </span>
//     }
// </div>
// );
// let loader = props.usersInfo.isLoading;
// debugger
// let usersMapper = props.usersInfo.initialUsersList
//     .map(user =>
//         <li key={user.id}>
//             <div className={stl.userUnit}>
//                 <div className={stl.picAndButton}>
//
//                     <NavLink to={`/profile/${user.id}`} >
//                         {user.photos.large
//                             ? <img src={user.photos.large} alt='err'/>
//                             : <img src={props.usersInfo.defaultAvatar} alt='err'/>
//                         }
//                     </NavLink>
//
//                     {user.followed
//                         ?
//                         <button
//                             disabled={props.usersInfo.followingInProgress.some( id=> id == user.id )}
//                             id={user.id}
//                             className={stl.followBTN}
//                             onClick={props.unFollowListener}>unFollow
//                         </button>
//                         :
//                         <button
//                             disabled={props.usersInfo.followingInProgress.some( id=> id == user.id )}
//                             id={user.id}
//                             className={stl.followBTN}
//                             onClick={props.followListener}>Follow
//                         </button>
//                     }
//                 </div>
//                 <div className={stl.userBlockInfo}>
//                     <div className={stl.nameAndState}>
//                         <h2>{user.name} </h2>
//                         <p>{user.status} </p>
//                     </div>
//                     <div className={stl.countryAndCity}>
//                         <h2>{user.userCountry} *userCountry*</h2>
//                         <h2>{user.userCity} *userCity*</h2>
//                     </div>
//                 </div>
//             </div>
//         </li>
//     );

// let paginationSelector = loader ? null : pagination;
/*let selectorUsers = loader ?
    <div className={stl.loaderDiv}>
        <img className={stl.loader} src={props.usersInfo.loader} alt="Err"/>
    </div> :
    usersMapper;*/
// let selectorUsers = loader ? <img className={stl.loader} src={loaderGif} alt="Err"/> : usersMapper;
