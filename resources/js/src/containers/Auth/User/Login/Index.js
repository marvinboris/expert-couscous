import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Col } from 'reactstrap';

import Error from '../../../../components/Messages/Error';
import Feedback from '../../../../components/Messages/Feedback';

import NormalInput from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import { authUserLogin, setHash } from '../../../../store/actions/auth';

const Input = props => <NormalInput {...props} />

class Login extends Component {
    state = {
        email: '',
        password: '',

        visible: false,
    }


green
    // Component methods
    toggle = () => {
        this.setState(prevState => ({ modal: !prevState.modal }));
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.onAuth(e.target);
    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    eyeClickedHandler = () => this.setState(prevState => ({ visible: !prevState.visible }))



    // Lifecycle methods
    componentDidUpdate() {
        const { auth: { hash }, onSetHash, history } = this.props;
        if (hash) {
            onSetHash(hash);
            history.push('/auth/verify');
        }
    }

    render() {
        const { email, password, visible } = this.state;
        const {
            content: {
                cms: {
                    pages: { auth: { user: { login } } }
                }
            },
            auth: { loading, error, message },
        } = this.props;

        const titleContent = <div className="text-37 text-700 text-green">{login.title}</div>;

        const formContent = <>
            <Input type="email" icon="key" onChange={this.inputChangeHandler} validation={{ required: true }} value={email} name="email" required placeholder={login.email_address} />
            <Input id="password" type={visible ? "text" : "password"} className="position-relative" icon="lock" onChange={this.inputChangeHandler} validation={{ required: true }} value={password} name="password" required placeholder={login.password}
                bonus={<div className="position-absolute d-flex align-items-center" style={{ height: '100%', top: 0, right: 30, zIndex: 10, cursor: 'pointer' }} onClick={this.eyeClickedHandler}>
                    <div className="position-relative">
                        <i className="fas fa-eye text-green" />

                        <div style={!visible ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                            <div style={{ height: 1.5, width: 24, transform: 'rotate(30deg) translate(-9px, -10px)' }} className="bg-green" />
                        </div>
                    </div>
                </div>}
            />

            <div className="mt-5 pt-1 pb-2">
                <button className="btn-block btn btn-green">{login.sign_in}<i className='fas fa-sign-in-alt' /></button>
            </div>
        </>;


        const errors = <Error err={error} />;
        const feedback = <Feedback message={message} />;
        let content = null;

        if (loading) content = <div className="h-100 d-flex justify-content-center align-items-center"><Preloader /></div>;
        else content = <Form onSubmit={this.submitHandler}>
            {formContent}
        </Form>;

        return <>
            <div className="mb-5 pb-1">
                {titleContent}
            </div>
            {errors}
            {feedback}
            {content}
        </>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onAuth: data => dispatch(authUserLogin(data)),
    onSetHash: hash => dispatch(setHash(hash))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);