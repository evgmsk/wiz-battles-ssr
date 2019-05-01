/**
 * project WizBattle
 */
import React from 'react';
import { Stage, Layer } from 'react-konva';
import {last, mean} from 'lodash';

import ControlsPanel from './controls-panel/controls-panel';
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
            polygonPoints: props.polygonPoints,
            categories: [
                { key: 'шейп', value: 'shapes', action: props.saveShape },
            ],
        };
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.chooseMode = this.chooseMode.bind(this);
        this.undo = this.undo.bind(this);
        this.onSave = this.onSave.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.canvasResize = this.canvasResize.bind(this);
        this.changeLayer = this.changeLayer.bind(this);
        this.setDraggable = this.setDraggable.bind(this);
        this.onChangeShapeProps = this.onChangeShapeProps.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.canvasResize);
        this.initializeCanvas();
    }

    canvasResize(e) {
        e.cancelBubble = true;
        // console.log('resize')
        this.setState(({ stageProps }) => {
            const container = this.container.current;
            const [width, height] = [container.offsetWidth  - 10, container.offsetHeight  - 10];
            const [scaleX, scaleY] = [width / stageProps.width, height / stageProps.height];
            return {...stageProps, width, height, scaleX, scaleY };
        });
    }

    initializeCanvas() {
        const container = this.container.current;
        const [width, height] = [container.offsetWidth - 10, container.offsetHeight - 10];
        this.setState(({ stageProps }) => ({stageProps: {...stageProps, width, height}}));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.canvasResize);
    }

    updateShapes(shape) {
        return this.state.shapes.map(s => {
            if (s.name !== shape.name)
                return s;
            return shape;
        });
    }

    onDragEnd(e) {
        e.cancelBubble = true;
        if (this.state.drawing)
            return;
        const {_lastPos: {x, y}, attrs: {name}} = e.target;
        this.setState(({shapes}) => {
            const shape = shapes.filter(s => s.name === name)[0];
            console.log(shape, shapes)
            if (shape.nodeType)
                [shape.x, shape.y] = [x, y];
            if (shape.shapeType)
                [shape.props.x, shape.props.y] = [x, y];
            return ({
                shapes: this.updateShapes(shape),
                selectedShape: shape
            });
        });       
    }

    onMouseDown(e) {
        e.cancelBubble = true;
        if (!this.state.drawing || e.target.nodeType !== 'Stage') {
            return;
        }
        // console.log('2b', e.evt.button, this.state.mouseDown)
        const {layerX, layerY} = e.evt;
        const { shapeType, shapeProps, draggable, shapes } = this.state;
        const { x, y, layerUp, ...mainProps } = shapeProps;
        const shape = { shapeType };
        const name = `${shapeType}${idGen()}`;
        shape.name = name; 
        shape.props = {
            ...mainProps,
            draggable,
            layerUp: layerUp + shapes.length,
            name,
        };
        if (shapeType === Shapes.Line) {
            this.createLine(layerX, layerY, shape);
        } else {
            shape.props = { ...shape.props, x: layerX, y: layerY };
            this.createShape(shape);
        }
    }

    onMouseUp(e) {
        e.cancelBubble = true;
        // console.log(e.evt.button, !this.state.drawing)
        if (!this.state.drawing) {
            return;
        }
        if (e.evt.button === 1) {
            return this.setState(({polygonPoints}) => ({polygonPoints: polygonPoints + 1}))
        }
        if (e.evt.button === 0) {
            if (this.state.linePath.length)
            this.finishLineDrawing();
        else
            this.finishShapeDrawing();
        }  
    }

    onMouseMove(e) {
        e.cancelBubble = true;
        if (!this.state.mouseDown || !this.state.drawing)
            return;
        const [x, y] = [e.evt.layerX, e.evt.layerY];
        const shape = last(this.state.shapes);
        if (shape && shape.shapeType === 'Line') {
            this.drawLine(x, y);
        } else if (shape) {
            this.drawShape(x, y);
        }
    }

    createLine(x, y, shape) {
        this.setState(({ shapes, linePath, shapeProps: {type}  }) => {
            const newLinePath = [...linePath, x, y];
            shape.props = { 
                ...shape.props,
                points: newLinePath,
                lineCap: 'round',
                lineJoin: 'round'
            };
            if (type === 'Line-polygon')
                shape.props = { ...shape.props, closed: true };
            if (type === 'Line-blob')
                shape.props = { ...shape.props, closed: true, tension: 0.3 };
            return ({
                shapes: [...shapes, shape],
                linePath: newLinePath,
                mouseDown: true,
            })
        });
    }

    drawLine(x, y) {
        this.setState(({ shapes, linePath, lineType, polygonPoints }) => {
            const newLinePath = [...linePath];
            const newShapes = [...shapes];
            if (lineType !== 'polygon' || linePath.length <= polygonPoints * 2) {
                newLinePath.push(x);
                newLinePath.push(y);
            } else {
                newLinePath[linePath.length - 2] = x;
                newLinePath[linePath.length - 1] = y;
            }
            newShapes[shapes.length - 1].props.points = newLinePath;
            return ({ shapes: newShapes, linePath: newLinePath });
        });
    }

    finishLineDrawing() {
        this.setState(({ shapes, linePath }) => {
            let selectedShape = null;
            const newShapes = [...shapes];
            const shape = newShapes.pop();
            if (linePath.length > 2) {
                const { points } = shape.props;
                const [x, y] = [mean(evenIndexes(points)), mean(oddIndexes(points))];
                shape.props.x = x;
                shape.props.y = y;
                shape.props.offsetX = x;
                shape.props.offsetY = y;
                newShapes.push(shape);
                selectedShape = shape;
            }
            return ({
                shapes: newShapes,
                selectedShape,
                mouseDown: false,
                linePath: [],
                polygonPoints: 1,
            })
        });   
    }

    createShape(shape) {
        this.setState(({ shapes, shapeProps }) => {
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
            return ({ shapes: [...shapes, shape], mouseDown: true});
        });        
    }

    drawShape(x, y) {
        this.setState(({ shapes }) => {
            const newShapes = [...shapes];
            const shape = newShapes[shapes.length - 1];
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
            return ({shapes: newShapes})
        }); 
    }

    finishShapeDrawing() {
        this.setState(({ shapes }) => {
            const newShapes = [...shapes];
            const shape = newShapes[shapes.length - 1];
            if (shape.shapeType === 'Rect' && shape.props.animationType === 'rotation') {
                const [offsetX, offsetY] = [shape.props.width / 2, shape.props.height / 2];
                shape.props = { ...shape.props, offsetX, offsetY };
            }
            return ({shapes: newShapes, selectedShape: shape, mouseDown: false, polygonPoints: 1});
        });       
    }

    handleAnimationChange(data) {
        this.setState(({ selectedShape, shapeProps }) => {
            if (!selectedShape) 
                return ({shapeProps: {...shapeProps, [data.type]: data.value}})
            const shape = {...selectedShape};
            if (shape.nodeType === 'Group')
                shape[data.type] = data.value;
            else
                shape.props = { ...shape.props, [data.type]: data.value};
            return ({
                shapes: this.updateShapes(shape),
                selectedShape: shape,
                shapeProps: {...shapeProps, [data.type]: data.value}
            });
        });        
    }

    onChangeSelect({target: {name, value}}) {
        
        //const  = target;
        //if (id === 'select-img')
            //return onChange(value);
        if (name === 'select-shape') {
            if (/Line/.test(value))
                return this.setState(({shapeType, shapeProps}) =>
                    ({shapeType: 'Line', shapeProps: {...shapeProps, type: value}}));
            return this.setState(({shapeType, shapeProps}) =>
                ({shapeType: value, shapeProps: {...shapeProps, type: value}}));
        }
        if (name === 'select-animation')
            return this.handleAnimationChange({ type: 'animationType', value });
        if (name === 'select-tween')
            return this.handleAnimationChange({ type: 'tweenType', value });
    }

    onChangeShapeProps({target}) {
        let {id, value} = target;
        if (id !== 'fill' && id !== 'stroke') {
            value = Number(value);
        }
        if (!([id] in this.state.shapeProps)) 
            throw new Error("Invalid arguments passed to 'onChangeShapeProps'");
        const caseSkew = id === 'skewX' || id === 'skewY';
        const caseOffset = id === 'offsetX' || id === 'offsetY';
        this.setState(({shapes, selectedShape}) => {
            if (caseOffset || caseSkew) {
                const shape = {...selectedShape};
                if(!selectedShape)
                    return ({});
                else if (!shape.props) {
                    if (caseOffset) {
                        shape[id] += value;
                    } else if (caseSkew) {
                        shape[id] = valie;
                    }
                }
                else { 
                    if (caseOffset) {
                        shape.props[id] += value;
                    } else if (caseSkew) {
                        shape.props[id] = valie;
                    }
                }
                return ({
                    shapes: this.updateShapes(shape),
                    selectedShape: shape,
                })  
            } 
        })
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

    chooseMode() {
        this.setState(({drawing})=> ({ drawing: !drawing }));
    }

    setDraggable() {
        this.setState(({draggable, shapes, selectedShape}) => {
            if (!selectedShape)
                return ({draggable: !draggable});
            const shape = {...selectedShape};            
            shape.props = {...shape.props, draggable: !draggable};
            const newShapes = this.updateShapes(shape);
            return ({ draggable: !draggable, shapes: newShapes })            
        });
    }

    startAnimation() {
        this.setState(({animate}) => ({ animate: !animate }));
    }

    changeLayer(data) {
        if (!this.state.selectedShape)
            return;
        this.setState(({selectedShape, shapes}) => {
            const shape = {...selectedShape};
            if (shape.shapeType) {
                const layerUp = (shape.props.layerUp || 100) + data;
                shape.props = {...shape.props, layerUp};   
            } else {
                shape.layerUp += data
            }
            return ({shapes: this.updateShapes(shape), selectedShape: shape})
        });
    }

    undo() {
        this.setState(({ selectedShape, shapes }) => {
            if (!selectedShape) {
                return ({shapes: [...shapes].slice(0, shapes.length - 1)});
            }
            const newShapes = shapes.filter(s => selectedShape.name !== s.name);
            const length = newShapes.length;
            return ({
                shapes: newShapes,
                selectedShape: length ? [...newShapes][length - 1] : null,
            })
        });
    }

    render() {
        const { shapes, categories, drawing, animate, draggable } = this.state;
        const { shapeProps, stageProps, selectedShape } = this.state;
        const savedShapes = this.props.savedShapes;
        const [stage, layer] = [this.stage, this.layer];
        const panelProps = {
            shapeProps,
            animate,
            drawing,
            savedShapes,
            categories,
            draggable,
            selectedShape,
            onChangeShapeProps: this.onChangeShapeProps,
            onChangeSelect: this.onChangeSelect,
            chooseMode: this.chooseMode,
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
            onDragStart: f => f,
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
        console.log(this.state);
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
        type: 'Line-simple',
        strokeWidth: 2,
        stroke: '#554bd5',
        fill: '#118803',
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
    polygonPoints: 1,
};

export default DrawBox;
