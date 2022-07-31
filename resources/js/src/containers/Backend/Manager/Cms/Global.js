import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Error from '../../../../components/Messages/Error';
import Feedback from '../../../../components/Messages/Feedback';

import Form from '../../../../components/Backend/UI/Form';
import PageTitle from '../../../../components/Backend/UI/Title/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Title/Breadcrumb';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import { getCms, patchCms, resetCms } from '../../../../store/actions/backend/cms';
import { updateObject } from '../../../../shared/utility';

class Global extends Component {
    state = {
        app_name: '',
        company_name: '',
        company_logo: null,
        logo: {},
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.cms.cms && prevState.app_name === '') {
            const { backend: { cms: { cms: { global } } } } = nextProps;
            return updateObject(prevState, { ...global });
        }
        return prevState;
    }

    componentDidMount() {
        this.props.reset();
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.patch(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    fileUpload = id => document.getElementById(id).click()

    render() {
        const {
            content: {
                cms: {
                    pages: { components: { form: { save } }, backend: { pages: { cms: { icon, title, global, form } } } }
                }
            },
            backend: { cms: { loading, error, message, cms } },
            auth: { role }
        } = this.props;
        const { logo, app_name, company_name, company_logo } = this.state;
        let content = null;

        if (loading || !cms) content = <div className='col-12'>
            <Preloader />
        </div>;
        else content = <div className='row'>
            <div className='col-lg-9'>
                <div className='row'>
                    <input type="hidden" name="_method" defaultValue="PATCH" />

                    <Input type="text" className="col-md-6" onChange={this.inputChangeHandler} value={app_name} name="app_name" required label={form.app_name} />
                    <Input type="text" className="col-md-6" onChange={this.inputChangeHandler} value={company_name} name="company_name" required label={form.company_name} />
                    {Object.keys(cms.global.logo).map(key => <Input type="image" key={'logo-' + key} className='col-md-6 col-xl-4' id={"logo-" + key} name={"logo[" + key + "]"} label={form.logo + '(' + key + ')'} onClick={() => this.fileUpload('logo-' + key)} cms={form} defaultValue={cms.global.logo[key]} value={logo[key]} dimensions="16by9" />)}

                    <div className="col-12" style={{ marginTop: 40 }}>
                        <button className='btn btn-green'>{save}<i className='fas fa-save' /></button>
                    </div>
                </div>
            </div>

            <div className='col-lg-3'>
                <Input type="image" id="company_logo" name="company_logo" label={form.company_logo} onClick={() => this.fileUpload('company_logo')} cms={form} defaultValue={cms.global.company_logo} value={company_logo} />
            </div>
        </div>;

        return <div className='Cms Global'>
            <PageTitle title={title} subtitle={global} icon={icon}>
                <Breadcrumb main={global} />
            </PageTitle>

            <div className='content'>
                <Error err={error} />
                <Feedback message={message} />
                <Form onSubmit={this.submitHandler} icon={icon} title={global} link={`/${role}/cms`} innerClassName="row">
                    <input type="file" id="company_logo" name="company_logo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    <input type="file" id="logo-big" name="logo[big]" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    <input type="file" id="logo-dark" name="logo[dark]" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    <input type="file" id="logo-default" name="logo[default]" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    <input type="file" id="logo-light" name="logo[light]" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    <input type="file" id="logo-named" name="logo[named]" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getCms()),
    patch: data => dispatch(patchCms('global', data)),
    reset: () => dispatch(resetCms()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Global));