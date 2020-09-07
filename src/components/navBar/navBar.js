import React               from "react";
import stl                 from './navBar.module.css';
import {NavLink}           from 'react-router-dom';
import {connect}           from 'react-redux';
import {withAuthRedirect}  from "../content/HOC/withAuthRedirect";

class navBarContainer extends React.Component { constructor(props) { super(props);  /*console.log(props)*/ }

    componentDidMount() {this.props.getNewMessagesRequestThunk(); }

    render() {
        return <NavBar navBarThemes    = { this.props.state.navBarThemes} myId={this.props.state.myId}
                       getNewMessages  = { this.props.getNewMessagesRequestThunk}
                       btnIsDisabled   = { this.props.state.btnNewMessagesState}
                       newMSGSCounter  = { this.props.state.newMSGSCounter}
                       msgLoader       = { this.props.state.msgLoader}
        />
    }
}

function NavBar(props) {
    // console.log(props.msgLoader)
    return <>
        <div style={props.navBarThemes.blockMenu} className={stl.blockMenu}>
            <ul className={stl.menu}>
                {!props.myId && <li><NavLink to={`/login`} style={props.navBarThemes.menuA}>Get Login</NavLink></li>}
                { props.myId && <li><NavLink to={`/profile/${props.myId}`} style={props.navBarThemes.menuA}
                                            activeClassName={stl.activeLink}> Profile </NavLink></li>}
                { props.myId && <li><NavLink to={'/friends'} style={props.navBarThemes.menuA}
                                            activeClassName={stl.activeLink}> Friends </NavLink></li>}


                { props.myId && <li className={stl.dialogsSpan}>
                    <button disabled={props.btnIsDisabled} onClick={props.getNewMessages}>
                        { props.btnIsDisabled ?
                            <img src={props.msgLoader} alt="err"/>
                             : '+1?'}
                         </button>
                    <NavLink to={'/dialogs'} style={props.navBarThemes.menuA} activeClassName={stl.activeLink}>
                        Dialogs </NavLink>
                    <p hidden={!props.newMSGSCounter}>({props.newMSGSCounter})</p>
                </li>}


                {/*{ props.myId && <li className={stl.dialogsSpan}>*/}
                {/*    <NavLink to={'/dialogs'} style={props.navBarThemes.menuA} activeClassName={stl.activeLink}>*/}
                {/*        Dialogs </NavLink>*/}
                {/*    /!*<p hidden={!props.newMSGSCounter}>{props.newMSGSCounter}</p>*!/*/}

                {/*    /!*<p>{props.newMSGSCounter}</p>*!/*/}

                {/*    <button*/}
                {/*        */}
                {/*        disabled={props.btnIsDisabled} onClick={props.getNewMessages}>*/}
                {/*        { props.btnIsDisabled ?*/}
                {/*            <img src={props.msgLoader} alt="err"/>*/}
                {/*            : props.newMSGSCounter  }*/}
                {/*    </button>*/}
                {/*</li>}*/}



                { props.myId && <li><NavLink to={'/users'} style={props.navBarThemes.menuA}
                                            activeClassName={stl.activeLink}> Users </NavLink></li>}
                <li><NavLink to='/news' style={props.navBarThemes.menuA}
                             activeClassName={stl.activeLink}> News </NavLink></li>
                <li><NavLink to='/music' style={props.navBarThemes.menuA}
                             activeClassName={stl.activeLink}> Music </NavLink></li>
                <li><NavLink to='/settings' style={props.navBarThemes.menuA}
                             activeClassName={stl.activeLink}> Settings </NavLink></li>
            </ul>
        </div>
    </>
}


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        myId:                 state.appAuthReducer.id,
        navBarThemes:         state.backGroundSetter.themes.navBar,
        dialogACs:            state.dialogACs,
        btnNewMessagesState:  state.dialogsReducer.newMessageBTNDisabled,
        newMSGSCounter:       state.dialogsReducer.newMessagesCounter,
        msgLoader:            state.dialogsReducer.msgLoader
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const  state  = stateProps;
    const { dispatch } = dispatchProps;
    // console.log(state)

    const getNewMessagesRequestThunk =()=> dispatch(state.dialogACs.getNewMessagesRequestThunkAC() );

    return { state, getNewMessagesRequestThunk  }

}

const navBarConnector = connect(mapStateToProps, null, mergeProps)(navBarContainer)

export default navBarConnector;


// class navBarContainer extends React.Component {
//     constructor(props) {
//         super(props);
//         // console.log(props)
//     }
//     render() {
//         if (this.props.myId ) { return <NavBar navBarThemes = {this.props.navBarThemes } myId = {this.props.myId }/>
//         } else {                return null  /*<withAuthRedirect/>*/ }                           } // сделать переход на страницу логина
// }
//
// function NavBar(props) {
//     console.log(props)
//     return <>
//         <div style={props.navBarThemes.blockMenu} className={stl.blockMenu}>
//             <ul className={stl.menu}>
//                 <li><NavLink to = {`/profile/${props.myId}`}  style={props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Profile  </NavLink> </li>
//                 <li><NavLink to ='/friends'                   style={props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Friends  </NavLink> </li>
//                 <li><NavLink to ='/dialogs'                   style={props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Dialogs  </NavLink> </li>
//                 <li><NavLink to ='/news'                      style={props.navBarThemes.menuA} activeClassName={stl.activeLink}>  News     </NavLink> </li>
//                 <li><NavLink to ='/music'                     style={props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Music    </NavLink> </li>
//                 <li><NavLink to ='/users'                     style={props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Users    </NavLink> </li>
//                 <li><NavLink to ='/settings'                  style={props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Settings </NavLink> </li>
//             </ul>
//         </div>
//     </>
//
//
// }