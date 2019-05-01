import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {FaCaretDown, FaCaretRight} from 'react-icons/fa';

import './smart-select.scss';

export const SmartOption = props => {
    const {name, label, className, value, children, onClick} = props;
    return (
        <button
            name={name}
            type="button"
            value={value}
            className={className}
            onClick={onClick}>
            {label || children}
        </button>
    )
};

export const SmartSelect = props => {
    let {caret, value, toggleLabel, name, values, labels, classNames, onChange} = props;
    // console.log(props);
    classNames = Array.isArray(classNames)
        ? classNames 
        : new Array(values.length).fill("").map((c, i) => (`smart-select__option sm-op${i}`));

    labels =  Array.isArray(labels)
        ? labels 
        : new Array(values.length).fill("");

    const [displayed, setDisplayed] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClick = (e) => {
        const {name, value} = e.target;
        if (name !== props.name) {
            setOpen(false);
            return setDisplayed(false);
        }
        if (value === 'toggle') {
            if (open) {
                setOpen(false);
                setDisplayed(false);
            } else {
                setDisplayed(true);
                setOpen(true);
            }
            return
        }
        setOpen(false);
        setDisplayed(false);
        onChange(e);
    };

    const dropClass = `smart-select__dropdown-options ${open ? ' is-open' : ''}${!displayed ? ' display-none' : ''}`;


    return (
        <div className="smart-select">
            <SmartOption
                name={name}
                value={'toggle'}
                className="smart-select__toggle"
                onClick={handleClick}
            >
                {toggleLabel}
                {caret && open && <FaCaretRight/>}
                {caret && !open && <FaCaretDown/>}
            </SmartOption>
            <div className={dropClass}>
                {values.map((v, i) =>
                    <SmartOption
                        name={name}
                        key={i}
                        className={`${classNames[i]}${value === v ? ' selected' : ''}`}
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
