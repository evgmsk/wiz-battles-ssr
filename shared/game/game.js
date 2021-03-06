import { Layer, Stage, Image } from 'react-konva';
import React from 'react';
import {connect} from 'react-redux';

import BGBattle from '../assets/images/scenes/battle_scene_0.jpg';
import GameBg from '../assets/images/GameBackgrounds/game_map_0.jpg';
import {
    definePlayer,
    defineAIOpponent,
} from '../common/game-functions/battleFunctions';
// import Music from '../assets/sounds/forest.mp3';
// import Battle from './battle/battle';
// import HeroesHallContainer from './heroes-menu/heroes-menu';
import Spinner from '../common/spinner/spinner';
//import HeroAchievements from './HeroAchievements/Achievements';
import GameMenu from './game-menu/GameMenu';
import { onMusicEnd }from '../common/helper-functions';
// import ModalWindow from '../ModalWindow/ModalWindow';
import './game.scss';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.stage = React.createRef();
        this.layer = React.createRef();
        this.container = React.createRef();
        this.hero = React.createRef();
        this.opponent = React.createRef();
        this.state = {
            showSpinner: true,
            stageProps: { width: 100, height: 100, scaleX: 1, scaleY: 1 },
            showHeroData: false,
            initialSize: {initialWidth: 100, initialHeight: 100},
        };
        this.newBattle = this.newBattle.bind(this);
        this.showStats = this.showStats.bind(this);
        this.mountMap = this.mountMap.bind(this);
        this.canvasGameResize = this.canvasGameResize.bind(this);
        this.startBattle = this.startBattle.bind(this);
        this.showHeroesMenu = this.showHeroesMenu.bind(this);
    }
    componentDidMount() {
        const { game } = this.props;
        if (!game.startBattle && !game.resetHero) {
            window.addEventListener('resize', this.canvasGameResize);
            this.setMusic();
            this.setInitialSize();
            this.mountMap();
        }
    }
    componentDidUpdate(prevProps) {
        const { game } = this.props;
        if (game.musicVolume !== prevProps.game.musicVolume && this.Music)
            this.Music.volume = this.props.game.musicVolume;
        else if (!game.resetHero && prevProps.game.resetHero) {
            window.addEventListener('resize', this.canvasGameResize);
            this.setInitialSize();
            this.mountMap();
            this.setMusic();
        } else if (game.startBattle && !prevProps.game.startBattle) {
            window.removeEventListener('resize', this.canvasGameResize);
            this.Music.removeEventListener('ended', onMusicEnd);
            this.Music.pause();
        } else if (!game.startBattle && prevProps.game.startBattle) {
            window.addEventListener('resize', this.canvasGameResize);
            this.setInitialSize();
            this.mountMap();
            this.setMusic();
        }
    }
    componentWillUnmount() {
        this.Music.removeEventListener('ended', onMusicEnd);
        window.removeEventListener('resize', this.canvasGameResize);
    }
    canvasGameResize(e) {
        e.cancelBubble = true;
        const container = this.container.current;
        const { initialWidth, initialHeight } = this.state.initialSize;
        const [width, height] = [container.offsetWidth, container.offsetHeight];
        const [scaleX, scaleY] = [width / initialWidth, height / initialHeight];
        const stageProps = { width, height, scaleX, scaleY };
        this.setState({ stageProps });
    }

    setInitialSize() {
        const container = this.container.current;
        const [initialWidth, initialHeight] = [container.offsetWidth, container.offsetHeight];
        this.setState(({initialSize, stageProps}) => 
        ({
            initialSize: {initialWidth, initialHeight},
            stageProps: {...stageProps, width: initialWidth, height: initialHeight}
        }))
    }
    mountMap() {
        const image = new window.Image();
        image.src = GameBg;
        image.onload = () => {
            this.setState({ image, showSpinner: false });
            this.layer.current.moveToBottom();
        };
    }
    setMusic() {
        this.Music = new Audio(require('../assets/sounds///forest.mp3'));
        this.Music.volume = this.props.game.musicVolume;
        this.Music.addEventListener('ended', onMusicEnd, false);
        this.Music.play();
    }
    newBattle(e) {
        e.stopPropagation();
        e.preventDefault();
        this.startBattle();
    }
    showStats(e, state = true) {
        this.setState({ showHeroData: state });
    }
    defineScene() {
        const scene = BGBattle;
        this.props.setScene(scene);
    }
    showHeroesMenu(state) {
        if (state)
            this.setState({ showHeroesMenu: state, showSpinner: false });
        else
            this.setState({ showHeroesMenu: state, showSpinner: true });
    }
    startBattle() {
        const { game, hero, gameData } = this.props;
        const player = definePlayer(hero);
        const opponent = game.battle.pvp
            ? game.battle.opponent
            : defineAIOpponent(hero, gameData.monsters);
        this.defineScene();
        this.props.setOpponent(opponent);
        this.props.setPlayer(player);
        if (!game.battle.pvp)
            this.props.setPlayerMove(true);
        this.props.toBattle(true);
    }
    defineComponentToRender() {
        const { stageProps, image, showHeroData, showSpinner } = this.state;
        const { game, hero } = this.props;
        const ModalContentProps = { ...hero, onClick: e => this.showStats(e, false) };
        if (game.startBattle) {
            return <BattleContainer />;
        }
        return (
            <div className="game-screen" ref={this.container}>
                <Stage {...stageProps} ref={this.stage}>
                    <Layer ref={this.layer}>
                        <Image image={image} width={stageProps.width} height={stageProps.height} alt="" />
                    </Layer>
                </Stage>
                { showSpinner && <Spinner />}
                {/* { showHeroData
                    ? <ModalWindow
                        ModalContent={HeroAchievements}
                        ModalContentProps={ModalContentProps}
                        onClick={e => this.showStats(e, false)}
                    />*/
                    <GameMenu showStats={this.showStats} startBattle={this.startBattle} />
                } ; }
            </div>
        );
    }
    render() {
        const Component = this.defineComponentToRender();
        return (
            <div className="game-wrapper" ref={this.container}>
                {Component}
            </div>
        );
    }
}

export default connect(state => ({game: state.game}))(Game);
