import React, {useState} from 'react';
import {connect} from 'react-redux';

// import Game from './game';
import Modal from '../common/modal/modal-window';
import {FormsWrapper} from '../start/login/forms-container/forms-container';
// import {funcT} from '../translator';

const FormsContainer = connect(state => ({lang: state.user.lang},{}))(FormsWrapper)


const GamePage = props => {
    const {userName} = props;
    console.log(props);
    return (
        <div className="game-page-wrapper">
            {userName 
                ?   <div> Game </div> 
                :   <Modal
                        ModalContent={FormsContainer}
                        withoutOpenButton
                        withoutHeader
                        withoutFooter
                        fade
                    />
            }
        </div>
    );
};

export default connect(state => ({userName: state.user.userName}))(GamePage);
