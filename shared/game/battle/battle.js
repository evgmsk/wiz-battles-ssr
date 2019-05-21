/**
 * project WizBattle
 */
import React from 'react';
import { Layer, Stage, Image } from 'react-konva';
import _ from 'lodash';

import BGBattle from '../../assets/images/scenes/images/scenes/battle_scene_0.jpg';
import {
    resolveAttack,
    levelsGap,
    setOpponentImage
} from '../../common/game-functions/battleFunctions';
import PlayerBar from './player-bar/player-bar';
import ShapeClass from '../../common/shape-classes/shape-class';
import EffectClass from '../../common/shape-classes/effect-class';
import Sprite from '../../common/shape-classes/sprite-class';
import Task from './task/Task';
import {
    TaskGenerators,
    Effects,
    Salutation,
} from '../../common/constants/game-constants';
import Heroes from '../../common/constants/heroes';
import SpellSelector from './spell-menu/spell-menu';
import Spinner from '../../common/spinner/spinner';
// import BattleMusic from '../../sounds/didier_julia-melodiya-iz-mul-tfil-ma-priklyucheniya-papirusa.mp3';
import { onMusicEnd, pause, waiter  } from '../../common/helper-functions';
import './battle.scss';

const TGA = Object.values(TaskGenerators);
const Length = TGA.length;
const Timeouts = {};

class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.time = [0, 0];
        this.attackResult = null;
        this.stage = React.createRef();
        this.layer = React.createRef();
        this.container = React.createRef();
        this.scene = React.createRef();
        this.hero = React.createRef();
        this.opponent = React.createRef();
        this.opponentBar = React.createRef();
        this.playerBar = React.createRef();
        const { player, opponent } = props.battle;
        this.state = {
            initial: {
                player,
                opponent,
            },
            heroAnimation: 'idle',
            showSpinner: true,
            showSpellMenu: false,
            stageProps: { width: 300, height: 300, scaleX: 1, scaleY: 1 },
            spellShapes: [],
            initialSize: {initialWidth: 100, initialHeight: 100}
        };
        this.canvasResize = this.canvasResize.bind(this);
        this.onSelectSpell = this.onSelectSpell.bind(this);
        this.onResolveTask = this.onResolveTask.bind(this);
        this.onAnimationEnd = this.onAnimationEnd.bind(this);
        this.resolveOpponentMove = this.resolveOpponentMove.bind(this);
    }
    componentDidMount() {
        this.setMusic();
        window.addEventListener('resize', this.canvasResize);
        this.setInitialSize();
        this.mountScene();
    }
    componentDidUpdate(prevProps) {
        this.Music.volume = this.props.musicVolume;
        if (this.props.battle.task && !prevProps.battle.task)
            this.Music.pause();
        else if (!this.props.battle.task && prevProps.battle.task)
            this.Music.play();
        const { playerMove } = this.props.battle;
        if (playerMove !== prevProps.battle.playerMove) {
            if (playerMove)
                this.resolvePlayerMove();
            else
                pause(Timeouts.onResolveTask).then(this.resolveOpponentMove);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.canvasResize);
        this.Music.pause();
        this.Music.removeEventListener('ended', onMusicEnd);
    }
    canvasResize(e) {
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
        const [initialWidth, initialHeight] = [container.offsetWidth, container.offsetHeight];;
        this.setState(({ stageProps, initialSize }) => ({
            stageProps: {...stageProps, width: initialWidth, height: initialHeight},
            initialSize: {initialHeight, initialWidth}
        }));
    }
    mountScene() {
        const image = new window.Image();
        image.src = this.props.battle.scene || BGBattle;
        image.onload = () => {
            this.setState({ image, showSpinner: false });
            this.resolvePlayerMove();
            this.scene.current.moveToBottom();
        };
    }
    setMusic() {
        this.Music = new Audio(BattleMusic);
        this.Music.volume = this.props.musicVolume;
        this.Music.addEventListener('ended', onMusicEnd, false);
        this.Music.play();
    }
    resolvePlayerMove() {
        pause(Timeouts.heroAttack).then(this.setState({ showSpellMenu: true }));
    }
    onAnimationEnd(e, barName) {
        e.stopPropagation();
        const target = e.target;
        const healthBar = target.classList.contains('health-bar');
        const expBar = target.classList.contains('experience-bar');
        if (!(healthBar || expBar))
            return;
        const { battle, setPlayerMove, setOpponentHealth } = this.props;
        const result = this.attackResult;
        if (battle.playerMove) {
            if (result.restoration)
                this.resolveLifeAttackAnimation(barName, healthBar, expBar, target);
            else if (healthBar)
                this.onPlayerMoveHealthBarAnimation(target, barName);
            else if (expBar)
                this.onPlayerMoveExpBarAnimation(target, barName);
        } else if (!battle.playerMove && !battle.pvp) {
            if (result.restoration && barName === 'left') {
                setOpponentHealth(battle.opponent.health + result.restoration);
            } else if (!result.restoration || barName === 'right') {
                if (result.health > 0)
                    setPlayerMove(true);
                else {
                    this.battleLost();
                }
            }
        }
    }
    resolveLifeAttackAnimation(barName, healthBar, expBar, target) {
        const { setPlayerExperience, setPlayerHealth } = this.props;
        const { setPlayerMove, battle, setPlayerLevel } = this.props;
        const { initial } = this.state;
        const gap = levelsGap(battle.player.level);
        const result = this.attackResult;
        const targetExp = Math.round((result.experience / gap) * 100);
        if (barName === 'right')
            this.resolveLifeAttackAnimationRightBar();
        else if (barName === 'left' && healthBar) {
            if (result.levelUp)
                setPlayerExperience(gap);
            else
                setPlayerExperience(result.experience);
        } else if (barName === 'left' && expBar) {
            if ((result.levelUp && parseInt(target.getAttribute('value'), 10) === targetExp)
                || !result.levelUp) {
                if (result.health > 0)
                    setPlayerMove(false);
                else
                    this.battleWin();
            } else if (result.levelUp && target.getAttribute('value') === '100') {
                setPlayerLevel();
                setPlayerHealth(initial.player.health);
                setPlayerExperience(0);
            } else if (result.levelUp && target.getAttribute('value') === '0') {
                setPlayerExperience(result.experience);
            }
        }
    }
    resolveLifeAttackAnimationRightBar() {
        const { setPlayerHealth, battle } = this.props;
        const { initial } = this.state;
        const result = this.attackResult;
        if (battle.player.health < initial.player.health) {
            let health = battle.player.health + result.restoration;
            if (initial.opponent.health <= health)
                health = initial.player.health;
            setPlayerHealth(health);
        }
    }
    onPlayerMoveHealthBarAnimation(target, barName) {
        const { setPlayerExperience, battle } = this.props;
        const result = this.attackResult;
        const gap = levelsGap(battle.player.level);
        if (barName === 'right') {
            if (!result.levelUp) {
                setPlayerExperience(result.experience);
            } else if (result.levelUp) {
                setPlayerExperience(gap);
            }
        }
    }
    onPlayerMoveExpBarAnimation(target) {
        const { setPlayerExperience, setPlayerHealth, battle } = this.props;
        const { setPlayerLevel, setPlayerMove } = this.props;
        const { initial } = this.state;
        const result = this.attackResult;
        const targetExp = Math.round((result.experience / levelsGap(battle.player.level)) * 100);
        if (!result.levelUp || (result.levelUp && parseInt(target.getAttribute('value'), 10) === targetExp)) {
            if (result.health > 0)
                setPlayerMove(false);
            else
                this.battleWin();
        } else if (result.levelUp && target.getAttribute('value') === '100') {
            setPlayerLevel();
            setPlayerHealth(initial.player.health);
            setPlayerExperience(0);
        } else if (result.levelUp && target.getAttribute('value') === '0') {
            setPlayerExperience(result.experience);
        }
    }
    onSelectSpell(spell) {
        this.props.setPlayerSpell(spell);
        this.setState({ showSpellMenu: false });
        this.newTask();
    }
    battleWin() {
        const { setBattlesWin, setMonstersDefeated, battle } = this.props;
        if (!battle.pvp)
            setMonstersDefeated();
        setBattlesWin();
        this.startEffect(Salutation.effect, 15);
    }
    battleLost() {
        this.props.setBattlesLost();
        this.endBattle();
    }
    endBattle() {
        const { startBattle } = this.props;
        this.setState({ spellShapes: [] });
        startBattle(false);
    }
    onResolveTask(solution) {
        const { setTask, setTaskFailed, setPlayerMove, setTaskResolved, battle } = this.props;
        const { levelUp, setExperience } = this.props;
        this.attackResult = resolveAttack(solution, battle);
        if (solution) {
            setExperience(this.attackResult.experience);
            if (this.attackResult.levelUp)
                levelUp();
            setTaskResolved();
            this.heroAttack(battle);
        } else if (battle.task) {
            setTaskFailed(battle.task);
            pause(Timeouts.onResolveTask).then(() => setPlayerMove(false));
        }
        if (battle.task)
            setTask(null);
    }
    heroAttack(battle, time = Timeouts.heroAttack) {
       this.setState({ heroAnimation: 'attack' });
        waiter(time, () => {
            this.setState({ heroAnimation: 'idle' });
            const { effect } = Effects[battle.player.spell];
            this.startEffect(effect);
            });
    }
    startEffect(effect, num = 50) {
        const { spellShapes } = this.state;
        const { battle } = this.props;
        const { props } = this.hero.current;
        const [x, y] = battle.playerMove
            ? [(window.innerWidth * 6) / 7, window.innerHeight / 2]
            : [props.x + 100, props.y];
        const player = {
            move: battle.playerMove,
            target: { x, y },
        };
        const onEnd = this.endEffect(num);
        while (spellShapes.length < num) {
            const shape = effect(player, onEnd);
            spellShapes.push(shape);
        }
        this.setState({ spellShapes });
    }
    endEffect(num) {
        const { battle, setOpponentHealth, setPlayerHealth } = this.props;
        return () => {
            if (num > 1) {
                return num -= 1;
            }
            if (battle.playerMove) {
                if (battle.opponent.health > 0)
                    setOpponentHealth(this.attackResult.health);
                else
                    return this.endBattle();
            } else {
                setPlayerHealth(this.attackResult.health);
            }
            return this.setState({ spellShapes: [] });
        };
    }
    resolveOpponentMove() {
        const { setPlayerSpell } = this.props;
        setPlayerSpell(null);
        this.selectOpponentSpell();
        this.opponentAttack();
    }
    opponentAttack() {
        const { battle } = this.props;
        this.attackResult = resolveAttack(1, battle);
        const { effect } = Effects[battle.opponent.spell];
        this.startEffect(effect);
    }
    selectOpponentSpell() {
        const { battle, setOpponentSpell } = this.props;
        const { opponent } = this.state.initial;
        if (opponent.health > battle.opponent.health) {
            const spell = Object.keys(Effects)[Math.floor(Math.random() * 4)];
            setOpponentSpell(spell);
        } else {
            const spells = Object.keys(Effects).filter(ef => ef !== 'life');
            const spell = spells[Math.floor(Math.random() * 3)];
            setOpponentSpell(spell);
        }
    }
    newTask() {
        const ind = Math.floor(Math.random() * Length);
        const newTask = TGA[ind](this.props.battle.difficulty);
        this.props.setTask(newTask);
    }
    drawEffect(spellShapes) {
        const layer = this.layer;
        return spellShapes.reduce((acc, Shape, i) => {
            const { type, props } = Shape;
            const Props = { type, props, layer };
            acc.push(<EffectClass {...Props} key={i} />);
            return acc;
        }, []);
    }
    drawOpponent(opponent, opponentAnimation) {
        let opponentImage = opponent.image;
        if (Array.isArray(opponentImage)) {
            return this.drawSetImages(opponentImage);
        } if (typeof opponentImage === 'string') {
            opponentImage = setOpponentImage(this.props.monsters, opponentImage);
            return this.drawSetImages(opponentImage);
        }
        opponentImage.animation = opponentAnimation || opponentImage.animation;
        return opponentImage;
    }
    drawSetImages(images) {
        const layer = this.layer;
        return images.reduce((acc, image, i) => {
            const { props, shapeType } = image;
            const Props = { type: shapeType, props, layer, animate: true };
            image.animate = true;
            image.layer = layer;
            acc.push(<ShapeClass {...Props} key={i} />);
            return acc;
        }, []);
    }
    darwPlayer(player, heroAnimation) {
        let heroImage = Heroes[player.image];
        if (heroImage && Array.isArray(heroImage))
            return this.drawSetImages(heroImage);
        else if (!heroImage) {
            heroImage = { ...Heroes.Anton };
        }
        heroImage.x = 50;
        heroImage.y = window.innerHeight / 2;
        heroImage.animation = heroAnimation || heroImage.animation;
        return [<Sprite ref={this.hero} {...heroImage} name="hero" key={0} />];
    }
    leftBar(player, onTransitionEnd) {
        const { initial } = this.state;
        const health = player.health <= initial.player.health
            ? _.round((player.health / initial.player.health) * 100)
            : 100;
        return {
            health,
            name: player.name,
            level: player.level,
            experience: _.round((player.experience / levelsGap(player.level)) * 100),
            className: 'left-battle-bar',
            onTransitionEnd,
        };
    }
    rightBar(opponent, onTransitionEnd) {
        const { initial } = this.state;
        const health = opponent.health <= initial.opponent.health
            ? _.round((opponent.health / initial.opponent.health) * 100)
            : 100;
        const props = {
            health,
            name: opponent.name,
            level: opponent.level,
            className: 'right-battle-bar',
            onTransitionEnd,
        };
        if (this.props.battle.pvp)
            props.experience = _.round((opponent.experience / levelsGap(opponent.level)) * 100);
        return props;
    }
    render() {
        const { width, height } = this.state.stageProps;
        const { player, opponent, playerMove, task, difficulty } = this.props.battle;
        const { image, spellShapes, heroAnimation, showSpellMenu, showSpinner } = this.state;
        const layer = this.layer;
        const { soundsVolume } = this.props;
        const onTransitionEnd = this.onAnimationEnd;
        const Effect = this.drawEffect(spellShapes, layer);
        const leftBarProps = this.leftBar(player, onTransitionEnd);
        const rightBarProps = this.rightBar(opponent, onTransitionEnd);
        const heroImage = this.darwPlayer(player, heroAnimation);
        const opponentImage = this.drawOpponent(opponent, opponent.animation);
        const taskCondition = playerMove && task;
        const taskProps = { ...task, difficulty, soundsVolume };
        return (
            <div className="battle-wrapper" ref={this.container} onTransitionEnd={this.onAnimationEnd}>
                {showSpinner ? <Spinner /> : <div className="display-none" />}
                {taskCondition
                    ? <Task {...taskProps} onResolveTask={this.onResolveTask} />
                    : <div className="display-none" />}
                <Stage ref={this.stage} width={width} height={height} >
                    <Layer ref={this.layer}>
                        {Effect}
                        {heroImage}
                        {opponentImage}
                        <Image image={image} width={width} height={height} alt="" ref={this.scene} />
                    </Layer>
                </Stage>
                {showSpellMenu && playerMove
                    ? <SpellSelector
                        onSelectSpell={this.onSelectSpell}
                        volume={soundsVolume}
                    />
                    : <span className="display-none" /> }
                <PlayerBar {...leftBarProps} />
                <PlayerBar {...rightBarProps} />
            </div>
        );
    }
}

export default Battle;
