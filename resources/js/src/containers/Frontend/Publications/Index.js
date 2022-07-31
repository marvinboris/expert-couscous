import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';

import PublicationView from './UI/PublicationView';
import PublicationNav from './UI/PublicationNav';

import { getPublications, resetPublications } from '../../../store/actions/frontend/publications';

import './Publications.scss';

class Publications extends Component {
    // Lifecycle methods
    componentDidMount() {
        this.props.get(this.props.match.params.publicationCategorySlug);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { publications: cms } } }
            } },
            frontend: { publications: { loading, publications = [] } }
        } = this.props;

        const publicationsContent = publications.map(publication => <PublicationView key={JSON.stringify(publication)} {...publication} />);

        return <div className="Publications">
            <PageTitle {...cms} />

            <section className='publications'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-9'>{publicationsContent}</div>

                        <div className='col-lg-3'><PublicationNav /></div>
                    </div>
                </div>
            </section>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: publicationCategorySlug => dispatch(getPublications(publicationCategorySlug)),
    reset: () => dispatch(resetPublications()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Publications));