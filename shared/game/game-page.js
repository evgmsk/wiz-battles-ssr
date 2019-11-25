import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Game from './game';
//import M from './forest.mp3'
import GameSignin from './game-signin';
import HeroesMenu from './heroes-menu/heroes-menu';
import Spinner from '../common/spinner/spinner';

import './game-page.scss';


const GameOptions = ({oldHero, imageName, close}) => {
   
    return (
        <React.Fragment>
            {
                 oldHero && imageName 
                    ? <Game/> 
                    : <HeroesMenu close={close} />
            }
        </React.Fragment>
       
    )
}
const GamePage = props => {
    const [oldHero, setOldHero] = useState(null)
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => setSpinner(false), 200)
    }, []);

    const {userName, imageName = 'Katya'} = props;
    return (
        <div className="game-page-wrapper">
            {spinner && <Spinner />}
            {!spinner 
                && userName 
                && <GameOptions
                        oldHero={oldHero}
                        imageName={imageName}
                        close={() => setOldHero(true)}
                    />
            }
            {!spinner && !userName && <GameSignin />}
        </div>
    );
};

export default connect(state => 
    ({userName: state.user.userName, imageName: state.hero.HeroesMenu}))(GamePage);
