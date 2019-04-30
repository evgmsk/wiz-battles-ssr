/**
 * project new-wiz-bat
 */
import React from 'react';
import PropTypes from 'prop-types';

import BtnWT from '../btn-with-tooltip/btn';

import './lang-menu.scss';

export const DuoLanguageSwitch = props => {
    const { lang, setLanguage, langs } = props;
    const other = lang === langs[0] ? langs[1] : langs[0]
    const handleClick = () => {
        setLanguage(other);
    };
    return (
        <BtnWT
            variant="down-left"
            className={`lang-setter lang-${lang}`}
            onClick={handleClick}
            tooltip={
                `Current language is ${lang.toUpperCase()}.\n 
                Click to set ${other.toUpperCase()}.`
            }
        />
    )
};

DuoLanguageSwitch.propTypes = {
    lang: PropTypes.string.isRequired,
    setLanguage: PropTypes.func.isRequired,
    langs: PropTypes.array.isRequired,
}

export const LanguageSwitcher = props => {
    //to do
};
