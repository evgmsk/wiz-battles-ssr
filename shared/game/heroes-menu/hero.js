import { Layer, Stage } from 'react-konva';
import React from 'react';
import Heroes from '../../assets/data/heroes';
import SpriteClass from '../../common/shape-classes/sprite-class';
import './hero.scss';

class Hero extends React.Component {
    constructor(props) {
        super(props);
        this.stage = React.createRef();
        this.layer = React.createRef();
        this.container = React.createRef();
        this.hero = React.createRef();
        this.state = {
            stageProps: { width: 100, height: 100, initialWidth: 100, initialHeight: 100, scaleX: 1, scaleY: 1 },
            heroProps: Heroes[props.heroName]
        };
        console.log(Heroes, Heroes[props.heroName])
        this.canvasResize = this.canvasResize.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.canvasResize);
        this.setInitialSize();
        this.setHeroProps();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.canvasResize);
    }
    componentDidUpdate(prevProps) {
        const { className, animation } = this.props;
       
        if ((className !== prevProps.className)
            || animation !== prevProps.animation) {
            this.resetAnimation();
            // console.log(className, animation, (className !== prevProps.className)
            // || animation !== prevProps.animation, this.props.heroName, this.defineAnimation())
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
        this.setState(({ stageProps }) => {
            return {stageProps: {
                            ...stageProps,
                            width, height,
                            initialWidth: width,
                            initialHeight: height
                        }
                    }
        });
    }
    defineAnimation() {
        const { animation, className } = this.props;
        if (animation)
            return animation;
        else if (className === 'hero-wrapper')
            return 'idle';
        else
            return 'playAll';
    }
    resetAnimation() {
        const animation = this.defineAnimation();
        console.log(animation, this.props.heroName)
        this.setState(({heroProps}) => ({heroProps: {...heroProps, animation}}));
    }
    setHeroProps(pos = [0,0], frameRate = 8, scaleDivider = [150, 150]) {
        const heroProps = Heroes[this.props.heroName];
        const { width, height } = this.state.stageProps;
        const animation = this.defineAnimation();
        heroProps.animation = animation;
        heroProps.x = pos[0];
        heroProps.y = pos[1];
        if (animation === 'playAll')
        heroProps.frameRate = frameRate;
        heroProps.scale = { x: width / scaleDivider[0], y: height / scaleDivider[1] };
        console.log(heroProps, 'ffse')
        this.setState({heroProps});
    }
    render() {
        const { stageProps, heroProps } = this.state;
        const { onLoad, heroName, ...containerProps } = this.props;
        console.log(this.props, stageProps)
        return (
            <button ref={this.container} {...containerProps} >
                <Stage ref={this.stage} {...stageProps}>
                    <Layer ref={this.layer}>
                        <SpriteClass onLoad={onLoad} ref={this.hero} {...heroProps} />
                    </Layer>
                </Stage>
            </button>
        );
    }
}

export default Hero;
