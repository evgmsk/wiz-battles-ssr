/**
 * project wiz-battles-ssr
 */
import React from 'react';

import './btn.scss';
import { MdRemoveFromQueue } from 'react-icons/md';

const variants = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
    'up-left': "up-left",
    'up-right': "up-right",
    'down-left': "down-left",
    'down-right': "down-right"
};

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
    const ref = React.createRef();
    const handleClick = e => {
        e.stopPropagation();
        e.preventDefault();
        if (ref.current)
            ref.current.blur();
        props.onClick({target: e.target})
    }
    return (
        <div className="btn-with-tooltip-wrapper">
            <button
                ref={ref}
                type="button"
                className={className || 'btn-with-tooltip'}
                onClick={handleClick}
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
