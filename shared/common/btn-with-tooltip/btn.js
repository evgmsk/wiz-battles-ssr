/**
 * project wiz-battles-ssr
 */
import React from 'react';

import './btn.scss';

const variants = {up: 'up', down: 'down', left: 'left', right: 'right'};

export const Tooltip = ({text, className}) => {
    const textArray = text.split('\n');
    return (
        <div className={className}>
            {textArray.map((t, i) => <p key={i}>{t}</p>)}
        </div>
    )
};

const ButtonWithTooltip = props => {
    const { className, tooltip, onClick, children, icon, variant, ...restProps } = props;
    
    return (
        <div className="button-wrapper">
            <button
                className={className || 'btn-with-tooltip'}
                onClick={props.onClick}
                {...restProps}
            >
                {icon || children}
            </button>
            {tooltip 
                && <Tooltip className={`btn-tooltip ${variants[variant]}`} text={tooltip}/>}
        </div>
    )
};

export default ButtonWithTooltip;
