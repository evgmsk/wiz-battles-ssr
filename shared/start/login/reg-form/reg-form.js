/**
 * project new-wiz-bat
 */
import React, {useState, useEffect } from 'react';
import {FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

import validators from '../../../common/validators';
import SmartForm, { SmartInput } from '../../../common/form/smartForm';
import T from '../../../translator';

const SpecifiedInput = props => {
    const [shown, setShown] = useState(false);
    let {type, ...restProps } = props;
    const onClick = e => setShown(!shown);
    type = shown ? 'text' : type;

    return  <div className="reg-input-wrapper">
                <SmartInput type={type} {...restProps} />
                <span className="password-eye" onClick={onClick}>{
                    shown ? <FaEyeSlash/> : <FaEye/>
                }</span>
            </div>
};

const RegForm = ({ className, onResponse = f => f }) => {
    const [inProp, setInProp] = useState(false);
    useEffect(() => {
        if (!inProp) {
            setInProp(true)
        }
    });
    const password = {};
    const values = {
        email: "",
        password: "",
        name: "",
        repeatPassword: "",
    };
    const validationSchema = {
        name: validators.name,
        email: validators.email,
        password: validators.password,
        repeatPassword: {
            validator: (value, pass = password.value) => {
                const Value = value.trim();
                if (!Value)
                    return { msg: 'Password is required.' };
                if (Value.length < 8)
                    return { msg: 'Password too short.' };
                if (!/(?:\w+[!&^%$#*@])|(?:[!&^%$#*@]\w+)/g.test(Value))
                    return { msg: 'Password insecure. Add special character' };
                if (value !== pass)
                    return { msg: 'Passwords do not match'};
                return null;
            },
            required: true,
        },
    };

    const submitHandler = {
        fetch: data => {
            const {repeatPassword, ...Data} = data;
            // console.log(data, data.name, data);
            return axios.post('/signup', Data)
        },
        onResponse: onResponse,
    };

    return (
        <SmartForm
            className={className}
            submit={submitHandler}
            validationschema={validationSchema}
            values={values}
        >
            {
                props => {
                    const { errors, values, ...restProps} = props;
                    password.value = values.password;
                    return (
                        <React.Fragment>
                            <SmartInput
                                name="name"
                                type="text"
                                inputStyle="outlined"
                                labelStyle="like-placeholder"
                                placeholder="Your name"
                                labelText='Name'
                                argsForHandlers={['name']}
                                value={values.name}
                                error={errors.name}
                                {...restProps}
                            />
                            <SmartInput
                                name="email"
                                type="email"
                                inputStyle="outlined"
                                labelStyle="like-placeholder"
                                placeholder="example@email.com"
                                labelText='Email'
                                argsForHandlers={['email']}
                                value={values.email}
                                error={errors.email}
                                {...restProps}
                            />
                            <SpecifiedInput
                                type="password"
                                name="password"
                                labelText="Password"
                                placeholder="Your password"
                                labelStyle="like-placeholder"
                                inputStyle="outlined"
                                argsForHandlers={['password']}
                                error={errors.password}
                                value={values.password}
                                {...restProps}
                            />
                            <SpecifiedInput
                                type="password"
                                name="repeatPassword"
                                labelText="Password"
                                placeholder="Repeat your password"
                                labelStyle="like-placeholder"
                                inputStyle="outlined"
                                argsForHandlers={['repeatPassword']}
                                error={errors.repeatPassword}
                                value={values.repeatPassword}
                                {...restProps}
                            />
                            <button type="submit" className="btn  btn-filled btn-success btn-large">
                                <T keys="log_forms_fields.login_button" />
                            </button>
                        </React.Fragment>
                    )
                }
            }
        </SmartForm>
    )
};

export default RegForm;
