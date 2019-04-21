/**
 * project smartWizBattle
 */
import React from 'react';
import {
    FaPlayCircle as Play,
    FaStopCircle as Stop,
    FaTrash as Trash,
    FaHandHolding as Grab,
    FaEdit as Draw,
    FaLock as Stop2,
    FaUnlock as Grab2,
    FaArrowUp as ArrowUp,
    FaArrowDown as ArrowDown
} from 'react-icons/fa/';

import { AnimationTypes, TweenTypes } from '../../common/constants/game-constants';
import { ShapeTypes } from '../../common/constants/constants';

function ControlsPanel(props) {
    console.log(props);
    const onChangeInput = props.onChange || (f => f);
    const undo = props.undo || (f => f);
    const selectAction = props.selectAction || (f => f);
    const onSave = props.onSave || (f => f);
    const startAnimation = props.startAnimation || (f => f);
    const changeLayer = props.changeLayer || (f => f);
    const setDraggable = props.setDraggable || (f => f);

    const onChange = e => {
        e.stopPropagation();
        const [id, value] = [e.target.id, e.target.value];
        if (id === 'brush-width')
            return onChangeInput({ shapeProps: { strokeWidth: value } });
        if (id === 'brush-color')
            return onChangeInput({ shapeProps: { stroke: value } });
        if (id === 'select-img')
            return onChangeInput(value);
        if (id === 'select-shape') {
            if (/Line/.test(value))
                return onChangeInput({
                    shapeType: value.slice(0, 4),
                    lineType: value.slice(5),
                });
            return onChangeInput({ shapeType: value });
        }
        if (id === 'set-skewX' || id === 'set-skewY') {
            e.target.nextSibling.innerText = `${value}`;
            return onChangeInput({ skew: [id.slice(4), value] });
        }
        if (id === 'offsetX' || id === 'offsetY') {
            e.target.nextSibling.innerText = `${value}`;
            return onChangeInput({ offset: [id, value] });
        }
        if (id === 'fill-color')
            return onChangeInput({ shapeProps: { fill: value } });
        if (id === 'select-animation')
            return onChangeInput({ animation: { animationType: value } });
        if (id === 'select-tween')
            return onChangeInput({ animation: { tweenType: value } });
        if (id === 'set-tips')
            return onChangeInput({ shapeProps: { tips: value } });
        if (id === 'set-size') {
            return onChangeInput({ shapeProps: { size: value } });
        }
        return false;
    };

    const submit = e => {
        e.stopPropagation();
        e.preventDefault();
        if (!saveAs.value || !name.value || !category.value)
            return;
        const Name = name.value && name.value.match(/\w+/)[0];
        if (!Name) {
            name.value = '';
            name.placeholder = 'Пожалуйста введите другое имя';
            return;
        }
        onSave(name.value, category.value, saveAs.value);
    };

    return (
        <div className="draw-box-instruments" onChange={onChange}>
          {/*  <div className="input-wrapper">
                <label htmlFor="brush-color">Цвет линии</label>
                <input
                    id="brush-color"
                    type="color"
                    defaultValue={props.stroke}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="brush-width">Толщина линии</label>
                <div className="range-wrapper">
                    <input
                        id="brush-width"
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        defaultValue={props.strokeWidth}
                    />
                    <span className="brush-width">{props.strokeWidth}px</span>
                </div>
            </div>
            <div className="input-wrapper">
                <label htmlFor="fill-color">Цвет заливки</label>
                <input
                    id="fill-color"
                    type="color"
                    defaultValue={props.fill}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="set-tips">Вершины</label>
                <div className="range-wrapper">
                    <input
                        id="set-tips"
                        type="range"
                        min="3"
                        max="15"
                        step="1"
                        defaultValue={props.tips}
                    />
                    <span className="set-tips">{props.tips}</span>
                </div>
            </div>
            <div className="input-wrapper">
                <label htmlFor="set-size">Размер</label>
                <div className="range-wrapper">
                    <input
                        id="set-size"
                        type="range"
                        min="0"
                        max="150"
                        step="1"
                        defaultValue={props.size}
                    />
                    <span className="brush-width">{props.size}px</span>
                </div>
            </div>
            <div className="input-wrapper">
                <label htmlFor="set-skewX">Наклон</label>
                <div className="range-wrapper">
                    <input
                        id="set-skewX"
                        type="range"
                        min="-10"
                        max="10"
                        step="0.1"
                        defaultValue={0}
                    />
                    <span className="set-skew">{0}</span>
                </div>
                <div className="range-wrapper">
                    <input
                        id="set-skewY"
                        type="range"
                        min="-10"
                        max="10"
                        step="0.1"
                        defaultValue={0}
                    />
                    <span className="set-skew">{0}</span>
                </div>
            </div>
            <div className="input-wrapper">
                <label htmlFor="offsetX">Offset</label>
                <div className="range-wrapper">
                    <input
                        id="offsetX"
                        type="range"
                        min="-200"
                        max="200"
                        step="1"
                        defaultValue={0}
                    />
                    <span className="offset">{0}</span>
                </div>
                <div className="range-wrapper">
                    <input
                        id="offsetY"
                        type="range"
                        min="-200"
                        max="200"
                        step="1"
                        defaultValue={0}
                    />
                    <span className="offset">{0}</span>
                </div>
            </div>
            <div className="input-wrapper">
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
                    props.animate
                        ? <Stop onClick={startAnimation} />
                        : <Play onClick={startAnimation} />
                }
            </div>
            <div className="input-wrapper">
                <p>Слой</p>
                <ArrowUp onClick={(e) => changeLayer(e, 1)} />
                <ArrowDown onClick={(e) => changeLayer(e, -1)} />
            </div>
            <div className="input-wrapper">
                {
                    props.drawing
                        ? <Grab onClick={selectAction} />
                        : <Draw onClick={selectAction} />
                }
            </div>
            <div className="input-wrapper">
                {
                    props.draggable
                        ? <Grab2 onClick={setDraggable} />
                        : <Stop2 onClick={setDraggable} />
                }
            </div>
            <div className="input-wrapper">
                <Trash onClick={undo} />
            </div>
            <div className="input-wrapper">
                <select id="select-img">
                    <option value="">Вставить рисунок</option>
                    {props.savedShapes.map((sh, i) => {
                        return <option key={i} defaultChecked={!i}>{sh.name}</option>;
                    })}
                </select>
            </div>
            <form className="input-wrapper">
                <input
                    id="image-name"
                    type="text"
                    ref={input => name = input}
                    placeholder="Имя рисунка"
                />
                <select id="select-category" ref={input => category = input} >
                    <option value="">Тип рисунка</option>
                    {props.categories.map((c, i) => {
                        return <option key={i} value={c.value}>{c.key}</option>;
                    })}
                </select>
                <select id="save-as" onChange={submit} ref={input => saveAs = input}>
                    <option value={0} defaultChecked>Сохранить как</option>
                    <option value={1}>Группу</option>
                    <option value={2}>Сет</option>
                </select>
            </form>*/}
        </div>
    );
};

export default ControlsPanel;
