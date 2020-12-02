import React                         from "react";
import { Route,Redirect,withRouter } from "react-router-dom";
import { connect }                   from 'react-redux';
import { compose }                   from 'redux';
import stl                           from './content.module.css';
import { ProfileComposer }           from "./profile/profileCompWithContainer";
import { DialogsComposer }           from "./dialogs/dialogs";
import News                          from './news/News';
import Music                         from './music/music';
import Settings                      from "./settings/settings";
import UsersContainer                from "./users/usersContainer";
import UnAuthorised                  from "./unAuthorised/unAuthorised";
import FriendsComposer               from "./friends/friendsContainer";
import NotFound                      from "./404/404";
import { getSmartIdAndIsAuth }       from "../../redux/selectors";
// import {withAuthRedirect} from "./HOC/withAuthRedirect";  // ? нужен ли

let mapStateToProps = (state)=> {  /*console.log(state);*/return { smartData: getSmartIdAndIsAuth(state),}};

export const ContentComposer =  compose ( connect(mapStateToProps), withRouter,)(ContentCompContainer);

function ContentCompContainer (props){ // console.log(props)
    let {id,isAuth}=props.smartData;
    return <Content myId={id} isAuth={isAuth} pathname={props.location.pathname}/>
};

function Content(props) {                                                                                               // два рендера - первичный и из-за withRouter

    // console.log(2)

    let loginChecker = () => {
        if (props.isAuth) {         // ЗАЛОГИНЕН
            if (props.pathname.match (/^\/login$|^\/$/) ) return <Redirect to={`profile/${props.myId}`      }/>
            if (!props.pathname.match(/^\/profile\/\d{1,5}\b$|^\/dialogs\/\d{1,5}\b$|^\/dialogs$|^\/dialogs\/\d{1,5}\/messages$|^\/friends$|^\/users$|^\/$|^\/news$|^\/music$|^\/settings$|^\/$|^\/404$/))
                return <Redirect to='/404'/>
            return  <>
                <Route exact path='/profile/:userId?' render={() => <ProfileComposer myId = {props.myId}/>  }/>

                <Route exact path={`/dialogs/:userId?/:messages?` }
                                                      render={() => <DialogsComposer/>                      }/>
                <Route exact path='/friends'          render={() => <FriendsComposer />                     }/>
                <Route exact path='/news'             render={() => <News />                                }/>
                <Route exact path='/music'            render={() => <Music/>                                }/>
                <Route exact path='/users'            render={() => <UsersContainer/>                       }/>
                <Route exact path='/settings'         render={() => <Settings/>                             }/>
                <Route exact path='/404'              render={() => <NotFound/>                             }/>
            </>
        }
        else {                      // НЕ ЗАЛОГИНЕН
            if ( props.pathname.match(/^\/profile\/\d{1,4}\b$|^\/dialogs$|^\/dialogs\/\d{1,5}\b$|^\/friends$|^\/users$|^\/$/))return <Redirect to='/login'/>
            if (!props.pathname.match(/^\/news$|^\/music$|^\/settings$|^\/$|^\/login$|^\/404$/))return <Redirect to='/404'/>
            return <>
                <Route exact path='/login'            render={() => <UnAuthorised />                        }/>
                <Route exact path='/news'             render={() => <News />                                }/>
                <Route exact path='/music'            render={() => <Music/>                                }/>
                <Route exact path='/settings'         render={() => <Settings/>                             }/>
                <Route exact path='/404'              render={() => <NotFound/>                             }/>
            </>
        }
    };
    return  <div className={stl.content2}> { loginChecker () } </div>
}


// export default connect(mapStateToProps) (contentCompContainer)

// class contentCompContainer extends React.Component { constructor(props) { super(props);  console.log(props) }
//     render(){return<Content myId={this.props.myId} isAuth={this.props.isAuth} pathname={this.props.location.pathname}/>}
// };





