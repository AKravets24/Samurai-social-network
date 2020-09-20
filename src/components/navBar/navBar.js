import React,{useEffect, useState} from "react";
import stl                        from './navBar.module.css';
import {NavLink}                  from 'react-router-dom';
import {connect}                  from 'react-redux';

import {withAuthRedirect}         from "../content/HOC/withAuthRedirect";
import {dialogsReducer} from "../../redux/dialogsReducer";

function NavBarContainer(props) {
    // console.log(props)
    useEffect(()=>{props.getNewMessagesRequestThunk(); },[])

    return <NavBar
        navBarThemes    = { props.state.navBarThemes} myId={props.state.myId}
        colorTheme      = { props.state.colorTheme}
        getNewMessages  = { props.getNewMessagesRequestThunk}
        btnIsDisabled   = { props.state.btnNewMessagesState}
        newMSGSCounter  = { props.state.newMSGSCounter}
        msgLoader       = { props.state.msgLoader}
    />
}
function NavBar(props) {
    console.log(props)

    let [dynamicActiveClass, setDynamicActiveClass] = useState('');
    let [dynamicClass, setDynamicClass]             = useState('');

    useEffect(()=> {
        if     (props.colorTheme==='NIGHT'  ){setDynamicActiveClass(stl.activeLinkNight);setDynamicClass(stl.linkNight)}
        else if(props.colorTheme==='MORNING'){setDynamicActiveClass(stl.activeLinkMorning);setDynamicClass(stl.linkMorning)}
        else if(props.colorTheme==='DAY'    ){setDynamicActiveClass(stl.activeLinkDay);setDynamicClass(stl.linkDay)}
        else if(props.colorTheme==='EVENING'){setDynamicActiveClass(stl.activeLinkEvening);setDynamicClass(stl.linkEvening)}
    },[props.colorTheme])

    return <>
        <div
            style={props.navBarThemes.blockMenu}
            className={stl.blockMenu}>
            <ul className={stl.menu}>
                {!props.myId && <li><NavLink to={`/login`} className={dynamicClass} activeClassName={dynamicActiveClass}
                >Get Login</NavLink></li>}
                { props.myId && <li><NavLink to={`/profile/${props.myId}`} className={dynamicClass} activeClassName={dynamicActiveClass}
                > Profile </NavLink></li>}
                { props.myId && <li><NavLink to={'/friends'} className={dynamicClass} activeClassName={dynamicActiveClass}
                > Friends </NavLink></li>}

                { props.myId && <li className={stl.dialogsSpan}>
                    <button disabled={props.btnIsDisabled} onClick={props.getNewMessages}>
                        { props.btnIsDisabled ?
                            <img src={props.msgLoader} alt="err"/>
                            : <span
                                className={dynamicClass}
                                activeClassName={dynamicActiveClass}>
                            '+1?'</span>}
                         </button>
                    <NavLink to={'/dialogs'}
                             className={dynamicClass}
                             activeClassName={dynamicActiveClass}>
                        Dialogs </NavLink>
                    <p hidden={!props.newMSGSCounter}>({props.newMSGSCounter})</p>
                </li>}
                { props.myId && <li><NavLink to={'/users'}
                                             className={dynamicClass}
                                             activeClassName={dynamicActiveClass}> Users </NavLink></li>}
                <li><NavLink to='/news'
                             className={dynamicClass}
                             activeClassName={dynamicActiveClass}> News </NavLink></li>
                <li><NavLink to='/music'
                             className={dynamicClass}
                             activeClassName={dynamicActiveClass}> Music </NavLink></li>
                <li><NavLink to='/settings'
                             className={dynamicClass}
                             activeClassName={dynamicActiveClass}> Settings </NavLink></li>
            </ul>
        </div>
    </>
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        myId:                 state.appAuthReducer.id,
        colorTheme:           state.backgroundReducer.theme,
        navBarThemes:         state.backgroundReducer.themesPack.navBar,
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

const navBarConnector = connect(mapStateToProps, null, mergeProps)(NavBarContainer)

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