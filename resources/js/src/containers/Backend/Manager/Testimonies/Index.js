import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/testimonies';
import { updateObject, convertDate, htmlEntities } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { testimonies: { form } } } }
                }
            },
            backend: { testimonies: { testimonies = [] } },
        } = this.props;
        const lang = localStorage.getItem('lang');

        const data = testimonies.map(testimony => {
            const company = testimony.company[lang];
            const title = testimony.title[lang];
            const formattedBody = htmlEntities(testimony.body[lang]);

            return updateObject(testimony, {
                created_at: convertDate(testimony.created_at),
                company,
                title,
                body: formattedBody.length > 90 ? formattedBody.substr(0, 90) + '...' : formattedBody,
                photo: <Photo photo={testimony.photo} see={see} title={`${form.testimony_photo}: ${title}`} />,
                action: <Action props={this.props} resource='testimonies' item={testimony} />,
            });
        });

        return <utility.index.lifecycle.render className='Testimonies' props={this.props} resource='testimonies' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.company, key: 'company' },
            { name: form.title, key: 'title' },
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