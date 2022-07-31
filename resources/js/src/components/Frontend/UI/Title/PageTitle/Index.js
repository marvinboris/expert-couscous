import React from 'react';

import './PageTitle.scss';

export default ({ title, subtitle }) => <div className='PageTitle'>
    <div className='container'>
        <div className='title'>{title}</div>

        <div className='subtitle'>{subtitle}</div>
    </div>
</div>;