import React, { useState, useEffect, useRef, Children, } from "react";
import stl from './users.module.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Field, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { ForUsersSomeAttrs } from "../../../redux/dialogsReducer";
import { UsersThemes_Type, usersActions_Type } from "./usersContainer";
import { InitialUsersInfo_Type } from "../../../redux/usersReducer";
import { UsersThemesBGR_Type } from "../../../redux/backGroundSetter";
import * as queryString from 'querystring';
import cn from 'classnames/bind';
import { UsersArr } from "../../../redux/app";
// import UnAuthorised                       from "../unAuthorised/unAuthorised";


type UsersProps_Type = {
  themes: UsersThemes_Type
  usersInfo: InitialUsersInfo_Type & UsersThemesBGR_Type & ForUsersSomeAttrs
  usersFuncs: usersActions_Type
  delayFlag: boolean
}

type ModalMsgs_Type = { servInfo: { flag?: boolean, closer?: (i: number, e: any) => void }[] }

export let Users: React.FC<UsersProps_Type> = ({ themes, usersInfo, usersFuncs, delayFlag }) => {
  // console.log(usersInfo.BTN_FLW_GIF)
  // console.log(usersInfo.feedbackArr)

  type Error_Type = { text?: string }
  type Value_Type = { text: string }

  let [wrapperLocker, setWrapperLocker] = useState('');
  let [portionNumber, setPortionNumber] = useState(1);
  let [searchMode, setSearchMode] = useState(false);
  let [userSearchName, setUserSearchName] = useState<string>('')

  let history = useHistory();
  // console.log(usersInfo.totalCount)

  let { totalCount, pageSize } = usersInfo;
  let pagesAmount = Math.ceil(totalCount / pageSize)

  useEffect(() => {
    if (parsedString['term'] && parsedString['term'] !== '') { setSearchMode(true); setUserSearchName(parsedString['term'] as string) }
    if (parsedString['?page'] && totalCount && +parsedString['?page'] > pagesAmount) {
      usersFuncs.getUsersThunk(pageSize, pagesAmount); setPortionNumber(Math.ceil(totalCount / 1000))
    } else if (parsedString['?page']) { setPortionNumber(Math.ceil(+parsedString['?page'] / 10)) }
  }, [totalCount])

  let Paginator = () => {
    let pageStep = 10;
    let leftPortionPageNumber = (portionNumber - 1) * pageStep + 1
    let rightPortionPageNumber = portionNumber * pageStep;
    let portionCount = Math.ceil(pagesAmount / pageStep)
    let pagesArr = [];
    for (let i = 1; i <= pagesAmount; i++) { pagesArr.push(i) }

    let defaultStylesUsersSetter = (e: any) => {
      let userUnitStlArr: HTMLDivElement[] = Array.from(e.target.parentElement.parentElement.parentElement.children[1]?.children)
      userUnitStlArr.forEach((el) => el.children[0].className = cn(stl.userUnit, themes.userUnitDnmc, stl.userUnitShowed))
      setWriteMsgMode(writeMsgMode = { servInfo: [] });

    }
    return !!pagesAmount ? <div className={stl.paginationBlockOutside} >
      <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={() => setPortionNumber(portionNumber - 1)}
        disabled={portionNumber === 1}> &#171; {pageStep} </button>
      {pagesArr
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return <span key={p} className={usersInfo.currentPage === p ? `${stl.paginationSelected} ${themes.paginationSelectedDnmc}` :
            `${stl.pagination} ${themes.paginationDnmc}`}
            onClick={(e) => {
              mapWrapperRef?.current?.scrollTo(0, 0)
              if (!usersInfo.isLoading) {
                if (searchMode && usersInfo.currentPage !== p) { usersFuncs.getCertainUserThunk(pageSize, userSearchName, p); defaultStylesUsersSetter(e) }
                else { setPageListener(pageSize, p); defaultStylesUsersSetter(e) }
              }
            }}
          >{p}
          </span>
        })}
      <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={() => setPortionNumber(portionNumber + 1)}
        disabled={
          // pageStep > pagesAmount ||
          portionNumber > portionCount - 1
        }> {pageStep} &#187;</button>
    </div> : null
  };

  let setPageListener = (pageSize: number, page: number) => {
    usersFuncs.setCurrentPageThunk(pageSize, page);
    wrapperLocker && setWrapperLocker('');
  };

  let queryRequest = useLocation().search;
  let parsedString = queryString.parse(queryRequest);


  let friendsSeekerSubmitter = (userName: Value_Type, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setSearchMode(true)
    setUserSearchName(userName.text)
    history.push({ pathname: 'users', search: `?page=${usersInfo.currentPage}&term=${userName.text}` })
    usersFuncs.getCertainUserThunk(pageSize, userName.text.trim(), 1)
    setSubmitting(false);
  }

  let searchModeCloseListener = () => {
    if (searchMode) {
      usersFuncs.setCurrentPageThunk(50, 1); setSearchMode(false);
      history.push({ pathname: 'users', search: `?page=${usersInfo.currentPage}` })
    } usersFuncs.setErrorToNull();
  };

  let validator = (values: Value_Type) => { let errors: Error_Type = {}; if (!values.text.trim()) { values.text = ''; errors.text = 'Required' } return errors }




  let [writeMsgMode, setWriteMsgMode] = useState<ModalMsgs_Type>({ servInfo: [] })

  let userIdTalkModeOn = (e: any, i: number,) => {
    if (mapWrapperRef?.current && e.target.parentElement.parentElement.parentElement.parentElement.getBoundingClientRect().top <= mapWrapperRef?.current?.getBoundingClientRect().top) {
      e.target.parentElement.parentElement.parentElement.parentElement.scrollIntoView({ behavior: "smooth" }) //плавный автоСкролл если элемент если он вызе вьюпорта
    }
    setWrapperLocker(stl.wrapperLocked);
    e.target.parentElement.parentElement.parentElement.parentElement.children[0].className = stl.userUnitHidden;
    let newServInfo = [...writeMsgMode.servInfo]
    if (newServInfo[i] === undefined) { newServInfo[i] = {} }
    if (newServInfo[i]?.flag === undefined) { newServInfo[i].flag = true; }
    else if (newServInfo[i].flag === true) { newServInfo[i].flag = false; }
    else if (newServInfo[i].flag === false) { newServInfo[i].flag = true; }
    newServInfo[i].closer = (index: number, event: any) => modalCloser(index, event)
    let finalState = { servInfo: newServInfo }
    setWriteMsgMode(writeMsgMode = finalState)
  }

  let mapWrapperRef = React.createRef<HTMLDivElement>();

  let userUnitStlDefolter = (e: any) => {
    // console.log(e.target.children[0].children[0].children[2].children[0].children[0].children[0].children[1].children[0].children[0].className) // эталон
    // console.log(e.target.children[0].children[0].children[2].children[0].children[0].children[0].children[1].children) // 100 юзеров на странице
    if (writeMsgMode.servInfo.length) {
      let userUnitStlArr: HTMLDivElement[] = Array.from(e.target.children[0].children[0].children[2].children[0].children[0].children[0].children[1].children)
      userUnitStlArr.forEach((el) => { el.children[0].className = cn(stl.userUnit, themes.userUnitDnmc, stl.userUnitShowed) })
      setWriteMsgMode(writeMsgMode = { servInfo: [] });
      setWrapperLocker('');
    }
  }

  window.onkeyup = (e: KeyboardEvent) => { e.key === 'Escape' && userUnitStlDefolter(e) }

  type indexEl_Type = { index: number, elem: any }  // хз какой тип элемента должен быть
  let [indexEl, setIndexEl] = useState<indexEl_Type>({ index: -1, elem: '' })
  // console.log(writeMsgMode.servInfo);
  useEffect(() => {
    if (indexEl.index >= 0) {
      let newServInfo = [...writeMsgMode.servInfo]
      newServInfo[indexEl.index].flag = false
      let finalState = { servInfo: newServInfo }
      // indexEl.elem.className = firstBlockClass
      indexEl.elem.className = cn(stl.userUnit, themes.userUnitDnmc, stl.userUnitShowed)
      setWriteMsgMode(writeMsgMode = finalState)
      if (newServInfo.filter(el => el !== undefined).every(el => el.flag === false)) setWrapperLocker(stl.wrapperUnlocked);
    }
  }, [indexEl])

  let modalCloser = (i: number, e: any) => { setIndexEl({ index: i, elem: e }) }


  return <>
    <div className={cn(stl.usersPage, themes.userPageDnmc, delayFlag && stl.delay)} >
      <div className={stl.userInfo}>
        <div className={cn(stl.generalHeader, themes.generalHeaderDnmc, delayFlag && stl.delay)}>
          <h2 className={stl.userHeader}>Users</h2>
          <Paginator />
          <div className={stl.searchBlock} >
            <Formik initialValues={{ text: parsedString.term as string || '' }} validate={validator} onSubmit={friendsSeekerSubmitter}>
              {({ values, errors, handleChange, handleSubmit, isSubmitting, handleReset }) => (
                <form onSubmit={handleSubmit} onReset={handleReset}>
                  <Field name="text" type="text" value={values.text} onChange={handleChange} placeholder={errors.text}
                    className={cn(stl.searchInput, themes.searchInputDnmc, delayFlag && stl.delay)} />
                  <button type="submit" disabled={isSubmitting} className={cn(stl.pagBTN, themes.pagBTNDnmc)} >Find!</button>
                  <button className={cn(stl.pagBTN, themes.pagBTNDnmc)} type="reset" onClick={searchModeCloseListener} >X</button>
                </form>
              )}
            </Formik>
          </div>
        </div>
        {usersInfo.isLoading ?                                                                    // список юзеров грузится?
          <div className={stl.loaderDiv}>
            <img className={stl.loader} src={usersInfo.generalLDR_GIF} alt="Err" />
          </div> :
          usersInfo.usersGettingError || usersInfo.userFindingError ?                            // ошибка при поиске юзеров?
            <div className={stl.Houston}>
              <h2>Houston, we've got a problem...</h2>
              <h2>{usersInfo.usersGettingError || usersInfo.userFindingError}</h2>
              {usersInfo.usersGettingError && <button
                className={cn(stl.moreUsersShower, themes.pagBTNDnmc)}
                onClick={() => { usersFuncs.setErrorToNull(); setPageListener(usersInfo.pageSize, usersInfo.currentPage); }}
              >Try again</button>}
            </div>
            :
            usersInfo.userNotFound && !usersInfo.initialUsersList.length ?                           // ничего не найдено при кастомном поиске?
              <div className={stl.nobodyFound}>
                <img src={usersInfo.userNotFoundGIF} alt="Err" />
                <h2>{usersInfo.userNotFound} =(</h2>
              </div> :
              <div ref={mapWrapperRef} className={cn(stl.mapWrapper, themes.mapWrapperDnmc, wrapperLocker, delayFlag && stl.delay)}>
                {usersInfo?.initialUsersList
                  .map((user, i, users) =>
                    <div className={stl.userUnitContainer} key={i}>
                      <div className={cn(stl.userUnit, themes.userUnitDnmc, stl.userUnitShowed)} >
                        <div className={stl.avaDiv}>
                          <NavLink to={`/profile/${user.id}`}>
                            <img src={user.photos.large || usersInfo.defaultAvatar} alt='err'
                              className={`${themes.userAvaDnmc}`} />
                          </NavLink>
                        </div>
                        <div className={stl.nameStateBTNs}>

                          <div className={stl.userBlockInfo}>
                            <NavLink to={`/profile/${user.id}`}>
                              <h2 className={cn(stl.userName, themes.userNameDnmc)}>{user.name} </h2>
                            </NavLink>
                            <p>{user.status}</p>
                          </div>
                          <div className={stl.followNWriteBTNS}>

                            <button
                              id={user.id}
                              disabled={usersInfo.followingInProgress.some(id => id === user.id)}
                              className={cn(stl.followBTN, user.error ? themes.followBTN_ERR_DNMC : themes.followBTNDnmc)}
                              onClick={() => usersFuncs.followThunkToggler(user.id, user.followed, user.error)}
                            >
                              <div className={stl.followBTNContainer}>
                                <div className={stl.followBTNText}>
                                  {user.error ?
                                    <>
                                      <p className={stl.onFollowingErrBTN}>{user.error}</p>
                                      <p className={stl.tryAgainBTN}>Try again!</p>
                                    </>
                                    :
                                    user.followed ? 'unFollow' : 'Follow'} </div>
                                <div className={stl.followBTNLoader}> {usersInfo.followingInProgress.some(id => id === user.id) && <img src={usersInfo.BTN_FLW_GIF} alt="Err" />} </div>
                              </div>
                            </button>
                            <button className={cn(stl.followBTN, themes.followBTNDnmc)}
                              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { userIdTalkModeOn(e, i) }}
                            >Write message </button>
                          </div>
                        </div>
                      </div>
                      {writeMsgMode.servInfo[i]?.flag &&
                        <WriterMode themes={themes} userEl={users[i]} sendMsg={usersFuncs.sendMessageToUserThunk} index={i} srvInfo={writeMsgMode.servInfo[i]} delayFlag={delayFlag} />
                      }
                    </div >
                  )}
              </div>
        }
      </div>
      <div className={cn(stl.moreUserUnits, themes.moreUserUnitsDnmc)}>
        <button className={`${stl.moreUsersShower} ${themes.pagBTNDnmc}`}
          onClick={() => console.log('show more content')}>Show More
                </button>
      </div>
    </div>
    {usersInfo.feedbackArr.map((el, i, arr) => {
      // console.log(1);
      return <FeedBacker key={el.actionKey}
        feedBackWindowCloser={usersFuncs.feedBackWindowCloser}
        statInfo={arr[i]}
        index={i}
      />
    })}
  </>
}

type WriterMode_Type = {
  themes: UsersThemes_Type,
  userEl: UsersArr,
  sendMsg: usersActions_Type['sendMessageToUserThunk'],
  index: number,
  srvInfo: { flag?: boolean, closer: (i: number, el: any) => void } | any
  delayFlag: boolean
}

let WriterMode = React.memo(({ themes, userEl, sendMsg, index, srvInfo, delayFlag, }: WriterMode_Type) => {  // Прикруитть нормальную типизацию

  console.log(srvInfo);


  type Error_Type = { text?: string }
  type Value_Type = { text: string }
  let validator = (values: Value_Type) => { const errors: Error_Type = {}; if (!values.text) { errors.text = 'Required' } return errors }

  let formSubmitter = (userId: number, textValue: Value_Type, userName: string, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    let actionKey: string = uuidv4()
    sendMsg(userId, textValue.text, actionKey, userName);
    textValue.text = ''; setSubmitting(false);
  }
  let keyCodeChecker = (e: KeyboardEvent, userId: number, values: Value_Type, userName: string, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    if (e.keyCode == 13 && e.shiftKey) { return } // для переноса строки =)
    else if (e.keyCode === 13) { formSubmitter(userId, values, userName, { setSubmitting }) }
  }

  let closeAction = (index: number, elem: any) => {
    let element = elem.parentElement.parentElement.parentElement.parentElement.children[index].children[0]
    srvInfo.closer(index, element)
  }

  return <div className={cn(stl.userWriteMode, themes.userWriteModeDnmc, stl.userUnitShowed, delayFlag && stl.delay)}>

    <div className={stl.miniHeadWrapper}>
      <h2 className={cn(stl.userName, themes.userNameDnmc)}>{userEl.name}</h2>
      <button className={cn(stl.followBTN, themes.followBTNDnmc)}>Go to chat</button>   {/* // добавить логику перехода в чат */}
      <button className={cn(stl.closeBTN, stl.followBTN, themes.followBTNDnmc)}
        // onClick={e => { userIdTalkModeOff(e) }}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { closeAction(index, e.target) }}
      >X</button>
    </div>
    <div className={stl.textAreaWrapper}>
      <Formik initialValues={{ text: '' }} validate={validator}
        onSubmit={(values, { setSubmitting }) => {
          formSubmitter(userEl.id, values, userEl.name, { setSubmitting }); values.text = ''; setSubmitting(false);
        }}>
        {({ values, errors, handleChange, handleSubmit, isSubmitting, setSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Field name="text" className={stl.talkTextarea} as='textarea'
              onChange={handleChange} value={values.text} placeholder={errors.text}
              onKeyDown={(e: KeyboardEvent) => (keyCodeChecker(e, userEl.id, values, userEl.name, { setSubmitting }))}
            />
            <button type="submit" disabled={isSubmitting} className={cn(stl.followBTN, themes.followBTNDnmc)}
            > Send Msg </button>
          </form>
        )}
      </Formik>
    </div>
  </div>

})


interface FBProps_Type {
  feedBackWindowCloser: (actionKey: string) => void
  statInfo: any
  index: number
}

const FeedBacker = React.memo(({ feedBackWindowCloser, statInfo, index }: FBProps_Type) => {
  let feedBackNamer = (i: number) => {
    if (i === 0) return `${stl.feedbackWindow0}`
    else if (i === 1) return `${stl.feedbackWindow1}`
    else if (i >= 2) return `${stl.feedbackWindow2}`
  }

  useEffect(() => {
    statInfo.statNum !== 0 && setTimeout(() => {
      feedBackWindowCloser(statInfo.actionKey)
    }, 3000)
  }, [statInfo.statNum])

  let feedBackCloser = (actionKey: string) => { feedBackWindowCloser(actionKey) }


  return <div className={feedBackNamer(index)}>
    <button onClick={() => feedBackCloser(statInfo.actionKey)}> X</button>
    <p>{statInfo.statNum === 0 && 'Sending message...' ||
      statInfo.statNum === 1 && `Message delivered to ${statInfo.userName}` ||
      statInfo.statNum === 2 && `Failed to deliver message to ${statInfo.userName} `}
    </p>
  </div>
},
  function areEqual(prevProps, nextProps) {


    // return prevProps.sendingMSGStatArr.length !== nextProps.sendingMSGStatArr.length
    return false
  })
