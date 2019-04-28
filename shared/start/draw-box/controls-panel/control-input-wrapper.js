/**
 * project wiz-battles-ssr
 */
import React from 'react';

import './control-input-wrapper.scss';

export const InputWrapper = React.forwardRef((props, ref) => {
    const {label, id, indicator, value, ...restProps} = props;
    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input
                ref={ref}
                id={id}
                value={value}
                {...restProps}
            />
            {indicator && <span className="indicator-value">{value}</span>}
        </div>
    )
});

export const ShapePropsControl = React.forwardRef((props, ref) => {
    const {input, shapeProps, onChange} = props;
    switch (input) {
        case 'stroke-color':
            return (
                <InputWrapper
                    id="stroke"
                    ref={ref}
                    type="color"
                    value={shapeProps.stroke}
                    label={'Stroke color'}
                    onChange={onChange}
                />
            );
        case "stroke-width":
            return (
                <InputWrapper
                    id="strokeWidth"
                    ref={ref}
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={shapeProps.strokeWidth}
                    label={'Stroke width'}
                    indicator
                    onChange={onChange}
                />
            );
        case "fill-color":
            return (
                <InputWrapper
                    id="fill"
                    ref={ref}
                    type="color"
                    value={shapeProps.fill}
                    label={'Shape color'}
                    onChange={onChange}
                />
            );
        case "tips":
            return (
                <InputWrapper
                    id="tips"
                    ref={ref}
                    type="range"
                    min="3"
                    max="50"
                    step="1"
                    value={shapeProps.tips}
                    indicator
                    label={'Tips number'}
                    onChange={onChange}
                />
            );
        case 'shape-size':
            return (
                <InputWrapper
                    id="size"
                    ref={ref}
                    type="range"
                    min="0"
                    max="150"
                    step="1"
                    value={shapeProps.size}
                    indicator
                    label={'Shape size'}
                    onChange={onChange}
                />
            );
        case 'skew':
            return (
                <div className="inputs-container">
                    <InputWrapper
                        id="skewX"
                        ref={ref}
                        type="range"
                        min="-9"
                        max="11"
                        step="0.1"
                        value={shapeProps.skewX.toFixed(1)}
                        label={'SkewX'}
                        indicator
                        onChange={onChange}
                    />
                    <InputWrapper
                        id="skewY"
                        type="range"
                        min="-9"
                        max="11"
                        step="0.1"
                        value={shapeProps.skewY.toFixed(1)}
                        label={'SkewY'}
                        indicator
                        onChange={onChange}
                    />
                </div>
            );
        case 'offset':
            return (
                <div className="inputs-container">
                    <InputWrapper
                        id="offsetX"
                        ref={ref}
                        type="range"
                        min="-199"
                        max="201"
                        step="1"
                        value={shapeProps.offsetX}
                        label={'OffsetX'}
                        indicator 
                        onChange={onChange}
                    />
                    <InputWrapper
                        id="offsetY"
                        type="range"
                        min="-199"
                        max="201"
                        step="1"
                        value={shapeProps.offsetY}
                        label={'OffsetY'}
                        indicator
                        onChange={onChange}
                    />
                </div>
            );
        default:
            return <div/>
    }
});

export default ShapePropsControl;
