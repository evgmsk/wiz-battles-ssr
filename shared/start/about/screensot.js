/**
 * project new-wiz-bat
 */
import React from 'react';
import PropsTypes from 'prop-types'

const Screenshot = props => (
    <div className={"game-screenshots"}>
        <div  className={`game-screenshots__screenshot${props.order}`} />
        <p className={props.captionClass || "figure-caption"}>{props.caption}</p>
    </div>
);

export default Screenshot;

Screenshot.propsTypes = {
    order: PropsTypes.number.isRequired,
    caption: PropsTypes.string.isRequired,
};
