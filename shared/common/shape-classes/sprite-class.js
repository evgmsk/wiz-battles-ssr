import React from 'react';
import { Sprite } from 'react-konva';

class SpriteClass extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            image: null,
        };
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = this.props.image;
        image.onload = () => {
            if (this.props.onLoad)
                this.props.onLoad();
            this.setState({ image });
            this.ref.current.start();
        };
    }
    conponentWillUnmount() {
        this.ref.current.stop();
    }
    render() {
        const { image, ...props } = this.props;
        return (
            <Sprite ref={this.ref} {...props} image={this.state.image} />
        );
    }
}

SpriteClass.defaultProps = {
    // onLoad: f => f,
};

export default SpriteClass;
