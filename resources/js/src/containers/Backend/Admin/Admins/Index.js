import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Error from '../../../../components/Messages/Error';
import Feedback from '../../../../components/Messages/Feedback';

import List from '../../../../components/Backend/UI/List';
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';
import PageTitle from '../../../../components/Backend/UI/Title/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Title/Breadcrumb';

import { getAdmins, deleteAdmins, resetAdmins } from '../../../../store/actions/backend/admins';
import { updateObject, convertDate, } from '../../../../shared/utility';

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
                    pages: { components: { list: { action, see } }, backend: { pages: { admins: { icon, title, add, index, form } } } }
                }
            },
            backend: { admins: { loading, error, message, admins = [], total } },
        } = this.props;

        const errors = <>
            <Error err={error} />
        </>;
        const flash = this.props.location.state ? <Feedback time={5000} message={this.props.location.state.message} /> : null;
        const feedback = <Feedback message={message} />;

        const data = admins.map(admin => {
            return updateObject(admin, {
                created_at: convertDate(admin.created_at),
                photo: <Photo photo={admin.photo} see={see} title={`${form.admin_photo}: ${admin.name}`} />,
                action: <Action link='/admin/admins' resource={admin} deleteAction={this.props.delete} />,
            });
        });

        const content = <List array={data} loading={loading} data={JSON.stringify(admins)} get={this.props.get} total={total} bordered add={add} link="/admin/admins/add" icon={icon} title={index} className="shadow-sm"
            fields={[
                { name: form.full_name, key: 'name' },
                { name: form.email, key: 'email' },
                { name: form.phone, key: 'phone' },
                { name: form.photo, key: 'photo' },
                { name: action, key: 'action', fixed: true }
            ]} />;

        return <div className='Admins'>
            <PageTitle title={title} subtitle={index}>
                <Breadcrumb main={index} />
            </PageTitle>

            <div className='content'>
                {errors}
                {flash}
                {feedback}
                {content}
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: (page, show, search) => dispatch(getAdmins(page, show, search)),
    delete: id => dispatch(deleteAdmins(id)),
    reset: () => dispatch(resetAdmins()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));