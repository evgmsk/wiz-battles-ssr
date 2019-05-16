/**
 * project WizBattle
 */
import { Layer, Stage, Image } from 'react-konva';
import React from 'react';
import BGBattle from '../../images/scenes/battle_scene_0.jpg';
import GameBg from '../../images/GameBackgrounds/game_map_0.jpg';
import Music from '../../sounds/forest.mp3';
import {
    definePlayer,
    defineAIOpponent,
} from '../../GameFunctions/battleFunctions';
import BattleContainer from '../../Containers/battleContainer';
import HeroesHallContainer from '../../Containers/menuHeroesContainer';
import Spinner from '../OnloadDataSpinner/SpinnerUI';
import HeroAchievements from './HeroAchievements/Achievements';
import GameMenu from '../../Containers/gameMenuContainer';
import onMusicEnd from '../../HelperFunctions/onMusicEnd';
import ModalWindow from '../ModalWindow/ModalWindow';
import './game.scss';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.stage = React.createRef();
        this.layer = React.createRef();
        this.container = React.createRef();
        this.hero = React.createRef();
        this.opponent = React.createRef();
        const [width, height] = [window.innerWidth * 0.8, window.innerHeight * 0.6];
        const [initialWidth, initialHeight] = [...[width, height]];
        this.state = {
            showSpinner: true,
            stageProps: { width, height, initialWidth, initialHeight, scaleX: 1, scaleY: 1 },
            showHeroData: false,
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
        const { initialWidth, initialHeight } = this.state.stageProps;
        const [width, height] = [container.offsetWidth, container.offsetHeight];
        const [scaleX, scaleY] = [width / initialWidth, height / initialHeight];
        const stageProps = { width, height, initialWidth, initialHeight, scaleX, scaleY };
        this.setState({ stageProps });
    }
    setInitialSize() {
        const container = this.container.current;
        const [width, height] = [container.offsetWidth, container.offsetHeight];
        const [initialWidth, initialHeight] = [...[width, height]];
        let { stageProps } = this.state;
        stageProps = { ...stageProps, width, height, initialWidth, initialHeight };
        this.setState({ stageProps });
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
        this.Music = new Audio(Music);
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
        e.stopPropagation();
        e.preventDefault();
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
        const { game, hero, resetHero } = this.props;
        const ModalContentProps = { ...hero, onClick: e => this.showStats(e, false) };
        if (game.startBattle) {
            return <BattleContainer />;
        }
        if (game.resetHero) {
            return <HeroesHallContainer hero={hero} resetHero={resetHero} />;
        }
        return (
            <div className="game-screen" >
                <Stage {...stageProps} ref={this.stage}>
                    <Layer ref={this.layer}>
                        <Image image={image} width={stageProps.width} height={stageProps.height} alt="" />
                    </Layer>
                </Stage>
                { showSpinner ? <Spinner /> : <span className="display-none" />}
                { showHeroData
                    ? <ModalWindow
                        ModalContent={HeroAchievements}
                        ModalContentProps={ModalContentProps}
                        onClick={e => this.showStats(e, false)}
                    />
                    : <GameMenu showStats={this.showStats} startBattle={this.startBattle} />
                } ;
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

export default Game;
