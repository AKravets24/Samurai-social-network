import React from "react";
import stl from './content.module.css';
import ProfileComposer from "./profile/profileContainer";
import DialogsConnector from "./dialogs/dialogContainer";
import News from './news/News';
import Music from './music/music';
import Settings from "./settings/settings";
import UsersContainer from "./users/usersContainer";
import {Route} from "react-router-dom";
import UnAuthorised from "./unAuthorised/unAuthorised";

function Content() {
    return <>
        <div className={stl.content}>
            <Route exact path='/profile/:userId?'  render={() => <ProfileComposer />}/>
            <Route exact path='/dialogs'           render={() => <DialogsConnector />}/>
            <Route exact path='/news'              render={() => <News/>}/>
            <Route exact path='/music'             render={() => <Music/>}/>
            <Route exact path='/users'             render={() => <UsersContainer/>}/>
            <Route exact path='/settings'          render={() => <Settings/>}/>
            <Route exact path='/login'             render={() => <UnAuthorised/>}/>
        </div>
    </>
}

export default Content;
