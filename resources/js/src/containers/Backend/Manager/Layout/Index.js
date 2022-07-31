import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import SideDrawer from './SideDrawer';

import { authLogout } from '../../../../store/actions/auth';

import './Layout.scss';

class Layout extends Component {
    state = {
        selectedItem: '',
    }

    componentDidMount() {
        this.setState({ language: this.props.content.languages.find(l => l.abbr === localStorage.getItem('lang')) });
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.content.cms) !== JSON.stringify(this.props.content.cms)) this.setState({ language: this.props.content.languages.find(l => l.abbr === localStorage.getItem('lang')) });
    }

    selectItem = item => this.setState({ selectedItem: item })

    sideDrawerToggle = () => {
        const left = $('.Backend.Manager .SideDrawer').css('left');
        if (left === "0px") {
            $('.Backend.Manager .SideDrawer').animate({ left: '-100%' });
            $('.Backend.Manager .SideDrawer .backdrop').hide();
        }
        else {
            $('.Backend.Manager .SideDrawer').animate({ left: 0 });
            $('.Backend.Manager .SideDrawer .backdrop').show();
        }
    }

    render() {
        let {
            content: {
                cms
            },
            auth: { data },
            children
        } = this.props;
        const { selectedItem } = this.state;

        return (
            <div className='Backend Manager'>
                <SideDrawer props={this.props} toggle={this.sideDrawerToggle} selectItem={this.selectItem} selectedItem={selectedItem} />

                <div className='main'>
                    <div className='sticky-top'>
                        <div className='d-flex flex-fill'>
                            <div className='d-md-none'>
                                <i className='cursor-pointer fas fa-th-large text-30' onClick={this.sideDrawerToggle} />
                            </div>
                        </div>

                        <div className='user-info'>
                            <div>
                                <div className='name'>{data.name}</div>
                            </div>

                            <div>
                                <div className='profile-pic bg-img' style={{ backgroundImage: 'url("' + data.photo + '")' }} />
                            </div>
                        </div>
                    </div>

                    <main>{children}</main>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(authLogout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));