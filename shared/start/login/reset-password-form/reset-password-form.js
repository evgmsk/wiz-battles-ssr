/**
 * project new-wiz-bat
 */
import React, {useState, useEffect } from 'react';
import {FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

import validators from '../../../common/validators';
import SmartForm, { SmartInput } from '../../../common/form/smartForm';

const SpecifiedInput = props => {
    const [shown, setShown] = useState(false);
    let {type, ...restProps } = props;
    const onClick = e => setShown(!shown);
    type = shown ? 'text' : type;

    return  <div className="reg-form-wrapper">
        <SmartInput type={type} {...restProps} />
        <span className="password-eye" onClick={onClick}>{
            shown ? <FaEyeSlash/> : <FaEye/>
        }</span>
    </div>
};

const ResetForm = ({ className, submitButtonValue, onResponse = f => f }) => {
    const values = {
        email: "",
    };
    const validationSchema = {
        email: validators.email,
    };

    const submitHandler = {
        fetch: data => {
            const {repeatPassword, ...Data} = data;
            return axios.post('/reset-password', Data)
        },
        onResponse: onResponse,
    };

    return (
        <data className={className}>
            <div className="reset-password-title">
                To reset your password, enter your email address used for registration and submit. An email will be sent to you with instructions about how to complete the process.
            </div>
            <SmartForm
                className="my-reset-form"
                submit={submitHandler}
                validationschema={validationSchema}
                values={values}
            >
                {
                    props => {
                        const { errors, values, ...restProps} = props;
                        return (
                            <React.Fragment>
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
                                <button type="submit" className="btn btn-success btn-large">Reset password</button>
                            </React.Fragment>
                        )
                    }
                }
            </SmartForm>
        </data>

    )
};

export default ResetForm;
