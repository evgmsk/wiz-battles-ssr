/**
 * project wiz-battles-ssr
 */
import React from 'react';

import './btn.scss';

const variants = {up: 'up', down: 'down', left: 'left', right: 'right'};

const ButtonWithTooltip = props => {
    const { className, tooltip, onClick, children, icon, variant, ...restProps } = props;
    // console.log(props, children);
    return (
        <div className="button-wrapper">
            <button className={className || 'btn-with-tooltip'} onClick={props.onClick} {...restProps}>
                {icon || children}
            </button>
            {tooltip && <span className={`btn-tooltip ${variants[variant]}`}>{tooltip}</span>}
        </div>
    )
};

export default ButtonWithTooltip;
