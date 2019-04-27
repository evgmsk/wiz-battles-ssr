/**
 * project new-wiz-bat
 */
import React from 'react';
import { connect } from 'react-redux';
import translate from './common/react-redux-translate';

let T = translate('en', 'lang', 'assets/i18n/');

T = connect( state => ({lang: state.app.lang}))(T);

export const funcT = ({keys, insertions = []}) => <T keys={keys} insertions={insertions} />;

export default T;
