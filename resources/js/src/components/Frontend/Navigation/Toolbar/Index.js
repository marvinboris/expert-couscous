import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

import Logo from '../../../UI/Logo';

import Languages from './Languages';
import NavigationItems from '../NavigationItems/NavigationItems';

import { changeLanguage } from '../../../../store/actions/content';

import './Toolbar.scss';

class Toolbar extends Component {
    state = {
        navbar: true,
        search: true,

        selectedItem: '',

        language: null,
    }



    // Component methods
    toggleNavbar = () => this.setState(state => ({ navbar: !state.navbar, search: true }))

    toggleSearch = () => this.setState(state => ({ search: !state.search, navbar: true }))

    selectItem = item => this.setState({ selectedItem: item })

    setLanguage = lang => this.props.changeLanguage(lang)



    // Lifecycle methods
    componentDidMount() {
        this.setState({ language: this.props.content.languages.find(l => l.abbr === localStorage.getItem('lang')) });
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.content.cms) !== JSON.stringify(this.props.content.cms)) this.setState({ language: this.props.content.languages.find(l => l.abbr === localStorage.getItem('lang')) });
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { frontend: { header: { opened, offices, visit, menu } } }
                }, languages, categories
            },
        } = this.props;
        const { language } = this.state;

        const lang = localStorage.getItem('lang');
        const publication_categories = categories.map(category => ({...category, name: category.name[lang]})).sort((a, b) => a.name.localeCompare(b.name));

        return <div className="Toolbar shadow">
            <div className='top'>
                <div className='container'>
                    <div className='opened'>
                        <i className='fas fa-clock' />
                        <div className='label'>{opened.days}</div>
                        <div className='value'>{opened.hours}</div>
                    </div>
                    <div className='offices'>
                        <i className='fas fa-map-marker-alt' />
                        <div className='label'>{offices.title}</div>
                        <div className='value'>{offices.value}</div>
                    </div>

                    <div className='visit'>
                        <div className='label'>{visit.title}</div>
                        <div>{visit.social_networks.map(item => <a key={JSON.stringify(item)} href={item.link} target='_blank' className={'fab fa-' + item.icon} />)}</div>
                    </div>
                </div>
            </div>

            <div className='bottom'>
                <div className="container">
                    <div>
                        <Link to="/" className="text-decoration-none"><Logo type='big' /></Link>
                    </div>

                    <div className="items">
                        <div className="d-none d-lg-block">
                            <NavigationItems cms={{ menu }} font="dark" toggleNavbar={this.toggleNavbar} categories={publication_categories} />
                        </div>

                        <div className="pr-3 d-lg-none">
                            <i onClick={this.toggleNavbar} className="fas fa-th-large text-30 text-md-40 cursor-pointer" />
                        </div>

                        <div>
                            <Languages languages={languages} set={this.setLanguage} language={language} />
                        </div>
                    </div>
                </div>

                <div className="d-lg-none">
                    <Collapse isOpen={!this.state.navbar} navbar>
                        <div className='container'>
                            <NavigationItems cms={{ menu }} font="dark" toggleNavbar={this.toggleNavbar} categories={publication_categories} />
                        </div>

                        <div className='info'>
                            <div className='container'>
                                <div className='opened'>
                                    <i className='fas fa-clock' />
                                    <div className='label'>{opened.days}</div>
                                    <div className='value'>{opened.hours}</div>
                                </div>
                                <div className='offices'>
                                    <i className='fas fa-map-marker-alt' />
                                    <div className='label'>{offices.title}</div>
                                    <div className='value'>{offices.value}</div>
                                </div>

                                <div className='visit'>
                                    <div className='label'>{visit.title}</div>
                                    <div>{visit.social_networks.map(item => <a key={JSON.stringify(item)} href={item.link} target='_blank' className={'fab fa-' + item.icon} />)}</div>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    changeLanguage: id => dispatch(changeLanguage(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);