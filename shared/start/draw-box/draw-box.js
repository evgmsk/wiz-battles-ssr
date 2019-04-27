/**
 * project WizBattle
 */
import React from 'react';
import { Stage, Layer } from 'react-konva';
import _ from 'lodash';

import Wrapper from '../../common/component-wrapper';
import ControlsPanel from './controls-panel';
import ShapeClass from '../../common/shape-classes/shape-class';
import { oddIndexes, evenIndexes } from '../../common/helper-functions/indexFilters';
import idGen from '../../common/helper-functions/idGen';
import { Shapes } from '../../common/constants/constants';
import GroupClass from '../../common/shape-classes/group-class';

import './draw-box.scss';

class DrawBox extends React.Component {
    constructor(props) {
        super(props);
        this.stage = React.createRef();
        this.layer = React.createRef();
        this.container = React.createRef();
        this.hero = React.createRef();
        this.sh = React.createRef();
        const [width, height] = [window.innerWidth * 0.8, window.innerHeight * 0.6];
        const [initialWidth, initialHeight] = [...[width, height]];
        this.state = {
            stageProps: {width: window.innerWidth * .8, height: window.innerHeight - 400, scaleX: 1, scaleY: 1},
            // stageProps: { width, height, initialWidth, initialHeight, scaleX: 1, scaleY: 1 },
            shapes: [],
            linePath: [],
            lineType: props.lineType,
            shapeType: props.shapeType,
            shapeProps: props.shapeProps,
            selectedShape: null,
            mouseDown: false,
            drawing: true,
            animate: false,
            draggable: true,
            interval: 0,
            categories: [
                { key: 'шейп', value: 'shapes', action: props.saveShape },
            ],
        };
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.selectShape = this.selectShape.bind(this);
        this.selectAction = this.selectAction.bind(this);
        this.undo = this.undo.bind(this);
        this.onSave = this.onSave.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.canvasResize = this.canvasResize.bind(this);
        this.changeLayer = this.changeLayer.bind(this);
        this.setDraggable = this.setDraggable.bind(this);
        this.onChangeShapeProps = this.onChangeShapeProps.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.canvasResize);
        this.setInitialSize();
        // const container = this.container.current;
        // setTimeout(() => window.addEventListener('resize', this.canvasResize), 0);
    }

    canvasResize(e) {
        e.cancelBubble = true;
        console.log('resize')
        this.setState(({ stageProps }) => {
            const container = this.container.current;
            const [width, height] = [container.offsetWidth  - 10, container.offsetHeight  - 10];
            const [scaleX, scaleY] = [width / stageProps.width, height / stageProps.height];
            return {...stageProps, width, height, scaleX, scaleY };
        });
    }

    setInitialSize() {
        const container = this.container.current;
        const [width, height] = [container.offsetWidth - 10, container.offsetHeight - 10];
        this.setState(({ stageProps }) => ({stageProps: {...stageProps, width, height}}));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.canvasResize);
    }

    onDragEnd(e) {
        e.cancelBubble = true;
        const target = { ...e.target };
        if (this.state.drawing)
            return;
        const { shapes } = this.state;
        const shape = shapes[target.index];
        if (target.nodeType === 'Group')
            [shape.x, shape.y] = [e.evt.layerX, e.evt.layerY];
        if (target.nodeType === 'Shape')
            [shape.props.x, shape.props.y] = [e.evt.layerX, e.evt.layerY];
        this.setState({ shapes, selectedShape: shape });
    }

    onMouseDown(e) {
        e.cancelBubble = true;
        if (!this.state.drawing || e.target.nodeType !== 'Stage') {
            return;
        }

        const { shapeType, shapeProps, draggable } = this.state;
        const { stroke, strokeWidth, fill, offsetX, offsetY } = shapeProps;
        const { tweenType, animationType, layerUp } = shapeProps;
        const initialProps = { stroke, strokeWidth, fill, offsetX, offsetY };
        const shape = { shapeType };
        shape.name = `${shapeType}${idGen()}`;
        const [x, y] = [e.evt.layerX, e.evt.layerY];
        shape.props = { ...initialProps, animationType, tweenType, draggable, layerUp };
        console.log(e, shape);
        if (shapeType === Shapes.Line) {
            this.resolveLineDown(x, y, shape);
        } else {
            shape.props = { ...shape.props, x, y };
            this.resolveShapeDown(shape);
        }
    }

    onMouseUp(e) {
        console.log(e)
        e.cancelBubble = true;
        if (!this.state.drawing) {
            return;
        }
        if (this.state.linePath.length)
            this.resolveLineUp();
        else
            this.resolveShapeUp();
    }

    onMouseMove(e) {
        e.cancelBubble = true;
        if (!this.state.mouseDown || !this.state.drawing)
            return;
        // console.log(e);
        const { lineType } = this.state;
        let { interval } = this.state;
        const [x, y] = [e.evt.layerX, e.evt.layerY];
        const shape = _.last(this.state.shapes);
        if (shape.shapeType === 'Line') {
            if (!interval && lineType === 'polygon') {
                this.resolveLineMove(x, y, shape);
            } else if (!(interval % 2) && lineType !== 'polygon') {
                this.resolveLineMove(x, y, shape);
            }
        } else {
                this.resolveShapeMove(x, y, shape);
        }
        interval = interval < 5 ? interval + 1 : 0;
        this.setState({ interval });
    }

    resolveLineDown(x, y, shape) {
        const { shapes, linePath, lineType } = this.state;
        const line = shape;
        linePath.push(x);
        linePath.push(y);
        line.props = { ...line.props, points: [...linePath], lineCap: 'round', lineJoin: 'round' };
        if (lineType === 'polygon')
            line.props = { ...line.props, closed: true };
        if (lineType === 'blob')
            line.props = { ...line.props, closed: true, tension: 0.3 };
        shapes.push(line);
        this.setState({ mouseDown: true, shapes, linePath });
    }

    resolveLineUp() {
        const { shapes, linePath } = this.state;
        const shape = _.last(shapes);
        if (linePath.length === 2) {
            shapes.pop();
        } else if (linePath.length > 2) {
            const { points } = shape.props;
            const [x, y] = [_.mean(evenIndexes(points)), _.mean(oddIndexes(points))];
            shape.props.x = x;
            shape.props.y = y;
            shape.props.offsetX = x;
            shape.props.offsetY = y;
        }
        this.setState({ mouseDown: false, shapes, linePath: [], selectedShape: shape });
    }

    resolveLineMove(x, y, shape) {
        const { shapes, linePath } = this.state;
        linePath.push(x);
        linePath.push(y);
        shape.props.points = [...linePath];
        this.setState({ shapes, linePath });
    }

    resolveShapeDown(shape) {
        const { shapes, shapeProps } = this.state;
        const { size, tips, angle, cornerRadius } = shapeProps;
        const [innerRadius, outerRadius, numPoints, clockwise] = [size, size, tips, true];
        switch (shape.shapeType) {
            case (Shapes.Star):
                shape.props = { ...shape.props, innerRadius, outerRadius, numPoints };
                break;
            case (Shapes.Rect):
                shape.props = { ...shape.props, width: size, height: size, cornerRadius };
                break;
            case (Shapes.Ellipse):
                shape.props = { ...shape.props, radius: { x: size, y: size } };
                break;
            case (Shapes.RegularPolygon):
                shape.props = { ...shape.props, radius: size, sides: tips };
                break;
            case (Shapes.Ring):
                shape.props = { ...shape.props, innerRadius, outerRadius };
                break;
            case (Shapes.Arc):
                shape.props = { ...shape.props, innerRadius, outerRadius, angle, clockwise };
                break;
            default:
                break;
        }
        shapes.push(shape);
        this.setState({ mouseDown: true, shapes });
    }

    resolveShapeUp() {
        const { shapes } = this.state;
        const shape = _.last(shapes);
        // console.log(shape)
        if (shape.shapeType === 'Rect' && shape.props.animationType === 'rotation') {
            const [offsetX, offsetY] = [shape.props.width / 2, shape.props.height / 2];
            shape.props = { ...shape.props, offsetX, offsetY };
        }
        this.setState({ mouseDown: false, shapes, selectedShape: shape });
    }

    resolveShapeMove(x, y, shape) {
        const { shapes } = this.state;
        const [X, Y] = [x - shape.props.x, y - shape.props.y];
        switch (shape.shapeType) {
            case Shapes.Rect:
                shape.props.width = Math.abs(X);
                shape.props.height = Math.abs(Y);
                break;
            case Shapes.Ring:
                shape.props.outerRadius = Math.sqrt(Math.abs((X * X) - (Y * Y)));
                break;
            case Shapes.Star:
                shape.props.outerRadius = Math.sqrt(Math.abs((X * X) - (Y * Y)));
                break;
            case Shapes.Ellipse:
                shape.props.radius.x = Math.abs(X);
                shape.props.radius.y = Math.abs(Y);
                break;
            case Shapes.RegularPolygon:
                shape.props.radius = Math.sqrt(Math.abs((X * X) - (Y * Y)));
                break;
            case Shapes.Arc:
                shape.props.outerRadius = Math.sqrt(Math.abs((X * X) - (Y * Y)));
                break;
            default:
                break;
        }
        this.setState({ shapes });
    }

    resolveAnimationChange(data) {
        const { selectedShape, shapes } = this.state;
        const shape = selectedShape ? _.find(shapes, s => s.name === selectedShape.name) : null;
        let { shapeProps } = this.state;
        const { animationType, tweenType } = data.animation;
        if (animationType) {
            if (shape && shape.nodeType === 'Group')
                shape.animationType = animationType;
            else if (shape)
                shape.props = { ...shape.props, animationType };
            shapeProps = { ...shapeProps, animationType };
        } else if (tweenType) {
            if (shape && shape.nodeType === 'Group')
                shape.tweenType = tweenType;
            else if (shape)
                shape.props = { ...shape.props, tweenType };
            shapeProps = { ...shapeProps, tweenType };
        }
       // console.log(selectedShape, shapes, shape);
        this.setState({ shapeProps });
    }

    resolveSkewChange(data) {
        const { selectedShape, shapes } = this.state;
        const shape = selectedShape
            ? _.find(shapes, s => s.name === selectedShape.name)
            : _.last(shapes);
        if (shape && shape.shapeType) {
            shape.props[data[0]] = data[1];
        } else if (shape)
            shape[data[0]] = data[1];
        this.setState({ shapes });
    }

    resolveOffsetChange(data) {
        const { selectedShape, shapes } = this.state;
        const shape = selectedShape
            ? _.find(shapes, s => s.name === selectedShape.name)
            : _.last(shapes);
        if (shape)
            shape.props[data[0]] = data[1];
        this.setState({ shapes });
    }

    onChangeShapeProps(e) {
        const {id, value} = e.target;
        const { selectedShape, shapes } = this.state;
        if ([id] in this.state.shapeProps) {
            this.setState(({shapeProps }) => {
                return ({shapeProps: {...shapeProps, [id]: value}})
            });
        } else {
            throw new Error("Invalid arguments passed to 'onChangeShapeProps'" )
        }
    }

    selectShape(data) {
        if (!data)
            return;
        let { shapeProps, selectedShape } = this.state;
        if (typeof data === 'string') {
            const chosenShape = this.props.savedShapes.filter(x => x.name === data)[0];
            let { shapes } = this.state;
            if (chosenShape.nodeType === 'Group') {
                selectedShape = chosenShape;
                shapes = shapes.concat(chosenShape);
            } else {
                shapes = shapes.concat(chosenShape.image);
                selectedShape = chosenShape.image[0];
            }
            this.setState({ shapes, selectedShape });
        } else if (data.animation)
            this.resolveAnimationChange(data);
        else
            this.setState(data);
    }

    onSave(name, type, saveAs) {
        if (!parseInt(saveAs, 10))
            return;
        // const savedShapes = this.props.savedShapes;
        const { shapes, shapeProps } = this.state;
        let data;
        const action = this.state.categories.filter(c => c.value === type)[0].action;
        if (saveAs === '1') {
            const group = shapes.filter(s => s.nodeType)[0];
            const restShapes = shapes.filter(s => s.shapeType).map((shape) => {
                shape.groupName = `${name}`;
                shape.props.draggable = this.state.draggable;
                return shape;
            });
            const animationType = shapeProps.animationType;
            const tweenType = shapeProps.tweenType;
            const [nodeType, id] = ['Group', name];
            const image = group ? group.image.concat(restShapes) : restShapes;
            data = { name, nodeType, id, animationType, tweenType, image, layerUp: 0 };
        } else
            data = { name, nodeType: 'Shape', image: shapes };
        action(data);
    }

    selectAction(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState(({drawing})=> ({ drawing: !drawing }));
    }

    setDraggable(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState(({draggable, shapes, selectedShape}) => {
            const shape = selectedShape
                ? _.find(shapes, s => s.name === selectedShape.name)
                : null;
            if (shape) {
                const updatedShape = {...shape, props: {...shape.props, draggable: !draggable}};
                const updatedShapes = [...shapes.filter(s => s.name !== shape.name), updatedShape];
                return ({ draggable: !draggable, shapes: updatedShapes })
            }
            return ({draggable: !draggable})
        });
    }

    startAnimation(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState(({animate}) => ({ animate: !animate }));
    }

    changeLayer(data) {
        if (!this.state.selectedShape)
            return;
        this.setState(({shapes, selectedShape}) => {
            const shape = _.find(shapes, s => s.name === selectedShape.name);
            if (shape.shapeType) {
                const layerUp = (shape.props.layerUp || 0) + data;
                const upShape = {...shape, props: {...shape.props, layerUp}};
                return ({shapes: [shapes.filter(s => s.name !== selectedShape.name), upShape]})
            } else {
                const layerUp = (shape.layerUp || 0) + data;
                const upShape = {...shape, layerUp};
                return ({shapes: [shapes.filter(s => s.name !== selectedShape.name), upShape]})
            }
        });
    }

    undo(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState(({ selectedShape, shapes }) => {
            if (!selectedShape)
                return ({shapes: shapes.slice(0, shapes.length - 1)});
            return ({shapes: shapes.filter(s => selectedShape.name !== s.name)})
        });
    }

    render() {
        const { shapes, categories, drawing, animate, draggable } = this.state;
        const { shapeProps, stageProps } = this.state;
        const savedShapes = this.props.savedShapes;
        const [stage, layer] = [this.stage, this.layer];
        const panelProps = {
            shapeProps,
            animate,
            drawing,
            savedShapes,
            categories,
            draggable,
            onChangeShapeProps: this.onChangeShapeProps,
            onChangeInput: this.selectShape,
            selectAction: this.selectAction,
            startAnimation: this.startAnimation,
            undo: this.undo,
            onSave: this.onSave,
            changeLayer: this.changeLayer,
            setDraggable: this.setDraggable,
        };

        const StageProps = {
            ...stageProps,
            onMouseMove: this.onMouseMove,
            onMouseDown: this.onMouseDown,
            onMouseUp: this.onMouseUp,
            onDragEnd: this.onDragEnd,
        };

        const Images = shapes.reduce((acc, Image, i) => {
            if (Image.shapeType) {
                const [type, props] = [Image.shapeType, Image.props];
                const Props = { type, props, layer, stage, animate, drawing };
                if (i)
                    acc.push(<ShapeClass {...Props} key={i} />);
                else
                    acc.push(<ShapeClass {...Props} key={i} ref={this.sh} />);
            } else if (Image.nodeType) {
                const { image, animationType, tweenType, layerUp } = Image;
                const Props = { image, layer, stage, animate, animationType, tweenType, layerUp };
                if (i)
                    acc.push(<GroupClass {...Props} key={i} graggable />);
                else
                    acc.push(<GroupClass {...Props} key={i} draggable ref={this.hero} />);
            }
            return acc;
        }, []);
        // console.log(Images, this.state);
        return (
            <section className="draw-box">
                <h2>Создай своего монстра</h2>
                <div className="draw-stage-wrapper" ref={this.container}>
                    <Stage className="draw-stage" ref={stage} {...StageProps}>
                        <Layer ref={layer}>
                            { Images }
                        </Layer>
                    </Stage>
                </div>
                <ControlsPanel {...panelProps} />
            </section>
        );
    }
}

DrawBox.defaultProps = {
    saveShape: f => f,
    overwriteShape: f => f,
    shapeProps: {
        id: '',
        strokeWidth: 1,
        stroke: '#d2d5cb',
        fill: '#aaa56f',
        animationType: 0,
        tweenType: 0,
        size: 20,
        tips: 3,
        offsetX: 0,
        offsetY: 0,
        skewX: 0,
        skewY: 0,
        cornerRadius: 3,
        angle: 180,
        layerUp: 100,
    },
    shapeType: 'Line',
    lineType: 'simple',
};

export default DrawBox;
