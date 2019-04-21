/**
 * project WizBattle.
 */
import React from 'react';
import {FaGithubSquare as Git} from 'react-icons/fa';
// import HeadImage from '../../../assets/images/title.png';
// import Spinner from '../../common/spinner/spinner'
import './homePage.scss';


function HomePage(props) {
    return (
        <section className="home-section">
            <div className="home-img" />
            <div className="home-wrapper">
                <h2>WizBattles - Учеба как незабываемое приключение</h2>
                <div className="game-description">
                    Разработчик: Евгений Москвич
                    <a href="https://github.com/evgmsk/" rel="noopener noreferrer" target="_blank" ><Git /></a>
                </div>
            </div>
        </section>
    );
}

export default HomePage;
