/**
 * project new-wiz-bat
 */
import React, {useState} from 'react';

import './nav-dropdown-button.scss';

const NavDropDownButton = props => {
    const [open, setOpen] = useState(false);
    let {className, toggle} = props;
    const handleClick = () => {
        setOpen(!open);
        toggle();
    };
    className = className ? className + ' nav-dropdown-button' : 'nav-dropdown-button';
    className = open
        ? `${className} dropdown-open`
        : `${className} dropdown-closed`;
    return (
        <button className={className} onClick={handleClick}>
            <span className="nav-dropdown-button__center-line" />
        </button>
    )
};

export default NavDropDownButton;
