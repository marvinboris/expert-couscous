import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/users';
import { updateObject, convertDate } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { users: { form } } } }
                }
            },
            backend: { users: { users = [] } },
        } = this.props;

        const data = users.map(user => {
            return updateObject(user, {
                created_at: convertDate(user.created_at),
                photo: <Photo photo={user.photo} see={see} title={`${form.user_photo}: ${user.name}`} />,
                action: <Action props={this.props} resource='users' item={user} />,
            });
        });

        return <utility.index.lifecycle.render className='Users' props={this.props} resource='users' data={data} fields={[
            { name: form.full_name, key: 'name' },
            { name: form.email, key: 'email' },
            { name: form.phone, key: 'phone' },
            { name: form.role, key: 'role' },
            { name: form.photo, key: 'photo' },
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