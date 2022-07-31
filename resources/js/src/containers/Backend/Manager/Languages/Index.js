import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/languages';
import { updateObject, convertDate } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action } }, backend: { pages: { languages: { form } } } }
                }
            },
            backend: { languages: { languages = [] } },
        } = this.props;

        const data = languages.map(language => {
            return updateObject(language, {
                created_at: convertDate(language.created_at),
                flag: <div>
                    <span className={`flag-icon flag-icon-${language.flag.toLowerCase()} mr-1`} />{language.flag}
                </div>,
                action: <Action props={this.props} resource='languages' item={language} />,
            });
        });

        return <utility.index.lifecycle.render className='Languages' props={this.props} resource='languages' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.abbr, key: 'abbr' },
            { name: form.flag, key: 'flag' },
            { name: form.created_at, key: 'created_at' },
            { name: action, key: 'action' }
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