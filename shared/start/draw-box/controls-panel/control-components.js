/**
 * project wiz-battles-ssr
 */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
    FaPlayCircle as Play,
    FaStopCircle as Stop,
    FaTrash as Trash,
    FaDrawPolygon as Draw,
    // FaEdit,
    FaLock,
    FaUnlock,
    FaArrowUp as ArrowUp,
    FaArrowDown as ArrowDown,
    // FaHandPaper,
    FaArrowsAltH,
    FaFillDrip,
    FaExpand,
    FaSave,
    // FaArchive,
    FaPalette,
    FaAsterisk,
} from 'react-icons/fa';

import {
    FiMove as Grab,
    FiLayers,
} from 'react-icons/fi';

import {saveShape, overwriteShape} from '../../../store/actions/appActions';
import { ShapeTypes } from '../../../common/constants/constants';
import { AnimationTypes, TweenTypes } from '../../../common/constants/game-constants';
import ShapePropsControl from './control-inputs';
import BtnWT from '../../../common/btn-with-tooltip/btn';
import SmartSelect from '../../../common/form/smart-select/smart-select';
import SmartForm, { SmartInput } from '../../../common/form';

export const Layers = ({onClick}) => {
    return (
        <div className="layers-control-wrapper">
            <ArrowDown onClick={() => onClick(-1)} />
            <ArrowUp onClick={() => onClick(1)} />
        </div> 
    )
} 

export const FunctionalControlsWrapper = props => {
    const {draggable, animate, drawing} = props;
    return (
        <div className="functional-controls">
                <BtnWT
                    variant="left"
                    onClick={props.startAnimation}
                    tooltip={
                        animate
                            ? `Stop animation.\nClick to interrupt.`
                            : `Play animation.\nClick to start.`
                    }
                >
                    {animate ? <Stop /> : <Play />}
                </BtnWT>
                <BtnWT
                    variant="left"
                    onClick={props.chooseMode}
                    tooltip={
                        drawing
                            ? `Draw mode.\nClick to set moving shape mode.`
                            : `Moving shape mode.\nClick to set draw mode.`
                    }
                >
                        {drawing ? <Draw /> : <Grab />}
                </BtnWT>
                <BtnWT
                    variant="left"
                    onClick={props.setDraggable}
                    tooltip={
                        draggable 
                            ? `Draggable propery is true.\n
                                Selected shape is movable.\n
                                Click to immoblize.`
                            : `Draggable propery is false.\n
                                Shape is immobilized.\n
                                Click to set true.`
                    }
                >
                    {draggable ? <FaUnlock /> : <FaLock />}
                </BtnWT>
                <BtnWT
                    variant="left"
                    onClick={props.undo}
                    tooltip={`Delete shape.\nDelete selected shape\n (usually last created)`}
                >
                    <Trash />
                </BtnWT>
        </div>
    )
};

const SelectControls = props => {
    const {onChange, savedShapes = [''], shapeProps: {type, animationType, tweenType}} = props;
    return (
        <div className="select-controls">
            <SmartSelect
                caret
                showCurrent
                toggleLabel="Select shape type"
                value={type}
                name="select-shape"
                values={[...ShapeTypes]}
                onChange={onChange}
            />
            <SmartSelect
                caret
                showCurrent
                toggleLabel="Select animation"
                value={animationType}
                name="select-animation"
                values={[ ...Object.keys(AnimationTypes)]}
                onChange={onChange}
            />
            <SmartSelect
                caret
                showCurrent
                name="select-tween"
                toggleLabel="Select tween"
                value={tweenType}
                values={[ ...Object.keys(TweenTypes)]}
                onChange={onChange}
            />
            <SmartSelect
                caret
                name="saved-shapes"
                toggleLabel="Insert saved shape"
                value={""}
                values={[...savedShapes].map((l, i) => i)}
                labels={[...savedShapes]}
                onChange={onChange}
            />
        </div>   
    )
};

export const SelectControlsContainer = connect(state => 
    ({savedShapes: state.app.savedShapes}))(SelectControls)


const SaveForm = props => {
    const [res, setRes] = useState(null);
    const values = {shapeName: ''};
    const validationSchema = {
        shapeName: {
            validator: value => {
                if (/\s/g.test(value))
                    return {msg: "Invalid name. White spaces forbidden"}
                if (!value)
                    return {msg: "Shape name is required."}
                return null;
            },
            required: true,
        }
    }
    const submit = {
        fetch: f=> f,
        onResponse: f => f
    };
    const handleResponse = res => {

    }

    return (
        <SmartForm
            className="save-shape-form"
            submit={submit}
            validationschema={validationSchema}
            values={values}
        >
            {
                props => {
                    const { errors, values, ...restProps} = props;
                    return (
                        <React.Fragment>
                            <SmartInput
                                type="text"
                                name="image-name"
                                placeholder="Enter shape name"
                                labelStyle="like-placeholder"
                                inputStyle="outlined"
                                labelText="Shape name"
                                {...restProps}
                                value={props.values.shapeName}
                                error={props.errors.shapeName}
                            />
                            <button type="submit"><FaSave/></button>
                        </React.Fragment>
                    )
                }
            }
        </SmartForm>   
    )
};

export const SaveShapeForm = connect(null, {saveShape, overwriteShape})(SaveForm);

export const ShapeControlsWrapper = props => {
    const [input, setInput] = useState('stroke-color');
    const {onChange, shapeProps, selectedShape, changeLayer} = props;
    const inputProps = {shapeProps, selectedShape, onChange};
    const inputRef = React.createRef();
    const handleClick = input => {
        setInput(input)
        if (inputRef.current)
            inputRef.current.focus();
    }
    return (
        <div className="shape-controls">
            <div className="shape-controls__buttons-wrapper">
                <BtnWT
                    variant="up"
                    onClick={() => handleClick('stroke-color')}
                    tooltip={`Stroke color.\n
                            Current value ${shapeProps.stroke}.\n
                            Click to change.`}
                >
                    <FaPalette/>
                </BtnWT>
                <BtnWT
                    variant="up"
                    onClick={() => handleClick('stroke-width')}
                    tooltip={`Stroke width.\n
                            Current value ${shapeProps.strokeWidth}.\n
                            Click to change.`}
                >
                    <FaArrowsAltH/>
                </BtnWT>
                <BtnWT
                    variant="up"
                    onClick={() => handleClick('fill-color')}
                    tooltip={`Shape color.\n
                            Current value ${shapeProps.fill}.\n
                            Click to change.`}
                >
                    <FaFillDrip/>
                </BtnWT>
                <BtnWT
                    variant="up"
                    onClick={() => handleClick('tips')}
                    tooltip={`Shape tips.\n
                            Current value ${shapeProps.tips}.\n
                            Click to change.`}
                >
                    <FaAsterisk/>
                </BtnWT>
                <BtnWT
                    variant="up"
                    onClick={() => handleClick('shape-size')}
                    tooltip={`Shape default size.\n
                            Current value ${shapeProps.size}.\n
                            Click to change.`}
                >
                    <FaExpand/>
                </BtnWT>
                {selectedShape 
                    && selectedShape.props
                    &&  <React.Fragment>
                            <BtnWT
                                variant="up"
                                onClick={() => handleClick('skew')}
                                tooltip={`Shape skew. \n
                                        Current values \n
                                        skewX: ${shapeProps.skewX} \n
                                        skewY: ${shapeProps.skewY}. \n
                                        Click to change.`} 
                            >
                                Skew
                            </BtnWT>
                            <BtnWT
                                variant="up"
                                onClick={() => handleClick('offset')}
                                tooltip={`Shape offset. \n
                                            Current values \n
                                            offsetX: ${shapeProps.offsetX} \n
                                            offsetY: ${shapeProps.offsetY}. \n
                                            Click to change.`} 
                            >
                                Offset
                            </BtnWT>
                            <BtnWT
                                variant="up"
                                onClick={() => handleClick('layers')}
                                tooltip={`Layers.\n
                                        Current value ${shapeProps.layerUp}.\n
                                        Click to change.`}
                            >
                                <FiLayers/>
                            </BtnWT>
                        </React.Fragment>
                    
                }  
            </div>   
            <div className="shape-control-input">
                <p>{'Current control:'}</p>
                <ShapePropsControl
                    input={input}
                    {...inputProps}
                    ref={inputRef}
                    layersChildren={<Layers onClick={changeLayer} />}
                />
            </div>
        </div>
    )
};
