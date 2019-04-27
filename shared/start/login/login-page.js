/**
 * project new-wiz-bat
 */
import React from 'react';

import Page from '../../common/page-content-wrapper/page-content-wrapper';
import FormsContainer from './forms-container/forms-container';

import './login-page.scss';


const LogRegPage = ({className, ...restProps}) =>
    <Page className={className || "login-page"} {...restProps}><FormsContainer/></Page>;

export default LogRegPage;
