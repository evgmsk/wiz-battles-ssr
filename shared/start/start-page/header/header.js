import React, {useEffect} from 'react';

import NavMenu, {Login} from '../nav-nenu/nav-menu';
// import { logout, setLanguage } from '../../../store/actions/appActions';
import {Langs} from '../../../common/constants/constants';
import {Logo, LoginModal} from './header-components';
import DuoLanguageSwitcher from './lang-menu';

import './header.scss';

const Header = props => {
    return (
        <header className="header">
            <div className="header__content-wrapper">
                <Logo>WB</Logo>
                <NavMenu />
                <div className="header__right-bar">
                    <DuoLanguageSwitcher langs={Langs} />
                    <LoginModal withoutHeader withoutFooter fade />
                </div>
            </div>
        </header>
    );
};

export default Header;
// <LoginModal withoutHeader withoutFooter fade />