import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { convertDate, htmlEntities } from '../../../../../shared/utility';

import './PublicationBlock.scss';

class PublicationBlock extends Component {
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { publication_block: cms } }
                }
            },
            photo, title, author, created_at, publication_category, link = '/'
        } = this.props;
        const lang = localStorage.getItem('lang');

        return <div className='UI PublicationBlock'>
            <div className='embed-responsive embed-responsive-16by9 bg-img' style={{ backgroundImage: 'url("' + photo + '")' }} />

            <div className='text'>
                <div className='category'>{publication_category[lang]}</div>

                <div className='info'>
                    <div className='date'><i className='fas fa-fw fa-calendar' />{convertDate(created_at)}</div>
                    <div className='author'><i className='fas fa-fw fa-user' />{author}</div>
                </div>

                <Link to={link} className='title'>{title[lang]}</Link>

                <Link to={link} className="read-more">{cms.read_more}<i className='fas fa-angle-double-right' /></Link>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(PublicationBlock);