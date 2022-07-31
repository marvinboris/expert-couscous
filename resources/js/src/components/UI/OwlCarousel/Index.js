import React from 'react';
import { connect } from 'react-redux';
import ReactOwlCarousel from 'react-owl-carousel2';

class OwlCarousel extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (JSON.stringify(this.props.content.cms) !== JSON.stringify(nextProps.content.cms)) return true;
        return false;
    }

    render() {
        const { children, ...props } = this.props;
        return (
            <ReactOwlCarousel {...props}>
                {children}
            </ReactOwlCarousel>
        );
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(OwlCarousel);