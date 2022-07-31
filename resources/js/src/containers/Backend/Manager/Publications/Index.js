import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/publications';
import { updateObject, convertDate, htmlEntities } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { publications: { form } } } }
                }
            },
            backend: { publications: { publications = [] } },
        } = this.props;
        const lang = localStorage.getItem('lang');

        const data = publications.map(publication => {
            const title = publication.title[lang];
            const publication_category = publication.publication_category[lang];
            const formattedBody = htmlEntities(publication.body[lang]);

            return updateObject(publication, {
                created_at: convertDate(publication.created_at),
                title,
                publication_category,
                body: formattedBody.length > 90 ? formattedBody.substr(0, 90) + '...' : formattedBody,
                photo: <Photo photo={publication.photo} see={see} title={`${form.publication_photo}: ${title}`} />,
                action: <Action props={this.props} resource='publications' item={publication} />,
            });
        });

        return <utility.index.lifecycle.render className='Publications' props={this.props} resource='publications' data={data} fields={[
            { name: form.title, key: 'title' },
            { name: form.category, key: 'publication_category' },
            { name: form.body, key: 'body' },
            { name: form.photo, key: 'photo' },
            { name: form.is_active, key: 'is_active' },
            { name: action, key: 'action', fixed: true }
        ]} />;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: (page, show, search) => dispatch(actions.get(page, show, search)),
    delete: id => dispatch(actions.delete(id)),
    reset: () => dispatch(actions.reset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));