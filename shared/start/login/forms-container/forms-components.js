/**
 * project new-wiz-bat
 */
import React from 'react';

import Register from '../reg-form/reg-form';
import Login from '../login-form/login-form';
import ResetPassword from '../reset-password-form/reset-password-form';
import WithTransition from '../../../common/transition-wrapper/with-react-transition';
import T from '../../../translator';

export class FormControls extends React.Component {

    shouldComponentUpdate(props) {
        const {action} = this.props;
        return action !== props.action
    }
    render() {
        const {onClick, action} = this.props;
        const logBtnClassName = "btn btn-outlined" + (action === 'login' ? ' bg-active' : '');
        const regBtnClassName = "btn btn-outlined" + (action === 'signup' ? ' bg-active' : '');
        return (
            <div className="forms-controls">
                <button className={logBtnClassName} onClick={() => onClick('login')}>Login</button>
                <button className={regBtnClassName} onClick={() => onClick('signup')}>Signup</button>
            </div>
        )
    }
}

export const Message = props => {
    const {resMsg, className, ...restProps} = props;
    return (
        <div className={className} {...restProps}>
            {resMsg}
        </div>
    )
};

export class FormsContainer extends React.Component {
        shouldComponentUpdate(props) {
        const {action} = this.props;
        return props.action !== action;
    }

    render() {
        const {onResponse, forgotPassword, action} = this.props;
        // const submitButtonValue = action === 'login' ? 'Submit / login' : 'Submit / signup';
        const regFormProps = { onResponse, className:"reg-form" };
        const resetFromProps = { onResponse, className:"reset-form-wrapper" };
        const logFormProps = { onResponse, className:"log-form", forgotPassword };
        const ResetForm = WithTransition({Component:ResetPassword, inProp: action === 'reset', ...resetFromProps});
        const RegForm = WithTransition({Component:Register, inProp: action === 'signup', ...regFormProps});
        const LoginFrom = WithTransition({Component: Login, inProp: action === 'login', ...logFormProps});
        return (
            <React.Fragment>
                {action === 'reset' && <ResetForm {...resetFromProps} />}
                {action === 'signup' && <RegForm {...regFormProps} />}
                {action === 'login'  && <LoginFrom {...logFormProps} />}
            </React.Fragment>
        )
    }
}