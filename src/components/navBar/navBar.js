import React from "react";
import stl from './navBar.module.css';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

class navBar extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.navBarThemes.blockMenu)
    }
    render() {
        return <>
            <div
                style={this.props.navBarThemes.blockMenu}
                className={stl.blockMenu}
            >
                <ul className={stl.menu}>
                    <li><NavLink to ='/profile'
                                 style={this.props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Profile   </NavLink> </li>
                    <li><NavLink to ='/dialogs'
                                 style={this.props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Dialogs   </NavLink> </li>
                    <li><NavLink to ='/news'
                                 style={this.props.navBarThemes.menuA} activeClassName={stl.activeLink}>  News      </NavLink> </li>
                    <li><NavLink to ='/music'
                                 style={this.props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Music     </NavLink> </li>
                    <li><NavLink to ='/users'
                                 style={this.props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Users     </NavLink> </li>
                    <li><NavLink to ='/settings'
                                 style={this.props.navBarThemes.menuA} activeClassName={stl.activeLink}>  Settings  </NavLink> </li>
                </ul>
            </div>
        </>
    }
}


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        navBarThemes: state.backGroundSetter.themes.navBar,
    }
};

const navBarConnector = connect(mapStateToProps)(navBar)

export default navBarConnector;