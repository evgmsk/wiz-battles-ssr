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
} from 'react-icons/fa';

import {
    GiSave,
    GiStarFormation,
} from 'react-icons/gi';

import {
    MdLayers,  
} from 'react-icons/md';/**/

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


import './control-panel.scss';

function ControlsPanel(props) {
    // console.log(props)
    
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
        console.log(e, typeof selectShape)
        
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
