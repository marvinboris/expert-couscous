import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';

import Input from '../../../components/UI/Input';
import Error from '../../../components/Messages/Error';
import Feedback from '../../../components/Messages/Feedback';
import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';
import SectionTitle from '../../../components/Frontend/UI/Title/SectionTitle';

import ServiceBlock from '../../../components/Frontend/UI/Blocks/ServiceBlock';
import TeamMemberBlock from '../../../components/Frontend/UI/Blocks/TeamMemberBlock';

import { getAbout, resetAbout } from '../../../store/actions/frontend/about';
import { postNewsletter, resetHome } from '../../../store/actions/frontend/home';
import { postContact, resetContact } from '../../../store/actions/frontend/contact';

import './About.scss';

const initialState = {
    home_name: '',
    home_email: '',

    contact_name: '',
    contact_email: '',
    contact_message: '',
}

class About extends Component {
    state = { ...initialState }



    // Component methods
    newsletterHandler = e => {
        e.preventDefault();
        if (!this.props.frontend.home.loading) this.props.newsletter(e.target);
    }

    saveHandler = e => {
        e.preventDefault();
        if (!this.props.frontend.contact.loading) this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }



    // Lifecycle methods
    componentDidMount() {
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { about: cms } } }
            }, services },
            frontend: {
                home: { loading: home_loading, error: home_error, message: home_backend_message },
                about: { team = [] },
                contact: { loading: contact_loading, error: contact_error, message: contact_backend_message },
            }
        } = this.props;
        const { home_name, home_email, contact_name, contact_email, contact_message } = this.state;
        const lang = localStorage.getItem('lang');

        const servicesContent = services.map(service => <div key={JSON.stringify(service)} className='col-md-6 col-xxl-4'><ServiceBlock {...service} /></div>);
        const teamContent = team.map(member => <TeamMemberBlock key={JSON.stringify(member)} {...{ ...member, job: member.job[lang] }} />);

        return <div className="About">
            <PageTitle {...cms} />

            <section className='about'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={cms.about.photo} className='img-fluid' />
                        </div>

                        <div className='col-md-8'>
                            <SectionTitle {...cms.about} />

                            <div className='row'>
                                <div className='col-md-6'>
                                    <p dangerouslySetInnerHTML={{ __html: cms.about.values }} />
                                </div>

                                <div className='col-md-6'>
                                    <p dangerouslySetInnerHTML={{ __html: cms.about.mission }} />

                                    <p dangerouslySetInnerHTML={{ __html: cms.about.vision }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='team'>
                <div className='container'>
                    <SectionTitle {...cms.team} />

                    {team.length > 0 && <OwlCarousel ref="team-carousel" options={{ responsive: { 0: { items: 1 }, 600: { items: 2 }, 900: { items: 3 }, 1200: { items: 4 } }, dots: false, margin: 20 }}>{teamContent}</OwlCarousel>}
                </div>
            </section>

            <section className='services'>
                <div className='container'>
                    <SectionTitle {...cms.services} />

                    <div className='row'>
                        {servicesContent}
                    </div>
                </div>
            </section>

            <section className='contact'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <SectionTitle {...cms.contact} />

                            <p>{cms.contact.description}</p>

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
                            <Error err={contact_error} />
                            <Feedback message={contact_backend_message} />

                            <form onSubmit={this.saveHandler}>
                                <Input type='text' id='contact_name' name='name' onChange={this.inputChangeHandler} value={contact_name} placeholder={cms.contact.name} disabled={contact_loading} />
                                <Input type='email' id='contact_email' name='email' onChange={this.inputChangeHandler} value={contact_email} placeholder={cms.contact.email} disabled={contact_loading} />
                                <Input type='textarea' id='contact_message' name='message' onChange={this.inputChangeHandler} value={contact_message} placeholder={cms.contact.message} required disabled={contact_loading} />

                                <div className='submit'>
                                    <button className={'btn btn-green' + (contact_loading ? ' btn-disabled' : '')}>{cms.contact.submit}<i className='fas fa-paper-plane' /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className='newsletter'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-7'>
                            <SectionTitle {...cms.newsletter} />

                            <p>{cms.newsletter.description}</p>

                            <form onSubmit={this.newsletterHandler}>
                                <Error err={home_error} />
                                <Feedback message={home_backend_message} />

                                <Input type='text' id="home_name" name='name' onChange={this.inputChangeHandler} value={home_name} placeholder={cms.newsletter.name} required disabled={home_loading} />
                                <Input type='email' id="home_email" name='email' onChange={this.inputChangeHandler} value={home_email} placeholder={cms.newsletter.email} required disabled={home_loading} />

                                <div className='submit'>
                                    <button className={'btn btn-orange' + (home_loading ? ' btn-disabled' : '')}>{cms.newsletter.submit}<i className='fas fa-paper-plane' /></button>
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
    get: () => dispatch(getAbout()),
    post: data => dispatch(postContact(data)),
    newsletter: data => dispatch(postNewsletter(data)),
    reset: () => { dispatch(resetAbout()); dispatch(resetContact()); dispatch(resetHome()) },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));