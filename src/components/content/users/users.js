import React, {useState, useEffect  } from "react";
import stl                            from './users.module.css';
import {NavLink}                      from 'react-router-dom';
// import UnAuthorised                from "../unAuthorised/unAuthorised";

function Users(props) {
    // console.log(props.sendingMSGStat);
    const pagesCount = Math.ceil(props.totalCount / props.pageSize);
    let [startPage,  setStartPage]   = useState(1);
    let [endPage,    setEndPage]     = useState(10);
    let [scrollStep, setScrollStep]  = useState(10);
    let [disableDec, setDisableDec]  = useState(true);
    let [disableInc, setDisableInc]  = useState(false);
    let [modalWindow,setModalWindow] = useState(false) // false normal

    let paginatorDec = () => {
        setStartPage(startPage - scrollStep);
        setEndPage(endPage - scrollStep);
        startPage <= 1 ? setDisableDec(disableDec = true) : setDisableDec(disableDec = false);
        endPage >= pagesCount ? setDisableInc(disableInc = true) : setDisableInc(disableInc = false)
    };
    let paginatorInc = () => {
        setStartPage(startPage + scrollStep);
        setEndPage(endPage + scrollStep);
        startPage <= 1 ? setDisableDec(disableDec = true) : setDisableDec(disableDec = false);
        endPage >= pagesCount ? setDisableInc(disableInc = true) : setDisableInc(disableInc = false);
    };
    let paginator    = () => {
        let pagesArr = [];
        // let pagesCount = Math.ceil(props.totalCount / props.pageSize);
        for (let i = startPage; i <= endPage; i++) {
            if (startPage < 1) {
                setStartPage(startPage = 1);
                setEndPage(endPage = scrollStep)
            }
            if (endPage > pagesCount) {
                setStartPage(startPage = pagesCount - scrollStep);
                setEndPage(endPage = pagesCount)
            }
            pagesArr.push(i)
        }

        return pagesArr.map((page, index) =>
            <div key={index} className={stl.paginationBlockInside}>
                {
                    props.currentPage === page ?
                        <span className={stl.paginationSelected}> {page} </span> :
                        <span className={stl.pagination} onClick={() => {
                            setPageListener(page);
                        }}> {page} </span>}
            </div>
        );
    };

    let setPageListener = (page) => {props.setCurrentPage(page)};
    let onChangeListener = ({target}) => {let {value} = target;props.updateSearchField(value)};
    let keyUpListener=(e)=>{if(e.keyCode === 13){let userName=props.usersInfo.userSearchField;props.getCertainUserThunk(userName);} };
    let searchListener=()=>{let userName=props.usersInfo.userSearchField;props.getCertainUserThunk(userName);};
    let searchModeCloseListener = () => {props.toggleUserSearchMode(false);props.setCurrentPage(props.usersInfo.currentPage); };

    let [userId, setUserId]               = useState('');
    let [userName, setUserName]           = useState('');
    let [textAreaValue, setTextareaValue] = useState('');
    let [msgStat, setMsgStat]             = useState(null);
    let [feedBack,setFeedBack]            = useState(false)
    let [feedBackClass, setFeedBackClass] = useState(stl.feedBackVisible); // false normal

    useEffect(()=>{
        switch (props.sendingMSGStat) {
            case 0: setFeedBack(true); setFeedBackClass(stl.feedBackVisible); setMsgStat('Sending message...');
                return;
            case 1:
                setMsgStat(`Message delivered to ${userName}`);
                setTimeout(()=>{setFeedBackClass(stl.feedbackHidden)},5000) //через 5 сек анимация плавного убирания на 3 секунды
                setTimeout(()=>{setFeedBack(false)},8000)  // через 8 секунд объект удаляется из DOM
                return;
            case 2:
                setMsgStat(`Failed to deliver message!`)
                setTimeout(() => {setFeedBackClass(stl.feedbackHidden)},5000) // то же самое
                setTimeout(() => {setFeedBack(false)},8000)  // то же самое
                return;
        }
    },[props.sendingMSGStat]);

    let modalWindowSetter=(userId,userName)=>{setUserId(userId);setUserName(userName);setModalWindow(true);};
    let writeMsg = (userId)=> {
        props.sendMessageToUserThunk(userId, textAreaValue);
        setTextareaValue('');
        setModalWindow(false);
        // console.log(`your message was send to ${userName}` )
        // if (props.dialogsErrs === true){console.log(`Cannot send your message`) }
    };

    return <>
        <div className={stl.usersPage}>
            <div className={stl.userInfo}>
                <div className={stl.generalHeader}>
                    <h2 className={stl.userHeader}>Users</h2>

                    <div className={stl.paginationBlockOutside}>
                        {!props.usersInfo.userSearchMode && pagesCount !== 0 &&
                        <>
                            <button className={stl.pagBTN} onClick={paginatorDec}
                                    disabled={disableDec}> &#171; 5 </button>
                            { paginator() }
                            <button className={stl.pagBTN} onClick={paginatorInc}
                                    disabled={disableInc}> 5 &#187;  </button>
                        </>
                        }
                    </div>

                    <div className={stl.searchBlock} >
                        <input type="text"
                               value={props.usersInfo.userSearchField}
                               onChange={onChangeListener}
                               onKeyUp={keyUpListener}
                               className={stl.pagBTN}     />
                        <button className={stl.pagBTN} onClick={searchListener}>Find!</button>
                        <button className={stl.pagBTN} onClick={searchModeCloseListener}>X</button>
                    </div>

                </div>
                {modalWindow &&
                    <div className={stl.modalWindow}>
                        <div className={stl.miniHeader}>
                            <button>To dialog with {userName} </button>
                            <button onClick={()=>{setModalWindow(false)}} > X </button>
                        </div>
                        <div className={stl.textNBTN}>
                            <textarea className={stl.windowTextarea}
                                      value={textAreaValue}
                                      onChange={e=>setTextareaValue(e.target.value)}
                            />
                            <button onClick={(body)=>writeMsg(userId,body)}>Send</button>
                        </div>

                    </div>
                }
                {feedBack &&
                    <div className={`${stl.feedbackWindow} ${feedBackClass}`}>
                        <button onClick={()=>setFeedBack(false)}>X</button>
                        <p>{msgStat}</p>
                    </div>
                }
                <ul>
                    {props.usersInfo.isLoading ?
                        <div className={stl.loaderDiv}>
                            <img className={stl.loader} src={props.usersInfo.loader} alt="Err"/>
                        </div> :
                        props.usersInfo.initialUsersList
                            .map(user =>
                                <li key={user.id} >
                                    <div className={stl.userUnit}>
                                        <div className={stl.picAndButton}>
                                            <NavLink to={`/profile/${user.id}`}>
                                                    <img src={user.photos.large || props.usersInfo.defaultAvatar} alt='err'/>
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
                                            <button className={stl.followBTN}
                                                    onClick={()=>modalWindowSetter(user.id,user.name)}
                                            > Write message </button>
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
            <div className={stl.moreUserUnits}>
                <button className={stl.moreUsersShower}
                        onClick={props.showMoreListener}>Show More
                </button>
            </div>
        </div>

    </>
}

export default Users;


// let paginator = () => {
//     let pagesArr = [];
//     let pagesCount = Math.ceil(props.totalCount / props.pageSize);
//     for (let i = 1; i <= pagesCount; i++) { pagesArr.push(i)}
//     console.log(pagesCount)
//     return   pagesArr.map((page, index) =>
//             <div key={index} className={stl.paginationBlockInside}>
//                 {props.currentPage === page                                     ?
//                     <span  className={stl.paginationSelected}> {page} </span>   :
//                     <span  className={stl.pagination}  onClick={() => { setPageListener(page);
//                     }}> {page} </span> }
//             </div>
//     );
// };