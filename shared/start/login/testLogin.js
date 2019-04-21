/**
 * project new-wiz-bat
 */
import React from 'react';

import SmartForm, { SmartInput } from '../../common/form/smartForm';

import './login-form/login.scss';

const validationSchema = {
    name: {
        validator: value => {
            const Value = value.trim();
            if (!Value)
                return { msg: 'Name is required.' };
            return /^\w+/.test(Value) ? null : {msg: 'Invalid Name.'}
        },
        required: true,
    },
    email: {
        validator: value => {
            const Value = value.trim();
            if (!Value)
                return { msg: 'Email is required.' };
            return /^\w+@\w+\.\w{1,3}$/.test(Value) ? null : {msg: 'Invalid email.'}
        },
        required: true,
    },
    password: {
        validator: value => {
            const Value = value.trim();
            if (!Value)
                return { msg: 'Password is required.' };
            if (Value.length < 8)
                return { msg: 'Password too short.' };
            if (!/[!&^%$#*_@]/g.test(Value))
                return { msg: 'Password insecure. Add special character' };
            return null;
        },
        required: true,
    },
    age: {
        validator: value => {
            if (!value)
                return { msg: 'This field is required'};
            if (value < 5 || value > 120)
                return { msg: 'Invalid age'};
            return null;
        },
        required: true,
    },
    date: {
        validator: value => value ? null : { msg: 'This field is required'},
        required: true,
    },
    country: {
        required: false,
    },
    sex: {
        required: false,
    },
    dinner: {
        required: false
    },
    breakfast: {
        required: false
    },
    reset: {
        required: false
    },
};

const values = {
    emails: [{email: "", name: ""}],
    password: "",
    age: "",
    country: "",
    date: "",
    sex: 'male',
    breakfast: '',
    dinner: ''
};


const LoginForm = (props) => {
    const submitHandler = {
        fetch: () => new Promise((resolve, reject) => {
            resolve('hi');
        }),
        onSuccessSubmit: f => f,
    };

    return (
    <React.Fragment>
        <SmartForm
            className="my-smart-form"
            submit={submitHandler}
            validationschema={validationSchema}
            values={values}
        >
            {
                props => {
                    const { errors, values, addChild, removeChild, ...restProps} = props;
                    return (
                        <React.Fragment>
                            <SmartInput
                                tag="select"
                                name="country"
                                type="select"
                                labelStyle="in-col"
                                inputStyle="shadowed"
                                labelText='Country'
                                argsForHandlers={['country']}
                                fieldoptions={[{value: '', text: 'Choose country'}, {value: 'USA', text: 'USA'}, {value: 'German', text: 'German'}]}
                                value={values.country}
                                error={errors.country}
                                {...restProps}
                            />
                            { props.values.emails.map((email, i) => {

                                return (
                                    <div key={`${i}`} className="email-wrapper">
                                        <SmartInput
                                            type="text"
                                            placeholder="Your name"
                                            name="name"
                                            labelText="Name"
                                            labelStyle="like-placeholder"
                                            inputStyle="outlined"
                                            error={errors.emails[i].name}
                                            value={values.emails[i].name}
                                            argsForHandlers={['emails', i]}
                                            {...restProps}
                                        />
                                        <SmartInput
                                            type="email"
                                            placeholder="example@email.com"
                                            name="email"
                                            labelText="Email"
                                            labelStyle="like-placeholder"
                                            inputStyle="shadowed"
                                            error={errors.emails[i].email}
                                            value={values.emails[i].email}
                                            argsForHandlers={['emails', i]}
                                            {...restProps}
                                        />
                                        <button type="button" className="btn btn-primary btn-outlined" onClick={e => addChild(e, 'emails', {name: '', email: ''})}>
                                            Add email
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={e => removeChild(e, 'emails', i)}>
                                            X
                                        </button>
                                    </div>
                                )
                            })}
                            <SmartInput
                                tag="input"
                                type="password"
                                name="password"
                                labelText="Password"
                                placeholder="Your password"
                                labelStyle="like-placeholder"
                                argsForHandlers={['password']}
                                error={errors.password}
                                value={values.password}
                                {...restProps}
                            />
                            <div className="radio-wrapper">
                                <SmartInput
                                    name="sex"
                                    type="radio"
                                    labelText="Male"
                                    labelStyle="in-row"
                                    argsForHandlers={['sex']}
                                    value="male"
                                    defaultChecked
                                    {...restProps}
                                />
                                <SmartInput
                                    name="sex"
                                    type="radio"
                                    labelText="Female"
                                    labelStyle="in-row"
                                    argsForHandlers={['sex']}
                                    value="female"
                                    {...restProps}
                                />
                            </div>
                            <div>Select required services</div>
                            <div className="radio-wrapper">
                                <SmartInput
                                    name="breakfast"
                                    type="checkbox"
                                    labelText="Breakfast"
                                    labelStyle="in-row"
                                    argsForHandlers={['breakfast']}
                                    value="breakfast"
                                    {...restProps}
                                />
                                <SmartInput
                                    name="dinner"
                                    type="checkbox"
                                    labelText="Dinner"
                                    labelStyle="in-row"
                                    argsForHandlers={['dinner']}
                                    value="dinner"
                                    {...restProps}
                                />
                            </div>
                            <SmartInput
                                type="number"
                                name="age"
                                min="5"
                                max="120"
                                labelText="Age"
                                labelStyle="in-col"
                                inputStyle="shadowed"
                                placeholder="Your age"
                                value={values.age}
                                error={errors.age}
                                argsForHandlers={['age']}
                                {...restProps}
                            />
                            <SmartInput
                                className=""
                                type="reset"
                                name="reset"
                                value="Reset"
                                argsForHandlers={['reset']}
                                {...restProps}
                            />
                            <SmartInput
                                type="date"
                                name="date"
                                labelText="Date"
                                labelStyle="in-row"
                                inputStyle="shadowed"
                                value={values.date}
                                error={errors.date}
                                argsForHandlers={['date']}
                                {...restProps}
                            />
                            <button type="submit" className="btn btn-success btn-outlined">Submit</button>
                            <div className="test-buttons-wrapper">
                                <button type="button" className="btn">Test Btn</button>
                                <button type="button" className="btn btn-danger">Test Btn</button>
                                <button type="button" className="btn btn-info">Test Btn</button>
                                <button type="button" className="btn btn-large btn-secondary btn-outlined">Test Btn</button>
                                <button type="button" className="btn btn-warning" disabled>Test Btn</button>
                                <button type="button" className="btn btn-primary btn-small" >Test Btn</button>
                                <button type="button" className="btn btn-warning btn-outlined">Test</button>
                                <button type="button" className="btn btn-large btn-dark">Test</button>
                            </div>
                        </React.Fragment>
                    )
                }
            }
        </SmartForm>
    </React.Fragment>

    )
};

export default LoginForm;
