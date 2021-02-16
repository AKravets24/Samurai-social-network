import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import stl from './../users/users.module.css'
import { Field, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { PalsThemes_Type, FriendsActions_Type } from './friendsContainer';
import { InitialFriendsInfo_Type } from '../../../redux/friendsReducer';
import { UsersArr } from '../../../redux/app';


type FriendsProps_Type = {
  themes: PalsThemes_Type
  palsFuncs: FriendsActions_Type
  palsInfo: InitialFriendsInfo_Type
}

export let Friends: React.FC<FriendsProps_Type> = ({ themes, palsFuncs, palsInfo }) => {
  console.log(palsFuncs)

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

  let followTogglerListener = (userId: number, userIsFollowed: boolean) => { palsFuncs.followThunkToggler(userId, userIsFollowed) }
  let getMyFriendsListener = () => { palsFuncs.getMyFriendsListThunk() }

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

  return <>
    {palsInfo.errOnGettingFriends ?
      <div className={`${stl.Houston} ${themes.friendsGeneralDnmc}`}>
        <h2>Houston, we've got a problem...</h2>
        <h2>{palsInfo.errOnGettingFriends}</h2>
        <button className={`${stl.moreUsersShower} ${themes.pagBTNDnmc}`} onClick={getMyFriendsListener}
        >Try again</button>
      </div>
      :
      <div className={`${stl.friendsGeneral} ${themes.friendsGeneralDnmc}`}>
        <h2 className={stl.userHeader}>Friends</h2>
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
                      className={`${stl.followBTN} ${themes.followBTNDnmc} ${user.error && themes.followBTN_ERR_DNMC}`}
                      onClick={() => followTogglerListener(user.id, user.followed)}
                    >
                      {user.error ? user.error : user.followed ? 'unFollow' : 'Follow'}
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
      </div>
    }
  </>
};

