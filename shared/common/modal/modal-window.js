/**
 * project new-wiz-bat
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {ModalBody, ModalHeader, ModalFooter, DefaultOpenButton, DefaultCloseButton} from './modal-window-components';
import ReactTransition from '../transition-wrapper/with-react-transition';

import './modal-window.scss';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            className: "modal-window" + (props.className ? props.className : ''),
        };
        if (!(props.CustomOpenButton || props.openButtonLabel)) {
            throw new Error("Invalid props passed to 'modal-window'. One the ['openButton', 'openButtonLabel'] is required")
        }
        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    toggle(e) {
        this.setState(({isOpen}) => ({isOpen: !isOpen}))
    }

    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        const {closeOnClickOnFade, withoutHeader, withoutFooter} = this.props;
        if ((closeOnClickOnFade || (withoutFooter && withoutHeader)) && e.target.classList.contains('modal-window__fade') )
            this.toggle()
    }

    render() {
        const {
            ModalContent,
            CustomHeader,
            CustomFooter,
            modalTitle = '',
            openButtonLabel = '',
            closeButtonLabel = '',
            CustomCloseButton = DefaultCloseButton,
            CustomOpenButton = DefaultOpenButton,
            fade,
            withoutHeader,
            withoutFooter,
        } = this.props;

        const {
            isOpen,
            className
        } = this.state;
        console.log(this.props, className);
        const containerClassName = `modal-window__container${isOpen ? ' is-open' : ''}`;
        const contentWrapperClassName = `modal-window__content-wrapper${isOpen ? ' is-open' : ''}`;
        const fadeClassName = `modal-window__fade${fade ? ' fade-on' : ''}${isOpen ? ' is-open' : ''}`;
        return (
            <div className={className}>
                {CustomOpenButton
                    ? <CustomOpenButton toggle={this.toggle} />
                    : <DefaultOpenButton toggle={this.toggle} label={openButtonLabel} />
                }
                <div className={containerClassName}>
                    <div className={contentWrapperClassName} hidden={isOpen}>
                        {!withoutHeader
                        &&  <ModalHeader toggle={this.toggle} title={modalTitle} CustomCloseButton={CustomCloseButton} >
                                {CustomHeader ? <CustomHeader toggle={this.toggle} /> : null}
                            </ModalHeader>
                        }
                        <ModalBody>
                            <ModalContent toggle={this.toggle} />
                        </ModalBody>
                        {!withoutFooter
                        &&  <ModalFooter toggle={this.toggle} label={closeButtonLabel} >
                                {CustomFooter ? <CustomFooter toggle={this.toggle} /> : null}
                            </ModalFooter>
                        }
                    </div>
                    <div className={fadeClassName} onClick={this.handleClick} />
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    CustomHeader: PropTypes.func,
    CustomFooter: PropTypes.func,
    ModalContent: PropTypes.any,
    CustomOpenButton: PropTypes.any,
    CustomCloseButton: PropTypes.func,
    withoutHeader: PropTypes.bool,
    withoutFooter: PropTypes.bool,
    openButtonLabel: PropTypes.string,
    modalTitle: PropTypes.string,
    fade: PropTypes.bool
};

export default Modal;
