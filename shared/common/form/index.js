/**
 * project new-wiz-bat
 */

import React from'react';
import PropTypes from 'prop-types';

import SmartInput from './input/input';
import SmartSelect from './smart-select/smart-select';

import './form.scss';

class SmartForm extends React.Component {
    static compare(newState, oldState) {
        for (let key in newState) {
            if (newState.hasOwnProperty(key)) {
                if(typeof oldState[key] === 'object' && oldState[key] !== null)
                    return compare(oldState[key], newState[key]);
                else {
                    if (oldState[key] !== newState[key]) {
                        return true
                    }
                }
            }
        }
        return false;
    }

    static findInput(node) {
        if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' || node.tagName === 'SELECT')
            return node;
        else if (node.length > 1) {
            let i = 0;
            while (i < node.length)  {
                const input = SmartForm.findInput(node[i]);
                if (input)
                    return input
            }
        } else if (node.children)
            return SmartForm.findInput(node.children);
    }

    static resetErrors(values) {
        const errors = {};
        for (let prop in  values) {
            if (values.hasOwnProperty(prop)) {
                if (!Array.isArray(values[prop])) {
                    errors[prop] = null;
                } else {
                    errors[prop] = [];
                    values[prop].forEach((value, i) => {
                        Object.keys(value).forEach(key => {
                            errors[prop][i] = errors[prop][i] ? errors[prop][i] : {};
                            errors[prop][i][key] = null;
                        })
                    });
                }
            }
        }
        return errors;
    }

    constructor(props) {
        super(props);
        this.initialValues = {...props.values};
        this.state = {
            resStatus: null,
            resMessage: '',
            values: props.values,
            errors: props.errors || SmartForm.resetErrors(props.values),
            successfullySubmitted: false,
            isValidating: false,
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addChild = this.addChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
        this.handleOnEnter = this.handleOnEnter.bind(this);
        this.refToForm = React.createRef();
    }

    shouldComponentUpdate(props, newState) {
        return !((newState.isValidating !== this.state.isValidating)
            && !SmartForm.compare(newState.errors, this.state.errors));
    }

    addChild(e, name, child) {
        e.preventDefault();
        e.stopPropagation();
        this.setState(({ values, errors }) => {
            const error = {...child};
            Object.keys(error).forEach(key => {
                error[key] = null;
            });
            const newValues = {...values, [name]:[...values[name], child]};
            const newErrors = {...errors, [name]:[...errors[name], error]};
            return { values: newValues, errors: newErrors }
        });
    };

    removeChild(e, name, index) {
        e.preventDefault();
        e.stopPropagation();
        this.setState(({values, errors}) => {
            if (values[name].length > 1) {
                const newValues = {
                    ...values,
                    [name]: values[name].filter((item, i) => i.toString() !== index.toString())};
                const newErrors = {
                    ...errors,
                    [name]: errors[name].filter((item, i) => i.toString() !== index.toString())};
                return { values: newValues, errors: newErrors }
            }
        });
    };

    handleReset() {
        this.setState( {values: this.initialValues, errors: SmartForm.resetErrors(this.initialValues)})
    }

    handleOnEnter(e) {
        if (this.state.isValidating)
            return;
        const target = e.target;
        if (e.key === 'Enter' && target.type === 'submit') {
            this.handleSubmit(e);
        } else if (e.key === 'Enter' && target.tagName !== 'BUTTON'){
            e.stopPropagation();
        } else if (e.key === 'Tab' && target.type === 'submit') {
            const formChildren = this.refToForm.current.children;
            const input = SmartForm.findInput(formChildren);
            if (input) {
                e.preventDefault();
                input.focus();
            }
        }
    }

    handleOnClick({target}) {
        if (this.state.isValidating)
            return;
        if (target.type === 'reset' && (target.tagName === 'INPUT' || target.tagName === 'BUTTON')) {
            this.handleReset()
        }
    }

    handleOnChange(e, Name, index) {
        if (this.state.isValidating)
            return;
        const {name, value, type} = e.target;
        Name = Name || name;
        const  error = this.state.errors[Name];
        const isArray = Array.isArray(error);
        if (error && !isArray || isArray && error[index][name])
            this.handleOnBlur(e, Name, index);
        this.setState(state => {
            const values = {...state.values};
            if (!(Name in values))
                throw Error(`Form 'values' and input name: ${name} do not match or do not set appropriately`);
            if(type === 'checkbox') {
                const newValue = values[Name] ? "" : value;
                return {values: {...values, [Name]: newValue}};
            }
            if (!Array.isArray(values[Name]))
                return {values: {...values, [Name]: value}};
            else {
                values[Name][index] = {...values[Name][index], [name]: value};
                return {values}
            }
        })
    }

    handleOnBlur(e, Name, index) {
        if (this.state.isValidating)
            return;
        const {name, value} = e.target;
        Name = Name || name;
        const { validationschema } = this.props;
        if (!validationschema[name].required)
            return;
        const error = validationschema[name].validator(value);
        this.setState(state => {
            const errors = {...state.errors};
            if (!(Name in errors))
                throw new Error(`Form 'values' and input name: ${name} do not match or do not set appropriately`);
            if (!Array.isArray(errors[Name]))
                return { errors: {...errors, [Name]: error}};
            else {
                errors[Name][index][name] = error;
                return { errors }
            }
        })
    }

    validateField(key, value, errors) {
        const {validationschema} = this.props;
        if (validationschema[key].required) {
            const error = validationschema[key].validator(value);
            if (error) {
                errors[key] = error;
                return true;
            } else {
                errors[key] = null;
            }
        } else {
            errors[key] = null;
        }
        return false;
    }

    validateArrayOfFields(key, value, errors) {
        let invalid = false;
        const {validationschema} = this.props;
        value.forEach((v, i) => {
            const names = Object.keys(v);
            names.forEach(name => {
                const valueToCheck = v[names[i]].trim();
                value[i][name] = valueToCheck;
                if (validationschema[name].required) {
                    const error = validationschema[name].validator(valueToCheck);
                    if (error) {
                        invalid = true;
                        errors[key][i][name] = error;
                    }
                }
            });
        });
        return invalid;
    }

    validateForm() {
        let invalidForm = false;
        const values = {...this.state.values};
        const errors = {...this.state.errors};
        for (let key in values) {
            if (values.hasOwnProperty(key)) {
                const value = values[key];
                if (Array.isArray(value)) {
                    invalidForm = this.validateArrayOfFields(key, value, errors)
                } else {
                    const valueToCheck = value.trim();
                    values[key] = valueToCheck;
                    invalidForm = this.validateField(key, valueToCheck, errors)
                }
            }
        }
        this.setState({errors, values, isValidating: false});
        return {invalidForm, values};
    }

    validateAndFetch() {
        const {invalidForm, values} = this.validateForm();
        if (invalidForm)
            return;
        const fetchResult = this.props.submit.fetch(values);
        if (!fetchResult.then) {
            return this.props.submit.onResponse(true);
        }
        fetchResult.then(res => {
            // console.log(res);
            if (res.status < 300) {
                this.setState(state => {
                    return {...state, successfullySubmitted: true, values: this.initialValues}
                }, this.props.submit.onResponse(res));
            } else
                this.props.submit.onResponse(res)
        }).catch(error => this.props.submit.onResponse(error));
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log('submit')
        const {successfullySubmitted, isValidating} = this.state;
        if (successfullySubmitted || isValidating) {
            return;
        }
        this.setState({isValidating:true}, this.validateAndFetch);
    }

    render() {
        const { errors, values } = this.state;
        const propsForChildren = {
            values,
            errors,
            addChild: this.addChild,
            removeChild: this.removeChild,
            onClick: this.handleOnClick,
            onBlur: this.handleOnBlur,
            onChange: this.handleOnChange,
        };
        console.log(this.state, propsForChildren);
        const {children, ...restProps} = this.props;
        return (
            <React.Fragment>
                <form
                    onSubmit={this.props.onSubmit || this.handleSubmit}
                    onKeyDown={this.props.onKeyDown || this.handleOnEnter}
                    className={this.props.className}
                    name="smart-form"
                    ref={this.refToForm}
                    {...restProps}
                >
                    {children(propsForChildren)}
                </form>
            </React.Fragment>
            );
    }
}

export default SmartForm;

SmartForm.propTypes = {
    onSubmit: PropTypes.func,
    onKeyDown: PropTypes.func,
    submit: function(props, submit) {
        const Submit = props[submit];
        if (typeof Submit !== 'undefined' && typeof Submit !== 'object') {
            return new Error(
                `Invalid prop ${submit} supplied to Input. Submit must be object.`
            );
        } else if (typeof Submit === 'object' && (typeof Submit.fetch !== 'function' || typeof Submit.onResponse !== 'function')) {
            return new Error(
                `Invalid prop ${submit} supplied to Input. Submit must have two properties: 'fetch' and 'onResponse'. Both must be function`
            );
        }
    },
    validationschema: function(props, validationschema) {
        if (typeof props[validationschema] !== 'object') {
            return new Error(
                `Invalid prop ${validationschema} supplied to Input. Validationschema is required and must be object.`
            );
        } else if (props[validationschema].required && !props[validationschema].validator)
            return new Error(
                `Invalid prop ${validationschema} supplied to Input. Validationschema must have 'required' property and must have 'validator' property if 'required' is true.`
            );
    },
    values: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
};

export { SmartInput, SmartSelect };
