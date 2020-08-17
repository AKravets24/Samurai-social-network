import React from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { compose } from 'redux';
import stl from './content.module.css';
import ProfileComposer from "./profile/profileContainer";
import DialogsConnector from "./dialogs/dialogs";
import News from './news/News';
import Music from './music/music';
import Settings from "./settings/settings";
import UsersContainer from "./users/usersContainer";
import UnAuthorised from "./unAuthorised/unAuthorised";
import FriendsComposer from "./friends/friendsContainer";
import NotFound from "./404/404";
import {withAuthRedirect} from "./HOC/withAuthRedirect";  // ? нужен ли

class contentCompContainer  extends React.Component { constructor(props) { super(props);  /*console.log(props)*/ }
    render() {
        return <Content myId={this.props.myId} isAuth={this.props.isAuth} pathname={this.props.location.pathname}/>}
};

function Content(props) {
    // console.log(props.pathname)

    let loginChecker = () => {
        if (props.isAuth) {         // ЗАЛОГИНЕН
            if (props.pathname.match (/^\/login$|^\/$/) ) return <Redirect to={`profile/${props.myId}`      }/>
            if (!props.pathname.match(/^\/profile\/\d{1,5}\b$|^\/dialogs$|^\/dialogs\/\d{1,5}\/messages$|^\/friends$|^\/users$|^\/$| ^\/news$|^\/music$|^\/settings$|^\/$|^\/404$/))
                return <Redirect to='/404'/>
            return  <>
                <Route exact path='/profile/:userId?' render={() => <ProfileComposer myId = {props.myId}/>  }/>
                <Route exact path='/dialogs'          render={() => <DialogsConnector/>                     }/>
                <Route exact path='/friends'          render={() => <FriendsComposer />                     }/>
                <Route exact path='/news'             render={() => <News />                                }/>
                <Route exact path='/music'            render={() => <Music/>                                }/>
                <Route exact path='/users'            render={() => <UsersContainer/>                       }/>
                <Route exact path='/settings'         render={() => <Settings/>                             }/>
                <Route exact path='/404'              render={() => <NotFound/>                             }/>
            </>
        }
        else {                      // НЕ ЗАЛОГИНЕН
            if (props.pathname.match(/^\/profile\/\d{1,4}\b$|^\/dialogs$|^\/friends$|^\/users$|^\/$/))return <Redirect to='/login'/>
            if (!props.pathname.match(/^\/news$|^\/music$|^\/settings$|^\/$|^\/login$|^\/404$/))return <Redirect to='/404'/>
            return <>
                <Route exact path='/login'            render={() => <UnAuthorised />                        }/>
                <Route exact path='/news'             render={() => <News />                                }/>
                <Route exact path='/music'            render={() => <Music/>                                }/>
                <Route exact path='/settings'         render={() => <Settings/>                             }/>
                <Route exact path='/404'              render={() => <NotFound/>                             }/>
            </>
            // написать компоненту 404
        }
    };
    return  <div className={stl.content2}> { loginChecker () } </div>
}

let mapStateToProps = (state)=> {  /*console.log(state)*/
    return {
        myId: state.appAuthReducer.id,
        isAuth: state.appAuthReducer.isAuth,
    }
};

export default compose (
    connect(mapStateToProps),
    withRouter,
)(contentCompContainer);


// export default connect(mapStateToProps) (contentCompContainer)






