import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/subscribers';
import { updateObject, convertDate } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() {
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action } }, backend: { pages: { subscribers: { form } } } }
                }
            },
            backend: { subscribers: { subscribers = [] } },
        } = this.props;

        const data = subscribers.map(subscriber => {
            return updateObject(subscriber, {
                created_at: convertDate(subscriber.created_at),
                action: <Action props={this.props} resource='subscribers' item={subscriber} />,
            });
        });

        return <utility.index.lifecycle.render className='Subscribers' props={this.props} resource='subscribers' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.email, key: 'email' },
            { name: form.is_active, key: 'is_active' },
            { name: form.created_at, key: 'created_at' },
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