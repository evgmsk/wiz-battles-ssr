import { connect } from 'react-redux';
import React from 'react';

import {setLanguage} from '../../../store/actions/appActions';
import {DuoLanguageSwitch} from '../../../common/lang-menu/lang-menu';


const DuoLanguageSwitcher = connect(
    state => ({lang : state.app.lang}),
    {setLanguage}
)(DuoLanguageSwitch);

export default DuoLanguageSwitcher;
