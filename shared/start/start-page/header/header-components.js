/**
 * project new-wiz-bat
 */
import React from 'react';

import NavItem from '../nav-nenu/nav-item';
import Modal from '../../../common/modal/modal-window';
import FormsContainer from '../../login/forms-container/forms-container';
import '../../../common/modal/modal-window';
import {CustomLogin} from '../nav-nenu/nav-menu';

export const LoginModal = props => {
    return <Modal ModalContent={FormsContainer} CustomOpenButton={CustomLogin} {...props} />
};

export const Logo = props => (
    <NavItem to={props.to || '/'} className={props.className || "wb-logo"}>
        {props.children}
    </NavItem>
);
