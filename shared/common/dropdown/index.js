import React, {useState} from 'react';
import {FaCaretDown, FaCaretSquareRight, FaCaretSquareDown, FaCaretRight} from 'react-icons/fa';

const Dropdown = props => {
    const [open, setOpen] = useState(false);
    const {caret, headerTitle, Header, DropdownContent, onClick} = props;
    const Caret = open ? FaCaretDown : FaCaretRight;
    const handleClick = ({target}) => {
        setOpen(!open);
        if (onClick)
            onClick({...target});
    }
    return (
        <div className="dropdown-wrapper">
            {Header 
                ?   <Header onClick={handleClick} />
                :   <button
                        type="button"
                        className="dropdown-toggle"
                        toggle={setOpen(!open)}
                    >
                        {headerTitle}
                        {caret && <Caret className="dropdown-caret" />}
                    </button>
            }
            <div
                className={`dropdown-menu${open && ' is-open' || ''}`}
                hidden={!open}
            >
                <DropdownContent onClick={onClick} />
            </div>
        </div>
    )
}

export default Dropdown;
