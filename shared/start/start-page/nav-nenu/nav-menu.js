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

import {logout} from '../../../store/actions/userActions';
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
    const {user: {userName, token}, icon, ...restProps} = props;
    if (!userName)
        return null;
    let href = props.href || MainRoutes.game.path;
    href = !token ? href : `${href}}?token=${token}`;
    return (
        <SpecialLink href={href} {...restProps}>
            <T keys={'nav_menu.game'} />
            {icon && <FaGamepad className="nav-icon" />}
        </SpecialLink>
    )
};

Game.propTypes = {
    user: PropTypes.object.isRequired,
}

export const GameConnected = connect(state => ({user: state.user}))(Game);

export const CustomLogin = connect(state => ({userName: state.user.userName}),{logout})(
    ({className = 'nav-menu-item', userName, logout, toggle}) => {
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

export const Login = connect(state => ({userName: state.user.userName}), {logout})(props => {
    const {
        path = MainRoutes.login.path,
        className = 'nav-menu-item',
        userName,
        logout,
        children
    } = props;
    return (
        <React.Fragment>
            {userName
                ?   <BtnWT
                        variant="down-left"
                        className={`${className} external-item`}
                        onClick={logout}
                        tooltip={`Click to logout`} 
                    >
                        <FaSignOutAlt className="nav-icon"/>
                    </BtnWT>
                :   <BtnWT
                        variant="down-left"
                        className={`${className} external-item`}
                        onClick={f => f}
                        tooltip={`Click to signin or signup.`} 
                    >
                        <NavItem
                            to={path}
                            className={`${className} external-item`}
                        >
                            <FaSignInAlt className="nav-icon"/>
                        </NavItem>
                    </BtnWT>
                    
            }
        </React.Fragment>
    )
});

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
            isOpen: false,
            isShown: false,
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.setState(({isOpen}) => ({isOpen: !isOpen}));
        this.timeout = setTimeout(() => 
        this.setState(({isShown}) => ({isShown: !isShown})), 0);
    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    
    render() {
        const {routes = MainRoutes, className} = this.props;
        const {isOpen, isShown} = this.state;
        const { game, login, ...restRouts } = routes;
        const dropdownClassName = isShown ? "dropdown-wrapper is-open" : "dropdown-wrapper";
        return (
            <div className="nav-wrapper">
                <NavDropDownButton toggle={this.onClick} />
                {isOpen
                    &&  <div className={dropdownClassName}>
                            <MainNavRoutes className={"dropdown-nav-item"} routes={restRouts} />
                            <GameConnected className={"dropdown-nav-item"} />
                        </div>
                }
                <nav className={className || "nav-menu"}>
                    <MainNavRoutes routes={restRouts} />
                    <GameConnected />
                </nav>
            </div>
        )
    }
}

export default MainNavMenu;
