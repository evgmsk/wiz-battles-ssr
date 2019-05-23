import React, {useState} from 'react';
import {connect} from 'react-redux';

// import Game from './game';
import Modal from '../common/modal/modal-window';
import {FormsWrapper} from '../start/login/forms-container/forms-container';
import LanguageSwitch from '../start/header/lang-menu/lang-menu';

import './game-page.scss';

//
const GamePage = props => {
    const {userName} = props;
    return (
        <div className="game-page-wrapper">
            {userName 
                ?   <div> Game </div> 
                :   <div className="game-login-modal">
                        <LanguageSwitch />
                        <Modal
                            ModalContent={FormsWrapper}
                            withoutOpenButton
                            withoutHeader
                            withoutFooter
                            fade
                        />
                    </div>
            }
        </div>
    );
};

export default connect(state => ({userName: state.user.userName}))(GamePage);
