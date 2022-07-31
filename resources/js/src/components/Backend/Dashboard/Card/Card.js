import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ children, icon, color, details }) => <div className="col-xxl-3 col-6 pb-3 pb-xxl-0">
    <div className={`bg-${color} rounded-8 text-decoration-none text-white px-3 py-4 d-flex align-items-center`}>
        <div className="mr-3">
            <i className={`fas fa-${icon} text-32 text-black-30`} />
        </div>

        <div className="mt-auto">
            <div className="text-montserrat text-700 text-14 text-md-20 mb-2 d-flex align-items-center">
                <div>{children}</div>
            
                <div className="text-400 text-15 ml-1">XAF</div>
            </div>

            <div className="text-10 text-md-14 text-300 text-truncate">{details}</div>
        </div>
    </div>
</div>;