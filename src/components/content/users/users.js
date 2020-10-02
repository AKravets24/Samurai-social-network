import React, {useState, useEffect  } from "react";
import stl                            from './users.module.css';
import {NavLink}                      from 'react-router-dom';
// import UnAuthorised                from "../unAuthorised/unAuthorised";

function Users(props) {
    // console.log(props.colorTheme);
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
            if (startPage < 1) {setStartPage(startPage = 1); setEndPage(endPage = scrollStep)}
            if (endPage > pagesCount) {setStartPage(startPage = pagesCount - scrollStep);setEndPage(endPage = pagesCount)}
            pagesArr.push(i)
        }

        return pagesArr.map((page, index) =>
            <div key={index} className={stl.paginationBlockInside}>
                {props.currentPage === page ?
                        <span className={ `${stl.paginationSelected} ${themes.paginationSelectedDnmc}`}> {page} </span> :
                        <span className={`${stl.pagination} ${themes.paginationDnmc}`} onClick={() => {setPageListener(page);
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

    let [themes, setThemes] = useState({userPageDynamic:"",scroller:'',generalHeaderDnmc:'',pagBTNDnmc:'',
        paginationSelectedDnmc:'',paginationDnmc:'', searchInputDnmc:'',userAvaDnmc:'',followBTNDnmc:'',userNameDnmc:'',
        userBlockInfoDnmc:'',moreUserUnitsDnmc:'',
    });

    useEffect(()=> {
        switch (props.colorTheme) {
            case 'NIGHT':
                setThemes({...themes,userPageDnmc: stl.usersPageNight,scroller:stl.scrollerNight,generalHeaderDnmc:stl.generalHeaderNight,
                    pagBTNDnmc:stl.pagBTNNight, paginationSelectedDnmc:stl.paginationSelectedNight,paginationDnmc:stl.paginationNight,
                    searchInputDnmc:stl.searchInputNight,userAvaDnmc:stl.userAvaNight,followBTNDnmc:stl.followBTNNight,
                    userNameDnmc:stl.userNameNight,userBlockInfoDnmc:stl.userBlockInfoNight,moreUserUnitsDnmc:stl.moreUserUnitsNight,
                });
                return;
            case 'MORNING':
                setThemes({...themes,userPageDnmc: stl.usersPageMorning,scroller:stl.scrollerMorning,generalHeaderDnmc:stl.generalHeaderMorning,
                    pagBTNDnmc:stl.pagBTNMorning,paginationSelectedDnmc:stl.paginationSelectedMorning,paginationDnmc:stl.paginationMorning,
                    searchInputDnmc:stl.searchInputMorning,userAvaDnmc:stl.userAvaMorning,followBTNDnmc:stl.followBTNMorning,
                    userNameDnmc:stl.userNameMorning,userBlockInfoDnmc:stl.userBlockInfoMorning,moreUserUnitsDnmc:stl.moreUserUnitsMorning,
                });
                return;
            case 'DAY':
                setThemes({...themes,userPageDnmc: stl.usersPageDay,scroller:stl.scrollerDay,generalHeaderDnmc:stl.generalHeaderDay,
                    pagBTNDnmc:stl.pagBTNDay,paginationSelectedDnmc:stl.paginationSelectedDay,paginationDnmc:stl.paginationDay,
                    searchInputDnmc:stl.searchInputDay,userAvaDnmc:stl.userAvaDay,followBTNDnmc:stl.followBTNDay,
                    userNameDnmc:stl.userNameDay,userBlockInfoDnmc:stl.userBlockInfoDay,moreUserUnitsDnmc:stl.moreUserUnitsDay
                });
                return;
            case 'EVENING':
                setThemes({...themes,userPageDnmc: stl.usersPageEvening,scroller:stl.scrollerEvening,generalHeaderDnmc:stl.generalHeaderEvening,
                    pagBTNDnmc:stl.pagBTNEvening,paginationSelectedDnmc:stl.paginationSelectedEvening,paginationDnmc:stl.paginationEvening,
                    searchInputDnmc:stl.searchInputEvening,userAvaDnmc:stl.userAvaEvening,followBTNDnmc:stl.followBTNEvening,
                    userNameDnmc:stl.userNameEvening,userBlockInfoDnmc:stl.userBlockInfoEvening,moreUserUnitsDnmc:stl.moreUserUnitsEvening,
                });
                return;
            default: return {...themes}
        }
    },[props.colorTheme]);

    return <>
        <div className={`${stl.usersPage} ${themes.userPageDnmc}`}>
            <div className={`${stl.userInfo} ${themes.scroller}`}>
                <div className={`${stl.generalHeader} ${themes.generalHeaderDnmc}`}>
                    <h2 className={stl.userHeader}>Users</h2>

                    <div className={stl.paginationBlockOutside}>
                        {!props.usersInfo.userSearchMode && pagesCount !== 0 &&
                        <>
                            <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={paginatorDec}
                                    disabled={disableDec}> &#171; 5 </button>
                            { paginator() }
                            <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={paginatorInc}
                                    disabled={disableInc}> 5 &#187;  </button>
                        </>
                        }
                    </div>

                    <div className={stl.searchBlock} >
                        <input type="text"
                               value={props.usersInfo.userSearchField}
                               onChange={onChangeListener}
                               onKeyUp={keyUpListener}
                               className={`${stl.searchInput} ${themes.searchInputDnmc}`}     />
                        <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={searchListener}>Find!</button>
                        <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={searchModeCloseListener}>X</button>
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
                            <img className={stl.loader} src={props.usersInfo.loader} alt="Err"/>  {/*ЛОДЫРЯ ПРОКИНУТЬ*/}
                        </div> :
                        props.usersInfo.initialUsersList
                            .map(user =>
                                <li key={user.id} >
                                    <div className={stl.userUnit}>
                                        <div className={stl.picAndButton}>
                                            <NavLink to={`/profile/${user.id}`}>
                                                    <img src={user.photos.large || props.usersInfo.defaultAvatar} alt='err'
                                                    className={`${themes.userAvaDnmc}`}/>
                                            </NavLink>
                                            {user.followed
                                                ?
                                                <button
                                                    disabled={props.usersInfo.followingInProgress.some(id =>
                                                        id == user.id)}
                                                    id={user.id}
                                                    className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                                                    onClick={props.unFollowListener}>unFollow
                                                </button>
                                                :
                                                <button
                                                    disabled={props.usersInfo.followingInProgress.some(id =>
                                                        id == user.id)}
                                                    id={user.id}
                                                    className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                                                    onClick={props.followListener}>Follow
                                                </button>
                                            }
                                            <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                                                    onClick={()=>modalWindowSetter(user.id,user.name)}
                                            > Write message </button>
                                        </div>
                                        <div className={`${stl.userBlockInfo} ${themes.userBlockInfoDnmc}`}>
                                            <div className={stl.nameAndState}>
                                                <NavLink to={`/profile/${user.id}`}>
                                                    <h2 className={`${themes.userNameDnmc}`}>{user.name} </h2>
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
            <div className={ `${stl.moreUserUnits}  ${themes.moreUserUnitsDnmc}`}>
                <button className={`${stl.moreUsersShower} ${themes.pagBTNDnmc}`}
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