import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export const SmartOption = props => {
    const {label, className, value, children, onClick} = props;
    const ref = React.createRef();
    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        if (ref.current)
            ref.current.blur();
        onClick(value);
    }
    return (
        <button
            ref={ref}
            type="button"
            className={`smart-option${className && ' ' + className || ''}`}
            onClick={handleClick}>
            {label || children}
        </button>
    )
};

export const SmartSelect = props => {
    const {values, classNames, labels, onChange} = props;
    const [itemToShow, setItemToShow] = useState({
        value: values[0],
        label: labels[0],
        className: classNames[0],
    });
    const [optionsOpened, setOptionsOpened] = useState(false);

    const onClick = (value) => {
        if (value === itemToShow.value && !optionsOpened) {
            setOptionsOpened(true);
        } else if (optionsOpened){
            const index = values.indexOf(value);
            setItemToShow({
                value,
                label: labels[index],
                className: classNames[index]
            });
        }
    };
    return (
        <div className="smart-select-wrapper" onChange={onChange}>
            <SmartOption {...itemToShow} onClick={onClick} />
            <div className={`select-modal ${optionsOpened}`}>
                {values.slice(1).map((v, i) =>
                    <SmartOption key={i} className={classNames[i]} value={v} label={names[i] } />)
                })}
            </div>
        </div>
    )
};

SmartSelect.propTypes = {
    values: PropTypes.array.isRequired,
    classNames: PropTypes.array,
    labels: PropTypes.array,
    onChange: PropTypes.func.isRequired,
};
