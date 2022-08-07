import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Carousel from './Carousel';
import Quote from './Quote';

import SectionTitle from '../../../components/Frontend/UI/Title/SectionTitle';
import ServiceBlock from '../../../components/Frontend/UI/Blocks/ServiceBlock';
import PublicationBlock from '../../../components/Frontend/UI/Blocks/PublicationBlock';
import TeamMemberBlock from '../../../components/Frontend/UI/Blocks/TeamMemberBlock';

import View from '../../../components/Backend/UI/List/Photo/View';

import OwlCarousel from '../../../components/UI/OwlCarousel';

import { getHome, postNewsletter, postSubscribe, resetHome } from '../../../store/actions/frontend/home';

import './Home.scss';

const BlocksBlock = ({ cms }) => <div className='BlocksBlock'>
    <div className='bg-img shadow' style={{ backgroundImage: `linear-gradient(30deg, rgba(255,255,255,.8) 50%, transparent), url("${cms.photo}")` }}>
        <div className='super'>{cms.super}</div>

        <div className='title'>{cms.title}</div>

        <div className='description'>{cms.description}</div>

        <div className='link'>
            <Link to={cms.link} className="btn btn-orange">{cms.button}</Link>
        </div>
    </div>
</div>;

const TestimonyBlock = ({ title, body, name, company, photo }) => <div className='TestimonyBlock'>
    <div className='head'>
        <div className='img'>
            <div className='bg-img' style={{ backgroundImage: `url("${photo}")` }} />
        </div>

        <div className='text'>
            {/* <div className='name'>{name}</div> */}

            <div className='company'>{company}</div>
        </div>
    </div>

    {/* <div className='title'>{title}</div> */}

    <div className='body'>{body}</div>
</div>;

const initialState = {
    name: '',
    email: '',
    service_id: '',
};

class Home extends Component {
    state = { ...initialState }



    // Component methods
    newsletterHandler = e => {
        e.preventDefault();
        if (!this.props.frontend.home.loading) this.props.newsletter(e.target);
    }

    subscribeHandler = e => {
        e.preventDefault();
        if (!this.props.frontend.home.loading) this.props.subscribe(e.target);
    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    // Lifecycle methods
    componentDidMount() {
        this.props.get();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.frontend.home.message && this.props.frontend.home.message && this.props.frontend.home.message.type === 'success') this.setState({ ...initialState });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { frontend: { pages: { home: cms } } }
                }, services
            },
            frontend: { home: { testimonies = [], publications = [], partners = [], team = [] } }
        } = this.props;
        const lang = localStorage.getItem('lang');

        const blocksContent = cms.blocks.items.map(item => <div key={JSON.stringify(item)} className='col-md-6 col-lg-4'><BlocksBlock cms={item} /></div>);
        const servicesContent = services.map(service => <div key={JSON.stringify(service)} className='col-md-6 col-lg-4'><ServiceBlock {...service} /></div>);
        const testimoniesContent = testimonies.map(testimony => <TestimonyBlock key={JSON.stringify(testimony)} {...{ ...testimony, company: testimony.company[lang], title: testimony.title[lang], body: testimony.body[lang] }} />);
        const publicationsContent = publications.map(publication => <PublicationBlock key={JSON.stringify(publication)} {...publication} />);
        const partnersContent = partners.map(partner => <div key={JSON.stringify(partner)}><img src={partner.photo} alt={partner.name} /></div>);
        // const teamContent = team.map(member => <TeamMemberBlock key={JSON.stringify(member)} {...{ ...member, job: member.job[lang] }} />);

        return <div className="Home">
            <div className='banner'>
                <div className="banner__container">
                    <div className="banner__text container">
                        <div className='row'>
                            <div className='col-md-6 left'>
                                <div className='content'>
                                    <div className='super'>{cms.banner.carousel[0].head}</div>

                                    <div className='title'>
                                        <div className='top'>{cms.banner.carousel[0].title.top}</div>
                                        <div className='bottom'>{cms.banner.carousel[0].title.bottom}</div>
                                    </div>

                                    <div className='description'>{cms.banner.carousel[0].description}</div>

                                    <div className='buttons'>
                                        <Link to={'/about'} className="about btn btn-orange">{cms.banner.about}<i className='fas fa-address-card' /></Link>
                                        <Link to={'/services'} className="btn btn-green">{cms.banner.services}<i className='fas fa-concierge-bell' /></Link>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-6 right'>
                                <div className='content'>
                                    <div className='super'>{cms.banner.carousel[0].head}</div>

                                    <div className='title'>
                                        <div className='top'>{cms.banner.carousel[0].title.top}</div>
                                        <div className='bottom'>{cms.banner.carousel[0].title.bottom}</div>
                                    </div>

                                    <div className='description'>{cms.banner.carousel[0].description}</div>

                                    <div className='buttons'>
                                        <Link to={'/about'} className="about btn btn-orange">{cms.banner.about}<i className='fas fa-address-card' /></Link>
                                        <Link to={'/services'} className="btn btn-green">{cms.banner.services}<i className='fas fa-concierge-bell' /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Carousel items={cms.banner.carousel} />
            </div>

            <section className='blocks'>
                <div className='container'>
                    <div className='row'>
                        {blocksContent}
                    </div>
                </div>
            </section>

            <section className='services'>
                <div className='container'>
                    <SectionTitle {...cms.services} />

                    <div className='row'>
                        {servicesContent}
                    </div>

                    <div className='view-all'>
                        <Link to={'/services'} className='btn btn-green'>{cms.services.view_all}<i className={'fas fa-' + cms.services.icon} /></Link>
                    </div>
                </div>
            </section>

            <section className='about'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-5 col-lg-4'>
                            <img src={cms.about.photo} className='img-fluid' />
                        </div>

                        <div className='col-md-7 col-lg-8'>
                            <SectionTitle {...cms.about} />

                            <p dangerouslySetInnerHTML={{ __html: cms.about.description }} />

                            <div className='mission-title'>{cms.about.mission_title}</div>

                            <p dangerouslySetInnerHTML={{ __html: cms.about.mission_description }} />
                        </div>
                    </div>
                </div>
            </section>

            <section className='testimonies'>
                <div className='container'>
                    <SectionTitle {...cms.testimonies} />

                    {testimonies.length > 0 && <OwlCarousel ref="testimonies-carousel" options={{ responsive: { 0: { items: 1 }, 750: { items: 2 }, 1250: { items: 3 } }, dots: false, loop: true, autoplay: true }}>{testimoniesContent}</OwlCarousel>}
                </div>
            </section>

            <section className='partners'>
                <div className='container'>
                    {partners.length > 0 && <OwlCarousel ref="partners-carousel" options={{ responsive: { 0: { items: 2 }, 600: { items: 3 }, 900: { items: 4 }, 1200: { items: 5 } }, dots: false, margin: 20 }}>{partnersContent}</OwlCarousel>}
                </div>
            </section>

            {/* <section className='team'>
                <div className='container'>
                    <SectionTitle {...cms.team} />

                    {team.length > 0 && <OwlCarousel ref="team-carousel" options={{ responsive: { 0: { items: 1 }, 600: { items: 2 }, 900: { items: 3 }, 1200: { items: 4 } }, dots: false, margin: 20 }}>{teamContent}</OwlCarousel>}
                </div>
            </section> */}

            <section className='quote'>
                <div className='container'>
                    <SectionTitle {...cms.quote} />

                    <div>
                        <View title={cms.quote.form.title} content={<Quote />}><button className='btn btn-orange'>{cms.quote.get}</button></View>
                    </div>
                </div>
            </section>

            <section className='publications'>
                <div className='container'>
                    <SectionTitle {...cms.publications} />

                    <div className='row'>{publicationsContent}</div>
                </div>
            </section>

            <section className='map'>
                <iframe src="https://maps.google.com/maps?q=4.079299%2C%209.718764&t=m&z=16&output=embed&iwloc=near" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

                <div className='info'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='head'>
                                    <div className='super'>{cms.map.offices}</div>
                                    <div className='title'>{cms.map.get_in_touch}</div>
                                </div>

                                <div>{cms.map.come_and_visit}</div>
                            </div>

                            <div className='col-md-8'>
                                <div className='row'>
                                    {cms.map.blocks.map(block => <div key={JSON.stringify(block)} className='UI ServiceBlock col-md-4'>
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
                        </div>
                    </div>
                </div>
            </section>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getHome()),
    newsletter: data => dispatch(postNewsletter(data)),
    subscribe: data => dispatch(postSubscribe(data)),
    reset: () => dispatch(resetHome()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));