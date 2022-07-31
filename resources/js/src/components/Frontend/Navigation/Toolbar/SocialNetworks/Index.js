import React from 'react';
import { Component } from 'react';

import './SocialNetworks.css';

export default class SocialNetworks extends Component {
    render() {
        return <div className="SocialNetworks">
            <div className="Bouton_reseaux">
                <div className="blob-nav">
                    <div className="wobble"></div>

                    <div className="wobble"></div>

                    <div id="toggle-nav" className="toggle" onClick={function () {
                        $('.Frontend .Toolbar .SocialNetworks .nav-item').toggleClass('slide-out');
                        $('.Frontend .Toolbar .SocialNetworks .hamburger-1').toggleClass('cross-right');
                        $('.Frontend .Toolbar .SocialNetworks .hamburger-2').toggleClass('cross-hide');
                        $('.Frontend .Toolbar .SocialNetworks .hamburger-3').toggleClass('cross-left');
                        $('.Frontend .Toolbar .SocialNetworks .wobble').addClass('ripple');
                        setTimeout(function () {
                            $('.Frontend .Toolbar .SocialNetworks .wobble').removeClass('ripple');
                        }, 1000);
                    }}>
                        {/* <span className="hamburger hamburger-1"></span>
                        <span className="hamburger hamburger-2"></span>
                        <span className="hamburger hamburger-3"></span> */}
                        <span className="ico_bnt_blob">
                            <i className="fas fa-sms" />
                        </span>
                    </div>

                    <nav>
                        <div className="nav-item"><i className="fas fa-phone-alt"></i></div>
                        <div className="nav-item"><i className="fas fa-envelope"></i></div>
                        <div className="nav-item"><i className="fa fa-facebook"></i></div>
                        <div className="nav-item"><i className="fa fa-twitter"></i></div>
                    </nav>
                </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="shadowed-goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="8" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                        <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
                        <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                        <feBlend in2="shadow" in="goo" result="goo" />
                        <feBlend in2="goo" in="SourceGraphic" result="mix" />
                    </filter>
                </defs>
            </svg>
        </div>;
    }
}