import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/partners';
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
                    pages: { components: { list: { action, see } }, backend: { pages: { partners: { form } } } }
                }
            },
            backend: { partners: { partners = [] } },
        } = this.props;

        const data = partners.map(partner => {
            return updateObject(partner, {
                created_at: convertDate(partner.created_at),
                photo: <Photo photo={partner.photo} see={see} title={`${form.partner_photo}: ${partner.name}`} />,
                action: <Action props={this.props} resource='partners' item={partner} />,
            });
        });

        return <utility.index.lifecycle.render className='Partners' props={this.props} resource='partners' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.photo, key: 'photo' },
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