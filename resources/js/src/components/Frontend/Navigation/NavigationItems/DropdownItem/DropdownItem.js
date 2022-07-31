import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Collapse } from 'reactstrap';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const DropdownItem = ({ id, icon, children, dropdown, items, href, path, select, selected, exact, navToggle, parentToggle }) => {
    const match = location.pathname.includes(path);

    const onSelect = () => {
        const match = selected === id;
        match ? select(null) : select(id);
    }

    const onNavToggle = () => {
        navToggle();
        parentToggle();
        onSelect();
    };

    const onParentToggle = () => {
        parentToggle();
        onSelect();
    }

    let isSelected = selected === id;
    if (selected === '') isSelected = match;

    let content;
    if (!dropdown) content = <>
        <NavLink onClick={onNavToggle} exact={exact} className="DropdownItem p-0 d-sm-none nav-link" activeClassName="active" to={href}>
            <div className="py-2 px-3 text-16 text-400 rounded-4">
                {icon && <FontAwesomeIcon fixedWidth icon={icon} className="text-orange mr-3" />}

                <span className="text">{children}</span>
            </div>
        </NavLink>

        <NavLink onClick={onParentToggle} exact={exact} className="DropdownItem p-0 nav-link d-none d-sm-block" activeClassName="active" to={href}>
            <div className="py-2 px-3 text-16 text-400 rounded-4">
                {icon && <FontAwesomeIcon fixedWidth icon={icon} className="text-orange mr-3" />}

                <span className="text">{children}</span>
            </div>
        </NavLink>
    </>;
    else {
        const itemEls = items.map(({ link = '', text }) => (
            <li className="nav-item text-300" key={text}>
                <NavLink onClick={onNavToggle} exact className={`nav-link d-sm-none text-white`} activeClassName="text-500" to={path + link}><span className="position-relative text-300" style={{ left: -8 }}>-</span> {text}</NavLink>
                <NavLink onClick={onParentToggle} exact className={`nav-link d-none d-sm-block text-white`} activeClassName="text-500" to={path + link}><span className="position-relative text-300" style={{ left: -8 }}>-</span> {text}</NavLink>
            </li>
        ));

        content = (
            <div>
                <Button color="link" onClick={onSelect} className={`DropdownItem nav-link d-flex align-items-center w-100 rounded-0 border-0 p-0 text-left text-white position-relative ${match ? 'active' : ''}`} style={{ boxShadow: 'none' }}>
                    <div className="py-2 px-3 text-16 text-400 rounded-4">
                        {icon && <FontAwesomeIcon fixedWidth icon={icon} className="text-orange mr-3" />}

                        <span className="text">{children}</span>
                    </div>

                    <i className={`text-orange fad ${isSelected ? 'fa-minus' : 'fa-plus'}`} />
                </Button>

                <Collapse isOpen={isSelected} className={`pl-3 bg-${"gray-0"}`}>
                    <ul className={`nav flex-column border-left ml-3 border-white-20`}>
                        {itemEls}
                    </ul>
                </Collapse>
            </div>
        );
    }

    return <div>{content}</div>;
};

export default withRouter(DropdownItem);