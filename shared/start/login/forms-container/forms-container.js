/**
 * project wiz-battles-ssr
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {saveUserName, saveToken, saveRefreshToken} from '../../../store/actions/appActions';
import {Message, FormControls, FormsContainer} from './forms-components';
import {funcT} from '../../../translator';

import './forms-container.scss';

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
        const {saveUserName, saveRefreshToken, saveToken, location: {pathname}, history} = this.props;
        const {action} = this.state;
        if (res.status < 300) {
            if (action === 'login') {
                this.setState({
                    resMsg: funcT({keys: "res_messages.success_signin"}),
                    submitFail: false
                });
                setTimeout(() =>  {this.setState({resMsg: ''}); this.props.toggle()}, 1000);
               
                const data = res.data;
                saveUserName(data.userName);
                saveToken(data.token);
                saveRefreshToken(data.refreshToken);
                if (pathname !== '/')
                    setTimeout(() => history.push('/'), 1000);

            } else if(action === 'signup') {
                this.setState({
                    resMsg: funcT({keys: 'res_messages.success_signup'}),
                    submitFail: false
                });
                setTimeout(() => this.setState({action: 'login', resMsg: ''}), 1000)
            } else if(action === 'reset') {
                this.setState({
                    resMsg: funcT({keys: 'res_messages.success_pass_reset'}),
                    submitFail: false
                });
                // setTimeout(() => this.setState({action: 'login', resMsg: ''}), 1500)
            }
        } else if (res.response.status < 500) {
            const keys = `res_messages.${res.response.statusText.toString()}`;
            this.setState({resMsg: funcT({keys}),  submitFail: true});
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

export default connect(null, {saveUserName, saveRefreshToken, saveToken})(withRouter(FormsWrapper));
