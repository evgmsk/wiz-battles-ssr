/**
 * project smartWizBattle
 */
import React, {useState} from 'react';
import {
    FaPlayCircle as Play,
    FaStopCircle as Stop,
    FaTrash as Trash,
    FaEdit as Draw,
    FaLock,
    FaUnlock,
    FaArrowUp as ArrowUp,
    FaArrowDown as ArrowDown
} from 'react-icons/fa/';

import {
    GiSave,
    GiStarFormation,
    GiTransform,
} from 'react-icons/gi';

import {
    Fi,
} from 'react-icons/io';/**/

import {
    FiMove as Grab,
} from 'react-icons/fi';



import { AnimationTypes, TweenTypes } from '../../../common/constants/game-constants';
import { ShapeTypes } from '../../../common/constants/constants';
// import SmartInput from '../../common/form/input/input';
import InputWrapper from './control-input-wrapper';

import ShapeControlsWrapper from './shape-controls-wrapper';

import './control-panel.scss';

function ControlsPanel(props) {
    const [input, setInput] = useState('stroke-color');
    const {
        startAnimation,
        selectShape,
        selectAnimation,
        onChangeShapeProps,
        undo,
        selectAction,
        onSave,
        changeLayer,
        setDraggable,
        animate,
        drawing,
        savedShapes,
        categories,
        draggable,
        shapeProps
    } = props;
    // console.log(props);

    const onChange = e => {
        // console.log(e)
        e.stopPropagation();
        const [id, value] = [e.target.id, e.target.value];

        if (id === 'select-img')
            return onChange(value);
        if (id === 'select-shape') {
            if (/Line/.test(value))
                return onChangeInput({
                    shapeType: value.slice(0, 4),
                    lineType: value.slice(5),
                });
            return onChangeInput({ shapeType: value });
        }
        if (id === 'select-animation')
            return onChangeInput({ animation: { animationType: value } });
        if (id === 'select-tween')
            return onChangeInput({ animation: { tweenType: value } });
        return false;/**/
    };

    const submit = e => {
        e.stopPropagation();
        e.preventDefault();
        console.log(e)
        /*if (!saveAs.value || !name.value || !category.value)
            return;
        const Name = name.value && name.value.match(/\w+/)[0];
        if (!Name) {
            name.value = '';
            name.placeholder = 'Пожалуйста введите другое имя';
            return;
        }
        onSave(name.value, category.value, saveAs.value);*/
    };

    const shapePropsInput = input => {
        switch (input) {
            case 'stroke-color':
                return (
                    <InputWrapper
                        id="stroke"
                        type="color"
                        value={shapeProps.stroke}
                        label={'Stroke color'}
                        onChange={onChangeShapeProps}
                    />
                );
            case "stroke-width":
                return (
                    <InputWrapper
                        id="strokeWidth"
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={shapeProps.strokeWidth}
                        label={'Stroke width'}
                        indicator
                        onChange={onChangeShapeProps}
                    />
                );
            case "fill-color":
                return (
                    <InputWrapper
                        id="fill"
                        type="color"
                        value={shapeProps.fill}
                        label={'Shape color'}
                        onChange={onChangeShapeProps}
                    />
                );
            case "tips":
                return (
                    <InputWrapper
                        id="tips"
                        type="range"
                        min="3"
                        max="100"
                        step="1"
                        value={shapeProps.tips}
                        indicator
                        label={'Tips number'}
                        onChange={onChangeShapeProps}
                    />
                );
            case 'shape-size':
                return (
                    <InputWrapper
                        id="size"
                        type="range"
                        min="0"
                        max="150"
                        step="1"
                        value={shapeProps.size}
                        indicator
                        label={'Shape size'}
                        onChange={onChangeShapeProps}
                    />
                );
            case 'skew':
                return (
                    <div className="inputs-container">
                        <InputWrapper
                            id="skewX"
                            type="range"
                            min="-10"
                            max="10"
                            step="0.1"
                            value={shapeProps.skewX}
                            label={'SkewX'}
                            indicator
                            onChange={onChangeShapeProps}
                        />
                        <InputWrapper
                            id="skewY"
                            type="range"
                            min="-10"
                            max="10"
                            step="0.1"
                            value={shapeProps.skewY}
                            label={'SkewY'}
                            indicator
                            onChange={onChangeShapeProps}
                        />
                    </div>
                );
            case 'offset':
                return (
                    <div className="inputs-container">
                        <InputWrapper
                            id="offsetX"
                            type="range"
                            min="-200"
                            max="200"
                            step="1"
                            value={shapeProps.offsetX}
                            label={'OffsetX'}
                            indicator
                            onChange={onChangeShapeProps}
                        />
                        <InputWrapper
                            id="offsetY"
                            type="range"
                            min="-200"
                            max="200"
                            step="1"
                            value={shapeProps.offsetY}
                            label={'OffsetY'}
                            indicator
                            onChange={onChangeShapeProps}
                        />
                    </div>
                );
            default:
                return <div/>
        }
    };
    // console.log(input, shapePropsInput(input));
    return (
        <div className="draw-box-controls">
            <ShapeControlsWrapper onClick={setInput} shapePropsInput={shapePropsInput} input={input} />
            <div className="inputs-container">
                <select id="select-shape">
                    <option value="">Тип фигуры</option>
                    {ShapeTypes.map((sht, i) => {
                        return <option key={i} value={sht}>{sht}</option>;
                    })}
                </select>
            </div>
            <div className="input-wrapper">
                <select id="select-animation">
                    <option value="">Тип анимации</option>
                    {Object.keys(AnimationTypes).map((anim, i) => (
                            <option key={i} value={anim} defaultChecked={!i}>
                                {anim}
                            </option>))
                    }
                </select>
                <select id="select-tween">
                    <option value="">Тип твина</option>
                    {Object.keys(TweenTypes).map((anim, i) => (
                        <option key={i} value={anim} defaultChecked={!i}>
                            {anim}
                        </option>))
                    }
                </select>
                {
                    animate
                        ? <Stop onClick={startAnimation} />
                        : <Play onClick={startAnimation} />
                }
            </div>
            <div className="input-wrapper">
                <p>Слой</p>
                <ArrowUp onClick={(e) => changeLayer(e, 1)} />
                <ArrowDown onClick={(e) => changeLayer(e, -1)} />
            </div>
            <div className="input-wrapper" onClick={selectAction}>
                {
                    drawing
                        ? <Grab />
                        : <Draw />
                }
            </div>
            <div className="input-wrapper" onClick={setDraggable}>
                {
                    draggable
                        ? <FaUnlock />
                        : <FaLock />
                }
            </div>
            <div className="input-wrapper">
                <Trash onClick={undo} />
            </div>
            <div className="input-wrapper">
                <select id="select-img">
                    <option value="">Вставить рисунок</option>
                    {savedShapes && savedShapes.map((sh, i) => {
                        return <option key={i} defaultChecked={!i}>{sh.name}</option>;
                    })}
                </select>
            </div>
            <form className="input-wrapper">
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
        </div>
    );
}

export default ControlsPanel;
