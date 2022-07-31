import React from 'react';

import './Card.css';

export default ({ title, addon, value, color }) => <div className="col px-0 px-md-3">
    <div className='Card shadow-sm'>
        <div className='title text-truncate'>{title}</div>

        <div className={'line bg-' + color} />

        <div className='d-flex align-items-end'>
            <div>
                {value}
            </div>

            <div className='ml-auto'>
                {addon}
            </div>
        </div>
    </div>
</div>;