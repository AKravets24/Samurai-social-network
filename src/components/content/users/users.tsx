import React, { useState, useEffect, useRef, SyntheticEvent } from "react";
import stl from './users.module.css';
import { NavLink } from 'react-router-dom';
import { Field, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { ForUsersSomeAttrs } from "../../../redux/dialogsReducer";
import { MRGProps_Type, UsersThemes_Type } from "./usersContainer";
import { InitialUsersInfo_Type } from "../../../redux/usersReducer";
import { UsersThemesBGR_Type } from "../../../redux/backGroundSetter";
// import UnAuthorised                       from "../unAuthorised/unAuthorised";

type UsersProps_Type = {
  themes: UsersThemes_Type
  usersInfo: InitialUsersInfo_Type & UsersThemesBGR_Type & ForUsersSomeAttrs
  usersFuncs: MRGProps_Type['actions']
}

export let Users: React.FC<UsersProps_Type> = ({ themes, usersInfo, usersFuncs }) => {
  // console.log(usersInfo)

  type Error_Type = { text?: string }

  let [isDisabled, setIsDisabled] = useState(false);
  let [wrapperLocker, setWrapperLocker] = useState('');
  let [portionNumber, setPortionNumber] = useState(1);
  let [searchMode, setSearchMode] = useState(false);

  let paginator = () => {
    let pageStep = 10;
    let pagesAmount = Math.ceil(usersInfo.totalCount / usersInfo.pageSize)
    let leftPortionPageNumber = (portionNumber - 1) * pageStep + 1
    let rightPortionPageNumber = portionNumber * pageStep;
    let portionCount = Math.ceil(pagesAmount / pageStep)
    let pagesArr = [];
    for (let i = 1; i <= pagesAmount; i++) { pagesArr.push(i) }

    return !!pagesAmount && <div className={stl.paginationBlockOutside} >
      <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={() => setPortionNumber(portionNumber - 1)}
        disabled={portionNumber === 1}> &#171; {pageStep} </button>
      {pagesArr
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return <span key={p} className={usersInfo.currentPage === p ? `${stl.paginationSelected} ${themes.paginationSelectedDnmc}` :
            `${stl.pagination} ${themes.paginationDnmc}`}
            onClick={() => {/* debugger; */
              usersInfo.userSearchField && searchMode ?
                usersInfo.currentPage !== p && usersFuncs.getCertainUserThunk(usersInfo.pageSize, usersInfo.userSearchField, p) :
                usersInfo.currentPage !== p && setPageListener(usersInfo.pageSize, p)
            }
            }
          >{p}
          </span>
        })}
      <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={() => setPortionNumber(portionNumber + 1)}
        disabled={
          // pageStep > pagesAmount ||
          portionNumber > portionCount - 1
        }> {pageStep} &#187;</button>
    </div>
  };

  let userName = usersInfo.userSearchField;

  let setPageListener = (pageSize: number, page: number) => {
    usersFuncs.setCurrentPageThunk(pageSize, page);
    wrapperLocker && setWrapperLocker(''); isDisabled && setIsDisabled(false);
  };
  let onChangeListener = ({ target }: any) => { let { value } = target; usersFuncs.updateSearchField(value) };
  let keyUpListener = (e: any) => { if (e.keyCode === 13) { usersFuncs.getCertainUserThunk(0, userName, 0) } };
  let searchListener = () => {
    setSearchMode(true)
    let pageSize = usersInfo.pageSize;
    usersFuncs.getCertainUserThunk(pageSize, userName, 1);
  };
  let searchModeCloseListener = () => {
    searchMode && usersFuncs.setCurrentPageThunk(0, 1); usersFuncs.setErrorToNull(); usersFuncs.updateSearchField('');
    /*searchMode&&
    setSearchMode(false)*/
  };
  // useEffect(()=>{
  //     // console.log(feedbackArr)
  //     let index = feedbackArr.findIndex(el=>{ return el && el.id===feedBackRef.current.id });
  //     // if (index ===-1 && feedBackRef.current ) props.feedbackRefPush(feedBackRef.current);
  //     if (index ===-1 && feedBackRef.current ) setFeedBackArr(feedbackArr.concat(feedBackRef.current));
  //     // console.log(feedbackArr)
  //     for (let i=0; i<=feedbackArr.length; i++){
  //
  //         // props.feedbackArr[i]&&console.log(feedbackArr[i].className)
  //         if (feedbackArr[i])  {feedbackArr[i].className = `${stl.feedbackHidden}`
  //             console.log(feedbackArr[i].className)}
  //
  //         // props.feedbackArr[i] && console.log(props.feedbackArr[i].className)
  //         // props.feedbackArr[i] && setTimeout( ()=> { localFeedbackArr[i].className = `${localFeedbackArr[i].className} ${stl.feedbackHidden}`},3000);
  //         // if (props.feedbackArr[i]) {
  //         //     localFeedbackArr[i].className = `${localFeedbackArr[i].className} ${stl.feedbackHidden}`;
  //
  //         //     console.log(localFeedbackArr[i].className)
  //         // }
  //         // if (props.feedbackArr[i]) props.feedbackArr[i].className = `${feedBackRef.current.className} ${stl.feedbackHidden}`;
  //
  //         // setTimeout(()=>{ if(feedBackRef.current !== null) feedBackRef.current.className = `${feedBackRef.current.className} ${stl.feedbackHidden}`},4000);  //через 5 сек анимация плавного убирания на 3 секунды
  //         // setTimeout(()=>{ props.feedBackWindowCloser(i) },7000);  // через 8 секунд объект удаляется из DOM
  //         }
  //         // console.log(feedbackArr)
  //     // }
  //
  // },[props.sendingMSGStatArr.length]);

  // setTimeout( ()=> {console.log(feedbackArr)},9000 )

  let firstBlockClass = `${stl.userUnit} ${themes.userUnitDnmc} ${stl.userUnitShowed}`;
  let secondBlockClass = `${stl.userWriteMode} ${themes.userWriteModeDnmc} ${stl.userUnitShowed}`;

  let writeMsg = (userId: number, text: string, userName: string) => {

    let actionKey = uuidv4()
    usersFuncs.sendMessageToUserThunk(userId, text, actionKey, userName);
    setWrapperLocker('');
    setIsDisabled(false);
  };
  let userIdTalkModeOff = (e: any) => {
    setWrapperLocker('');
    setIsDisabled(false);
    e.target.parentElement.parentElement.parentElement.children[0].className = firstBlockClass;
    e.target.parentElement.parentElement.parentElement.children[1].className = stl.userUnitHidden;
  };
  let userIdTalkModeOn = (e: any) => {
    setWrapperLocker(stl.wrapperLocked);
    setIsDisabled(true);
    e.target.parentElement.parentElement.parentElement.parentElement.children[0].className = stl.userUnitHidden;
    e.target.parentElement.parentElement.parentElement.parentElement.children[1].className = secondBlockClass;
  };

  let [isHidden, setIsHidden] = useState<null | string>(null)

  let postClass = () => { setTimeout(() => { setIsHidden(stl.feedbackHidden); return isHidden }, 3000) }

  // console.log(usersInfo.onSendMSGStatArr)

  type Value_Type = { text: string }
  let validator = (values: Value_Type) => { const errors: Error_Type = {}; if (!values.text) { errors.text = 'Required' } return errors }

  let formSubmitter = (userId: number, textValue: Value_Type, userName: string, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    let actionKey: string = uuidv4()
    usersFuncs.sendMessageToUserThunk(userId, textValue.text, actionKey, userName);
    setIsDisabled(false); textValue.text = ''; setSubmitting(false);
  }

  let keyCodeChecker = (e: KeyboardEvent, userId: number, values: Value_Type, userName: string, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    if (e.keyCode == 13 && e.shiftKey) { return } // для переноса строки =)
    else if (e.keyCode === 13) { formSubmitter(userId, values, userName, { setSubmitting }) }
  }

  return <>
    <div className={`${stl.usersPage} ${themes.userPageDnmc}`}>
      <div className={stl.userInfo}>
        <div className={`${stl.generalHeader} ${themes.generalHeaderDnmc}`}>
          <h2 className={stl.userHeader}>Users</h2>

          {paginator()}

          <div className={stl.searchBlock} >
            <input type="text"
              value={usersInfo.userSearchField}
              onChange={onChangeListener}
              onKeyUp={keyUpListener}
              className={`${stl.searchInput} ${themes.searchInputDnmc}`} />
            <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={searchListener}>Find!</button>
            <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={searchModeCloseListener}>X</button>
          </div>
        </div>
        {/*props.usersInfo.usersGettingError*/}
        {usersInfo.isLoading ?                      // список юзеров грузится?
          <div className={stl.loaderDiv}>
            <img className={stl.loader} src={usersInfo.generalLDR_GIF} alt="Err" />
          </div> :
          usersInfo.usersGettingError || usersInfo.userFindingError ?                            // ошибка при поиске юзеров?
            <div className={stl.Houston}>
              <h2>Houston, we've got a problem...</h2>
              <h2>{usersInfo.usersGettingError || usersInfo.userFindingError}</h2>
              {usersInfo.usersGettingError && <button
                className={`${stl.moreUsersShower} ${themes.pagBTNDnmc}`}
                onClick={() => { usersFuncs.setErrorToNull(); setPageListener(usersInfo.pageSize, usersInfo.currentPage); }}
              >Try again</button>}
            </div>
            :
            usersInfo.userNotFound && !usersInfo.initialUsersList.length ?                           // ничего не найдено при кастомном поиске?
              <div className={stl.nobodyFound}>
                <img src={usersInfo.userNotFoundGIF} alt="Err" />
                <h2>{usersInfo.userNotFound} =(</h2>
              </div> :

              <div className={`${stl.mapWrapper} ${themes.mapWrapperDnmc} ${wrapperLocker}`}>
                {usersInfo?.initialUsersList
                  .map((user: any) =>
                    <div className={stl.userUnitContainer} key={user.id}>
                      <div className={`${stl.userUnit} ${themes.userUnitDnmc} ${stl.userUnitShowed}`} >
                        <div className={stl.avaDiv}>
                          <NavLink to={`/profile/${user.id}`}>
                            <img src={user.photos.large || usersInfo.defaultAvatar} alt='err'
                              className={`${themes.userAvaDnmc}`} />
                          </NavLink>
                        </div>
                        <div className={stl.nameStateBTNs}>

                          <div className={stl.userBlockInfo}>
                            <NavLink to={`/profile/${user.id}`}>
                              <h2 className={`${stl.userName} ${themes.userNameDnmc}`}>{user.name} </h2>
                            </NavLink>
                            <p className={`${themes.userNameDnmc}`}>{user.status}</p>
                          </div>
                          <div className={stl.followNWriteBTNS}>
                            <button
                              disabled={usersInfo.followingInProgress.some((id: any) => id == user.id)}
                              id={user.id}
                              className={`${stl.followBTN} ${themes.followBTNDnmc} 
                                                    ${user.error && themes.followBTN_ERR_DNMC}`}
                              onClick={() => usersFuncs.followThunkToggler(user.id, user.followed)}
                            >
                              {user.error ? user.error : user.followed ? 'unFollow' : 'Follow'}
                            </button>
                            <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                              disabled={isDisabled}
                              // onClick={e=>userIdTalkModeOn(e,user.id, user.name)}
                              onClick={e => userIdTalkModeOn(e)}
                            >
                              Write message
                                                </button>
                          </div>
                        </div>
                      </div>
                      <div className={`${stl.userUnitHidden}`}>
                        <div className={stl.miniHeadWrapper}>
                          <h2 className={`${stl.userName} ${themes.userNameDnmc}`}>{user.name}</h2>
                          <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}>Go to chat</button>
                          <button className={`${stl.closeBTN} ${stl.followBTN} ${themes.followBTNDnmc}`}
                            onClick={e => { userIdTalkModeOff(e) }}
                          >X</button>
                        </div>
                        <div className={stl.textAreaWrapper}>
                          <Formik initialValues={{ text: '' }} validate={validator}
                            onSubmit={(values, { setSubmitting }) => {
                              formSubmitter(user.id, values, user.name, { setSubmitting }); values.text = ''; setSubmitting(false);
                            }}>
                            {({ values, errors, handleChange, handleSubmit, isSubmitting, setSubmitting }) => (
                              <form onSubmit={handleSubmit}>
                                <Field name="text" className={stl.talkTextarea} as='textarea'
                                  onChange={handleChange} value={values.text} placeholder={errors.text}
                                  onKeyDown={(e: KeyboardEvent) => (keyCodeChecker(e, user.id, values, user.name, { setSubmitting }))}
                                />
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
        }
      </div>
      <div className={`${stl.moreUserUnits}  ${themes.moreUserUnitsDnmc}`}>
        <button className={`${stl.moreUsersShower} ${themes.pagBTNDnmc}`}
          onClick={() => console.log('show more content')}>Show More
                </button>
      </div>
    </div>

    <FeedBacker
      sendingMSGStatArr={usersInfo.onSendMSGStatArr}
      feedBackWindowCloser={usersFuncs.feedBackWindowCloser}
    />
  </>
}

interface FBProps_Type {
  sendingMSGStatArr: any[]
  feedBackWindowCloser: (arrIndex: number) => void
}

const FeedBacker = React.memo(({ sendingMSGStatArr, feedBackWindowCloser }: FBProps_Type) => {
  // console.log(sendingMSGStatArr)
  let feedBackRef = useRef<HTMLDivElement | null>(null);

  let feedBackNamer = (i: number, statNum: number, /* feedBackRef:HTMLDivElement */) => {

    // feedBackRef.current && console.log(feedBackRef.current.getAttribute('data-name'));
    // feedBackRef.current && feedBackRef.current.setAttribute('data-name', 'fuck-off блять!!!');
    // feedBackRef.current && console.log(feedBackRef.current.getAttribute('data-name'));

    // feedBackRef.current && console.log(feedBackRef.current.attributes.getNamedItem('data-name'));
    // feedBackRef.current && console.log(feedBackRef.current.attributes[0].nodeValue);
    // feedBackRef.current && feedBackRef.current.attributes.setNamedItem({'data-name': 'on'});
    // feedBackRef.current && console.log(feedBackRef.current.attributes.getNamedItem('data'));
    // feedBackRef.current && console.log(feedBackRef.current.attributes.attributes[0]);

    if (i === 0) { return `${stl.feedbackWindow0}`; }

    if (statNum === 0) { }
    // console.log(1); /*feedBackCloserTimeOut(i);*/}
    if (i === 1) return stl.feedbackWindow1
    if (i >= 2) return stl.feedbackWindow2
  }

  let attributer = (i: number) => { feedBackCloserTimeOut(i); return 'off' }

  let feedBackCloser = (i: number) => { feedBackWindowCloser(i) }

  let feedBackCloserTimeOut = (i: number) => { setTimeout(() => { feedBackWindowCloser(i) }, 5000) }

  return <>
    {sendingMSGStatArr.map((el, i) => {
      let cycleId = uuidv4()
      // feedBackRef.current && el.statNum !== 0 && attributer(feedBackRef, cycleId)

      return <div ref={feedBackRef}
        data-flag={attributer(i)}
        key={cycleId}
        id={cycleId}
        className={feedBackNamer(i, el.statNum)}
      >
        <button onClick={() => feedBackCloser(i)}> X</button>
        <p>{el.statNum === 0 && 'Sending message...' ||
          el.statNum === 1 && `Message delivered to ${el.userName}` ||
          el.statNum === 2 && `Failed to deliver message to ${el.userName} `}
        </p>
      </div>
    })}
  </>
},
  function areEqual(prevProps, nextProps) {
    return prevProps.sendingMSGStatArr.length !== nextProps.sendingMSGStatArr.length
  }
)






//         // let flag;
//         // let res1=[];
//         // let res2=[];
//         //
//         // if (!prevProps.sendingMSGStatArr.length && !nextProps.sendingMSGStatArr.length){flag = false}
//         // else if (prevProps.sendingMSGStatArr.length !== nextProps.sendingMSGStatArr.length){flag = false}
//         // else {
//         //
//         //     for(let i=0,j=0; i<prevProps.sendingMSGStatArr.length,j<nextProps.sendingMSGStatArr.length; i++,j++){
//         //         for (let key1 in prevProps.sendingMSGStatArr[i]){res1.push(key1+prevProps.sendingMSGStatArr[i][key1])}
//         //         for (let key2 in nextProps.sendingMSGStatArr[j]){res2.push(key2+nextProps.sendingMSGStatArr[j][key2])}
//         //     }
//         //     console.log(res1)
//         //     console.log(res2)
//         //     for (let i=0; i<res1.length; i++){
//         //         if (res1[i]==res2[i]) {
//         //             console.log(2)
//         //             console.log(res1[i]===res2[i])
//         //
//         //             flag = false;
//         //             break;
//         //         }
//         //         console.log(5);
//         //         flag = true
//         //     }
//         // }
//         // // console.log(flag)
//         // return flag
//     }
// )







// import React, {useState, useEffect, useRef } from "react";
// import stl                                   from './users.module.css';
// import {NavLink}                             from 'react-router-dom';
// import {Formik}                              from 'formik';
// import { v4 as uuidv4 }                      from 'uuid';
// import {dialogsReducer}                      from "../../../redux/dialogsReducer";
// // import UnAuthorised                       from "../unAuthorised/unAuthorised";

// export function Users(props) {
//     // console.log(props.usersInfo)

//     let [isDisabled, setIsDisabled]       = useState(false);
//     let [wrapperLocker, setWrapperLocker] = useState('');
//     let [portionNumber, setPortionNumber] = useState(1);
//     let [searchMode, setSearchMode]       = useState(false);

//     let paginator    = () => {
//         let pageStep = 10;
//         let pagesAmount = Math.ceil(props.usersInfo.totalCount / props.usersInfo.pageSize)
//         let leftPortionPageNumber  = (portionNumber - 1) * pageStep + 1
//         let rightPortionPageNumber = portionNumber * pageStep;
//         let portionCount = Math.ceil(pagesAmount/pageStep)
//         let pagesArr=[];
//         for (let i=1;i<=pagesAmount;i++){pagesArr.push(i)}

//         return !!pagesAmount && <div className={stl.paginationBlockOutside} >
//             <button className={`${stl.pagBTN} ${props.themes.pagBTNDnmc}`} onClick={()=> setPortionNumber(portionNumber-1)}
//                     disabled={portionNumber===1}> &#171; {pageStep} </button>
//             {pagesArr
//                 .filter(p=>p >= leftPortionPageNumber && p<=rightPortionPageNumber)
//                 .map( p=> {
//                     return <span key={p} className={props.usersInfo.currentPage===p?`${stl.paginationSelected} ${props.themes.paginationSelectedDnmc}`:
//                         `${stl.pagination} ${props.themes.paginationDnmc}`}
//                                  onClick={()=>{
//                                  props.usersInfo.userSearchField && searchMode ?
//                                     props.usersInfo.currentPage!==p && props.getCertainUserThunk(props.usersInfo.pageSize,props.usersInfo.userSearchField,p):
//                                     props.usersInfo.currentPage!==p && setPageListener(p)}
//                                  }
//                          >{p}
//                           </span>
//                 })}
//             <button className={`${stl.pagBTN} ${props.themes.pagBTNDnmc}`} onClick={()=>setPortionNumber(portionNumber+1)}
//                     disabled={
//                         // pageStep > pagesAmount ||
//                          portionNumber > portionCount-1
//                     }> {pageStep} &#187;</button>
//         </div>
//     };

//     let setPageListener  = (page) => {props.setCurrentPage(page);setWrapperLocker('');setIsDisabled(false);};
//     let onChangeListener = ({target}) => {let {value} = target;props.updateSearchField(value)};
//     let keyUpListener    =(e)=>{if(e.keyCode === 13){let userName=props.usersInfo.userSearchField;props.getCertainUserThunk(userName)}};
//     let searchListener   =()=>{
//         let userName=props.usersInfo.userSearchField;
//         let pageSize = props.usersInfo.pageSize;
//         props.getCertainUserThunk(pageSize,userName);
//         setSearchMode(true)};
//     let searchModeCloseListener = () => {searchMode&&props.setCurrentPage(1);props.setErrorToNull();props.updateSearchField('');
//     /*searchMode&&
//     setSearchMode(false)*/};


//     // useEffect(()=>{
//     //     // console.log(feedbackArr)
//     //     let index = feedbackArr.findIndex(el=>{ return el && el.id===feedBackRef.current.id });
//     //     // if (index ===-1 && feedBackRef.current ) props.feedbackRefPush(feedBackRef.current);
//     //     if (index ===-1 && feedBackRef.current ) setFeedBackArr(feedbackArr.concat(feedBackRef.current));
//     //     // console.log(feedbackArr)
//     //     for (let i=0; i<=feedbackArr.length; i++){
//     //
//     //         // props.feedbackArr[i]&&console.log(feedbackArr[i].className)
//     //         if (feedbackArr[i])  {feedbackArr[i].className = `${stl.feedbackHidden}`
//     //             console.log(feedbackArr[i].className)}
//     //
//     //         // props.feedbackArr[i] && console.log(props.feedbackArr[i].className)
//     //         // props.feedbackArr[i] && setTimeout( ()=> { localFeedbackArr[i].className = `${localFeedbackArr[i].className} ${stl.feedbackHidden}`},3000);
//     //         // if (props.feedbackArr[i]) {
//     //         //     localFeedbackArr[i].className = `${localFeedbackArr[i].className} ${stl.feedbackHidden}`;
//     //
//     //         //     console.log(localFeedbackArr[i].className)
//     //         // }
//     //         // if (props.feedbackArr[i]) props.feedbackArr[i].className = `${feedBackRef.current.className} ${stl.feedbackHidden}`;
//     //
//     //         // setTimeout(()=>{ if(feedBackRef.current !== null) feedBackRef.current.className = `${feedBackRef.current.className} ${stl.feedbackHidden}`},4000);  //через 5 сек анимация плавного убирания на 3 секунды
//     //         // setTimeout(()=>{ props.feedBackWindowCloser(i) },7000);  // через 8 секунд объект удаляется из DOM
//     //         }
//     //         // console.log(feedbackArr)
//     //     // }
//     //
//     // },[props.sendingMSGStatArr.length]);

//     // setTimeout( ()=> {console.log(feedbackArr)},9000 )

//     let firstBlockClass  = `${stl.userUnit} ${props.themes.userUnitDnmc} ${stl.userUnitShowed}`;
//     let secondBlockClass = `${stl.userWriteMode} ${props.themes.userWriteModeDnmc} ${stl.userUnitShowed}`;

//     let writeMsg = (userId,text,userName)=> {

//         let actionKey = uuidv4()
//         props.sendMessageToUserThunk(userId, text, actionKey, userName);
//         setWrapperLocker('');
//         setIsDisabled(false);
//     };
//     let userIdTalkModeOff =e=> {
//         setWrapperLocker('');
//         setIsDisabled(false);
//         e.target.parentElement.parentElement.parentElement.children[0].className=firstBlockClass;
//         e.target.parentElement.parentElement.parentElement.children[1].className=stl.userUnitHidden;
//     };
//     let userIdTalkModeOn  =e=> {
//         setWrapperLocker(stl.wrapperLocked);
//         setIsDisabled(true);
//         e.target.parentElement.parentElement.parentElement.parentElement.children[0].className=stl.userUnitHidden;
//         e.target.parentElement.parentElement.parentElement.parentElement.children[1].className=secondBlockClass;
//     };

//     let [isHidden, setIsHidden] = useState(null)

//     let postClass=()=>{ setTimeout( ()=>{
//         setIsHidden(stl.feedbackHidden)
//         return isHidden },3000 )}

//     // console.log(props)

//     return <>
//         <div className={`${stl.usersPage} ${props.themes.userPageDnmc}`}>
//             <div className={stl.userInfo}>
//                 <div className={`${stl.generalHeader} ${props.themes.generalHeaderDnmc}`}>
//                     <h2 className={stl.userHeader}>Users</h2>

//                         {  paginator() }

//                     <div className={stl.searchBlock} >
//                         <input type="text"
//                                value={props.usersInfo.userSearchField}
//                                onChange={onChangeListener}
//                                onKeyUp={keyUpListener}
//                                className={`${stl.searchInput} ${props.themes.searchInputDnmc}`}     />
//                         <button className={`${stl.pagBTN} ${props.themes.pagBTNDnmc}`} onClick={searchListener}>Find!</button>
//                         <button className={`${stl.pagBTN} ${props.themes.pagBTNDnmc}`} onClick={searchModeCloseListener}>X</button>
//                     </div>
//                 </div>
//                 {/*props.usersInfo.usersGettingError*/}
//             {props.usersInfo.isLoading                                                           ?                      // список юзеров грузится?
//                     <div className={stl.loaderDiv}>
//                         <img className={stl.loader} src={props.usersInfo.generalLDR_GIF} alt="Err"/>
//                     </div>                                                                       :
//                     props.usersInfo.usersGettingError || props.usersInfo.userFindingError        ?                      // ошибка при поиске юзеров?
//                         <div className={stl.Houston}>
//                             <h2>Houston, we've got a problem...</h2>
//                             <h2>{props.usersInfo.usersGettingError||props.usersInfo.userFindingError}</h2>
//                             {props.usersInfo.usersGettingError && <button
//                                 className={`${stl.moreUsersShower} ${props.themes.pagBTNDnmc}`}
//                                 onClick={()=>{props.setErrorToNull();setPageListener(props.usersInfo.currentPage);} }
//                             >Try again</button>}
//                         </div>
//                                                                                                   :
//                         props.usersInfo.userNotFound && !props.usersInfo.initialUsersList.length  ?                     // ничего не найдено при кастомном поиске?
//                             <div className={stl.nobodyFound}>
//                                 <img src={props.usersInfo.userNotFoundGIF} alt="Err"/>
//                                 <h2>{props.usersInfo.userNotFound} =(</h2>
//                             </div> :

//                     <div className={`${stl.mapWrapper} ${props.themes.mapWrapperDnmc} ${wrapperLocker}`}>
//                         {props.usersInfo.initialUsersList && props.usersInfo.initialUsersList
//                             .map(user =>
//                                 <div className={stl.userUnitContainer} key={user.id}>
//                                     <div className={`${stl.userUnit} ${props.themes.userUnitDnmc} ${stl.userUnitShowed}`} >
//                                         <div className={stl.avaDiv}>
//                                             <NavLink to={`/profile/${user.id}`}>
//                                                 <img src={user.photos.large || props.usersInfo.defaultAvatar} alt='err'
//                                                      className={`${props.themes.userAvaDnmc}`}/>
//                                             </NavLink>
//                                         </div>
//                                         <div className={stl.nameStateBTNs}>
//                                             <div className={`${stl.userBlockInfo} ${props.themes.userBlockInfoDnmc}`}>
//                                                 <NavLink to={`/profile/${user.id}`}>
//                                                     <h2 className={`${stl.userName} ${props.themes.userNameDnmc}`}>{user.name} </h2>
//                                                 </NavLink>
//                                                 <p className={`${props.themes.userNameDnmc}`}>{user.status}</p>
//                                             </div>
//                                             <div className={stl.followNWriteBTNS}>
//                                                 <button
//                                                     disabled={props.usersInfo.followingInProgress.some(id=>id==user.id)}
//                                                     id={user.id}
//                                                     className={`${stl.followBTN} ${props.themes.followBTNDnmc} 
//                                                     ${user.error && props.themes.followBTN_ERR_DNMC }`}
//                                                     onClick={()=>props.followThunkToggler(user.id,user.followed)}
//                                                 >
//                                                     {user.error?user.error:user.followed?'unFollow':'Follow'}
//                                                 </button>
//                                                 <button className={`${stl.followBTN} ${props.themes.followBTNDnmc}`}
//                                                         disabled={isDisabled}
//                                                         onClick={e=>userIdTalkModeOn(e,user.id, user.name)}
//                                                 >
//                                                     Write message
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div  className={`${stl.userUnitHidden}`}>
//                                     <div className={stl.miniHeadWrapper}>
//                                         <h2 className={`${stl.userName} ${props.themes.userNameDnmc}`}>{user.name}</h2>
//                                         <button className={`${stl.followBTN} ${props.themes.followBTNDnmc}`}>Go to chat</button>
//                                         <button className={`${stl.closeBTN} ${stl.followBTN} ${props.themes.followBTNDnmc}`}
//                                                 onClick={e=>{userIdTalkModeOff(e)}}
//                                         >X</button>
//                                     </div>
//                                     <div className={stl.textAreaWrapper}>
//                                         <Formik initialValues={{text:''}}validate={values=>{const errors={};if(!values.text){errors.text='Required'}return errors}}
//                                         onSubmit={(values,{setSubmitting})=>{writeMsg(user.id,values.text,user.name);values.text='';setSubmitting(false);
//                                         }}>
//                                         {({values,errors,handleChange,handleSubmit,isSubmitting})=>(
//                                             <form onSubmit={handleSubmit}>
//                                                 <textarea name="text" className={stl.talkTextarea}
//                                                 onChange={handleChange} value={values.text} placeholder={errors.text} />
//                                                 <button type="submit" disabled={isSubmitting} className={`${stl.followBTN} ${props.themes.followBTNDnmc}`}
//                                                 > Send Msg </button>
//                                             </form>
//                                         )}
//                                         </Formik>
//                                     </div>
//                                 </div>
//                                 </div >
//                             )}
//                     </div>

//                 }
//             </div>
//             <div className={ `${stl.moreUserUnits}  ${props.themes.moreUserUnitsDnmc}`}>
//                 <button className={`${stl.moreUsersShower} ${props.themes.pagBTNDnmc}`}
//                         onClick={props.showMoreListener}>Show More
//                 </button>
//             </div>
//         </div>

//         <FeedBacker sendingMSGStatArr={props.usersInfo.sendingMSGStat} feedBackWindowCloser={props.feedBackWindowCloser} />

//     </>
// }

// const FeedBacker = React.memo(props=> {
//         // console.log(props)
//     let feedBackRef = useRef(null);

//     let feedBackNamer = (i, statNum, feedBackRef )=>{

//         // feedBackRef.current && console.log(feedBackRef.current.getAttribute('data-name'));
//         // feedBackRef.current && feedBackRef.current.setAttribute('data-name', 'fuck-off блять!!!');
//         // feedBackRef.current && console.log(feedBackRef.current.getAttribute('data-name'));

//         // feedBackRef.current && console.log(feedBackRef.current.attributes.getNamedItem('data-name'));
//         // feedBackRef.current && console.log(feedBackRef.current.attributes[0].nodeValue);
//         // feedBackRef.current && feedBackRef.current.attributes.setNamedItem({'data-name': 'on'});
//         // feedBackRef.current && console.log(feedBackRef.current.attributes.getNamedItem('data'));
//         // feedBackRef.current && console.log(feedBackRef.current.attributes.attributes[0]);

//         if (i===0){return `${stl.feedbackWindow0}`;}

//         if (statNum === 0 ) {}
//         // console.log(1); /*feedBackCloserTimeOut(i);*/}
//         if (i===1) return stl.feedbackWindow1
//         if (i>= 2) return stl.feedbackWindow2
//     }

//     let attributer = (feedBackRef,i)=> {
//         feedBackCloserTimeOut(i)
//         return 'off'
//     }

//     let feedBackCloser=(i)=>{ props.feedBackWindowCloser(i) }

//     let feedBackCloserTimeOut=(i)=>{ setTimeout( ()=>{ props.feedBackWindowCloser(i)}, 5000)  }

//     return props.sendingMSGStatArr
//         .map((el,i)=> {
//             let cycleId  = uuidv4()
//             // feedBackRef.current && el.statNum !== 0 && attributer(feedBackRef, cycleId)

//             return <div ref={feedBackRef}
//                         data-flag={attributer(feedBackRef,i)}
//                         key={cycleId}
//                         id={cycleId}
//                         className={feedBackNamer(i, el.statNum, feedBackRef)}
//             >
//                 <button onClick={() => feedBackCloser(i)}> X</button>
//                 <p>{el.statNum === 0 && 'Sending message...' ||
//                 el.statNum === 1 && `Message delivered to ${el.userName}` ||
//                 el.statNum === 2 && `Failed to deliver message to ${el.userName} ` }
//                 </p>
//             </div>
//         })
// },
//     function areEqual (prevProps, nextProps) {
//         return prevProps.sendingMSGStatArr.length !== nextProps.sendingMSGStatArr.length

//         // let flag;
//         // let res1=[];
//         // let res2=[];
//         //
//         // if (!prevProps.sendingMSGStatArr.length && !nextProps.sendingMSGStatArr.length){flag = false}
//         // else if (prevProps.sendingMSGStatArr.length !== nextProps.sendingMSGStatArr.length){flag = false}
//         // else {
//         //
//         //     for(let i=0,j=0; i<prevProps.sendingMSGStatArr.length,j<nextProps.sendingMSGStatArr.length; i++,j++){
//         //         for (let key1 in prevProps.sendingMSGStatArr[i]){res1.push(key1+prevProps.sendingMSGStatArr[i][key1])}
//         //         for (let key2 in nextProps.sendingMSGStatArr[j]){res2.push(key2+nextProps.sendingMSGStatArr[j][key2])}
//         //     }
//         //     console.log(res1)
//         //     console.log(res2)
//         //     for (let i=0; i<res1.length; i++){
//         //         if (res1[i]==res2[i]) {
//         //             console.log(2)
//         //             console.log(res1[i]===res2[i])
//         //
//         //             flag = false;
//         //             break;
//         //         }
//         //         console.log(5);
//         //         flag = true
//         //     }
//         // }
//         // // console.log(flag)
//         // return flag
//     }
// )




// { props.sendingMSGStatArr
//     .map((el,i)=> {
//         let cycleId  = uuidv4()
//         // feedBackRef.current && el.statNum !== 0 && attributer(feedBackRef, cycleId)
//
//         return <div ref={feedBackRef}
//             // data={feedBackCloserTimeOut(i)}
//                     data-flag={attributer(feedBackRef,i)}
//                     key={cycleId}
//                     id={cycleId}
//                     className={feedBackNamer(i, el.statNum, feedBackRef)}
//         >
//             <button onClick={() => feedBackCloser(i)}> X</button>
//             <p>{el.statNum === 0 && 'Sending message...' ||
//             el.statNum === 1 && `Message delivered to ${el.userName}` ||
//             el.statNum === 2 && `Failed to deliver message to ${el.userName} `
//             }
//             </p>
//         </div>
//
//     })}



// <div  className={`${stl.userWriteMode} ${themes.userWriteModeDnmc} ${stl.userUnitHidden}



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
