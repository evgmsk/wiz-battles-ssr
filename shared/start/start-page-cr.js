/**
 * project new-wiz-bat
 */
import React from 'react';

import Header from './start-page/header/header';
import ContentRoute from './start-page/content-route-cr';

import './index.scss';

const StartPageCR = props => {
    return <div className="start-page-wrapper" >
        <Header />
        <ContentRoute />
    </div>
};

export default StartPageCR;
