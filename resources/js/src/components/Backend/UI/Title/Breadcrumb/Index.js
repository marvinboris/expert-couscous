import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb as B, BreadcrumbItem } from 'reactstrap';
import { connect } from 'react-redux';

class Breadcrumb extends Component {
    render() {
        const {
            items, main, icon,
            content: {
                cms: {
                    pages: { general: { home } }
                }
            },
            dark = false
        } = this.props;

        let itemsComponent = null;

        if (items) itemsComponent = items.map((item, i) => (
            <BreadcrumbItem key={i}><NavLink className={`text-border`} to={item.to}>{item.content}</NavLink></BreadcrumbItem>
        ));

        return (
            <B className="d-none d-sm-flex align-items-center" color={dark ? "light" : "secondary"} listClassName="bg-transparent rounded-0 justify-content-end" style={{ top: '50%', right: 0, transform: 'translateY(-10px)', position: 'absolute', zIndex: 1000 }}>
                <BreadcrumbItem><NavLink className={`text-blue text-decoration-none`} to="/">{icon && <i className={"fas fa-" + icon + " mr-1"} />}<span className='text-500 text-blue-50'>{home}</span></NavLink></BreadcrumbItem>
                {itemsComponent}
                <BreadcrumbItem color='blue' className={`text-decoration-none`} active>{main}</BreadcrumbItem>
            </B>
        );
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Breadcrumb);