/**
 * project new-wiz-bat
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {ModalBody, ModalHeader, ModalFooter, DefaultOpenButton} from './modal-window-components';

import './modal-window.scss';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            className: "modal-window" + (props.className && props.className),
        };
        if (!(props.openButton || props.openButtonLabel)) {
            throw new Error("Invalid props passed to 'modal-window'. One the ['openButton', 'openButtonLabel'] is required")
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(e) {
        console.log(e.target);
        this.setState(({isOpen}) => ({isOpen: !isOpen}))
    }

    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.closeOnClick && e.target.classList.contains('modal-window__fade') )
            this.toggle()
    }

    render() {
        const {
            modalBodyContent,
            modalHeaderContent,
            modalFooterContent,
            headerButton = DefaultHeaderButton,
            openButton = DefaultOpenButton,
            openButtonLabel = '',
            modalTitle = '',
            fade,
            defaultHeader,
            defaultFooter,
        } = this.props;

        const {
            isOpen,
            className
        } = this.state;

        const fadeClassName = `modal-window__fade ${fade ? 'fade-on' : 'fade-off'}`;
        const contentWrapperClassName = `modal-window__content-wrapper ${isOpen ? 'is-open' : 'is-hidden'}`;

        return (
            <div className={className}>
                {openButton
                    ? <openButton toggle={this.toggle} />
                    : <DefaultOpenButton toggle={this.toggle} label={openButtonLabel} />
                }
                <div className={fadeClassName} onClick={this.handleClick}>
                    <div className={contentWrapperClassName} hidden={isOpen}>
                        <ModalHeader defaultHeader={defaultHeader} toggle={this.toggle} >
                            {modalHeaderContent ? <modalHeaderContent toggle={this.toggle} /> : null}
                        </ModalHeader>
                        <ModalBody>
                            <modalBodyContent/>
                        </ModalBody>
                        <ModalFooter defaultFooter={defaultFooter} toggle={this.toggle} >
                            {modalFooterContent ? <modalFooterContent toggle={this.toggle} /> : null}
                        </ModalFooter>
                    </div>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    modalHeaderContent: PropTypes.func,
    modalFooterContent: PropTypes.func,
    modalBodyContent: PropTypes.func,
};

export default Modal;
