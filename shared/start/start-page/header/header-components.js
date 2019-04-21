/**
 * project new-wiz-bat
 */
import React from 'react';

import NavItem from '../nav-nenu/nav-item';
import Modal from '../../../common/modal/modal-window';

export const Login = props => {
    const {onClick, label, className} = props;
    return ;
};

export const DuoLanguageSwitcher = props => {
    const { lang, setLanguage, langs } = props;
    const handleClick = (e) => {
        if (lang === langs[0]) {
            setLanguage(langs[1])
        } else {
            setLanguage(langs[0])
        }
    };
    return <div className={`lang-setter lang-${lang}`} onClick={handleClick} />
};

export const Logo = props => (
    <NavItem to={props.to || '/'} className={props.className || "wb-logo"}>
        {props.children}
    </NavItem>
);
