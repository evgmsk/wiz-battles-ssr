import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import NavMenu, {Login} from '../nav-nenu/nav-menu';
import { checkRefreshToken, logout, setLanguage } from '../../../store/actions/appActions';
import {Langs} from '../../../common/constants/constants';
import {Logo, LoginModal} from './header-components';
import {DuoLanguageSwitcher} from '../lang-menu/lang-menu';

import './header.scss';

const Header = props => {
    const { app: {userName, lang}, logout, setLanguage } = props;

    const navProps = {userName, logout};

    return (
        <header className="header">
            <div className="header__content-wrapper">
                <Logo>WB</Logo>
                <NavMenu {...navProps} />
                <div className="header__right-bar">
                    <DuoLanguageSwitcher lang={lang} setLanguage={setLanguage} langs={Langs} />
                    <LoginModal withoutHeader withoutFooter fade />
                </div>
            </div>
        </header>
    );
};

export default connect(state => ({app : state.app}), {logout, setLanguage})(Header);
// <LoginModal withoutHeader withoutFooter fade />