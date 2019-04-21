/**
 * project new-wiz-bat
 */
import React from 'react';
import {CSSTransition} from 'react-transition-group';

import './with-transition.scss';

const WithTransition = ({Component, props, inProp}) => {
    return function ComponentWrapper() {
        console.log( props, inProp)
        return (
            <CSSTransition
                in={inProp}
                timeout={500}
                classNames="trans-form"
                unmountOnExit
                appear
            >
                <Component {...props} />
            </CSSTransition>

        )
    }
};

export default WithTransition;
