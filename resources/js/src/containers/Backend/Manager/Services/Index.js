import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/services';
import { updateObject, convertDate, htmlEntities } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { services: { form } } } }
                }
            },
            backend: { services: { services = [] } },
        } = this.props;
        const lang = localStorage.getItem('lang');

        const data = services.map(service => {
            const title = service.title[lang];
            const formattedBody = htmlEntities(service.body[lang]);

            return updateObject(service, {
                created_at: convertDate(service.created_at),
                title,
                body: formattedBody.length > 90 ? formattedBody.substr(0, 90) + '...' : formattedBody,
                icon: <><i className={'fas fa-fw mr-2 fa-' + service.icon} />{service.icon}</>,
                action: <Action props={this.props} resource='services' item={service} />,
            });
        });

        return <utility.index.lifecycle.render className='Publications' props={this.props} resource='services' data={data} fields={[
            { name: form.title, key: 'title' },
            { name: form.body, key: 'body' },
            { name: form.icon, key: 'icon' },
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