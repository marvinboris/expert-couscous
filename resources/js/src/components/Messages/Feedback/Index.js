import React, { useState } from 'react';
import { Alert } from 'reactstrap';

export default ({ message, time }) => {
    const [visible, setVisible] = useState(true);

    if (time) setTimeout(() => {
        setVisible(false);
    }, time);

    return message ? <Alert color={message.type} isOpen={visible}>{message.content}</Alert> : null;
}