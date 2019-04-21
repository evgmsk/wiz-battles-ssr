/**
 * project WizBattle
 */
import React from 'react';
import { Stage, Layer } from 'react-konva';
import DrawLayer from '../../common/shape-classes/shape-class';

const DrawStageWrapper = props => {
    // console.log(props)
    return (
        <div className="draw-stage-wrapper">
            <Stage
                className="draw-stage"
                width={props.drawWidth}
                height={props.drawHeight}
                onMouseMove={props.onMouseMove}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
            >
                <DrawLayer shapes={props.shapes} />
            </Stage>
        </div>
    );
};

export default DrawStageWrapper;
