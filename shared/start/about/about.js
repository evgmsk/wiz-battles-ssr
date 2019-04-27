import React from 'react';
/*
import FirstScreen from '../../../assets/images/screenshots/scr1.jpg';
import SecondScreen from '../../../assets/images/screenshots/scr2.jpg';
import ThirdScreen from '../../../assets/images/screenshots/scr3.jpg';
import ForthScreen from '../../../assets/images/screenshots/scr4.jpg';
*/
// import {DynamicImportNear} from '../../common/dynamic-component';

import Screenshot from './screensot';
import {captions} from '../../common/constants/constants';
import Page from '../../common/page-content-wrapper/page-content-wrapper'

import './about.scss';

function About() {
    return (
    <Page>
        <section className="about">
            <h2>Cкриншоты игры</h2>
            <div className="screenshots-wrapper">
                {captions.map((cap, i) => {
                    return <Screenshot key={i} order={i + 1} caption={cap} />
                })}
            </div>
        </section>
    </Page>
    );
}

// export default About;


export default About;
