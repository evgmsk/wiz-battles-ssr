import React from 'react';
import Header from './start-page/header/header';
import ContentRoute from './start-page/content-route-ssr';

import './startPage.scss';

const StartPageSSR = props => {
    return <div className="start-page-wrapper" >
        <Header />
        <ContentRoute />
    </div>
};

export default StartPageSSR;
