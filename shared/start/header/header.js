import React, {useEffect} from 'react';

import NavMenu, {Login} from './nav-nenu/nav-menu';
import {Logo} from './header-components';
import DuoLanguageSwitcher from './lang-menu/lang-menu';

import './header.scss';

const Header = props => {
    return (
        <header className="header">
            <div className="header__content-wrapper">
                <Logo>WB</Logo>
                <NavMenu />
                <div className="header__right-bar">
                    <DuoLanguageSwitcher />
                    <Login />
                </div>
            </div>
        </header>
    );
};

export default Header;
// <LoginModal withoutHeader withoutFooter fade />