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
    FaArrowDown as ArrowDown,
    FaHandPaper,
    FaHandSpock,
    FaHandHolding,
    FaGrin,
    FaSketch
} from 'react-icons/fa';

import {
    GiSave,
    GiStarFormation,
    GiTransform,
    GiHandOfGod
} from 'react-icons/gi';

import {
    MdArtTrack,
    MdLayers,  
} from 'react-icons/md';/**/

import {
    FiMove as Grab,
    FiFilm,
    FiSave,
    FiLayers,
} from 'react-icons/fi';

import { AnimationTypes, TweenTypes } from '../../../common/constants/game-constants';
import { ShapeTypes } from '../../../common/constants/constants';

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

    // console.log(input, shapePropsInput(input));
    return (
        <div className="draw-box-controls">
            <MdArtTrack/>
            <ShapeControlsWrapper
                onClick={setInput}
                onChange={onChangeShapeProps}
                shapeProps={shapeProps}
                input={input}
            />
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
