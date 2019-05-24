import React, {useState} from 'react';
import {connect} from 'react-redux';

// import Game from './game';

import GameSignin from './game-signin';
import HeroesMenu from './heroes-menu/heroes-menu';

import './game-page.scss';

const GameOptions = ({oldHero, imageName, close}) => {
    return (
        oldHero && imageName 
        ? <div>Game {imageName}</div> 
        : <HeroesMenu close={close} />
    )
}
const GamePage = props => {
    const [oldHero, setOldHero] = useState(null)
    const {userName, imageName = 'Katya'} = props;
    return (
        <div className="game-page-wrapper">
            {userName && <GameOptions
                            oldHero={oldHero}
                            imageName={imageName}
                            close={() => setOldHero(true)}
                        />
            }
            {!userName && <GameSignin />}
        </div>
    );
};

export default connect(state => ({userName: state.user.userName}))(GamePage);
