import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { convertDate, htmlEntities } from '../../../../../shared/utility';

import './PublicationView.scss';

class PublicationView extends Component {
    render() {
        const {
            content: {
                cms: {
                    pages: { frontend: { pages: { publications: cms } } }
                }
            },
            photo, author, comments, title, body, created_at, link = '/',
        } = this.props;
        const lang = localStorage.getItem('lang');

        const formattedBody = htmlEntities(body[lang]);

        return <div className='PublicationView'>
            <Link to={link} className='photo'>
                <div className='embed-responsive embed-responsive-16by9 bg-img' style={{ backgroundImage: `url("${photo}")` }} />
            </Link>

            <Link to={link} className='title text-truncate'>{title[lang]}</Link>

            <div className='info'>
                <div className='date'><i className='fas fa-clock' />{convertDate(created_at)}</div>

                <div className='author'><i className='fas fa-user' />{author}</div>

                <div className='comments'><i className='fas fa-comments' />{comments}</div>
            </div>

            <div className='body'>{formattedBody}</div>

            <div className='social'>
                <div className='links'>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${location.origin + link}`} target="_blank" className='fab fa-facebook' />
                    <a href={`https://twitter.com/intent/tweet?text=${location.origin + link}`} target="_blank" className='fab fa-twitter' />
                    <a href={`https://www.linkedin.com/shareArticle?url=${location.origin + link}`} target="_blank" className='fab fa-linkedin' />
                </div>

                <div>
                    <Link to={link} className="btn btn-orange read-more">{cms.continue_reading}<i className='fas fa-angle-double-right' /></Link>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(PublicationView);