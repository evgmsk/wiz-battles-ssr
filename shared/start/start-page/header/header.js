import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import NavMenu, {Login} from '../nav-nenu/nav-menu';
import { checkRefreshToken, logout, setLanguage } from '../../../store/actions/appActions';
import {Langs} from '../../../common/constants/constants';
import {DuoLanguageSwitcher, Logo} from './header-components'

import './header.scss';

const Header = props => {
    const { app: {userName, lang}, logout, checkRefreshToken, setLanguage } = props;

    useEffect(() => {
        checkRefreshToken();
    }, []);

    const navProps = {userName, logout};

    return (
        <header className="header">
            <Logo>WB</Logo>
            <NavMenu {...navProps} />
            <div className="right-bar">
                <DuoLanguageSwitcher lang={lang} setLanguage={setLanguage} langs={Langs} />
                <Login {...navProps}><span/></Login>
            </div>
        </header>
    );
};

export default connect(state => ({app : state.app}), {checkRefreshToken, logout, setLanguage})(Header);
