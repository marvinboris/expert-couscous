import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './RemainingTime.scss';

class RemainingTime extends Component {
    state = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    }



    // Component methods
    twoDigits = number => number > 9 ? number : '0' + number

    getTime = () => {
        const { time } = this.props;

        const eventTime = (new Date(time)).getTime();
        const now = (new Date()).getTime();

        let days, hours, minutes, seconds;

        if (now >= eventTime) {
            days = hours = minutes = seconds = 0;
            clearInterval(this.getTime);
        } else {
            days = Math.floor((eventTime - now) / (1000 * 60 * 60 * 24));
            hours = Math.floor((eventTime - now) / (1000 * 60 * 60)) - days * 24;
            minutes = Math.floor((eventTime - now) / (1000 * 60)) - days * 24 * 60 - hours * 60;
            seconds = Math.floor((eventTime - now) / (1000)) - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
        }

        this.setState({ days: this.twoDigits(days), hours: this.twoDigits(hours), minutes: this.twoDigits(minutes), seconds: this.twoDigits(seconds) });
    }



    // Lifecycle methods
    componentDidMount() {
        setInterval(this.getTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.getTime);
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { components: { remaining_time: cms } }
                }
            }
        } = this.props;
        const { days, hours, minutes, seconds } = this.state;

        return <div className='UI RemainingTime'>
            <div className='days'>
                <div>{cms.days}</div>

                <div className='block'>{days}</div>
            </div>

            <div className='hours'>
                <div>{cms.hours}</div>

                <div className='block'>{hours}</div>
            </div>

            <div className='minutes'>
                <div>{cms.minutes}</div>

                <div className='block'>{minutes}</div>
            </div>

            <div className='seconds'>
                <div>{cms.seconds}</div>

                <div className='block'>{seconds}</div>
            </div>

            <div className='remaining'>{cms.remaining}</div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(RemainingTime);