import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const SmartOption = props => {
    return (
        <div className={props.className}>
            <input type="text" hidden value={props.value} onClick={props.onClick} />
            {props.name}
        </div>
    )
};

const SmartSelect = props => {
    const {values, classNames, names, onChange} = props;
    const [itemToShow, setItemToShow] = useState({value: values[0], name: names[0], className: classNames[0]});
    const [optionsOpen, setOptionsOpen] = useState('options-hidden');

    const onClick = e => {
        const {value} = e.target;
        if (value === itemToShow.value && !optionsOpen) {
            setOptionsOpen('options-shown')
        } else {

            setItemToShow()
        }
    };


    return (
        <form className="smart-select" onChange={onChange}>
            <SmartOption {...itemToShow} onClick={onClick} />
            <div className={`select-modal ${optionsOpen}`}>
                {values.slice(1).map((v, i) =>
                    <SmartOption key={i} className={classNames[i]} value={v} name={names[i] } />)
                })}
            </div>
        </form>
    )
};

SmartSelect.propTypes = {
    values: PropTypes.array.isRequired,
    classNames: PropTypes.array.isRequired,
    names: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};
