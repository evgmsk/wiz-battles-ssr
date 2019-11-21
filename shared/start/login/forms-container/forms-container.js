import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import {
    saveRefreshToken,
    updateUserWithSaga,
    resetPassword
} from '../../../store/actions/userActions';
import {Message, FormControls, FormsContainer} from './forms-components';
import T, {funcT} from '../../../translator';

import './forms-container.scss';

export class FormsWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 'login',
            resMsg: '',
            submitFail: false,
        };
        this.submitLogForm = this.submitLogForm.bind(this);
        this.submitRegForm = this.submitRegForm.bind(this);
        this.submitResetForm = this.submitResetForm.bind(this);
        this.onClick = this.onClick.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.setAction = this.setAction.bind(this);
    }

    submitRegForm() {
        return ({
            fetch: data => {
                const {repeatPassword, ...Data} = data;
                const user = {...Data, lang: T.source.lang}
                return axios.post('/signup', user)
            },
            onResponse: res => {
                if (res.status < 300) {
                    this.setState({
                        resMsg: funcT({keys: 'res_messages.success_signup'}),
                        submitFail: false
                    });
                    setTimeout(() => this.setState({action: 'login', resMsg: ''}), 1000)
                } else if (res.response.status < 500) {
                    try {
                        const keys = `res_messages.${res.response.statusText.toString()}`;
                        this.setState({resMsg: funcT({keys}),  submitFail: true});
                    } catch(e) {
                        console.warn(e)
                    }
                    
                }
            }
        })
    }
    submitResetForm() {
        return ({
            fetch: data => {
                return resetPassword(data);
                // return axios.post('/changepass', data)
            },
            onResponse: res => {
                if (res.status < 300) {
                    this.setState({
                        resMsg: funcT({keys: 'res_messages.success_signup'}),
                        submitFail: false
                    });
                    setTimeout(() => setState({action: 'login', resMsg: ''}), 1000)
                } else if (res.response.status < 500) {
                    try {
                        const keys = `res_messages.${res.response.statusText.toString()}`;
                        setState({resMsg: funcT({keys}),  submitFail: true});
                    } catch(e) {
                        console.warn(e)
                    }
                }
            }
        })
    }

    submitLogForm() {
        return ({
            fetch: data => {
                return axios.post('/login', data)
            },
            onResponse: res => {
                const {data, response} = res;
                const {
                    saveRefreshToken,
                    updateUserWithSaga,
                    location,
                    history,
                    toggle,
                } = this.props;
                if (data) {
                    this.setState({
                        resMsg: funcT({keys: "res_messages.success_signin"}),
                        submitFail: false
                    });
                    setTimeout(() =>  {
                            toggle 
                                ? toggle()
                                : this.setState({resMsg: ''});   
                        }, 1000);
                   
                    const {refreshToken, token, userName, lang} = res.data;
                    updateUserWithSaga({token, lang, userName})
                    saveRefreshToken(refreshToken);
                    if (location && location.pathname !== '/') {
                        
                        setTimeout(() => history.push('/'), 1000);   
                    }
                         
                } else if (response && response.status < 500) {
                    try {
                        const keys = `res_messages.${res.response.statusText.toString()}`;
                        this.setState({resMsg: funcT({keys}),  submitFail: true});
                    } catch(e) {
                        console.warn(e)
                    }
                }
            }
        })
    }

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
        const {action, resMsg, submitFail} = this.state;
        const {forgotPassword, submitLogForm, submitRegForm, submitResetForm} = this;
        const msgClassName = `res-message${submitFail ? ' res-fail' : ''}${!resMsg ? ' res-hidden' : ''}`;
        const formContainerProps = {
            forgotPassword,
            submitLogForm: submitLogForm(),
            submitRegForm: submitRegForm(),
            submitResetForm: submitResetForm(),
            action
        };
        return (
            <div className={`forms-wrapper ${action}-action`} onClick={this.onClick}>
                <Message className={msgClassName} resMsg={resMsg} />
                <FormControls onClick={this.setAction} action={action} />
                <FormsContainer {...formContainerProps} />
            </div>
        );
    }
}

export default connect(null, {updateUserWithSaga, saveRefreshToken})(withRouter(FormsWrapper));
