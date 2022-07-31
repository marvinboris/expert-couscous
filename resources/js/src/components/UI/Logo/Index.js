import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Logo.scss';

class Logo extends Component {
    render() {
        const {
            type = 'default', style,
            content: {
                cms: {
                    global: { logo }
                }
            }
        } = this.props;

        return <div className="UI Logo" >
            <img src={logo[type]} style={style} className={`img-fluid${type !== 'default' && ' ' + type}`} />
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Logo);