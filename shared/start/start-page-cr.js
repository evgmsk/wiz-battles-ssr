import React from 'react';

import Header from './header/header';
import ContentRoute from './content-route-cr';

import './index.scss';

const StartPageCR = props => {
    return (
        <div className="start-page-wrapper" >
            <Header />
            <ContentRoute />
        </div>
    )
};

export default StartPageCR;
