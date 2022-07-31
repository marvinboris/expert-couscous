import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { init } from 'aos';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import AuthUserLayout from './containers/Auth/User/Layout';
import AuthAdminLayout from './containers/Auth/Admin/Layout';
import FrontendLayout from './containers/Frontend/Layout';
import BackendManagerLayout from './containers/Backend/Manager/Layout';

import Spinner from './components/UI/Preloaders/Spinner';

import { authCheckState } from './store/actions/auth';
import { getContent } from './store/actions/content';

import 'aos/dist/aos.css';

// Manager routes
const asyncManagerCmsGlobal = asyncComponent(() => import('./containers/Backend/Manager/Cms/Global'));
const asyncManagerCmsGeneral = asyncComponent(() => import('./containers/Backend/Manager/Cms/General'));
const asyncManagerCmsMessages = asyncComponent(() => import('./containers/Backend/Manager/Cms/Messages'));
const asyncManagerCmsComponents = asyncComponent(() => import('./containers/Backend/Manager/Cms/Components'));
const asyncManagerCmsAuth = asyncComponent(() => import('./containers/Backend/Manager/Cms/Auth'));
const asyncManagerCmsBackend = asyncComponent(() => import('./containers/Backend/Manager/Cms/Backend'));
const asyncManagerCmsFrontend = asyncComponent(() => import('./containers/Backend/Manager/Cms/Frontend'));

const asyncManagerDashboard = asyncComponent(() => import('./containers/Backend/Manager/Dashboard'));

const asyncManagerFeatures = asyncComponent(() => import('./containers/Backend/Manager/Features'));
const asyncManagerFeaturesAdd = asyncComponent(() => import('./containers/Backend/Manager/Features/Add'));
const asyncManagerFeaturesEdit = asyncComponent(() => import('./containers/Backend/Manager/Features/Edit'));

const asyncManagerLanguages = asyncComponent(() => import('./containers/Backend/Manager/Languages'));
const asyncManagerLanguagesAdd = asyncComponent(() => import('./containers/Backend/Manager/Languages/Add'));
const asyncManagerLanguagesEdit = asyncComponent(() => import('./containers/Backend/Manager/Languages/Edit'));

const asyncManagerRoles = asyncComponent(() => import('./containers/Backend/Manager/Roles'));
const asyncManagerRolesAdd = asyncComponent(() => import('./containers/Backend/Manager/Roles/Add'));
const asyncManagerRolesEdit = asyncComponent(() => import('./containers/Backend/Manager/Roles/Edit'));

const asyncManagerSettingsLanguage = asyncComponent(() => import('./containers/Backend/Manager/Settings/Language'));

const asyncManagerPublicationCategories = asyncComponent(() => import('./containers/Backend/Manager/PublicationCategories'));
const asyncManagerPublicationCategoriesAdd = asyncComponent(() => import('./containers/Backend/Manager/PublicationCategories/Add'));
const asyncManagerPublicationCategoriesEdit = asyncComponent(() => import('./containers/Backend/Manager/PublicationCategories/Edit'));

const asyncManagerPublications = asyncComponent(() => import('./containers/Backend/Manager/Publications'));
const asyncManagerPublicationsAdd = asyncComponent(() => import('./containers/Backend/Manager/Publications/Add'));
const asyncManagerPublicationsEdit = asyncComponent(() => import('./containers/Backend/Manager/Publications/Edit'));

const asyncManagerSubscribers = asyncComponent(() => import('./containers/Backend/Manager/Subscribers'));
const asyncManagerSubscribersAdd = asyncComponent(() => import('./containers/Backend/Manager/Subscribers/Add'));
const asyncManagerSubscribersEdit = asyncComponent(() => import('./containers/Backend/Manager/Subscribers/Edit'));

const asyncManagerServices = asyncComponent(() => import('./containers/Backend/Manager/Services'));
const asyncManagerServicesAdd = asyncComponent(() => import('./containers/Backend/Manager/Services/Add'));
const asyncManagerServicesEdit = asyncComponent(() => import('./containers/Backend/Manager/Services/Edit'));

const asyncManagerTestimonies = asyncComponent(() => import('./containers/Backend/Manager/Testimonies'));
const asyncManagerTestimoniesAdd = asyncComponent(() => import('./containers/Backend/Manager/Testimonies/Add'));
const asyncManagerTestimoniesEdit = asyncComponent(() => import('./containers/Backend/Manager/Testimonies/Edit'));

const asyncManagerTeamMembers = asyncComponent(() => import('./containers/Backend/Manager/TeamMembers'));
const asyncManagerTeamMembersAdd = asyncComponent(() => import('./containers/Backend/Manager/TeamMembers/Add'));
const asyncManagerTeamMembersEdit = asyncComponent(() => import('./containers/Backend/Manager/TeamMembers/Edit'));

const asyncManagerPartners = asyncComponent(() => import('./containers/Backend/Manager/Partners'));
const asyncManagerPartnersAdd = asyncComponent(() => import('./containers/Backend/Manager/Partners/Add'));
const asyncManagerPartnersEdit = asyncComponent(() => import('./containers/Backend/Manager/Partners/Edit'));

const asyncManagerUsers = asyncComponent(() => import('./containers/Backend/Manager/Users'));
const asyncManagerUsersAdd = asyncComponent(() => import('./containers/Backend/Manager/Users/Add'));
const asyncManagerUsersEdit = asyncComponent(() => import('./containers/Backend/Manager/Users/Edit'));

// Admin routes
const asyncAdminAdmins = asyncComponent(() => import('./containers/Backend/Admin/Admins'));
const asyncAdminAdminsAdd = asyncComponent(() => import('./containers/Backend/Admin/Admins/Add'));
const asyncAdminAdminsEdit = asyncComponent(() => import('./containers/Backend/Admin/Admins/Edit'));

// Auth routes
const asyncAuthUserLogin = asyncComponent(() => import('./containers/Auth/User/Login'));

const asyncAuthAdminLogin = asyncComponent(() => import('./containers/Auth/Admin/Login'));
const asyncAuthAdminVerify = asyncComponent(() => import('./containers/Auth/Admin/Verify'));

// Frontend routes
const asyncHome = asyncComponent(() => import('./containers/Frontend/Home'));
const asyncAbout = asyncComponent(() => import('./containers/Frontend/About'));
const asyncContact = asyncComponent(() => import('./containers/Frontend/Contact'));

const asyncPublications = asyncComponent(() => import('./containers/Frontend/Publications'));
const asyncPublicationsShow = asyncComponent(() => import('./containers/Frontend/Publications/Show'));

const asyncServices = asyncComponent(() => import('./containers/Frontend/Services'));
const asyncServicesShow = asyncComponent(() => import('./containers/Frontend/Services/Show'));

class App extends Component {
    componentDidMount() {
        const { onTryAuthSignup, onGetContent } = this.props;
        onTryAuthSignup();
        onGetContent();
        init();
    }

    render() {
        const { content: { cms, error: content_error, countries }, auth: { error: auth_error, role } } = this.props;
        const isAuthenticated = localStorage.getItem('token') !== null;
        if (
            (content_error && (content_error.message.includes("Server Error" || "[1045] Access denied for user"))) ||
            (auth_error && (auth_error.message.includes("Server Error" || "[1045] Access denied for user" || "No application encryption key has been specified.")))
        ) location.reload();

        const frontendRoutes = <Route path="/">
            <FrontendLayout>
                <Switch>
                    <Route path="/services/:slug" component={asyncServicesShow} />
                    <Route path="/services" component={asyncServices} />

                    <Route path="/categories/:publicationCategorySlug/publications/:slug" component={asyncPublicationsShow} />
                    <Route path="/categories/:publicationCategorySlug/publications" component={asyncPublications} />
                    <Route path="/publications/:slug" component={asyncPublicationsShow} />
                    <Route path="/publications" component={asyncPublications} />

                    <Route path="/contact" component={asyncContact} />
                    <Route path="/about" component={asyncAbout} />
                    <Route path="/" component={asyncHome} />
                </Switch>
            </FrontendLayout>
        </Route>;

        let routes = <Switch>
            <Route path="/auth/admin">
                <AuthAdminLayout>
                    <Switch>
                        <Route path="/auth/admin/verify" component={asyncAuthAdminVerify} />
                        <Route path="/auth/admin/login" component={asyncAuthAdminLogin} />
                    </Switch>
                </AuthAdminLayout>
            </Route>
            <Redirect path="/admin" to="/auth/admin/login" />

            <Route path="/auth/user">
                <AuthUserLayout>
                    <Switch>
                        <Route path="/auth/user/login" component={asyncAuthUserLogin} />
                    </Switch>
                </AuthUserLayout>
            </Route>
            <Redirect path="/user" to="/auth/user/login" />

            {frontendRoutes}
        </Switch>;

        if (isAuthenticated) {
            routes = <Switch>
                <Route path={['/user', '/admin']}>
                    <BackendManagerLayout>
                        <Switch>
                            <Route path="/admin/admins/:id/edit" component={asyncAdminAdminsEdit} />
                            <Route path="/admin/admins/add" component={asyncAdminAdminsAdd} />
                            <Route path="/admin/admins" component={asyncAdminAdmins} />

                            <Route path="/:manager/partners/:id/edit" component={asyncManagerPartnersEdit} />
                            <Route path="/:manager/partners/add" component={asyncManagerPartnersAdd} />
                            <Route path="/:manager/partners" component={asyncManagerPartners} />

                            <Route path="/:manager/team-members/:id/edit" component={asyncManagerTeamMembersEdit} />
                            <Route path="/:manager/team-members/add" component={asyncManagerTeamMembersAdd} />
                            <Route path="/:manager/team-members" component={asyncManagerTeamMembers} />

                            <Route path="/:manager/testimonies/:id/edit" component={asyncManagerTestimoniesEdit} />
                            <Route path="/:manager/testimonies/add" component={asyncManagerTestimoniesAdd} />
                            <Route path="/:manager/testimonies" component={asyncManagerTestimonies} />

                            <Route path="/:manager/services/:id/edit" component={asyncManagerServicesEdit} />
                            <Route path="/:manager/services/add" component={asyncManagerServicesAdd} />
                            <Route path="/:manager/services" component={asyncManagerServices} />

                            <Route path="/:manager/subscribers/:id/edit" component={asyncManagerSubscribersEdit} />
                            <Route path="/:manager/subscribers/add" component={asyncManagerSubscribersAdd} />
                            <Route path="/:manager/subscribers" component={asyncManagerSubscribers} />

                            <Route path="/:manager/publication-categories/:id/edit" component={asyncManagerPublicationCategoriesEdit} />
                            <Route path="/:manager/publication-categories/add" component={asyncManagerPublicationCategoriesAdd} />
                            <Route path="/:manager/publication-categories" component={asyncManagerPublicationCategories} />

                            <Route path="/:manager/publications/:id/edit" component={asyncManagerPublicationsEdit} />
                            <Route path="/:manager/publications/add" component={asyncManagerPublicationsAdd} />
                            <Route path="/:manager/publications" component={asyncManagerPublications} />

                            <Route path="/:manager/cms/global" component={asyncManagerCmsGlobal} />
                            <Route path="/:manager/cms/general" component={asyncManagerCmsGeneral} />
                            <Route path="/:manager/cms/messages" component={asyncManagerCmsMessages} />
                            <Route path="/:manager/cms/components" component={asyncManagerCmsComponents} />
                            {/* <Route path="/:manager/cms/auth" component={asyncManagerCmsAuth} /> */}
                            {/* <Route path="/:manager/cms/backend" component={asyncManagerCmsBackend} /> */}
                            <Route path="/:manager/cms/frontend" component={asyncManagerCmsFrontend} />

                            <Route path="/:manager/dashboard" component={asyncManagerDashboard} />

                            <Route path="/:manager/features/:id/edit" component={asyncManagerFeaturesEdit} />
                            <Route path="/:manager/features/add" component={asyncManagerFeaturesAdd} />
                            <Route path="/:manager/features" component={asyncManagerFeatures} />

                            <Route path="/:manager/languages/:id/edit" component={asyncManagerLanguagesEdit} />
                            <Route path="/:manager/languages/add" component={asyncManagerLanguagesAdd} />
                            <Route path="/:manager/languages" component={asyncManagerLanguages} />

                            <Route path="/:manager/roles/:id/edit" component={asyncManagerRolesEdit} />
                            <Route path="/:manager/roles/add" component={asyncManagerRolesAdd} />
                            <Route path="/:manager/roles" component={asyncManagerRoles} />

                            <Route path="/:manager/settings/language" component={asyncManagerSettingsLanguage} />

                            <Route path="/:manager/users/:id/edit" component={asyncManagerUsersEdit} />
                            <Route path="/:manager/users/add" component={asyncManagerUsersAdd} />
                            <Route path="/:manager/users" component={asyncManagerUsers} />

                            <Redirect path="/admin" to={`/admin/dashboard`} />
                            <Redirect path="/user" to={`/user/dashboard`} />
                        </Switch>
                    </BackendManagerLayout>
                </Route>

                <Redirect path="/dashboard" to={`/${role}/dashboard`} />
                <Redirect path="/login" to={`/${role}/dashboard`} />
                <Redirect path="/start" to={`/${role}/dashboard`} />
                <Redirect path="/auth" to={`/${role}/dashboard`} />

                {frontendRoutes}
            </Switch>;
        }

        const dataReady = cms !== undefined && countries !== undefined && ((isAuthenticated && role !== undefined) || !isAuthenticated);

        return <div className='App'>{dataReady ? routes : <Spinner />}</div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onTryAuthSignup: () => dispatch(authCheckState()),
    onGetContent: () => dispatch(getContent()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
