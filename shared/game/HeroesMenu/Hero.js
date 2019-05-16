/**
 * project WizBattle.
 */
import { Layer, Stage } from 'react-konva';
import React from 'react';
import { Heroes } from '../../../ConstsData/constants';
import SpriteClass from '../ShapeClasses/SpriteClass';
import './hero.scss';

class Hero extends React.Component {
    constructor(props) {
        super(props);
        this.stage = React.createRef();
        this.layer = React.createRef();
        this.container = React.createRef();
        this.hero = React.createRef();
        const [width, height] = [100, 100];
        const [initialWidth, initialHeight] = [...[width, height]];
        this.state = {
            animation: 'idle',
            stageProps: { width, height, initialWidth, initialHeight, scaleX: 1, scaleY: 1 },
        };
        this.canvasResize = this.canvasResize.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.canvasResize);
        this.setInitialSize();
        this.animateHero();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.canvasResize);
    }
    componentDidUpdate(prevProps) {
        const { className, animation } = this.props;
        if ((className !== prevProps.className)
            || animation !== prevProps.animation) {
            this.animateHero();
        }
    }
    canvasResize(e) {
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
    prepareHero() {
        const hero = Heroes[this.props.heroName];
        const { width, height } = this.state.stageProps;
        const animation = this.props.animation || this.state.animation;
        hero.animation = animation;
        hero.x = 0;
        hero.y = 0;
        if (animation === 'playAll')
            hero.frameRate = 8;
        hero.scale = { x: width / 300, y: height / 300 };
        return hero;
    }
    animateHero() {
        const { animation, className } = this.props;
        if (animation)
            this.setState({ animation });
        else if (className === 'hero-wrapper')
            this.setState({ animation: 'idle' });
        else
            this.setState({ animation: 'playAll' });
    }

    render() {
        const { stageProps } = this.state;
        const hero = this.prepareHero();
        const { heroName, onLoad, ...containerProps } = this.props;
        return (
            <button ref={this.container} {...containerProps}>
                <Stage ref={this.stage} {...stageProps}>
                    <Layer ref={this.layer}>
                        <SpriteClass onLoad={onLoad} ref={this.hero} {...hero} />
                    </Layer>
                </Stage>
            </button>
        );
    }
}

export default Hero;
