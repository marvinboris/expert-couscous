import React from 'react';

import './PageTitle.scss';

export default ({ title, subtitle, children, icon }) => <div className="UI PageTitle">
    <div className='blue-line' />

    <div className='icon'>
        <i className={'fas fa-' + icon} />
    </div>

    <div className='flex-fill'>
        <div className='title'>{title}</div>

        <div>{subtitle}</div>
    </div>

    <div>
        {children}
    </div>
</div>;