/**
 * project new-wiz-bat
 */
import React from 'react';
import {CSSTransition} from 'react-transition-group';

import './with-transition.scss';

const WithTransition = props => {
    const {Component, inProp, timeout, children, jsx, ...restProps} = props;
    if(jsx)
        return (
            <CSSTransition
                in={inProp}
                timeout={timeout || 300}
                classNames="transition-wrapper"
                unmountOnExit
                appear
            >
                { Component ? <Component {...restProps} /> : children}
            </CSSTransition>

        );
    else
        return () => {
            return (
                <CSSTransition
                    in={inProp}
                    timeout={timeout || 300}
                    classNames="transition-wrapper"
                    unmountOnExit
                    appear
                >
                    {Component && <Component {...restProps} />}
                </CSSTransition>
            )
        }
};

export default WithTransition;

export const WithTransitionWrapper = props => {
    const {Component, inProp, timeout, children, ...restProps} = props;
    console.log(inProp, children, typeof children, Component);
    return (
        <CSSTransition
            in={inProp}
            timeout={timeout || 300}
            classNames="transition-wrapper"
            unmountOnExit
            appear
        >
            { Component ? <Component {...restProps} /> : children}
        </CSSTransition>
    );
}