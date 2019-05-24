import React from 'react';
import {connect} from 'react-redux';

import {
    saveRefreshToken,
    updateUserWithSaga,
    resetPassword
} from '../store/actions/userActions';
import Modal from '../common/modal/modal-window';
import {FormsWrapper} from '../start/login/forms-container/forms-container';
import LanguageSwitch from '../start/header/lang-menu/lang-menu';

const LogForm = connect(state => ({user: state.user}),
    {updateUserWithSaga, saveRefreshToken, resetPassword})(FormsWrapper);

const GameSignin = props => {

    return (
        <div className="game-login-modal">
            <LanguageSwitch />
            <Modal
                ModalContent={LogForm}
                withoutOpenButton
                withoutHeader
                withoutFooter
                fade
            />
        </div>
    )
}

export default GameSignin;
