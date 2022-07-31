import React from 'react';

import './Spinner.scss';

export default () => <div className="UI Spinner">
    <div className="position-relative">
        <div className="loader" />

        <div className='content'>
            <img src={'/images/logo.png'} />
        </div>
    </div>
</div>;