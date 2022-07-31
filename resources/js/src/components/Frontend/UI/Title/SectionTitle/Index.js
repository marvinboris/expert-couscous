import React from 'react';

import './SectionTitle.scss';

export default ({ head, title, subtitle, centered }) => <div className={`SectionTitle${centered ? " centered" : ""}`}>
    <div className='text'>
        {head && <div className='super'>{head}</div>}

        <div className='title'>
            {(title.top || title.bottom) && <div className='vertical'>
                <div className='top'>{title.top}</div>
                <div className='bottom'>{title.bottom}</div>
            </div>}

            {(title.left || title.right) && <div className='horizontal'>
                <span className='left'>{title.left}</span>
                <span className='right'>{title.right}</span>
            </div>}
        </div>

        {subtitle && <div className='subtitle row'>
            <div className='col-md-6'>{subtitle.left || subtitle}</div>
            <div className='col-md-6'>{subtitle.right}</div>
        </div>}
    </div>
</div>;