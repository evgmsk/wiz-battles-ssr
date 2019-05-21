/**
 * project new-wiz-bat
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {ModalBody, ModalHeader, ModalFooter, DefaultOpenButton, DefaultCloseButton} from './modal-window-components';

import './modal-window.scss';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: !!props.withoutOpenButton,
            className: "modal-window" + (props.className ? props.className : ''),
        };
        if (!(props.CustomOpenButton || props.openButtonLabel) && !props.withoutOpenButton) {
            throw new Error("Invalid props passed to 'modal-window'. WithoutOpenButton was not set so one the ['openButton', 'openButtonLabel'] is required")
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
        const {closeOnClickOnFade, withoutHeader, withoutFooter, withoutOpenButton} = this.props;
        if ((closeOnClickOnFade || (withoutFooter && withoutHeader && !withoutOpenButton)) 
            && e.target.classList.contains('modal-window__fade') )
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
            withoutOpenButton,
        } = this.props;
        console.log(this.props)
        const {
            isOpen,
            className
        } = this.state;
        const containerClassName = `modal-window__container${isOpen ? ' is-open' : ''}`;
        const contentWrapperClassName = `modal-window__content-wrapper${isOpen ? ' is-open' : ''}`;
        const fadeClassName = `modal-window__fade${fade ? ' fade-on' : ''}${isOpen ? ' is-open' : ''}`;
        return (
            <div className={className}>
                {!withoutOpenButton 
                    && (CustomOpenButton
                        ? <CustomOpenButton toggle={this.toggle} />
                        : <DefaultOpenButton toggle={this.toggle} label={openButtonLabel} />)
                }
                <div className={containerClassName}>
                    <div className={contentWrapperClassName}>
                        {!withoutHeader
                        &&  <ModalHeader toggle={this.toggle} title={modalTitle} CustomCloseButton={CustomCloseButton} >
                                {CustomHeader ? <CustomHeader toggle={this.toggle} /> : null}
                            </ModalHeader>
                        }
                        <ModalBody>
                            {isOpen && <ModalContent toggle={this.toggle} />}
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
    fade: PropTypes.bool,
    withoutOpenButton: PropTypes.bool,
};

export default Modal;
