/**
 * project wiz-battles-ssr
 */
import React from 'react';

import {} from 'react-icons/fa';

import './control-input-wrapper.scss';

// export const SelectWrapper = React.forwardRef((props, ref) => {
//     return (

//     )
// })

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

export const InputWrapperLayres = props => {
    const {label, id, indicator, value, children} = props;
    return (
        <div className="input-wrapper" id={id}>
            <p>{label}</p>
            {children}
            {indicator && <span className="indicator-value">{value}</span>}
        </div>
    )
}



export const ShapePropsControl = React.forwardRef((props, ref) => {
    // console.log(props)
    const {input, shapeProps, onChange, selectedShape} = props;
    switch (input) {
        case 'stroke-color':
            return (
                <InputWrapper
                    id="stroke"
                    ref={ref}
                    type="color"
                    value={shapeProps.stroke}
                    // defaultValue={shapeProps.stroke}
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
                        value={selectedShape.props.skewX.toFixed(1)}
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
                        value={sselectedShape.props.skewY.toFixed(1)}
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
                        value={selectedShape.props.offsetX}
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
                        value={selectedShape.props.offsetY}
                        label={'OffsetY'}
                        indicator
                        onChange={onChange}
                    />
                </div>
            );
        case 'layers':
                return (
                    <InputWrapperLayres
                        id="layerUp"
                        type="number"
                        value={selectedShape.props.layerUp}
                        label={'Layer'}
                        indicator
                    >
                        {props.layersChildren}
                    </InputWrapperLayres>
                )
        default:
            return <div/>
    }
});

export default ShapePropsControl;
