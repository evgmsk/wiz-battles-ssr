/**
 * project new-wiz-bat
 */

import React from 'react';
import PropTypes from 'prop-types';

export const DefaultOpenButton = ({label, toggle, className}) => (
    <button className={"open-modal-button" + (className && className)} onClick={toggle}>{label}</button>
);

DefaultOpenButton.propTypes = {
    toggle: PropTypes.func.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    className: PropTypes.string
};

export const DefaultModalHeader = ({title, toggle}) => {
    return (
        <div className="modal-header-default">
            <span className="modal-title">{title}</span>
            <button className="close-modal-button-default" onClick={toggle}>&times;</button>
        </div>
    )
};

DefaultModalHeader.propTypes = {
    toggle: PropTypes.func.isRequired,
    title: PropTypes.any.isRequired,
};

export const DefaultModalFooter = ({toggle, label='close'}) => (
    <div className="modal-footer-default">
        <button className="footer-modal-button-default">{label}</button>
    </div>
);

DefaultModalFooter.propTypes = {
    toggle: PropTypes.func.isRequired,
    label: PropTypes.any.isRequired,
};

export const ModalHeader = props => {
    const {children, defaultHeader, ...restProps} = props;
    return (
        <React.Fragment>
            {defaultHeader
                ?   <DefaultModalHeader {...restProps} />
                :   <div className="modal-header">
                        {children}
                    </div>
            }
        </React.Fragment>
    )
};

export const ModalBody = ({children}) => (
    <div className="modal-body">
        {children}
    </div>
);

export const ModalFooter = props => {
    const {defaultFooter, children, ...restProps} = props;
    return (
        <React.Fragment>
            {defaultFooter
                ?   <DefaultModalFooter {...restProps} />
                :   <div className="modal-footer">
                        {children}
                    </div>
            }
        </React.Fragment>
    )
};
