import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Collapse, Button } from 'reactstrap';

import './SideDrawerItem.scss';

const SideDrawerItem = ({ children, dropdown, icon, href = '', items, path = '', sideDrawerToggle, exact = false, select, selected, id, dark = true }) => {
    const match = window.location.pathname.includes(path);

    const toggle = () => {
        const match = selected === id;
        match ? select(null) : select(id);
    }

    const onSelect = () => toggle();

    const onSideDrawerToggle = () => {
        sideDrawerToggle();
        toggle();
    }

    let isSelected = selected === id;
    if (selected === '') isSelected = match;

    let content;
    if (!dropdown) content = <>
        <NavLink onClick={onSideDrawerToggle} exact={exact} className="SideDrawerItem d-block d-sm-none nav-link" activeClassName="active" to={href}>
            <div>
                <i className={"fas fa-" + icon + " fa-fw mr-3"} />

                <span className="text">{children}</span>
            </div>
        </NavLink>

        <NavLink onClick={onSelect} exact={exact} className="SideDrawerItem nav-link d-none d-sm-block" activeClassName="active" to={href}>
            <div>
                <i className={"fas fa-" + icon + " fa-fw mr-3"} />

                <span className="text">{children}</span>
            </div>
        </NavLink>
    </>;
    else {
        const itemEls = items.map(({ link = '', text }) => (
            <li className="nav-item text-400" key={text}>
                <NavLink onClick={sideDrawerToggle} exact className={`nav-link d-sm-none`} activeClassName="text-700" to={path + link}><span className="position-relative text-400" style={{ left: -8 }}>-</span> {text}</NavLink>
                
                <NavLink exact className={`nav-link d-none d-sm-block`} activeClassName="text-700" to={path + link}><span className="position-relative text-400" style={{ left: -8 }}>-</span> {text}</NavLink>
            </li>
        ));

        content = <>
            <Button color="link" onClick={toggle} className={`SideDrawerItem dropdown nav-link ${match ? 'active' : ''}`}>
                <div>
                    <i className={"fas fa-" + icon + " fa-fw mr-3"} />

                    <span className="text">{children}</span>
                </div>

                <i className={`fas fa-angle-down fa-fw angle-down ${isSelected ? 'open' : ''}`} />
            </Button>

            <Collapse isOpen={isSelected} className={`pl-3 bg-${dark ? "transparent" : "gray-0"}`}>
                <ul className={`nav`}>
                    {itemEls}
                </ul>
            </Collapse>
        </>;
    }

    return (
        <li className="nav-item">{content}</li>
    );
};

export default SideDrawerItem;