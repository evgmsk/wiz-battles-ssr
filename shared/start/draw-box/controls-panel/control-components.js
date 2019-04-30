/**
 * project wiz-battles-ssr
 */
import React, {useState} from 'react';
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
    FaLayerGroup,
    // FaArchive,
    FaPalette,
    FaAsterisk,
} from 'react-icons/fa';

import {
    FiMove as Grab,
    FiLayers,
} from 'react-icons/fi';

import { ShapeTypes } from '../../../common/constants/constants';
import { AnimationTypes, TweenTypes } from '../../../common/constants/game-constants';
import ShapePropsControl from './control-inputs';
import BtnWT from '../../../common/btn-with-tooltip/btn';
import SmartSelect from '../../../common/form/smart-select/smart-select';

export const Layers = ({onClick}) => {
    console.log(onClick)
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

export const SelectControls = props => {
    const {onChange, savedShapes} = props;
    return (
        <div className="select-controls">
            <SmartSelect
                name="select-shape"
                values={['Shape type', ...ShapeTypes]}
                onChange={onChange}
            />
            <select className="select-container" name="select-shape" onChange={onChange}>
                <option value="">Тип фигуры</option>
                {ShapeTypes.map((sht, i) => {
                    return <option key={i} value={sht}>{sht}</option>;
                })}
            </select>
            <select className="select-container" name="select-animation" onChange={onChange}>
                <option value="">Тип анимации</option>
                {Object.keys(AnimationTypes).map((anim, i) => (
                        <option key={i} value={anim} defaultChecked={!i}>
                            {anim}
                        </option>))
                }
            </select>
            <select className="select-container" id="select-tween" onChange={onChange}>
                <option value="">Тип твина</option>
                {Object.keys(TweenTypes).map((anim, i) => (
                    <option key={i} value={anim} defaultChecked={!i}>
                        {anim}
                    </option>))
                }
            </select>
            {
                savedShapes &&  <select className="select-container" id="select-img">
                                    <option value="">Вставить рисунок</option>
                                    {savedShapes.map((sh, i) => {
                                        return (
                                            <option
                                                key={i}
                                                defaultChecked={!i}
                                            >
                                                {sh.name}
                                            </option>);
                                        })
                                    }
                                </select>
            }
            
        </div>   
    )
};

export const SaveForm = props => {
    return (
        <form className="form-wrapper">
            <input
                id="image-name"
                type="text"
                placeholder="Имя рисунка"
            />
            <select id="select-category" >
                <option value="">Тип рисунка</option>
                {props.categories.map((c, i) => {
                    return <option key={i} value={c.value}>{c.key}</option>;
                })}
            </select>
            <select id="save-as" onChange={submit}>
                <option value={0} defaultChecked>Сохранить как</option>
                <option value={1}>Группу</option>
                <option value={2}>Сет</option>
            </select>
        </form>
    )
};

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
        <div className="shape-controls-wrapper">
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

// export default ShapeControlsWrapper;
