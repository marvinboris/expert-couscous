import React from 'react';

import View from './View';

export default ({ photo, see, title }) => photo && <div className="d-flex">
    <span className='mr-2'>{see}</span>

    <span className="ml-auto">
        <View title={title} content={<img src={photo} className="w-100" />}>
            <i className="fas fa-eye text-green mr-2 fa-fw" />
        </View>
    </span>
</div>;