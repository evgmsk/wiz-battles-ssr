import {FaHome, FaInfo, FaSignInAlt, FaSignOutAlt, FaPaintBrush, FaGamepad} from 'react-icons/fa';
import React, {useState} from 'react';
// import PropTypes from 'prop-types';

import { MainRoutes } from '../../../common/constants/constants';
import NavItem, {SpecialLink} from './nav-item';
import T from '../../../assets/i18n/translator';
import NavDropDownButton from '../nav-dropdown-button/nav-dropdown-button';

import './nav-menu.scss';

const Icons = { home: FaHome, about: FaInfo, drawbox: FaPaintBrush, login: FaSignInAlt, game: FaGamepad, logout: FaSignOutAlt };

const Game = props => (
    <SpecialLink href={props.href || MainRoutes.game.path}>
        <T keys={'nav_menu.game'} />
        <FaGamepad className="nav-icon" />
    </SpecialLink>
);

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

class MainMenu extends React.Component {
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
        const {userName, dropdownButton, routes} = this.props;
        const {isOpen} = this.state;
        const { game, login, ...restRouts } = MainRoutes;

        const className = isOpen ? 'nav-menu' : 'nav-menu';
        return (
            <div className="nav-wrapper">
                <NavDropDownButton onClick={this.onClick} />
                <nav className={className}>
                    <MainNavRoutes routes={restRouts} />
                    {userName && <Game /> }
                </nav>
            </div>
        )
    }
}

export default MainMenu;
