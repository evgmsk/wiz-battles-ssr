import React from 'react';
import { connect } from 'react-redux';
import translate from './common/react-redux-translate';
// import Trans from 'react-redux-translate';


let T = translate('en', 'lang', 'shared/assets/i18n/');
// let RRT = Trans('en', 'lang', 'shared/assets/i18n/');
export default T = connect(state => ({lang: state.user.lang}))(T);

export const funcT = ({keys, insertions = []}) => <T keys={keys} insertions={insertions} />;
