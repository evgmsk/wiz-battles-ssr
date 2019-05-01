/**
 * project new-wiz-bat
 */
import React, {useState, useEffect } from 'react';
import {FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

import validators from '../../../common/validators';
import SmartForm, { SmartInput } from '../../../common/form/index';
import {funcT} from '../../../translator'

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

const ResetForm = ({ className, onResponse = f => f }) => {
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
                {funcT({keys: "log_forms_fields.reset_password_msg"})}
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
                                    labelText='E-mail'
                                    argsForHandlers={['email']}
                                    value={values.email}
                                    error={errors.email}
                                    {...restProps}
                                />
                                <button type="submit" className="btn btn-filled btn-success btn-large">
                                    {funcT({keys: "log_forms_fields.reset_pass_button"})}
                                </button>
                            </React.Fragment>
                        )
                    }
                }
            </SmartForm>
        </data>

    )
};

export default ResetForm;
