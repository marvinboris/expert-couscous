import React from 'react';
import { Link } from 'react-router-dom';

import Delete from './Delete';

export default ({ item, resource, props }) => {
    if (props) {
        const { auth: { role, data } } = props;

        let additionalContent;
        if (role === 'user') {
            const feature = data.role.features.find(f => f.prefix === resource);

            additionalContent = <>
                {(feature && JSON.parse(feature.permissions).includes('u')) && <Link to={`/${role}/${resource}/${item.id}/edit`} className="mx-1">
                    <i className="fas fa-edit text-brokenblue fa-fw" />
                </Link>}
                {(feature && JSON.parse(feature.permissions).includes('d')) && <span className="mx-1"><Delete deleteAction={() => props.delete(item.id)}><i className="fas fa-trash fa-fw text-red fa-fw" /></Delete></span>}
            </>;
        }
        else if (role === 'admin') additionalContent = <>
            <Link to={`/${role}/${resource}/${item.id}/edit`} className="mx-1">
                <i className="fas fa-edit text-brokenblue fa-fw" />
            </Link>
            <span className="mx-1"><Delete deleteAction={() => props.delete(item.id)}><i className="fas fa-trash fa-fw text-red fa-fw" /></Delete></span>
        </>;

        return <div className="text-center">
            {item.link && <a href={item.link} target="_blank" className='mx-1'><i className='fas fa-external-link-alt text-blue fa-fw' /></a>}
            <Link to={`/${role}/${resource}/${item.id}`} className="mx-1">
                <i className="fas fa-eye text-green fa-fw" />
            </Link>
            {additionalContent}
        </div>
    }
    return null;
}