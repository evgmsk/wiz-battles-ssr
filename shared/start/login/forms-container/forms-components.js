import React from 'react';

import Register from '../reg-form/reg-form';
import Login from '../login-form/login-form';
import ResetPassword from '../reset-password-form/reset-password-form';
import WithTransition, {WithTransitionWrapper} from '../../../common/transition-wrapper/with-react-transition';
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
        const {submitRegForm, submitLogForm, submitResetForm, forgotPassword, action} = this.props;
        const regFormProps = { submitHandler: submitRegForm, className:"reg-form" };
        const resetFromProps = { submitHandler: submitResetForm, className:"reset-form-wrapper" };
        const logFormProps = { submitHandler: submitLogForm, className:"log-form", forgotPassword };
        const ResetForm = <WithTransition jsx Component={ResetPassword} inProp={action === 'reset'} {...resetFromProps} />;
        const RegForm = <WithTransition jsx Component={Register} inProp={action === 'signup'} {...regFormProps} />;
        const LoginFrom = <WithTransition jsx Component={Login} inProp={action === 'login'} {...logFormProps}/>;
        return (
            <React.Fragment>
                {action === 'reset' && ResetForm}
                {action === 'signup' && RegForm}
                {action === 'login'  && LoginFrom}
            </React.Fragment>
        )
    }
}
