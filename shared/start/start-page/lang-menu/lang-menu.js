/**
 * project new-wiz-bat
 */

import React from 'react';

import './lang-menu.scss';

export const DuoLanguageSwitcher = props => {
    const { lang, setLanguage, langs } = props;
    const handleClick = (e) => {
        if (lang === langs[0]) {
            setLanguage(langs[1])
        } else {
            setLanguage(langs[0])
        }
    };
    return <button className={`lang-setter lang-${lang}`} onClick={handleClick} />
};

export const LanguageSwitcher = props => {
    //to do
};
