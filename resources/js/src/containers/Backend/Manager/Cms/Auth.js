import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';

// Components
import Error from '../../../../components/Messages/Error';
import Feedback from '../../../../components/Messages/Feedback';

import Form from '../../../../components/Backend/UI/Form';
import PageTitle from '../../../../components/Backend/UI/Title/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Title/Breadcrumb';

import Preloader from '../../../../components/UI/Preloaders/Preloader';

import { getCms, patchCms, resetCms } from '../../../../store/actions/backend/cms';
import { updateObject } from '../../../../shared/utility';
import * as utility from './utility';

import AUTH from '../../../../components/Content/Auth';

const SubNavLinks = ({ auth, language }) => {
    const [activeTab, setActiveTab] = useState(language.abbr + '-footer');
    const [value, setValue] = useState(auth);

    const prefix = `${language.abbr}[auth]`;
    const prefixId = `${language.abbr}-auth`;

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const onChange = (e, ...deepness) => utility.onChange(value, setValue)(e, ...deepness);
    const resourceDeepness = (resource, paramPrepends = [], paramAppends = []) => utility.resourceDeepness(onChange)(AUTH, prefix, prefixId, value)(resource, paramPrepends, paramAppends);
    
    const navItems = utility.navItems(auth, language, activeTab, toggle);

    const admin = resourceDeepness('admin', [
        { regex: `${prefix}[admin][login][sign_in_to]`, action: () => <Col xs={12}><h4>Login</h4></Col> },
        { regex: `${prefix}[admin][verify][enter]`, action: () => <Col xs={12}><h4>Verify</h4></Col> },
    ]);
    
    const keys = Object.keys(AUTH).filter(key => !['admin'].includes(key));
    const resourceTabPanes = keys.map(item => {
        const current = resourceDeepness(item);
        
        return <TabPane key={Math.random() + `${prefix}[${item}]`} tabId={`${language.abbr}-${item}`} className="pt-4">
            <Row>{current}</Row>
        </TabPane>;
    });
    
    return <div className='SubNavLinks'>
        <Nav tabs pills>{navItems}</Nav>

        <TabContent activeTab={activeTab}>
            {resourceTabPanes}

            <TabPane tabId={language.abbr + '-admin'} className="pt-4">
                <Row>{admin}</Row>
            </TabPane>
        </TabContent>
    </div>;
};

class Auth extends Component {
    state = {
        activeTab: process.env.MIX_DEFAULT_LANG
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.cms.cms && prevState.app_name === '') {
            const { backend: { cms: { cms: { auth } } } } = nextProps;
            return updateObject(prevState, { ...auth });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = async e => {
        e.preventDefault();
        await this.props.patch(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    fileUpload = () => document.getElementById('logo').click()

    toggle = tab => {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { components: { form: { save } }, backend: { pages: { cms: { icon, title, auth } } } }
                }
            },
            backend: { cms: { loading, error, message, cms, languages = [] } },
        } = this.props;
        const { activeTab } = this.state;
        let content = null;
        let errors = null;

        if (loading) content = <Col xs={12}>
            <Preloader />
        </Col>;
        else {
            errors = <>
                <Error err={error} />
            </>;

            const nav = languages.map(language => <NavItem key={Math.random()}>
                <NavLink className={(activeTab === language.abbr) ? 'active' : ''} onClick={() => this.toggle(language.abbr)}>
                    {language.name}
                </NavLink>
            </NavItem>);

            const tabContent = languages.map(language => <TabPane key={Math.random()} tabId={language.abbr}>
                <SubNavLinks auth={cms.pages[language.abbr].auth} language={language} />
            </TabPane>);

            content = <Col lg={12}>
                <Feedback message={message} />
                <Row>
                    <input type="hidden" name="_method" defaultValue="PATCH" />

                    <Col lg={2}>
                        <Nav tabs vertical pills>{nav}</Nav>
                    </Col>

                    <Col lg={10}>
                        <TabContent activeTab={activeTab}>{tabContent}</TabContent>
                    </Col>

                    <div className="col-12" style={{ marginTop: 40 }}>
                        <button className='btn btn-green'>{save}<i className='fas fa-save' /></button>
                    </div>
                </Row>
            </Col>;
        }


        return <div className='Cms Auth'>
            <PageTitle title={title} subtitle={auth} icon={icon}>
                <Breadcrumb main={auth} />
            </PageTitle>

            <div className='content'>
                {errors}
                <Form onSubmit={this.submitHandler} icon={icon} title={auth} link="/admin/cms" innerClassName="row">
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getCms()),
    patch: data => dispatch(patchCms('auth', data)),
    reset: () => dispatch(resetCms()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));