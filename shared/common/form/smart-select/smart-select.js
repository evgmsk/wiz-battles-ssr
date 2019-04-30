import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../../dropdown';
import './smart-select.scss';

export const SmartOption = props => {
    const {name, label, className, value, children, onClick} = props;
    const ref = React.createRef();
    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        if (ref.current)
            ref.current.blur();
        onClick(e);
    }
    return (
        <button
            name={name}
            ref={ref}
            type="button"
            value={value}
            className={`smart-option${className && ' ' + className || ''}`}
            onClick={handleClick}>
            {label || children}
        </button>
    )
};

export const SmartSelect = props => {
    let {name, values, labels, classNames, onChange} = props;
    classNames = Array.isArray(classNames)
        ? classNames 
        : new Array(values.length).fill("");

    labels =  Array.isArray(labels)
        ? labels 
        : new Array(values.length).fill("");

    const [topOption, setTopOption] = useState({
        name,
        value: values[0],
        label: labels[0],
        className: classNames[0],
    });

    const [open, setOpen] = useState(false);

    const handleClick = (e) => {
        const {name, value} = e.target;
        if (value === topOption.value && !open) {
            setOpen(true);
        } else if (open){
            const index = values.indexOf(value);
            onChange(e);
            setOpen(false);
            setTopOption({
                name,
                value,
                label: labels[index],
                className: classNames[index]
            });
        }
    };
    
    return (
        <div className="smart-select dropdown-wrapper">
            <SmartOption
                className="select-toggle"
                {...topOption}
                onClick={handleClick}
            >
                {topOption.label || topOption.value}
            </SmartOption>
            <div className={`dropdown-menu ${open && ' is-open' || ''}`}>
                {values.filter(v => v !== topOption.value).map((v, i) =>
                    <SmartOption
                        name={name}
                        key={i}
                        className={classNames[i]}
                        value={v}
                        label={labels[i] || v}
                        onClick={handleClick}
                    />)
                }
            </div>
        </div>
    )
};

SmartSelect.propTypes = {
    values: PropTypes.array.isRequired,
    classNames: PropTypes.array,
    labels: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default SmartSelect;
