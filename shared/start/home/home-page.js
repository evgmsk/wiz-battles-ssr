/**
 * project WizBattle.
 */
import React from 'react';
import {FaGithubSquare as Git} from 'react-icons/fa';
import T from '../../translator';

import './home-page.scss';


function HomePage(props) {
    return (
        <section className="home-section">
            <div className="home-img" />
            <div className="home-wrapper">
                <h2 className="page-title">WizBattles - <T keys="home_page.title" /></h2>
                <div className="game-description">
                    <span><T keys="home_page.developer"/></span>
                    <a href="https://github.com/evgmsk/" rel="noopener noreferrer" target="_blank" ><Git /></a>
                </div>
            </div>
        </section>
    );
}

export default HomePage;
