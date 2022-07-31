import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Navbar, Nav, UncontrolledDropdown } from 'reactstrap';
import { useHistory } from "react-router-dom";

import NavigationItem from './NavigationItem/NavigationItem';

export default ({ light = false, font, toggleNavbar, cms = {}, categories = [], props }) => {
    const history = useHistory();

    const categoryClickHandler = link => {
        toggleNavbar();
        history.push(link);
    };

    return <Navbar dark={!light} light={light} expand className="NavigationItems position-static">
        <Nav className="d-block d-lg-flex align-items-center" navbar>
            <NavigationItem toggleNavbar={toggleNavbar} font={font} href="/" icon="fas fa-home">{cms.menu.home}</NavigationItem>
            <NavigationItem toggleNavbar={toggleNavbar} font={font} href="/about">{cms.menu.about}</NavigationItem>
            <NavigationItem toggleNavbar={toggleNavbar} font={font} href="/services">{cms.menu.services}</NavigationItem>
            <UncontrolledDropdown setActiveFromChild className='NavigationItem'>
                <DropdownToggle tag="a" className={`nav-link text-${font}`} caret>
                    {cms.menu.publications}
                </DropdownToggle>

                <DropdownMenu>
                    {categories.map(category =>
                        <DropdownItem tag="a" key={JSON.stringify(category)} active={location.href === category.link} onClick={() => categoryClickHandler(category.link)}>{category.name}</DropdownItem>)}
                </DropdownMenu>
            </UncontrolledDropdown>
            <NavigationItem toggleNavbar={toggleNavbar} font={font} href="/contact">{cms.menu.contact}</NavigationItem>
            <a href={`tel:${cms.menu.tel}`} className="tel btn btn-green"><i className='fas fa-phone' />{cms.menu.tel}</a>
        </Nav>
    </Navbar>;
}