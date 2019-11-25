import React from 'react';
import {connect} from 'react-redux';

import {Langs} from '../../../common/constants/constants';
import {setLanguage} from '../../../store/actions/userActions';

import '../../../common/lang-menu/lang-menu.scss';
import '../../../../node_modules/flag-icon-css/css/flag-icon.min.css';

export const DuoLanguageSwitcher = props => {
    const { lang, setLanguage, langs } = props;
    const handleClick = (e) => {
        if (lang === langs[0]) {
            setLanguage(langs[1])
        } else {
            setLanguage(langs[0])
        }
        e.target.blur();
    };
    return <a href='#' className="" onClick={handleClick} role='button'>
        <span className={`flag-icon flag-icon-${lang === 'en' ? 'gb' : lang} flag-icon-squared`}></span>
    </a>
};

export default connect(
    state => ({lang : state.user.lang}),
    {setLanguage}
)(props => <DuoLanguageSwitcher langs={Langs} {...props} />);

export const LanguageSwitcher = props => {
    //to do
};
