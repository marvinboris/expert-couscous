import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Error from '../../../components/Messages/Error';
import Feedback from '../../../components/Messages/Feedback';

import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';
import SectionTitle from '../../../components/Frontend/UI/Title/SectionTitle';

import Input from '../../../components/UI/Input';

import { postContact, resetContact } from '../../../store/actions/frontend/contact';

import './Contact.scss';
import '../../../components/Frontend/UI/Blocks/ServiceBlock/ServiceBlock.scss';

const initialState = {
    name: '',
    email: '',
    message: '',
}

class Contact extends Component {
    state = { ...initialState }



    // Component methods
    saveHandler = e => {
        e.preventDefault();
        if (!this.props.frontend.contact.loading) this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    // Lifecycle methods
    componentDidUpdate(prevProps) {
        if (!prevProps.frontend.contact.message && this.props.frontend.contact.message && this.props.frontend.contact.message.type === 'success') this.setState({ ...initialState });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { contact: cms } } }
            } },
            frontend: { contact: { loading, error, message: backend_message } }
        } = this.props;
        const { name, email, message } = this.state;

        return <div className="Contact">
            <PageTitle {...cms} />

            <section className='contact'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <SectionTitle {...cms.contact} />

                            <p>{cms.contact.description}</p>
                        </div>

                        <div className='col-lg-6'>
                            <div className='row'>
                                {cms.contact.blocks.map(block => <div key={JSON.stringify(block)} className='UI ServiceBlock col'>
                                    <div className='info'>
                                        <div className='icon'><i className={'fas fa-' + block.icon} /></div>

                                        <div className='text'>
                                            <div className='title'>{block.title}</div>

                                            <div className='body'>{block.description}</div>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>

                        <div className='col-lg-6'>
                            <iframe src="https://maps.google.com/maps?q=4.079299%2C%209.718764&t=m&z=16&output=embed&iwloc=near" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                        </div>

                        <div className='col-lg-6'>
                            <p>{cms.contact.description}</p>

                            <Error err={error} />
                            <Feedback message={backend_message} />

                            <form onSubmit={this.saveHandler}>
                                <Input type='text' name='name' onChange={this.inputChangeHandler} value={name} placeholder={cms.contact.name} disabled={loading} />
                                <Input type='email' name='email' onChange={this.inputChangeHandler} value={email} placeholder={cms.contact.email} disabled={loading} />
                                <Input type='textarea' name='message' onChange={this.inputChangeHandler} value={message} placeholder={cms.contact.message} required disabled={loading} />

                                <div className='submit'>
                                    <button className={'btn btn-green' + (loading ? ' btn-disabled' : '')}>{cms.contact.submit}<i className='fas fa-paper-plane' /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    post: data => dispatch(postContact(data)),
    reset: () => dispatch(resetContact()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contact));