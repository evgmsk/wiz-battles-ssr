/**
 * project wiz-battles-ssr
 */
import React from 'react';

import './control-input-wrapper.scss';

const InputWrapper = props => {
    const {label, id, indicator, value, ...restProps} = props;
    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                value={value}
                {...restProps}
            />
            {indicator !== undefined && <span className="indicator-value">{value}</span>}
        </div>
    )
};

export default InputWrapper
