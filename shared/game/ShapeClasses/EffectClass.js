/**
 * project WizBattle.
 */
import React from 'react';
import { SpellAnimations, TweenTypes, Salutation } from '../../../ConstsData/constants';
import { pause } from '../../../HelperFunctions/pause';

class EffectClass extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            animation: null,
        };
        this.onEnd = this.onEnd.bind(this);
    }
    componentDidMount() {
        this.createAnimations();
    }
    componentWillUnmount() {
        if (this.state.animation)
            this.state.animation.stop();
    }
    onEnd() {
        this.state.animation.stop();
        this.props.props.onEnd();
    }
    createAnimations() {
        const { layer, props } = this.props;
        const { tweenType, animationType } = props;
        if (animationType) {
            const animation = this.createAnimation(layer, animationType);
            this.setState({ animation });
            const timeOut = animationType !== 'Salute'
                ? Math.round(Math.random() * 2000)
                : Math.round(Math.random() * 300);
            const duration = animationType !== 'Salute' ? 0.5 : 0.2;
            pause(timeOut).then(() => {
                animation.start();
                this.ref.current.to({
                    opacity: 1,
                    duration,
                }, 1);
            });
        }
        if (tweenType) {
            const tween = this.createTween(tweenType);
            const timeOut = Math.round(Math.random() * 3000);
            pause(timeOut).then(() => {
                if (typeof tween === 'function')
                    tween();
                else tween.play();
                this.ref.current.setAttr('opacity', 1);
            });
        }
    }
    createAnimation(layer, animationType) {
        const { player } = this.props.props;
        if (animationType === 'Salute')
            return Salutation.animation(layer.current, this.ref.current, this.onEnd);
        return SpellAnimations[animationType](layer.current, this.ref.current, player, this.onEnd);
    }
    createTween(tweenType, onEnd) {
        if (tweenType)
            return TweenTypes[tweenType](this.ref.current, onEnd);
        return null;
    }
    render() {
        const { props } = this.props;
        const Shape = this.props.type;
        return <Shape ref={this.ref} {...props} />;
    }
}

EffectClass.defaultProps = {
    props: {
        onEnd: f => f,
    },
};

export default EffectClass;
