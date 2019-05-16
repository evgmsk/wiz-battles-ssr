/**
 * project WizBattle
 */
import React from 'react';
import { Group } from 'react-konva';
import Konva from 'konva';
import ShapeClass from './ShapeClass';
import { AnimationTypes, TweenTypes } from '../../../ConstsData/constants';

class GroupClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: null,
        };
        this.ref = React.createRef();
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
    }
    componentDidMount() {
        const { props } = this.props;
        if (props && props.angle) {
            this.ref.current.rotate(Math.PI * (this.props.props.angle / 360));
        }
        this.createAnimations();
    }
    componentDidUpdate() {
        const { animationType, tweenType } = this.props;
        if (animationType !== this.state.animationType
            || tweenType !== this.state.tweenType)
            this.createAnimations();
        const { animate } = this.props;
        const { animation, tween } = this.state;
        if (animation && animate) {
            this.state.animation.start();
        } else if (animation)
            this.state.animation.stop();
        if (tween && animate)
            this.state.tween.play();
    }

    componentWillUnmount() {
        if (this.state.animation)
            this.state.animation.stop();
    }
    createAnimation(layer, animationType) {
        return AnimationTypes[animationType](layer.current, this.ref.current);
    }
    createTween(tweenType) {
        if (tweenType)
            return TweenTypes[tweenType](this.ref.current);
        return null;
    }
    createAnimations() {
        const { layer, animationType, tweenType } = this.props;
        let animation = null;
        let tween = null;
        if (animationType)
            animation = this.createAnimation(layer, animationType);
        if (tweenType)
            tween = this.createTween(tweenType);
        this.setState({ animation, animationType, tween, tweenType });
    }
    onMouseEnter(e) {
        e.cancelBubble = true;
        if (this.props.drawing)
            return;
        this.props.stage.current._stage.content.style.cursor = 'pointer';
    }

    moving(x, y) {
        const [X, Y] = [this.ref.current.children[0].attrs.x, this.ref.current.children[0].attrs.y];
        this.ref.current.to({
            x: (X - x),
            y: (Y - y),
            easing: Konva.Easings.EaseInOut,
            duration: 4.7,
        });
    }
    onMouseLeave(e) {
        e.cancelBubble = true;
        if (!this.props.drawing)
            this.props.stage.current._stage.content.style.cursor = 'default';
    }

    render() {
        const { layer, stage, animated } = this.props;
        const Shapes = this.props.image;
        return (
            <Group
                ref={this.ref}
                draggable={this.props.draggable}
                onMouseLeave={this.onMouseLeave}
                onMouseEnter={this.onMouseEnter}
            >
            {Shapes.map((Shape, i) => {
                const Props = { type: Shape.shapeType, props: Shape.props, layer, stage, animated };
                return <ShapeClass {...Props} key={i} />;
            })}
            </Group>
        );
    }
}

export default GroupClass;
