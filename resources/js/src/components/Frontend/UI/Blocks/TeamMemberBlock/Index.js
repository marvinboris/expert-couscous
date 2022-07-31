import React from 'react';

import './TeamMemberBlock.scss';

export default ({ name, job, photo }) => <div className='UI TeamMemberBlock'>
    <div className='img'>
        <div className='embed-responsive embed-responsive-1by1 bg-img' style={{ backgroundImage: 'url("' + photo + '")' }} />
    </div>

    <div className='name'>{name}</div>

    <div className='job'>{job}</div>
</div>;