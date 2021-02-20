import React, { lazy, Suspense } from "react";
import { Route, Redirect, withRouter, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import stl from './content.module.css';
import { getSmartIdAndIsAuth } from "../../redux/selectors";
import { withSuspense } from './HOC/withSuspense';
// import {withAuthRedirect} from "./HOC/withAuthRedirect";  // ? нужен ли

// const ProfileComposer = lazy(()=> import("./profile/profileCompWithContainer").then((m:any) => ({default: m.ProfileComposer}))) // as React.ComponentType
// const ContentComposer = compose<React.ComponentType>(connect(mapStateToProps), withRouter,)(ContentCompContainer); // для примера на память оставлю

const ProfileFuncContainer = lazy(() => import("./profile/profileCompWithContainer")) as React.LazyExoticComponent<React.ComponentType<any>>;
const FriendsComposer = lazy(() => import("./friends/friendsContainer"));
const DialogsComposer = lazy(() => import("./dialogs/dialogs"));
const UsersComposer = lazy(() => import("./users/usersContainer"));
const News = lazy(() => import('./news/News'));
const Music = lazy(() => import('./news/News'));
const Settings = lazy(() => import("./settings/settings"));
const UnAuthorised = lazy(() => import("./unAuthorised/unAuthorised"));
const NotFound = lazy(() => import("./404/404"));


let ProfileComp = withSuspense(ProfileFuncContainer)
let FriendsComp = withSuspense(FriendsComposer)
let DialogsComp = withSuspense(DialogsComposer)
let UsersComp = withSuspense(UsersComposer)
let NewsComp = withSuspense(News)
let MusicComp = withSuspense(Music)
let SettingsComp = withSuspense(Settings)
let NotFoundComp = withSuspense(NotFound)

export function ContentCompContainer() {
  let smartData = useSelector(getSmartIdAndIsAuth);
  let pathname = useLocation().pathname;


  return <Content authData={smartData} pathname={pathname} />
};

type PropsType = { authData: { isAuth: boolean, id: null | number }, pathname: string }

let Content: React.FC<PropsType> = ({ authData: { isAuth, id: myId }, pathname }) => {                       // два рендера - первичный и из-за withRouter

  //users?count=${pageSize}&page=${currentPage}
  let loginChecker = () => { // console.log(props)
    if (isAuth) {         // ЗАЛОГИНЕН

      if (pathname.match(/^\/login$|^\/$/)) return <Redirect to={`profile/${myId}`} />
      if (!pathname.match(/^\/profile\/\d{1,5}\b$|^\/dialogs\/\d{1,5}\b$|^\/dialogs$|^\/dialogs\/\d{1,5}\/messages$|^\/friends$|^\/users$|^\/$|^\/news$|^\/music$|^\/settings$|^\/$|^\/404$/)) return <Redirect to='/404' />
      return <>
        <Route onLoad={true} exact path='/profile/:userId?' render={() => <ProfileComp />} />
        <Route onLoad={true} exact path='/friends' render={() => <FriendsComp />} />
        <Route onLoad={true} exact path={`/dialogs/:userId?/:messages?`} render={() => <DialogsComp />} />
        <Route onLoad={true} exact path={`/users`} render={() => <UsersComp />} />
        <Route onLoad={true} exact path='/news' render={() => <NewsComp />} />
        <Route onLoad={true} exact path='/music' render={() => <MusicComp />} />
        <Route onLoad={true} exact path='/settings' render={() => <SettingsComp />} />
        <Route onLoad={true} exact path='/404' render={() => <NotFoundComp />} />
      </>
    }
    else {                      // НЕ ЗАЛОГИНЕН
      if (pathname.match(/^\/profile\/\d{1,5}\b$|^\/dialogs$|^\/dialogs\/\d{1,5}\b$|^\/friends$|^\/users$|^\/$/)) return <Redirect to='/login' />
      if (!pathname.match(/^\/news$|^\/music$|^\/settings$|^\/$|^\/login$|^\/404$/)) return <Redirect to='/404' />
      return <>
        <Route onLoad={true} exact path='/login' render={withSuspense(UnAuthorised)} />
        <Route onLoad={true} exact path='/news' render={withSuspense(News)} />
        <Route onLoad={true} exact path='/music' render={withSuspense(Music)} />
        <Route onLoad={true} exact path='/settings' render={withSuspense(Settings)} />
        <Route onLoad={true} exact path='/404' render={withSuspense(NotFound)} />
      </>
    }
  };
  return <div className={stl.content2}> {loginChecker()} </div>
}
