import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { htmlEntities } from '../../../../../shared/utility';

import './ServiceBlock.scss';

class ServiceBlock extends Component {
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { service_block: cms } }
                }
            },
            icon, title, body, link
        } = this.props;
        const lang = localStorage.getItem('lang');

        const formattedBody = htmlEntities(body[lang]);

        return <div className='UI ServiceBlock'>
            <div className='info'>
                <div className='icon'><i className={`fas fa-${icon} fa-fw`} /></div>

                <div className='text'>
                    <Link to={link} className='title'>{title[lang]}</Link>
                    
                    <div className='body'>{!!formattedBody && formattedBody.length > 200 ? formattedBody.substr(0, 200) + '...' : formattedBody}</div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ServiceBlock);