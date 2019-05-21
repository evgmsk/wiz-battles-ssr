import React from 'react';
import PropTypes from 'prop-types';

export const DefaultCloseButton = props => {
    const {toggle, external} = props;
    className = `close-modal-button-default${external ? '-external' : ''}`;
    return (
        <button className={className} onClick={toggle}>
            &times;
        </button>
        );
};

export const DefaultOpenButton = ({label, toggle, className}) => (
    <button className={"open-modal-button" + (className && className)} onClick={toggle}>{label}</button>
);

DefaultOpenButton.propTypes = {
    toggle: PropTypes.func.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    className: PropTypes.string
};

export const DefaultModalHeader = ({title, toggle, external, CustomCloseButton}) => {
    return (
        <div className="modal-header-default">
            <span className="modal-title">{title}</span>
            {CustomCloseButton
                ? <CustomCloseButton onClick={toggle} />
                : <DefaultCloseButton toggle={toggle} external={external} />
            }
        </div>
    )
};

DefaultModalHeader.propTypes = {
    toggle: PropTypes.func.isRequired,
    title: PropTypes.any.isRequired,
    external: PropTypes.bool,
    customHeaderButton: PropTypes.func,
};

export const DefaultModalFooter = ({toggle, label='close'}) => (
    <div className="modal-footer-default">
        <button className="footer-modal-button-default" onClick={toggle}>{label}</button>
    </div>
);

DefaultModalFooter.propTypes = {
    toggle: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export const ModalHeader = ({children, ...props}) => {
    return (
        <React.Fragment>
            {children
                ?   <div className="modal-footer-custom">
                        {children}
                    </div>
                :   <DefaultModalHeader {...props} />
            }
        </React.Fragment>
    )
};

export const ModalBody = ({children}) => (
    <div className="modal-body">
        {children}
    </div>
);

export const ModalFooter = ({children, ...props}) => {
    return (
        <React.Fragment>
            {children
                ?   <div className="modal-footer-custom">
                        {children}
                    </div>
                :   <DefaultModalFooter {...props} />
            }
        </React.Fragment>
    )
};
