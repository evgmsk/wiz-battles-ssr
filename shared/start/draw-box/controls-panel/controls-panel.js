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
    FiFilm,
    FiSave,
    FiLayers,
} from 'react-icons/fi';

import {
    ShapeControlsWrapper,
    FunctionalControlsWrapper,
    SaveForm,
    SelectOptionsControl,
} from './control-components';


import { AnimationTypes, TweenTypes } from '../../../common/constants/game-constants';
import { ShapeTypes } from '../../../common/constants/constants';
import InputWrapper from './control-input-wrapper';
import ShapeControlsWrapper from './shape-controls-wrapper';

import './control-panel.scss';

function ControlsPanel(props) {
    const [input, setInput] = useState('stroke-color');
    const {
        startAnimation,
        selectedShape,
        chooseShape,
        onChangeSelect,
        onChangeShapeProps,
        undo,
        chooseMode,
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

    const selectControlProps = {
        onChangeSelect,

    }

    const functionalControlProps = {
        setDraggable,
        chooseMode,
        undo,
        startAnimation,
        animate,
        drawing,
        draggable
    };

    const shapeControlProps = {
        onChange: onChangeShapeProps,
        shapeProps,
        changeLayer,
        selectedShape
    }

    return (
        <div className="draw-box-controls">
            <ShapeControlsWrapper {...shapeControlProps} />
            <FunctionalControlsWrapper {...functionalControlProps} />

        </div>
    );
}

export default ControlsPanel;
