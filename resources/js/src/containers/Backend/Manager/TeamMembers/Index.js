import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/team-members';
import { updateObject, convertDate, htmlEntities } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { team_members: { form } } } }
                }
            },
            backend: { team_members: { team_members = [] } },
        } = this.props;
        const lang = localStorage.getItem('lang');

        const data = team_members.map(team_member => {
            const job = team_member.job[lang];

            return updateObject(team_member, {
                created_at: convertDate(team_member.created_at),
                job,
                photo: <Photo photo={team_member.photo} see={see} title={`${form.team_member_photo}: ${team_member.name}`} />,
                action: <Action props={this.props} resource='team-members' item={team_member} />,
            });
        });

        return <utility.index.lifecycle.render className='TeamMembers' props={this.props} resource='team_members' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.job, key: 'job' },
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