import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'reactstrap';

import './Form.scss';

export default ({ onSubmit, title, subtitle, className = '', children, style, id, list, link, disabled }) => <div className={'UI Form shadow ' + className}>
    <div className='header'>
        <div>
            <div className='title'>{title}</div>
            <div className='subtitle'>{subtitle}</div>
            <div className='blue-line' />
        </div>

        {list && <Link to={link} className="link">
            <button className='btn btn-blue'>
                <span>{list}</span><i className='fas fa-tasks' />
            </button>
        </Link>}
    </div>

    <div className={'body ' + className} style={style}>
        {disabled ? <div id={id}>
            {children}
        </div> : <Form onSubmit={onSubmit} id={id} encType="multipart/form-data">
            {children}
        </Form>}
    </div>
</div>;