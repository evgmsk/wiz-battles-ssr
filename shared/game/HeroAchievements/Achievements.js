/**
 * project smartWizBattle
 */
import React from 'react';
import './achievements.scss';

const Achievements = props => {
    const { level, battlesWin, battlesLost, tasksResolved, tasksFailed } = props;
    const dataValue = [level, battlesWin, battlesLost, tasksResolved, tasksFailed.length];
    const dataName = ['Уровень', 'Выиграно битв', 'Проиграно битв', 'Решено задач', 'Провалено задач'];
    return (
            <div className="hero-stats-wrapper">
                <h2>Герой: {props.nickName}</h2>
                <div className="hero-stats-table">
                    {dataName.map((x, i) => {
                        return (
                            <div className="stats-row" key={i}>
                                <div className="stat-name">{x}</div>
                                <div className="stat-value">{dataValue[i]}</div>
                            </div>
                        );
                    })}
                </div>
                <button onClick={props.onClick}>Вернуться в игру</button>
            </div>
        );
};

export default Achievements;
