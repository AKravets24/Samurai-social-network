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
        let pagesArr=[];
        // let pagesCount = Math.ceil(props.totalCount / props.pageSize);
        for (let i=startPage;i<=endPage;i++){if(startPage<1){setStartPage(1);setEndPage(endPage=scrollStep)}
            if(endPage>pagesCount){setStartPage(pagesCount-scrollStep);setEndPage(pagesCount)}; pagesArr.push(i)
        }
        return pagesArr.map((page, i) =>
            <div key={i} className={`${stl.paginationBlockInside} ${themes.paginationBlockDnmc}` }>
                {props.currentPage === page ?
                    <span className={ `${stl.paginationSelected} ${themes.paginationSelectedDnmc}`}> {page} </span> :
                    <span className={`${stl.pagination} ${themes.paginationDnmc}`} onClick={()=>{setPageListener(page);
                        }}> {page} </span>}
            </div>
        );
    };

    let setPageListener = (page) => {props.setCurrentPage(page)};
    let onChangeListener = ({target}) => {let {value} = target;props.updateSearchField(value)};
    let keyUpListener=(e)=>{if(e.keyCode === 13){let userName=props.usersInfo.userSearchField;props.getCertainUserThunk(userName);} };
    let searchListener=()=>{let userName=props.usersInfo.userSearchField;props.getCertainUserThunk(userName);};
    let searchModeCloseListener = () => {props.toggleUserSearchMode(false);props.setCurrentPage(props.usersInfo.currentPage); };

    let [userName, setUserName]           = useState('');
    let [textAreaValue, setTextareaValue] = useState('');
    let [msgStat, setMsgStat]             = useState(null);
    let [feedBack,setFeedBack]            = useState(false)
    let [feedBackClass, setFeedBackClass] = useState(stl.feedBackVisible); // false normal
    let [wrapperLocker, setWrapperLocker] = useState('')

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
    let writeMsg = (userId,userName)=> {
        setUserName(userName)
        props.sendMessageToUserThunk(userId, textAreaValue);
        setTextareaValue('');
        setWrapperLocker('');
        // console.log(`your message was send to ${userName}` )
        // if (props.dialogsErrs === true){console.log(`Cannot send your message`) }
    };

    let [themes, setThemes] = useState({userPageDnmc:"",generalHeaderDnmc:'',pagBTNDnmc:'',
        paginationSelectedDnmc:'',paginationDnmc:'', paginationBlockDnmc:'', searchInputDnmc:'',userAvaDnmc:'',
        followBTNDnmc:'',userNameDnmc:'',mapWrapperDnmc:'', userUnitDnmc:'',moreUserUnitsDnmc:'',
    });
    useEffect(()=> {
        switch (props.colorTheme) {
            case 'NIGHT':
                setThemes({...themes,
                    userPageDnmc: stl.usersPageN,
                    generalHeaderDnmc:stl.generalHeaderN,
                    pagBTNDnmc:stl.pagBTN_N,
                    paginationSelectedDnmc:stl.paginationSelectedN,
                    paginationDnmc:stl.paginationN,
                    paginationBlockDnmc:stl.paginationBlockInsideN,
                    searchInputDnmc:stl.searchInputN,
                    userAvaDnmc:stl.userAvaN,
                    followBTNDnmc:stl.followBTN_N,
                    userNameDnmc:stl.userNameN,
                    mapWrapperDnmc:stl.mapWrapperN,
                    userUnitDnmc:stl.userUnitN,
                    moreUserUnitsDnmc:stl.moreUserUnitsN,
                });
                return;
            case 'MORNING':
                setThemes({...themes,
                    userPageDnmc: stl.usersPageM,
                    generalHeaderDnmc:stl.generalHeaderM,
                    pagBTNDnmc:stl.pagBTN_M,
                    paginationSelectedDnmc:stl.paginationSelectedM,
                    paginationDnmc:stl.paginationM,
                    paginationBlockDnmc:stl.paginationBlockInsideM,
                    searchInputDnmc:stl.searchInputM,
                    userAvaDnmc:stl.userAvaM,
                    followBTNDnmc:stl.followBTN_M,
                    userNameDnmc:stl.userNameM,
                    mapWrapperDnmc:stl.mapWrapperM,
                    userUnitDnmc:stl.userUnitM,
                    moreUserUnitsDnmc:stl.moreUserUnitsM,
                });
                return;
            case 'DAY':
                setThemes({...themes,
                    userPageDnmc: stl.usersPageD,
                    generalHeaderDnmc:stl.generalHeaderD,
                    pagBTNDnmc:stl.pagBTN_D,
                    paginationSelectedDnmc:stl.paginationSelectedD,
                    paginationDnmc:stl.paginationD,
                    paginationBlockDnmc:stl.paginationBlockInsideD,
                    searchInputDnmc:stl.searchInputD,
                    userAvaDnmc:stl.userAvaD,
                    followBTNDnmc:stl.followBTN_D,
                    userNameDnmc:stl.userNameD,
                    mapWrapperDnmc:stl.mapWrapperD,
                    userUnitDnmc:stl.userUnitD,
                    moreUserUnitsDnmc:stl.moreUserUnitsD
                });
                return;
            case 'EVENING':
                setThemes({...themes,
                    userPageDnmc: stl.usersPageE,
                    generalHeaderDnmc:stl.generalHeaderE,
                    pagBTNDnmc:stl.pagBTN_E,
                    paginationSelectedDnmc:stl.paginationSelectedE,
                    paginationDnmc:stl.paginationE,
                    paginationBlockDnmc:stl.paginationBlockInsideE,
                    searchInputDnmc:stl.searchInputE,
                    userAvaDnmc:stl.userAvaE,
                    followBTNDnmc:stl.followBTN_E,
                    userNameDnmc:stl.userNameE,
                    mapWrapperDnmc:stl.mapWrapperE,
                    userUnitDnmc:stl.userUnitE,
                    moreUserUnitsDnmc:stl.moreUserUnitsE,
                });
                return;
            default: return {...themes}
        }
    },[props.colorTheme]);

    let [primaryClassName, setPrimaryClassName]=useState('');
    let userIdTalkModeOn =e=>{
        setWrapperLocker(stl.wrapperLocked);
        setPrimaryClassName(e.target.parentElement.parentElement.parentElement.parentElement.children[0].className)  // кладем класс в переменную
        e.target.parentElement.parentElement.parentElement.parentElement.children[0].className=stl.userUnitHidden;
        e.target.parentElement.parentElement.parentElement.parentElement.children[1].className=stl.userUnitShowed;
    };
    let userIdTalkModeOff=e=>{
        setWrapperLocker('');
        setTextareaValue('');
        e.target.parentElement.parentElement.parentElement.parentElement.children[0].className=primaryClassName;
        e.target.parentElement.parentElement.parentElement.parentElement.children[1].className=stl.userUnitHidden;
    };

    return <>
        <div className={`${stl.usersPage} ${themes.userPageDnmc}`}>
            <div className={stl.userInfo}>
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
                {feedBack &&
                    <div className={`${stl.feedbackWindow} ${feedBackClass}`}>
                        <button onClick={()=>setFeedBack(false)}>X</button>
                        <p>{msgStat}</p>
                    </div>
                }
                {props.usersInfo.isLoading ?
                    <div className={stl.loaderDiv}>
                        <img className={stl.loader} src={props.usersInfo.loader} alt="Err"/>  {/*ЛОДЫРЯ ПРОКИНУТЬ*/}
                    </div> :
                <div className={`${stl.mapWrapper} ${themes.mapWrapperDnmc} ${wrapperLocker}`}>
                    {props.usersInfo.initialUsersList
                        .map(user =>
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
                                            <p className={`${themes.userNameDnmc}`} >{user.status}</p>
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
                                                    onClick={e=>userIdTalkModeOn(e,user.id)}
                                                    >
                                                Write message
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={stl.userUnitHidden}>
                                    <div  className={`${stl.userUnit} ${themes.userUnitDnmc}`}>
                                        <div className={stl.miniHeadWrapper}>
                                            <h2 className={`${stl.userName} ${themes.userNameDnmc}`}> To {user.name}</h2>
                                            <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}>Go to chat</button>
                                        </div>
                                        <div className={stl.textAreaWrapper}>
                                            <textarea className={stl.talkTextarea}
                                                      // value={textAreaValue}
                                                      // onChange={e=>setTextareaValue(e.target.value)}
                                            />
                                        </div>
                                        <div className={stl.miniFooterWrapper}>
                                            <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                                                    onClick={()=>writeMsg(user.id,user.name)}
                                            >Send message
                                            </button>
                                            <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                                                    onClick={e=>{userIdTalkModeOff(e)}}
                                            >Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        )}
                 </div>
                }

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


// <div className={stl.userUnit} key={user.id}>
//     <div className={stl.picAndButton}>
//         <NavLink to={`/profile/${user.id}`}>
//             <img src={user.photos.large || props.usersInfo.defaultAvatar} alt='err'
//                  className={`${themes.userAvaDnmc}`}/>
//         </NavLink>
//         <button
//             disabled={props.usersInfo.followingInProgress.some(id=>id==user.id)}
//             id={user.id}
//             className={`${stl.followBTN} ${themes.followBTNDnmc}`}
//             onClick={user.followed?props.unFollowListener:props.followListener}>
//             {user.followed?'unFollow':'Follow'}
//         </button>
//         <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}
//                 onClick={()=>modalWindowSetter(user.id,user.name)}
//         > Write message </button>
//     </div>
//     <div className={`${stl.userBlockInfo} ${themes.userBlockInfoDnmc}`}>
//         <div className={stl.nameAndState}>
//             <NavLink to={`/profile/${user.id}`}>
//                 <h2 className={`${themes.userNameDnmc}`}>{user.name} </h2>
//             </NavLink>
//             <p>{user.status} </p>
//         </div>
//     </div>
// </div>