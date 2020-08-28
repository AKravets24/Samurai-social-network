import React               from "react";
import stl                 from './navBar.module.css';
import {NavLink}           from 'react-router-dom';
import {connect}           from 'react-redux';
import {withAuthRedirect}  from "../content/HOC/withAuthRedirect";

class navBarContainer extends React.Component {
    constructor(props) {
        super(props);  /*console.log(props)*/
    }

    render() {
        return <NavBar navBarThemes={this.props.navBarThemes} myId={this.props.myId}/>
    }
}

function NavBar(props) {
    // console.log(props)
    return <>
        <div style={props.navBarThemes.blockMenu} className={stl.blockMenu}>
            <ul className={stl.menu}>
                {!props.myId && <li><NavLink to={`/login`} style={props.navBarThemes.menuA}>Get Login</NavLink></li>}
                { props.myId && <li><NavLink to={`/profile/${props.myId}`} style={props.navBarThemes.menuA}
                                            activeClassName={stl.activeLink}> Profile </NavLink></li>}
                { props.myId && <li><NavLink to={'/friends'} style={props.navBarThemes.menuA}
                                            activeClassName={stl.activeLink}> Friends </NavLink></li>}
                { props.myId && <li><NavLink to={'/dialogs'} style={props.navBarThemes.menuA}
                                            activeClassName={stl.activeLink}> Dialogs </NavLink></li>}
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
        myId: state.appAuthReducer.id,
        // myId: null,
        navBarThemes: state.backGroundSetter.themes.navBar,
    }
};

const navBarConnector = connect(mapStateToProps)(navBarContainer)

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