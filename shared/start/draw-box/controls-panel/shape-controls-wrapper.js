/**
 * project wiz-battles-ssr
 */
import React from 'react';
import {
    FaArrowsAltH,
    FaFillDrip,
    FaExpand,
    FaArchive,
    FaPalette,
    FaAsterisk,
} from 'react-icons/fa';

import BtnWT from '../../../common/btn-with-tooltip/btn';

const ShapeControlsWrapper = props => {
    const {onClick, shapePropsInput, input} = props;
    return (
        <div className="shape-controls-wrapper">
            <BtnWT variant="up" onClick={() => onClick('stroke-color')} tooltip={'Stroke color'} >
                <FaPalette/>
            </BtnWT>
            <BtnWT variant="up" onClick={() => onClick('stroke-width')} tooltip={'Stroke width'} >
                <FaArrowsAltH/>
            </BtnWT>
            <BtnWT variant="up" onClick={() => onClick('fill-color')} tooltip={'Shape color'} >
                <FaFillDrip/>
            </BtnWT>
            <BtnWT variant="up" onClick={() => onClick('tips')} tooltip={'Shape tips'} >
                <FaAsterisk/>
            </BtnWT>
            <BtnWT variant="up" onClick={() => onClick('shape-size')} tooltip={'Shape default size'} >
                <FaExpand/>
            </BtnWT>
            <BtnWT variant="up" onClick={() => onClick('skew')} tooltip={'Shape skew'} >
                Skew
            </BtnWT>
            <BtnWT variant="up" onClick={() => onClick('offset')} tooltip={'Shape offset'} >
                Offset
            </BtnWT>
            <div className="shape-control-input">
                {shapePropsInput(input)}
            </div>
        </div>
    )
};

export default ShapeControlsWrapper;
