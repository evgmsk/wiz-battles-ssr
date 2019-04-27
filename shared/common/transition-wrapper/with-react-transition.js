/**
 * project new-wiz-bat
 */
import React from 'react';
import {CSSTransition} from 'react-transition-group';

import './with-transition.scss';

const WithTransition = ({Component, inProp, timeout , ...props}) => {
    return function ComponentWrapper() {
        return (
            <CSSTransition
                in={inProp}
                timeout={timeout || 300}
                classNames="transition-wrapper"
                unmountOnExit
                appear
            >
                {Component ? <Component {...props} /> : props.children}
            </CSSTransition>

        )
    }
};

export default WithTransition;
