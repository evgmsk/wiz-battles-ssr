/**
 * project WizBattle
 */
import React from 'react';
import {FaHeart as Heart} from 'react-icons/fa';

const HealthBar = props => {
    // console.log(props);
    const healthClass = `health-bar health-${props.health}`;
    return (
        <div className="health-box">
            <span className="health-value"><Heart /></span>
            <div className="health-progress" >
                <div className={healthClass} value={props.health} />
            </div>
        </div>
    );
};

export default HealthBar;
