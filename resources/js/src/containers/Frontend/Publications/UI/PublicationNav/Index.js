import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Input from '../../../../../components/UI/Input';

import { convertDate } from '../../../../../shared/utility';

import './PublicationNav.scss';

const Publication = ({ photo, title, link, created_at }) => <div className='Publication'>
    <div className='photo'>
        <Link to={link}>
            <div className='embed-responsive embed-responsive-1by1 bg-img' style={{ backgroundImage: `url("${photo}")` }} />
        </Link>
    </div>

    <div className='text'>
        <div className='date'>{convertDate(created_at)}</div>

        <Link to={link} className='title'>{title[localStorage.getItem('lang')]}</Link>
    </div>
</div>;

const initialState = {
    search: '',
}

class PublicationNav extends Component {
    state = { ...initialState }


    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    render() {
        const {
            content: {
                cms: {
                    pages: { frontend: { pages: { publications: cms } } }
                }
            },
            frontend: { publications: { recent_posts = [] } }
        } = this.props;
        const { search } = this.state;
        const lang = localStorage.getItem('lang');

        return <div className='PublicationNav'>
            <div className='search'>
                <Input type='search' name='search' id='search' onChange={this.inputChangeHandler} placeholder={`${cms.search}...`} value={search} />
            </div>

            <div className='recent-posts'>
                <div className='title'>{cms.recent_posts}</div>

                <div>{recent_posts.map(publication => <Publication key={JSON.stringify(publication)} {...publication} />)}</div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(PublicationNav);