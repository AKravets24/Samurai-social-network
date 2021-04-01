import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import stl from './../users/users.module.css'
import { Field, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { PalsThemes_Type, FriendsActions_Type } from './friendsContainer';
import { InitialFriendsInfo_Type } from '../../../redux/friendsReducer';
import { UsersArr } from '../../../redux/app';
import { UsersThemesBGR_Type } from '../../../redux/backGroundSetter';


type FriendsProps_Type = {
  themes: PalsThemes_Type
  palsInfo: InitialFriendsInfo_Type & UsersThemesBGR_Type
  palsFuncs: FriendsActions_Type
}

export let Friends: React.FC<FriendsProps_Type> = ({ themes, palsFuncs, palsInfo }) => {
  // console.log(palsInfo.BTN_FLW_GIF)


  type Error_Type = { text?: string }

  let [isDisabled, setIsDisabled] = useState<boolean>(false);
  let [msgStat, setMsgStat] = useState(null);
  let [feedBack, setFeedBack] = useState<boolean>(false);
  let [feedBackClass, setFeedBackClass] = useState<boolean | string>(stl.feedBackVisible); // false normal
  let [wrapperLocker, setWrapperLocker] = useState<string>('');

  let firstBlockClass = `${stl.userUnit} ${themes.userUnitDnmc} ${stl.userUnitShowed}`;
  let secondBlockClass = `${stl.userWriteMode} ${themes.userWriteModeDnmc} ${stl.userUnitShowed}`;

  let userIdTalkModeOff = (e: React.SyntheticEvent) => {
    setWrapperLocker(''); setIsDisabled(false);
    let target = e.target as HTMLInputElement
    if (target.parentElement?.parentElement?.parentElement?.parentElement?.children) {
      target.parentElement.parentElement.parentElement.children[0].className = firstBlockClass;
      target.parentElement.parentElement.parentElement.children[1].className = stl.userUnitHidden;
    }
  };

  let userIdTalkModeOn = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement
    setWrapperLocker(stl.wrapperLocked);
    setIsDisabled(true);
    if (target?.parentElement?.parentElement?.parentElement?.parentElement?.children) {
      target.parentElement.parentElement.parentElement.parentElement.children[0].className = stl.userUnitHidden;
      target.parentElement.parentElement.parentElement.parentElement.children[1].className = secondBlockClass;
    }
  };

  let followTogglerListener = (userId: number, userIsFollowed: boolean, error: string) => { palsFuncs.followThunkToggler(userId, userIsFollowed, error) }
  let getMyFriendsListener = (page: number) => { palsFuncs.getMyFriendsListThunk(page) }

  // console.log(palsInfo.friendsList)

  type Value_Type = { text: string }
  let formValidator = (values: Value_Type) => { const errors: Error_Type = {}; if (!values.text) { errors.text = 'Required' } return errors }

  let formSubmitter = (userId: number, textValue: Value_Type, userName: string, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    let actionKey: string = uuidv4()
    palsFuncs.sendMessageToUserThunk(userId, textValue.text, actionKey, userName);
    setIsDisabled(false); textValue.text = ''; setSubmitting(false);
  }

  let keyCodeChecker = (e: KeyboardEvent, userId: number, values: Value_Type, userName: string, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    if (e.keyCode == 13 && e.shiftKey) { return } // для переноса строки =)
    else if (e.keyCode === 13) { formSubmitter(userId, values, userName, { setSubmitting }) }
  }

  // let friendsListPage = 1;
  let [friendsListPage, setFriendsListPage] = useState<number>(1);

  return <>
    <div className={`${stl.friendsGeneral} ${themes.friendsGeneralDnmc}`}>
      {palsInfo.friendsListIsLoading ?                                                    // список друзей загружается? 
        <div className={stl.loaderDiv}>
          <img className={stl.loader} src={palsInfo.generalLDR_GIF} alt="Err" />
        </div> :
        palsInfo.errOnGettingFriends ?                                                    // есть ошибка при загрузке?
          <div className={`${stl.Houston} ${themes.friendsGeneralDnmc}`}>
            <h2>Houston, we've got a problem...</h2>
            <h2>{palsInfo.errOnGettingFriends}</h2>
            <button className={`${stl.moreUsersShower} ${themes.pagBTNDnmc}`} onClick={() => getMyFriendsListener(friendsListPage)}
            >Try again</button>
          </div>
          :
          !palsInfo.friendsList.length ?                                                  //есть ли друзья в списке?
            <div className={stl.noFriendsWrapper}>
              <p>No friends here so far...</p>
            </div> :
            <>
              <h2 className={stl.userHeader}>Friends {palsInfo.friendsCount ? `(${palsInfo.friendsList.length} / ${palsInfo.friendsCount})` : null}</h2>
              <div className={`${stl.mapWrapper} ${themes.mapWrapperDnmc} ${wrapperLocker}`}>

                {palsInfo.friendsList.map((user: UsersArr) =>
                  <div className={stl.userUnitContainer} key={user.id}>
                    <div className={`${stl.userUnit} ${themes.userUnitDnmc} ${stl.userUnitShowed}`}>
                      <div className={stl.avaDiv}>
                        <NavLink to={`/profile/${user.id}`}>
                          <img src={user.photos.large || palsInfo.defaultAvatar} alt='err'
                            className={`${themes.userAvaDnmc}`} />
                        </NavLink>
                      </div>
                      <div className={stl.nameStateBTNs}>
                        {/* <div className={`${stl.userBlockInfo} ${themes.userBlockInfoDnmc}`}> */}
                        <div className={stl.userBlockInfo}>
                          <NavLink to={`/profile/${user.id}`}>
                            <h2 className={`${stl.userName} ${themes.userNameDnmc}`}>{user.name} </h2>
                          </NavLink>
                          <p className={`${themes.userNameDnmc}`}>{user.status}</p>
                        </div>
                        <div className={stl.followNWriteBTNS}>
                          <button
                            id={user.id}
                            disabled={palsInfo.followingInProgress.some(id => id === user.id)}
                            className={`${stl.followBTN}  ${user.error ? themes.followBTN_ERR_DNMC : themes.followBTNDnmc}`}
                            onClick={() => followTogglerListener(user.id, user.followed, user.error)}
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
                              <div className={stl.followBTNLoader}> {palsInfo.followingInProgress.some(id => id === user.id) && <img src={palsInfo.BTN_FLW_GIF} alt="Err" />} </div>
                            </div>
                          </button>
                          <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                            disabled={isDisabled}
                            onClick={(e) => userIdTalkModeOn(e)}
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
                          onClick={(e: any) => { userIdTalkModeOff(e) }}
                        >X
                  </button>
                      </div>
                      <div className={stl.textAreaWrapper}>
                        <Formik initialValues={{ text: '' }} validate={formValidator}
                          onSubmit={(values, { setSubmitting }) => {
                            formSubmitter(user.id, values, user.name, { setSubmitting });
                          }}>
                          {({ values, errors, handleChange, handleSubmit, isSubmitting, setSubmitting }) => (
                            <form onSubmit={handleSubmit} >
                              <Field name="text" className={stl.talkTextarea} as='textarea' onChange={handleChange} value={values.text}
                                placeholder={errors.text} onKeyDown={(e: KeyboardEvent) => (keyCodeChecker(e, user.id, values, user.name, {
                                  setSubmitting
                                }))} />
                              <button type="submit" disabled={isSubmitting} className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                              > Send Msg </button>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                )}
              </div>


              <div className={`${stl.moreUserUnits}  ${themes.moreUserUnitsDnmc}`}>



                <button
                  disabled={palsInfo.moreFriendsIsLoading || palsInfo.friendsCount === palsInfo.friendsList.length}
                  className={`${stl.moreUsersShower}  ${palsInfo.errOnGettingFriends ? themes.followBTN_ERR_DNMC : themes.pagBTNDnmc}`}
                  onClick={() => { setFriendsListPage(++friendsListPage); getMyFriendsListener(friendsListPage) }}
                >
                  <div className={stl.followBTNContainer}>
                    <div className={stl.followBTNText}>
                      {palsInfo.errOnGettingFriends ?
                        <>
                          <p className={stl.onFollowingErrBTN}>{palsInfo.moreFriendsLoadErr} Err!</p>
                          <p className={stl.tryAgainBTN}>Try again!</p>
                        </>
                        :
                        palsInfo.friendsCount === palsInfo.friendsList.length ? 'All list loaded!' : " Show more!"} </div>
                    <div className={stl.followBTNLoader}> {palsInfo.moreFriendsIsLoading && <img src={palsInfo.BTN_FLW_GIF} alt="Err" />} </div>
                  </div>
                </button>

              </div>
            </>
      }
    </div>
  </>
};

//<button disabled={palsInfo.friendsCount === palsInfo.friendsList.length}
//                  className={`${stl.moreUsersShower} ${themes.pagBTNDnmc}`} onClick={() => { setFriendsListPage(++friendsListPage); getMyFriendsListener//(friendsListPage) }}>
//                  {palsInfo.friendsCount === palsInfo.friendsList.length ? 'All list loaded!' : " Show more!"}
//
//                  {/* <img src={palsInfo.generalLDR_GIF} alt="Err" /> */}
//                </button>