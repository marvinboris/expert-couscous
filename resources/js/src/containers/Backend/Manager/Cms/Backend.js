import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, FormGroup, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';

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
import BACKEND from '../../../../components/Content/Backend';

const Separator = ({ sm }) => <Col xs={12} className={`mb-${sm ? 2 : 3}`} />;

const SubNavLinks = ({ backend, language }) => {
    const [activeTab, setActiveTab] = useState(`${language.abbr}-header`);
    const [value, setValue] = useState(backend);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const onChange = (e, ...deepness) => {
        const valueCopy = { ...value };

        if (deepness.length === 1) {
            valueCopy[deepness[0]] = e.target.value;
            return setValue(valueCopy);
        }

        const subValues = [];
        let subValue = { ...value };
        for (let i = 0; i < deepness.length - 1; i++) {
            const element = deepness[i];
            subValue = subValue[element];
            subValues.push(subValue);
        }
        subValues[subValues.length - 1][deepness[deepness.length - 1]] = e.target.value;
        for (let i = 1; i < deepness.length - 1; i++) {
            const element = deepness[deepness.length - 1 - i];
            const index = subValues.length - 1 - i;
            subValues[index][element] = subValues[index + 1];
        }
        valueCopy[deepness[0]] = subValues[0];

        setValue(valueCopy);
    }

    const recursiveDeepness = (paramItem, paramName, paramId, paramValue, paramDeepness, paramPrepends = [], paramAppends = []) => Object.keys(paramItem).map(item => {
        const mainItem = paramItem[item];
        const mainName = `${paramName}[${item}]`;
        const mainId = `${paramId}-${item}`;
        const mainValue = paramValue[item];
        const mainDeepness = paramDeepness.concat(item);

        let prepend;
        const findPrepend = paramPrepends.find(el => (new RegExp(el.regex.replace(/\[/g, '\\[').replace(/\]/g, '\\]'))).test(mainName));
        prepend = !findPrepend ? null : findPrepend.action(mainItem);

        let append;
        const findAppend = paramAppends.find(el => (new RegExp(el.regex.replace(/\[/g, '\\[').replace(/\]/g, '\\]'))).test(mainName));
        append = !findAppend ? null : findAppend.action(mainItem);

        return typeof mainItem === 'string' ? <Fragment key={Math.random() + mainName}>
            {prepend}
            <FormGroup className="col-md-6 col-lg-4 align-self-end">
                <Label className="text-small text-500">{mainItem}</Label>
                <Input type="text" name={mainName} id={mainId} placeholder={mainItem} onChange={e => onChange(e, ...mainDeepness)} value={mainValue} />
            </FormGroup>
            {append}
        </Fragment> : recursiveDeepness(mainItem, mainName, mainId, mainValue, mainDeepness, paramPrepends, paramAppends);
    });



    const navItems = Object.keys(backend).map(key => {
        const id = `${language.abbr}-${key}`;

        return <NavItem key={id}>
            <NavLink className={(activeTab === id) ? 'active' : ""} onClick={() => toggle(id)}>
                <span className="text-capitalize">{key.split('_').join(' ')}</span>
            </NavLink>
        </NavItem>
    });

    const prefix = `${language.abbr}[backend]`;
    const prefixId = `${language.abbr}-backend`;

    const resourceDeepness = (resource, paramPrepends = [], paramAppends = []) => {
        const resourceItem = BACKEND[resource];
        const resourceName = `${prefix}[${resource}]`;
        const resourceId = `${prefixId}-${resource}`;
        const resourceValue = value[resource];
        const resourceDeepness = [resource];
        return recursiveDeepness(resourceItem, resourceName, resourceId, resourceValue, resourceDeepness, paramPrepends, paramAppends);
    };

    const header = resourceDeepness('header', [], [
        { regex: `${prefix}[header][no_notification]`, action: () => <Separator /> },
        { regex: `${prefix}[header][sure_logout]`, action: () => <Separator /> },
    ]);

    const footer = resourceDeepness('footer');

    const sidebar = resourceDeepness('sidebar', [
        { regex: `${prefix}[sidebar][admin]`, action: () => <Col xs={12}><h4>Roles</h4></Col> },
        { regex: `${prefix}[sidebar][menu][dashboard]`, action: () => <Col xs={12}><h4>Menu</h4></Col> },
        { regex: `${prefix}[sidebar][menu][.+][title]`, action: item => <Col xs={12}><h5>{item}</h5></Col> },
    ], [
        { regex: `${prefix}[sidebar][user]`, action: () => <Separator /> },
    ]);

    const pagesResourceDeepness = (resource, paramPrepends = [], paramAppends = []) => {
        const resourceItem = BACKEND.pages[resource];
        const resourceName = `${prefix}[pages][${resource}]`;
        const resourceId = `${prefixId}-pages-${resource}`;
        const resourceValue = value[resource];
        const resourceDeepness = [resource];
        return recursiveDeepness(resourceItem, resourceName, resourceId, resourceValue, resourceDeepness, paramPrepends, paramAppends);
    };

    const dashboard = pagesResourceDeepness('dashboard', [
        { regex: `${prefix}[pages][dashboard][admin][title]`, action: () => <Col xs={12}><h4>Admin</h4></Col> },
        { regex: `${prefix}[pages][dashboard][.+][blocks][total_issues][title]`, action: () => <Col xs={12}><h5>Blocks</h5></Col> },
        {
            regex: `${prefix}[pages][dashboard][user][title]`, action: () => <>
                <Separator />
                <Col xs={12}><h4>User</h4></Col>
            </>
        },
    ], [
        { regex: `${prefix}[pages][dashboard][.+][subtitle]`, action: () => <Separator sm /> },
    ]);
    
    const cms = pagesResourceDeepness('cms', [], [
        {
            regex: `${prefix}[pages][cms][auth]`, action: () => <>
                <Separator />
                <Col xs={12}>
                    <h4>Form</h4>
                </Col>
            </>
        },
    ]);

    const keys = Object.keys(BACKEND.pages).filter(key => !['dashboard', 'cms'].includes(key));
    const resourceTabPanes = keys.map(item => {
        const current = pagesResourceDeepness(item);

        return <TabPane key={Math.random() + `${prefix}[pages][${item}]`} tabId={`${language.abbr}-${item}`} className="pt-4">
            <Row>{current}</Row>
        </TabPane>;
    });

    return <>
        <Nav tabs pills>{navItems}</Nav>

        <TabContent activeTab={activeTab}>
            <TabPane tabId={`${language.abbr}-header`} className="pt-4">
                <Row>{header}</Row>
            </TabPane>

            <TabPane tabId={`${language.abbr}-footer`} className="pt-4">
                <Row>{footer}</Row>
            </TabPane>

            <TabPane tabId={`${language.abbr}-sidebar`} className="pt-4">
                <Row>{sidebar}</Row>
            </TabPane>

            <TabPane tabId={`${language.abbr}-dashboard`} className="pt-4">
                <Row>{dashboard}</Row>
            </TabPane>

            <TabPane tabId={`${language.abbr}-cms`} className="pt-4">
                <Row>{cms}</Row>
            </TabPane>

            {resourceTabPanes}
        </TabContent>
    </>;
};

class Backend extends Component {
    state = {
        activeTab: process.env.MIX_DEFAULT_LANG
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.cms.cms && prevState.app_name === '') {
            const { backend: { cms: { cms: { backend } } } } = nextProps;
            return updateObject(prevState, { ...backend });
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
                    pages: { components: { form: { save } }, backend: { pages: { cms: { icon, title, backend } } } }
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

            const tabContent = languages.map(language => {
                const data = cms.pages[language.abbr].backend;
                const backend = {
                    header: data.header,
                    footer: data.footer,
                    sidebar: data.sidebar,
                    ...data.pages
                };

                return <TabPane key={Math.random()} tabId={language.abbr}>
                    <SubNavLinks backend={backend} language={language} />
                </TabPane>
            });

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

        return <div className='Cms Backend'>
            <PageTitle title={title} subtitle={backend} icon={icon}>
                <Breadcrumb main={backend} />
            </PageTitle>

            <div className='content'>
                {errors}
                <Form onSubmit={this.submitHandler} icon={icon} title={backend} link="/admin/cms" innerClassName="row">
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getCms()),
    patch: data => dispatch(patchCms('backend', data)),
    reset: () => dispatch(resetCms()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Backend));