import React,{lazy, Suspense}        from "react";
import { Route,Redirect,withRouter } from "react-router-dom";
import { connect }                   from 'react-redux';
import { compose }                   from 'redux';
import stl                           from './content.module.css';
// import  NotFound                     from "./404/404";
import { getSmartIdAndIsAuth }       from "../../redux/selectors";
import { withSuspense }              from './HOC/withSuspense';
import { AppStateType }              from '../../redux/redux-store';
// import {withAuthRedirect} from "./HOC/withAuthRedirect";  // ? нужен ли

// //@ts-ignore
// const ProfileComposer = lazy(()=> import("./profile/profileCompWithContainer").then((m:any) => ({default: m.ProfileComposer})))
    
//@ts-ignore
const ProfileComposer = lazy(()=> import("./profile/profileCompWithContainer"));

const FriendsComposer = lazy(()=> import("./friends/friendsContainer"));
const DialogsComposer = lazy(()=> import("./dialogs/dialogs"));
const UsersComposer   = lazy(()=> import("./users/usersContainer"));
const News            = lazy(()=> import('./news/News'));
const Music           = lazy(()=> import('./news/News'));
const Settings        = lazy(()=> import("./settings/settings"));
const UnAuthorised    = lazy(()=> import("./unAuthorised/unAuthorised"));
const NotFound        = lazy(()=> import("./404/404"));


let mapStateToProps = (state:AppStateType)=> {  
    // console.log(state);
    return { smartData: getSmartIdAndIsAuth(state),}};


const ContentComposer =  compose ( connect(mapStateToProps), withRouter,)(ContentCompContainer);
export default ContentComposer

type ContainerProps = {
    smartData: {
        isAuth: boolean,
        id:     number
    }
    location: {
        hash:     string
        key:      string
        pathname: string
        search:   string
        state:    undefined|any
    }
}

function ContentCompContainer (props:ContainerProps){  //console.log(props)
    let {id,isAuth}=props.smartData;
    return <Content myId={id} isAuth={isAuth} pathname={props.location.pathname}/>
};

type PropsType = {isAuth: boolean, myId: number, pathname: string}

function Content(props:PropsType) {                                                                                               // два рендера - первичный и из-за withRouter
    // console.log(props);
    
    //users?count=${pageSize}&page=${currentPage}
    let loginChecker = () => {
        if (props.isAuth&&props.myId) {         // ЗАЛОГИНЕН
            // console.log(props)
            if ( props.pathname.match(/^\/login$|^\/$/) ) return <Redirect to={`profile/${props.myId}`      }/>
            if (!props.pathname.match(/^\/profile\/\d{1,5}\b$|^\/dialogs\/\d{1,5}\b$|^\/dialogs$|^\/dialogs\/\d{1,5}\/messages$|^\/friends$|^\/users$|^\/$|^\/news$|^\/music$|^\/settings$|^\/$|^\/404$/))
                return <Redirect to='/404'/>
            return  <>
                <Route onLoad={true} exact path='/profile/:userId?' render={withSuspense(ProfileComposer)} />
                <Route onLoad={true} exact path='/friends'          render={withSuspense(FriendsComposer)} />
                <Route onLoad={true} exact path={`/dialogs/:userId?/:messages?` }
                                                                    render={withSuspense(DialogsComposer)} />
                <Route onLoad={true} exact path={`/users`}          render={withSuspense(UsersComposer)}   />
                <Route onLoad={true} exact path='/news'             render={withSuspense(News)}            />
                <Route onLoad={true} exact path='/music'            render={withSuspense(Music)}           />
                <Route onLoad={true} exact path='/settings'         render={withSuspense(Settings)}        />
                <Route onLoad={true} exact path='/404'              render={withSuspense(NotFound)}        />
            </>
        }
        else {                      // НЕ ЗАЛОГИНЕН
            if ( props.pathname.match(/^\/profile\/\d{1,4}\b$|^\/dialogs$|^\/dialogs\/\d{1,5}\b$|^\/friends$|^\/users$|^\/$/))return <Redirect to='/login'/>
            if (!props.pathname.match(/^\/news$|^\/music$|^\/settings$|^\/$|^\/login$|^\/404$/))return <Redirect to='/404'/>
            console.log(2)
            return <>
                <Route onLoad={true} exact path='/login'            render={withSuspense(UnAuthorised)}    />
                <Route onLoad={true} exact path='/news'             render={withSuspense(News)}            />
                <Route onLoad={true} exact path='/music'            render={withSuspense(Music)}           />
                <Route onLoad={true} exact path='/settings'         render={withSuspense(Settings)}        />
                <Route onLoad={true} exact path='/404'              render={withSuspense(NotFound)}        />
            </>
        }
    };
    return  <div className={stl.content2}> { loginChecker () } </div>
}



// import React,{lazy, Suspense}        from "react";
// import { Route,Redirect,withRouter } from "react-router-dom";
// import { connect }                   from 'react-redux';
// import { compose }                   from 'redux';
// import stl                           from './content.module.css';
// // import  NotFound                     from "./404/404";
// import { getSmartIdAndIsAuth }       from "../../redux/selectors";
// import { withSuspense }              from './HOC/withSuspense';

// const ProfileComposer = lazy(()=> import("./profile/profileCompWithContainer")) ;
// const FriendsComposer = lazy(()=> import("./friends/friendsContainer"));
// const DialogsComposer = lazy(()=> import("./dialogs/dialogs"));
// const UsersComposer   = lazy(()=> import("./users/usersContainer"));
// const News            = lazy(()=> import('./news/News'));
// const Music           = lazy(()=> import('./news/News'));
// const Settings        = lazy(()=> import("./settings/settings"));
// const UnAuthorised    = lazy(()=> import("./unAuthorised/unAuthorised"));
// const NotFound        = lazy(()=> import("./404/404"))
// ;
// // import {withAuthRedirect} from "./HOC/withAuthRedirect";  // ? нужен ли

// let mapStateToProps = (state)=> {  /*console.log(state);*/return { smartData: getSmartIdAndIsAuth(state),}};

// export const ContentComposer =  compose ( connect(mapStateToProps), withRouter,)(ContentCompContainer);

// function ContentCompContainer (props){ // console.log(props)
//     let {id,isAuth}=props.smartData;
//     return <Content myId={id} isAuth={isAuth} pathname={props.location.pathname}/>
// };

// function Content(props) {                                                                                               // два рендера - первичный и из-за withRouter
//     //users?count=${pageSize}&page=${currentPage}
//     let loginChecker = () => {
//         if (props.isAuth&&props.myId) {         // ЗАЛОГИНЕН
//             // console.log(props)
//             if ( props.pathname.match(/^\/login$|^\/$/) ) return <Redirect to={`profile/${props.myId}`      }/>
//             if (!props.pathname.match(/^\/profile\/\d{1,5}\b$|^\/dialogs\/\d{1,5}\b$|^\/dialogs$|^\/dialogs\/\d{1,5}\/messages$|^\/friends$|^\/users$|^\/$|^\/news$|^\/music$|^\/settings$|^\/$|^\/404$/))
//                 return <Redirect to='/404'/>
//             return  <>
//                 <Route onLoad={true} exact path='/profile/:userId?' render={withSuspense(ProfileComposer)} />
//                 <Route onLoad={true} exact path='/friends'          render={withSuspense(FriendsComposer)} />
//                 <Route onLoad={true} exact path={`/dialogs/:userId?/:messages?` }
//                                                                     render={withSuspense(DialogsComposer)} />
//                 <Route onLoad={true} exact path={`/users`}          render={withSuspense(UsersComposer)}   />
//                 <Route onLoad={true} exact path='/news'             render={withSuspense(News)}            />
//                 <Route onLoad={true} exact path='/music'            render={withSuspense(Music)}           />
//                 <Route onLoad={true} exact path='/settings'         render={withSuspense(Settings)}        />
//                 <Route onLoad={true} exact path='/404'              render={withSuspense(NotFound)}        />
//             </>
//         }
//         else {                      // НЕ ЗАЛОГИНЕН
//             if ( props.pathname.match(/^\/profile\/\d{1,4}\b$|^\/dialogs$|^\/dialogs\/\d{1,5}\b$|^\/friends$|^\/users$|^\/$/))return <Redirect to='/login'/>
//             if (!props.pathname.match(/^\/news$|^\/music$|^\/settings$|^\/$|^\/login$|^\/404$/))return <Redirect to='/404'/>
//             console.log(2)
//             return <>
//                 <Route onLoad={true} exact path='/login'            render={withSuspense(UnAuthorised)}    />
//                 <Route onLoad={true} exact path='/news'             render={withSuspense(News)}            />
//                 <Route onLoad={true} exact path='/music'            render={withSuspense(Music)}           />
//                 <Route onLoad={true} exact path='/settings'         render={withSuspense(Settings)}        />
//                 <Route onLoad={true} exact path='/404'              render={withSuspense(NotFound)}        />
//             </>
//         }
//     };
//     return  <div className={stl.content2}> { loginChecker () } </div>
// }


// // export default connect(mapStateToProps) (contentCompContainer)

// // class contentCompContainer extends React.Component { constructor(props) { super(props);  console.log(props) }
// //     render(){return<Content myId={this.props.myId} isAuth={this.props.isAuth} pathname={this.props.location.pathname}/>}
// // };





