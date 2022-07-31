import React, { Component } from 'react';

import '../../../assets/css/star-rating-svg.css';

export default class Stars extends Component {
    stars = () => {
        $(".ranking-stars").starRating({
            strokeColor: '#894A00',
            strokeWidth: 10,
            starSize: 25,
            useFullStars: true,
            disableAfterRate: false,
            callback: function (currentRating) {
                $('input[name="mark"]').val(currentRating);
            }
        });

        $(".stars").starRating({
            readOnly: true,
            strokeWidth: 9,
            starSize: 12,
            strokeColor: 'orange',
            activeColor: 'orange',
            emptyColor: 'transparent',
        });

        $(".stars.stars-10").starRating({
            starSize: 10,
        });

        $(".stars.stars-14").starRating({
            starSize: 14,
        });
    }

    componentDidMount() {
        this.stars();
    }

    render() {
        const { mark, readOnly, lg } = this.props;

        return <div className="overflow-hidden" style={readOnly && { height: 15 }}>
            <div style={readOnly && { top: -6 }} className={`position-relative ${lg ? "stars-14" : "stars-10"} ${readOnly ? "stars" : "ranking-stars"}`} data-rating={mark} />
        </div>;
    }
}