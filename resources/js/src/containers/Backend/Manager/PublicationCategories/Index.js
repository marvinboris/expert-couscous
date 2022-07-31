import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/publication-categories';
import { updateObject, convertDate, htmlEntities } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { publication_categories: { form } } } }
                }
            },
            backend: { publication_categories: { publication_categories = [] } },
        } = this.props;
        const lang = localStorage.getItem('lang');

        const data = publication_categories.map(publication_category => {
            const name = publication_category.name[lang];

            return updateObject(publication_category, {
                created_at: convertDate(publication_category.created_at),
                name,
                action: <Action props={this.props} resource='publication-categories' item={publication_category} />,
            });
        });

        return <utility.index.lifecycle.render className='PublicationCategories' props={this.props} resource='publication_categories' data={data} fields={[
            { name: form.name, key: 'name' },
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