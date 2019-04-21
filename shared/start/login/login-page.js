/**
 * project new-wiz-bat
 */
import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {saveUserName, saveToken, saveRefreshToken} from '../../store/actions/appActions';
import {Message, FormControls, FormsContainer} from './log-page-components';
import Page from '../../common/page/page';
import {funcT} from '../../assets/i18n/translator';

import './login-page.scss';

class FormsWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 'login',
            resMsg: '',
            submitFail: false,
        };
        this.onResponse = this.onResponse.bind(this);
        this.onClick = this.onClick.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.setAction = this.setAction.bind(this);
    }

    onResponse(res) {
        const {saveUserName, saveRefreshToken, saveToken} = this.props;
        console.log(res, res.body, res.original, res.response, res.status);
        const {action} = this.state;
        if (res.status < 300) {
            if (action === 'login') {
                this.setState({resMsg: "Your successfully logged", submitFail: false});
                const data = res.data;
                saveUserName(data.userName);
                saveToken(data.token);
                saveRefreshToken(data.refreshToken);
                setTimeout(() => this.props.history.push('/'), 1000)

            } else if(action === 'signup') {
                this.setState({resMsg: funcT({keys: 'res_messages.success_signup'}), submitFail: false});
                setTimeout(() => this.setState({action: 'login', resMsg: ''}), 1000)
            } else if(action === 'reset') {
                this.setState({resMsg: "Instructions to restore password send on your email", submitFail: false});
                // setTimeout(() => this.setState({action: 'login', resMsg: ''}), 1500)
            }
        } else {
            this.setState({resMsg: res.response.statusText,  submitFail: true});
        }
    };

    forgotPassword() {
        this.setState({action: 'reset'});
    }

    onClick() {
        if(!this.state.resMsg)
            return;
        this.setState({resMsg: '', submitFail: false})
    };

    setAction(action) {
        this.setState({action})
    }

    render() {
        const {action ,resMsg, submitFail} = this.state;
        const [forgotPassword, onResponse] = [this.forgotPassword, this.onResponse];
        const msgClassName = 'res-message' + (submitFail ? ' res-fail' : '') + (!resMsg ? ' res-hidden' : '');
        const formContainerProps = {forgotPassword, onResponse, action};
        return (
                <div className={`forms-wrapper ${action}-action`} onClick={this.onClick}>
                    <Message className={msgClassName} resMsg={resMsg} />
                    <FormControls onClick={this.setAction} action={action} />
                    <FormsContainer {...formContainerProps} />
                </div>
        );
    }
}

export const FormsWrapperConnected = connect(null, {saveUserName, saveRefreshToken, saveToken})(withRouter(FormsWrapper));

const LogRegPage = ({className, ...restProps}) =>
    <Page className={className || "login-page"} {...restProps}><FormsWrapperConnected/></Page>;

export default LogRegPage;
