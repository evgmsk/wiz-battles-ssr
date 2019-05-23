import React from 'react';
import {connect} from 'react-redux';

import {Langs} from '../../../common/constants/constants';
import {setLanguage} from '../../../store/actions/userActions';

import '../../../common/lang-menu/lang-menu.scss';

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
    return <button className={`lang-setter lang-${lang}`} onClick={handleClick} />
};

export default connect(
    state => ({lang : state.user.lang}),
    {setLanguage}
)(props => <DuoLanguageSwitcher langs={Langs} {...props} />);

export const LanguageSwitcher = props => {
    //to do
};
