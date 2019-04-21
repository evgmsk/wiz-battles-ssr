/**
 * project new-wiz-bat
 */
import React from 'react';
import loadable from '@loadable/component';
import Spinner from '../common/spinner/spinner'

export const DynamicImportWay = loadable(props => import(`../${props.path}`), {
    fallback: <Spinner className="spinner" />
});

export const DynamicImportNear = loadable(props => import(`./${props.path}`), {
    fallback: <Spinner className="spinner" />
});
