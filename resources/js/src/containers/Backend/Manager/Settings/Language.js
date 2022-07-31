import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Error from '../../../../components/Messages/Error';
import Feedback from '../../../../components/Messages/Feedback';

import Form from '../../../../components/Backend/UI/Form';
import Save from '../../../../components/Backend/UI/Form/Save';
import PageTitle from '../../../../components/Backend/UI/Title/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Title/Breadcrumb';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import { setLanguage } from '../../../../store/actions/content';

class Edit extends Component {
    state = {
        id: '',
        abbr: localStorage.getItem('lang'),
    }

    saveHandler = e => {
        e.preventDefault();
        this.props.post(this.state.id);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        if (name === 'abbr') {
            const language = this.props.content.languages.find(l => l.abbr === value);
            return this.setState({ id: language.id, abbr: value });
        }
        this.setState({ [name]: files ? files[0] : value });
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { settings: { title, language: { title: title_, icon, form } } } } }
                }, languages
            },
            backend: { settings: { loading, error, message } },
            auth: { role }
        } = this.props;
        const { id, abbr } = this.state;
        let content;

        if (!languages) languages = [];
        const languagesOptions = languages.sort((a, b) => a.name > b.name).map(item => <option key={item.name} value={item.abbr}>{item.name}</option>);

        if (loading) content = <div className='col-12'>
            <Preloader />
        </div>;
        else content = <div className='col-lg-9'>
            <div className="row">
                <input type="hidden" name="id" value={id} />
                <Input type="select" className="col-md-6" onChange={this.inputChangeHandler} value={abbr} name="abbr" required label={form.select_language}>
                    <option>{form.select_language}</option>
                    {languagesOptions}
                </Input>

                <Save edit={true} />
            </div>
        </div>;

        return <div className='Settings Language'>
            <PageTitle title={title} subtitle={title_} icon={icon}>
                <Breadcrumb main={title_} />
            </PageTitle>

            <div className='content'>
                <Error err={error} />
                <Feedback message={message} />
                <Form onSubmit={this.saveHandler} icon={icon} title={title_} link={`/${role}/settings`} innerClassName="row">
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    post: id => dispatch(setLanguage(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));