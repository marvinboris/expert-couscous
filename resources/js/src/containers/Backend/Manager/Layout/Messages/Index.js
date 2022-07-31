import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMoneyBillWaveAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default ({ cms, messages = [], role }) => {
    const unreadMessages = messages.filter(message => !message.read_at);

    const messageItems = messages.map(message => {
        let result;
        switch (message.type) {
            case 'App\\Messages\\PlanPurchase':
                result = <><FontAwesomeIcon className="text-green mr-1" fixedWidth icon={faShoppingCart} />You successfully bought a {message.data.name} plan.</>;
                break;

            case 'App\\Messages\\PlanImminentExpiration':
                result = <><FontAwesomeIcon className="text-orange mr-1" fixedWidth icon={faShoppingCart} />Your {message.data.name} plan will expire in {message.data.days} {message.data.days > 1 ? 's' : ''}.</>;
                break;

            case 'App\\Messages\\PlanExpired':
                result = <><FontAwesomeIcon className="text-red mr-1" fixedWidth icon={faShoppingCart} />Your {message.data.name} plan has just expired.</>;
                break;

            case 'App\\Messages\\RestaurantRecharge':
                result = <><FontAwesomeIcon className="text-blue mr-1" fixedWidth icon={faMoneyBillWaveAlt} />You successfully made a {message.data.amount} USD{message.data.method && (message.data.method.name + ' ')} recharge.</>;
                break;

            default:
                break;
        }

        return <Link key={JSON.stringify(message)} to={"/" + role + "/messages/" + message.id} className={"text-dark dropdown-item text-truncate border-top" + (!message.read_at ? " text-700" : "")}>
            {result}
        </Link>
    });

    return <UncontrolledDropdown inNavbar className='Messages'>
        <DropdownToggle nav className="position-relative px-0">
            <i className="far fa-comment text-26 text-border" />
            <Badge color="orange" className="position-absolute rounded-circle text-700 d-inline-flex justify-content-center align-items-center" style={{ width: 18, height: 18, top: 0, right: 0, transform: 'translateX(50%)' }}>
                {/* <b className="text-white">{unreadMessages.length}</b> */}
            </Badge>
        </DropdownToggle>

        <DropdownMenu right style={{ width: '20rem' }}>
            {messages.length === 0 ? <DropdownItem disabled className="bg-dark text-white">
                <div className="py-2">{cms.header.no_message}.</div>
            </DropdownItem> : <>
                <DropdownItem disabled className="text-left pt-0 small">
                    {cms.header.you_have} {unreadMessages.length} {unreadMessages.length > 1 ? cms.header.unread_messages : cms.header.unread_message}.
                </DropdownItem>

                {messageItems}

                <DropdownItem className="text-center pb-0 border-top">
                    <Link className="text-reset small" to={"/" + role + "/messages"}>{cms.header.view_all_messages}</Link>
                </DropdownItem>
            </>}
        </DropdownMenu>
    </UncontrolledDropdown>;
}