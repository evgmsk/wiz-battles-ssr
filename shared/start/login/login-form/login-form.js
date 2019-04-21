/**
 * project new-wiz-bat
 */
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import validators from '../../../common/validators';
import SmartForm, { SmartInput } from '../../../common/form/smartForm';

const LoginForm = ({className, submitButtonValue, onResponse = f => f, forgotPassword = f => f}) => {
   /* const [inProp, setInProp] = useState(false);
    useEffect(() => {
        if (!inProp) {
            setInProp(true)
        }
    });*/

    const validationSchema = {
        email: validators.email,
        password: validators.password
    };

    const values = {
        email: "",
        password: "",
    };

    const submitHandler = {
        fetch: data => axios.post('/login', data),
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
                            <SmartInput
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
                            <a href="#" onClick={forgotPassword} className="forgot-password">Forgot your password?</a>
                            <button type="submit" className="btn btn-success btn-large">{submitButtonValue}</button>
                        </React.Fragment>
                    )
                }
            }
        </SmartForm>
    )
};

export default LoginForm;
