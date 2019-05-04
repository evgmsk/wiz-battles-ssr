/**
 * project new-wiz-bat
 */
import React from'react';
import PropTypes from 'prop-types';

import SmartInput from './input/input';
import SmartSelect from './smart-select/smart-select';

import './form.scss';
import { fromBits } from 'long';

class SmartForm extends React.Component {
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
            values: props.values,
            errors: props.errors || SmartForm.resetErrors(props.values),
            isValidating: false,
            isSubmitting: false,
            successfullySubmitted: false,
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
        return !(newState.isValidating !== this.state.isValidating 
            && newState.isSubmitting === this.state.isSubmitting
            && JSON.stringify(newState.errors) === JSON.stringify(this.state.errors))
    }

    componentWillUnmount() {
        // console.log('unmount')
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
        this.setState({values: this.initialValues, errors: SmartForm.resetErrors(this.initialValues)})
    }

    handleOnEnter(e) {
        const {isSubmitting, isValidating, successfullySubmitted} = this.state;
        if (isValidating || isSubmitting || successfullySubmitted)
            return;
        const {key, target: {type}} = e;
        if (key === 'Tab' && type === 'submit') {
            const formChildren = this.refToForm.current.children;
            const input = SmartForm.findInput(formChildren);
            if (input) {
                e.preventDefault();
                input.focus();
            }
        }
    }

    handleOnClick({target}) {
        const {isSubmitting, isValidating, successfullySubmitted} = this.state;
        if (isValidating || isSubmitting || successfullySubmitted)
            return;
        if (target.type === 'reset' 
            && (target.tagName === 'INPUT' || target.tagName === 'BUTTON')) {
            this.handleReset()
        }
    }

    handleOnChange(e, Name, index) {
        const {isSubmitting, isValidating, successfullySubmitted} = this.state;
        if (isValidating || isSubmitting || successfullySubmitted)
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
        const {isSubmitting, isValidating, successfullySubmitted} = this.state;
        if (isValidating || isSubmitting || successfullySubmitted)
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

    validateField(key, value, errors, form) {
        const {validationschema} = this.props;
        if (validationschema[key].required) {
            const error = validationschema[key].validator(value);
            console.log(error)
            if (error) {
                errors[key] = error;
                form.invalid = true;
            } 
        } 
    }

    validateArrayOfFields(key, value, errors, form) {
        const {validationschema} = this.props;
        value.forEach((v, i) => {
            const names = Object.keys(v);
            names.forEach(name => {
                const valueToCheck = v[names[i]].trim();
                value[i][name] = valueToCheck;
                if (validationschema[name].required) {
                    const error = validationschema[name].validator(valueToCheck);
                    if (error) {
                        form.invalid = true;
                        errors[key][i][name] = error;
                    }
                }
            });
        });
    }

    validateForm() {
        const form = {invalid: false};
        const values = {...this.state.values};
        const errors = {...this.state.errors};
        for (let key in values) {
            if (values.hasOwnProperty(key)) {
                const value = values[key];
                if (Array.isArray(value)) {
                    this.validateArrayOfFields(key, value, errors, form)
                } else {
                    const valueToCheck = value.trim();
                    values[key] = valueToCheck;
                    this.validateField(key, valueToCheck, errors, form)
                }
            }
        }
        this.setState({errors, values, isValidating: false});
        return {invalidForm: form.invalid, values};
    }

    validateAndFetch() {
        const {invalidForm, values} = this.validateForm();
        console.log(invalidForm, values)
        if (invalidForm)
            return;
        this.setState({isValidating: false, isSubmitting: true})
        const fetchResult = this.props.submit.fetch(values);
        if (!fetchResult || fetchResult && !fetchResult.then) {
            this.setState({
                isSubmitting: false,
                successfullySubmitted: true,
                values: this.initialValues,
            })
            return this.props.submit.onResponse({status: 200, msg: "Successfuly submitted"});
        }
        fetchResult.then(res => {
            this.setState({
                isSubmitting: false,
                successfullySubmitted: true,
                values: this.initialValues
            });
            this.props.submit.onResponse(res);                
        }).catch(error => {
            this.setState({isSubmitting: false});
            this.props.submit.onResponse(error);
        })
    }

    handleSubmit(event) {
        console.log('sub')
        if (event)
            event.preventDefault();
        const {isSubmitting, isValidating, successfullySubmitted} = this.state;
        if (isValidating || isSubmitting || successfullySubmitted)
            return;
        this.setState({isValidating:true}, this.validateAndFetch);
    }
    
    render() {
        console.log(this.state)
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
        const {children, ...restProps} = this.props;
        return (
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
