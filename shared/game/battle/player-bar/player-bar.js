/**
 * project WizBattle
 */
import React from 'react';
import HealBar from './health-bar';
import ExperienceBar from './experience-bar';
import './player-bar.scss';

const BattlePanel = props => {
    // console.log(props);
    const onAnimation = props.onTransitionEnd;
    const barName = props.className.split('-')[0];
    return (
        <div className={props.className} onTransitionEnd={(e) => onAnimation(e, barName)}>
            <div className="bar-image">{props.image}</div>
            <div className="bar-name">{props.name}</div>
            <div className="bar-indicators">
                <HealBar health={props.health} />
                <ExperienceBar experience={props.experience} />
            </div>
            <div className="bar-level"><p> Уровень </p><p>{props.level}</p></div>
        </div>
    );
};

export default BattlePanel;
