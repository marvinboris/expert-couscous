import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Badge, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBell, faWrench, faPowerOff, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import SideDrawerItem from './SideDrawerItem/SideDrawerItem';
import Logo from '../../../UI/Logo/Logo';

import './SideDrawer.css';

export default ({ data, role, logoutHandler, toggle, selectItem, selectedItem, cms, dark = false }) => {
    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    let { name, photo, role: role_ } = data;

    if (!photo) photo = "//placehold.it/100x100";

    let addOns = null;
    let sideDrawerItems = null;
    const {
        pages: {
            backend: {
                header: { logout, close: close_, sure_logout },
                sidebar: {
                    user, admin, agency, cashier,
                    menu: {
                        dashboard, admins, users, roles, features, languages, cms: cms_, notifications, settings,
                        agencies, contributors, expenses, tickets, methods,
                        buses, trips, drivers, cashiers, sales
                    }
                }
            }
        }
    } = cms;

    const roles_ = {
        user,
        admin,
        agency,
        cashier,
    };

    const logoutContent = <>
        <ModalHeader toggle={modalToggle}>{logout}</ModalHeader>
        <ModalBody className="text-center">
            <p>{sure_logout}?</p>
            <div>
                <Button color="green" onClick={logoutHandler}>{logout} <FontAwesomeIcon icon={faPowerOff} fixedWidth /></Button>{' '}
                <Button color="red" onClick={modalToggle}>{close_} <FontAwesomeIcon icon={faTimes} fixedWidth /></Button>
            </div>
        </ModalBody>
    </>;

    const sideDrawerItem = (fixed = false, id = null, dropdown = null, icon, path, custom = false, addon = []) => {
        if (id && fixed) return <SideDrawerItem id={id} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} href={path}>{id}</SideDrawerItem>;

        if (fixed) {
            let items = [];

            if (!custom) {
                items.push({ link: '/add', text: dropdown.add });
                items.push({ link: '/', text: dropdown.index });
                items = items.concat(addon);
            }
            else items = custom;

            return <SideDrawerItem id={dropdown.title} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} dropdown path={path} items={items}>{dropdown.title}</SideDrawerItem>;
        }

        if (id) {
            const feature = role_ && role_.features.find(f => '/user/' + f.prefix === path);
            if (!feature) return null;

            return <SideDrawerItem id={id} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} href={path}>{id}</SideDrawerItem>;
        }

        let items = [];

        if (!custom) {
            const feature = role_ && role_.features.find(f => '/user/' + f.prefix === path);
            if (!feature) return null;

            let { permissions } = feature;

            if (permissions && permissions.includes('c')) items.push({ link: '/add', text: dropdown.add });
            items.push({ link: '/', text: dropdown.index });
            items = items.concat(addon);
        }
        else items = custom;

        return <SideDrawerItem id={dropdown.title} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} dropdown path={path} items={items}>{dropdown.title}</SideDrawerItem>;
    };

    switch (role) {
        case 'user':
            addOns = <div className="text-left">
                <div className="text-white small"><FontAwesomeIcon icon={faCircle} size="sm" fixedWidth className="mr-1" />{role_ && role_.name}</div>
            </div>;
            sideDrawerItems = <>
                {sideDrawerItem(true, dashboard, null, "th-large", "/user/dashboard")}
                {sideDrawerItem(false, null, users, "user", "/user/users")}
                {sideDrawerItem(false, null, roles, "user-tag", "/user/roles")}
                {sideDrawerItem(false, null, features, "tools", "/user/features")}
                {sideDrawerItem(false, null, languages, "language", "/user/languages")}
                {sideDrawerItem(false, null, agencies, "bus", "/user/agencies", [
                    { link: '/', text: agencies.index },
                    { link: '/admins', text: agencies.admins },
                    { link: '/branches', text: agencies.branches },
                    { link: '/cities', text: agencies.cities },
                    { link: '/durations', text: agencies.durations },
                ])}
                {sideDrawerItem(false, contributors.title, null, "user-friends", "/user/contributors")}
                {sideDrawerItem(false, expenses.title, null, "usd-square", "/user/expenses")}
                {sideDrawerItem(false, null, methods, "th-list", "/user/methods")}

                <div className="text-16 px-3 py-2 mb-1 mt-4">OTHERS</div>
                {sideDrawerItem(false, null, tickets, "ticket", "/user/tickets", [
                    { link: '/categories', text: tickets.categories },
                    { link: '/prices', text: tickets.prices },
                ])}
                {sideDrawerItem(false, null, cms_, "wrench", "/user/cms", [
                    { link: '/global', text: cms_.global },
                    { link: '/general', text: cms_.general },
                    { link: '/messages', text: cms_.messages },
                    { link: '/components', text: cms_.components },
                    { link: '/auth', text: cms_.auth },
                    { link: '/backend', text: cms_.backend },
                    { link: '/frontend', text: cms_.frontend },
                ])}
                <SideDrawerItem id={notifications} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon="bell" href="/user/notifications">
                    {notifications}{' '}
                    {data.notifications.filter(notification => !notification.read_at).length > 0 && <Badge color="green" className="position-relative rounded-circle text-x-small text-700 d-inline-flex justify-content-center align-items-center" style={{ width: 18, height: 18, top: -2, left: 2 }}><b className="text-white">{data.notifications.filter(notification => !notification.read_at).length}</b></Badge>}
                </SideDrawerItem>
                {sideDrawerItem(true, null, settings, "cog", "/user/settings", [
                    { link: '/language', text: settings.language },
                ])}

                <div className="mt-5 pt-5">
                    <div className="py-2 px-3 text-16 text-300 text-lightgreen rounded-4" onClick={modalToggle} style={{ cursor: 'pointer' }}>
                        <FontAwesomeIcon fixedWidth icon={faPowerOff} className="mr-3" />

                        <span className="text">{logout}</span>
                    </div>
                </div>

                <Modal isOpen={modal} toggle={modalToggle}>
                    {logoutContent}
                </Modal>
            </>;
            break;

        case 'admin':
            sideDrawerItems = <>
                {sideDrawerItem(true, dashboard, null, "th-large", "/admin/dashboard")}
                {sideDrawerItem(true, null, admins, "user-cog", "/admin/admins")}
                {sideDrawerItem(true, null, users, "user", "/admin/users")}
                {sideDrawerItem(true, null, roles, "user-tag", "/admin/roles")}
                {sideDrawerItem(true, null, features, "tools", "/admin/features")}
                {sideDrawerItem(true, null, languages, "language", "/admin/languages")}
                {sideDrawerItem(true, agencies.title, null, "bus", "/admin/agencies", [
                    { link: '/', text: agencies.index },
                    { link: '/admins', text: agencies.admins },
                    { link: '/branches', text: agencies.branches },
                    { link: '/cities', text: agencies.cities },
                    { link: '/durations', text: agencies.durations },
                ])}
                {sideDrawerItem(true, contributors.title, null, "user-friends", "/admin/contributors")}
                {sideDrawerItem(true, expenses.title, null, "usd-square", "/admin/expenses")}
                {sideDrawerItem(true, null, methods, "th-list", "/admin/methods")}

                <div className="text-16 px-3 py-2 mb-1 mt-4">OTHERS</div>
                {sideDrawerItem(true, tickets.title, null, "bus", "/admin/tickets", [
                    { link: '/categories', text: tickets.categories },
                    { link: '/prices', text: tickets.prices },
                ])}
                {sideDrawerItem(true, null, cms_, faWrench, "/admin/cms", [
                    { link: '/global', text: cms_.global },
                    { link: '/general', text: cms_.general },
                    { link: '/messages', text: cms_.messages },
                    { link: '/components', text: cms_.components },
                    { link: '/auth', text: cms_.auth },
                    { link: '/backend', text: cms_.backend },
                    { link: '/frontend', text: cms_.frontend },
                ])}
                <SideDrawerItem id={notifications} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={faBell} href="/admin/notifications">
                    {notifications}{' '}
                    {data.notifications.filter(notification => !notification.read_at).length > 0 && <Badge color="green" className="position-relative rounded-circle text-x-small text-700 d-inline-flex justify-content-center align-items-center" style={{ width: 18, height: 18, top: -2, left: 2 }}><b className="text-white">{data.notifications.filter(notification => !notification.read_at).length}</b></Badge>}
                </SideDrawerItem>
                {sideDrawerItem(true, null, settings, "cog", "/admin/settings", [
                    { link: '/language', text: settings.language },
                ])}

                <div className="mt-5 pt-5">
                    <div className="py-2 px-3 text-16 text-300 rounded-4" onClick={modalToggle} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-fw fa-power-off text-lightgreen mr-3" />

                        <span className="text">{logout}</span>
                    </div>
                </div>

                <Modal isOpen={modal} toggle={modalToggle}>
                    {logoutContent}
                </Modal>
            </>;
            break;

        case 'agency':
            sideDrawerItems = <>
                {sideDrawerItem(true, dashboard, null, "th-large", "/agency/dashboard")}
                {sideDrawerItem(true, null, buses, "bus", "/agency/buses", [
                    { link: '/', text: buses.index },
                    { link: '/brands', text: buses.brands },
                    { link: '/models', text: buses.models },
                    { link: '/facilities', text: buses.facilities },
                ])}
                {sideDrawerItem(true, null, trips, "route", "/agency/trips", [
                    { link: '/published', text: trips.published },
                    { link: '/programmings/add', text: trips.programmings },
                    { link: '/times', text: trips.times },
                ])}
                {sideDrawerItem(true, drivers.title, null, "user-tie", "/agency/drivers")}
                {sideDrawerItem(true, cashiers.title, null, "user-tie", "/agency/cashiers")}

                <div className="text-16 px-3 py-2 mb-1 mt-4">OTHERS</div>
                {sideDrawerItem(true, sales.title, null, "money-check-alt", "/agency/sales")}
                {sideDrawerItem(true, null, tickets, "ticket-alt", "/agency/tickets", [
                    { link: '/bookings', text: tickets.bookings },
                    { link: '/boardings', text: tickets.boardings },
                ])}
                {sideDrawerItem(true, null, settings, "cog", "/agency/settings", [
                    { link: '/language', text: settings.language },
                ])}

                <div className="mt-5 pt-5">
                    <div className="py-2 px-3 text-16 text-300 rounded-4" onClick={modalToggle} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-fw fa-power-off text-lightgreen mr-3" />

                        <span className="text">{logout}</span>
                    </div>
                </div>

                <Modal isOpen={modal} toggle={modalToggle}>
                    {logoutContent}
                </Modal>
            </>;
            break;

        case 'cashier':
            sideDrawerItems = <>
                {sideDrawerItem(true, dashboard, null, "th-large", "/cashier/dashboard")}
                {sideDrawerItem(true, null, buses, "bus", "/cashier/buses", [
                    { link: '/', text: buses.index },
                    { link: '/brands', text: buses.brands },
                    { link: '/models', text: buses.models },
                    { link: '/facilities', text: buses.facilities },
                ])}
                {sideDrawerItem(true, null, trips, "route", "/cashier/trips", [
                    { link: '/published', text: trips.published },
                    { link: '/programmings/add', text: trips.programmings },
                    { link: '/times', text: trips.times },
                ])}
                {sideDrawerItem(true, drivers.title, null, "user-tie", "/cashier/drivers")}

                <div className="text-16 px-3 py-2 mb-1 mt-4">OTHERS</div>
                {sideDrawerItem(true, sales.title, null, "money-check-alt", "/cashier/sales")}
                {sideDrawerItem(true, null, tickets, "ticket-alt", "/cashier/tickets", [
                    { link: '/', text: tickets.index },
                    { link: '/bookings', text: tickets.bookings },
                    { link: '/boardings', text: tickets.boardings },
                ])}
                {sideDrawerItem(true, null, settings, "cog", "/cashier/settings", [
                    { link: '/language', text: settings.language },
                ])}

                <div className="mt-5 pt-5">
                    <div className="py-2 px-3 text-16 text-300 rounded-4" onClick={modalToggle} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-fw fa-power-off text-lightgreen mr-3" />

                        <span className="text">{logout}</span>
                    </div>
                </div>

                <Modal isOpen={modal} toggle={modalToggle}>
                    {logoutContent}
                </Modal>
            </>;
            break;
    }



    return (
        <div className={`App SideDrawer nav-left-sidebar bg-soft shadow-sm position-fixed`}>
            <div className={`vh-100 d-flex flex-column bg-${dark ? "grayblue text-white border-right border-darkblue" : "darkgreenblue text-white"}`}>
                <div className="px-4 border-bottom border-light bg-darkgreenblue">
                    <div className="mx-3 toolbar-height d-flex align-items-center">
                        <div className="pr-2 pr-md-3 pr-md-4">
                            <Logo />
                        </div>

                        <div className="text-pacifico text-12 text-md-15 text-xxl-18">
                            Bus Reservation<br />
                            System
                        </div>

                        <div className="ml-auto d-md-none">
                            <i className="fas fa-arrow-left text-21 cursor-pointer" onClick={toggle} />
                        </div>
                    </div>
                </div>

                <div className="p-4 mt-1 mt-md-2 mt-md-3 flex-fill">
                    <div className="mx-3">
                        <div className="mb-1 mb-md-2 mb-xxl-3 d-flex justify-content-center">
                            <div className="position-relative">
                                <div className="rounded-circle d-inline-block border border-4 border-white">
                                    <img src={photo} className="rounded-circle border border-3 border-secondary" style={{ width: 92, height: 92, objectFit: 'cover', objectPosition: 'center' }} alt="User profile" />
                                </div>

                                <div className="position-absolute border border-2 border-darkgreenblue bg-lightgreen rounded-circle" style={{ top: 2, right: 5, width: 18, height: 18 }} />
                            </div>
                        </div>

                        <div className="text-center text-18 mb-3 mb-md-4 mb-xxl-5 pb-2 pb-md-3 pb-xxl-4">
                            Welcome {roles_[role]}
                            <Col xs={12} className="p-0 text-700">{name}</Col>
                        </div>

                        <div className="mt-1 mt-md-2 mt-xxl-3 mb-3 mb-md-4 mb-xxl-5">
                            {role === 'user' && <Link to="/user/agencies/add" className="btn btn-white text-green btn-block px-1 px-md-2 px-xxl-3 py-1 py-md-2 py-xxl-3 text-500 text-14 rounded-10 shadow-sm">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="pr-1 pr-md-2 pr-xxl-3"><i className="fas fa-bus text-14 text-md-17 text-xxl-20 text-green-20" /></div>

                                    <div><strong>{agencies.create}</strong> {agencies.agency}</div>

                                    <div className="ml-auto"><i className="fal fa-plus bg-green rounded-8 text-white text-11 text-md-13 text-xxl-15" style={{ padding: '9px 9px 7px 9px' }} /></div>
                                </div>
                            </Link>}
                            {role === 'agency' && <Link to="/agency/trips/programmings/add" className="btn btn-white text-green btn-block px-1 px-md-2 px-xxl-3 py-1 py-md-2 py-xxl-3 text-500 text-14 rounded-10 shadow-sm">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="pr-1 pr-md-2 pr-xxl-3"><i className="fas fa-ticket-alt text-14 text-md-17 text-xxl-20 text-green-20" /></div>

                                    <div><strong>{trips.post}</strong> {trips.new_trip}</div>

                                    <div className="ml-auto"><i className="fal fa-plus bg-green rounded-8 text-white text-11 text-md-13 text-xxl-15" style={{ padding: '9px 9px 7px 9px' }} /></div>
                                </div>
                            </Link>}
                            {role === 'cashier' && <Link to="/cashier/tickets/add" className="btn btn-white text-green btn-block px-1 px-md-2 px-xxl-3 py-1 py-md-2 py-xxl-3 text-500 text-14 rounded-10 shadow-sm">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="pr-1 pr-md-2 pr-xxl-3"><i className="fas fa-ticket-alt text-14 text-md-17 text-xxl-20 text-green-20" /></div>

                                    <div><strong>{tickets.create}</strong> {tickets.new_ticket}</div>

                                    <div className="ml-auto"><i className="fal fa-plus bg-green rounded-8 text-white text-11 text-md-13 text-xxl-15" style={{ padding: '9px 9px 7px 9px' }} /></div>
                                </div>
                            </Link>}
                        </div>

                        <div className="px-3">
                            <ul className="navbar-nav flex-column pr-3 scrollbar-white">
                                {sideDrawerItems}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="backdrop bg-soft-50 position-fixed d-md-none" onClick={toggle} style={{ top: 0, zIndex: -1 }} />
        </div>
    )
};