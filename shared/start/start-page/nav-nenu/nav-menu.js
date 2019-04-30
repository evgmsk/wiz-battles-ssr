import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    FaHome,
    FaInfo,
    FaSignInAlt,
    FaSignOutAlt,
    FaPaintBrush,
    FaGamepad
} from 'react-icons/fa';
// import PropTypes from 'prop-types';

import {logout} from '../../../store/actions/appActions';
import BtnWT from '../../../common/btn-with-tooltip/btn';
import { MainRoutes } from '../../../common/constants/constants';
import NavItem, {SpecialLink} from './nav-item';
import T from '../../../translator';
import NavDropDownButton from '../nav-dropdown-button/nav-dropdown-button';

import './nav-menu.scss';

const Icons = {
    home: FaHome,
    about: FaInfo,
    drawbox: FaPaintBrush,
    login: FaSignInAlt,
    game: FaGamepad,
    logout: FaSignOutAlt 
};

const Game = props => {
    const {app: {userName, token}} = props;
    if (!userName)
        return null;
    let href = props.href || MainRoutes.game.path;
    href = !token ? href : `${href}}?token=${token}`;
    return (
        <SpecialLink href={href}>
            <T keys={'nav_menu.game'} />
        <FaGamepad className="nav-icon" />
    </SpecialLink>
    )
};

Game.propTypes = {
    app: PropTypes.object.isRequired,
}

export const GameConnected = connect(state => ({app: state.app}),{})(Game);

export const CustomLogin = connect(state => ({userName: state.app.userName}),{logout})(
    ({className = 'nav-menu-item', userName, logout, toggle}) => {
        console.log(userName)
        return (
            <BtnWT
                variant="down-left"
                className={`${className} external-item`}
                onClick={userName ? logout : toggle}
                tooltip={
                    userName 
                    ?   `Click to logout`
                    :   `Click to signin or signup.`
                }
            >
                {userName 
                    ? <FaSignOutAlt className="nav-icon"/> 
                    : <FaSignInAlt className="nav-icon"/>
                }
            </BtnWT>
        )
    }
);

export const CustomLoginConnected = connect(
    state => ({userName: state.app.userName}),
    {logout}
)(CustomLogin)

export const Login = props => {
    const {
        path = MainRoutes.login.path,
        icon = Icons.login,
        className = 'nav-menu-item',
        userName,
        logout,
        children
    } = props;
    return (
        <React.Fragment>
            {userName
                ?   <div className={`${className} external-item`} onClick={logout} >
                        <FaSignOutAlt className="nav-icon"/>
                    </div>
                :   <NavItem
                        to={path}
                        className={`${className} external-item`}
                        icon={Icons.login}
                    >
                        {children || <T keys={'nav_menu.login'} />}
                    </NavItem>
            }
        </React.Fragment>
    )
};

const MainNavRoutes = props => {
    const {routes, className} = props;
    return (
        Object.keys(routes).map((x, i) => {
            return (
                <NavItem
                    key={i}
                    to={routes[x].path}
                    className={className}
                    icon={Icons[x]}
                >
                    <T keys={['nav_menu', x]} />
                </NavItem>
            );
        })
    )
};

class MainNavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.setState(({isOpen}) => !isOpen);
    }
    render() {
        const {routes = MainRoutes} = this.props;
        const {isOpen} = this.state;
        const { game, login, ...restRouts } = routes;
        const className = isOpen ? 'nav-menu' : 'nav-menu nav-hidden';
        return (
            <div className="nav-wrapper">
                <NavDropDownButton onClick={this.onClick} />
                <nav className={className}>
                    <MainNavRoutes routes={restRouts} />
                    <GameConnected />
                </nav>
            </div>
        )
    }
}

export default MainNavMenu;
