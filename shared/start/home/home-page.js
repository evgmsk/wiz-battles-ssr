/**
 * project WizBattle.
 */
import React from 'react';
import {FaGithubSquare as Git} from 'react-icons/fa';
import T, {funcT} from '../../translator';

import './home-page.scss';

const ss = props => <span>{props}</span>

function HomePage(props) {
    console.log(window.env)
    return (
        <section className="home-section page">
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
