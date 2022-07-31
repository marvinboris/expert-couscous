import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

import SideDrawerItem from './SideDrawerItem';

import Logo from '../../../../../components/UI/Logo';

import './SideDrawer.scss';

export default ({ props, toggle, selectItem, selectedItem }) => {
    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    const {
        content: { cms: { pages: { backend: cms } } },
        auth: { role, data }
    } = props;
    const resources = Object.keys(cms.sidebar.menu).filter(resource => !['admins', 'dashboard', 'cms', 'notifications', 'settings'].includes(resource));

    const SDI = ({ fixed = false, id = null, dropdown = null, icon, path, custom = false, addon = [] }) => {
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
            const feature = data.role && data.role.features.find(f => path.includes('/user/' + f.prefix));
            if (!feature) return null;

            return <SideDrawerItem id={id} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} href={path}>{id}</SideDrawerItem>;
        }

        let items = [];

        if (!custom) {
            const feature = data.role && data.role.features.find(f => path.includes('/user/' + f.prefix));
            if (!feature) return null;

            let { permissions } = feature;

            if (permissions && permissions.includes('c')) items.push({ link: '/add', text: dropdown.add });
            items.push({ link: '/', text: dropdown.index });
            items = items.concat(addon);
        }
        else items = custom;

        return <SideDrawerItem id={dropdown.title} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} dropdown path={path} items={items}>{dropdown.title}</SideDrawerItem>;
    };

    const sideDrawerItems = <>
        <SDI fixed={true} id={cms.sidebar.menu.dashboard.title} icon={cms.sidebar.menu.dashboard.icon} path={`/${role}/dashboard`} />
        {role === 'admin' && <SDI fixed={true} id={cms.sidebar.menu.admins.title} icon={cms.sidebar.menu.admins.icon} path={`/${role}/admins`} />}
        {resources.map(resource => <SDI key={JSON.stringify(cms.sidebar.menu[resource])} fixed={role === 'admin'} id={cms.sidebar.menu[resource].title} icon={cms.sidebar.menu[resource].icon} path={`/${role}/${resource.split('_').join('-')}`} />)}
        {<SDI fixed={role === 'admin'} dropdown={cms.sidebar.menu.cms} icon={cms.sidebar.menu.cms.icon} path={`/${role}/cms`} custom={[
            { link: '/global', text: cms.sidebar.menu.cms.global },
            { link: '/general', text: cms.sidebar.menu.cms.general },
            { link: '/messages', text: cms.sidebar.menu.cms.messages },
            { link: '/components', text: cms.sidebar.menu.cms.components },
            // { link: '/auth', text: cms.sidebar.menu.cms.auth },
            // { link: '/backend', text: cms.sidebar.menu.cms.backend },
            { link: '/frontend', text: cms.sidebar.menu.cms.frontend },
        ]} />}
        <SDI fixed={true} dropdown={cms.sidebar.menu.settings} icon={cms.sidebar.menu.settings.icon} path={`/${role}/settings`} custom={[
            { link: '/language', text: cms.sidebar.menu.settings.language },
        ]} />

        <div className='mt-auto'>
            <div className="py-2 px-3 text-300 rounded-4 cursor-pointer" onClick={modalToggle}>
                <i className="fas fa-fw fa-power-off text-green mr-3" />

                <span className="text-border text-700">{cms.header.logout}</span>
            </div>
        </div>

        <Modal isOpen={modal} toggle={modalToggle}>
            <ModalHeader toggle={modalToggle}>{cms.header.logout}</ModalHeader>
            <ModalBody className="text-center">
                <p>{cms.header.sure_logout}?</p>
                <div>
                    <Button color="green" onClick={props.logout}>{cms.header.logout} <i className='fas fa-power-off fa-fw' /></Button>{' '}
                    <Button color="red" onClick={modalToggle}>{cms.header.close} <i className='fas fa-times fa-fw' /></Button>
                </div>
            </ModalBody>
        </Modal>
    </>;



    return <div className={`SideDrawer nav-left-sidebar`}>
        <div className={`content vh-100 d-flex flex-column`}>
            <div className='d-flex align-items-stretch mb-5 pb-2'>
                <Logo type="named" />
            </div>

            <div className="flex-fill">
                <ul className="navbar-nav scrollbar-green flex-column pr-3">
                    {sideDrawerItems}
                </ul>
            </div>
        </div>

        <div className="backdrop d-md-none" onClick={toggle} />
    </div>;
};