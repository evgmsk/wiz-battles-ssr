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

import ShapePropsControl from './control-input-wrapper';
import BtnWT from '../../../common/btn-with-tooltip/btn';

// console.log(typeof ShapePropsInput)

const ShapeControlsWrapper = props => {
    const {onClick, onChange, shapeProps, input} = props;
    const inputRef = React.createRef();
    const handleClick = input => {
        onClick(input)
        inputRef.current.focus();
    }
    return (
        <div className="shape-controls-wrapper">
            <BtnWT
                variant="right"
                onClick={() => handleClick('stroke-color')}
                tooltip={`Stroke color.\n
                        Current value ${shapeProps.stroke}.\n
                        Click to change`}
            >
                <FaPalette/>
            </BtnWT>
            <BtnWT
                variant="up"
                onClick={() => handleClick('stroke-width')}
                tooltip={`Stroke width.\n
                        Current value ${shapeProps.strokeWidth}.\n
                        Click to change`}
            >
                <FaArrowsAltH/>
            </BtnWT>
            <BtnWT
                variant="up"
                onClick={() => handleClick('fill-color')}
                tooltip={`Shape color.\n
                        Current value ${shapeProps.fill}.\n
                        Click to change`}
            >
                <FaFillDrip/>
            </BtnWT>
            <BtnWT
                variant="up"
                onClick={() => handleClick('tips')}
                tooltip={`Shape tips.\n
                        Current value ${shapeProps.tips}.\n
                        Click to change`}
            >
                <FaAsterisk/>
            </BtnWT>
            <BtnWT
                variant="up"
                onClick={() => handleClick('shape-size')}
                tooltip={`Shape default size.\n
                        Current value ${shapeProps.size}.\n
                        Click to change`}
            >
                <FaExpand/>
            </BtnWT>
            <BtnWT
                variant="up"
                onClick={() => handleClick('skew')}
                tooltip={`Shape skew. \n
                        Current values \n
                        skewX: ${shapeProps.skewX} \n
                        skewY: ${shapeProps.skewY}. \n
                        Click to change`} 
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
                        Click to change`} 
            >
                Offset
            </BtnWT>
            <div className="shape-control-input">
                <ShapePropsControl
                    onChange={onChange}
                    input={input}
                    shapeProps={shapeProps}
                    ref={inputRef}
                />
            </div>
        </div>
    )
};

export default ShapeControlsWrapper;
