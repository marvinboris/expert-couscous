import React, { useState } from 'react';
import { FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, CustomInput } from 'reactstrap';

import DateTimeInput from './DateTimeInput/Index';
import WithTooltip from '../../../../UI/WithTooltip/WithTooltip';

import { checkValidity } from '../../../../../shared/utility';

import './Input.css';

export default ({ icon, addon, onChange, className = '', id, name, type = 'text', required, readonly, disabled, placeholder, value = '', defaultValue, validation = {}, append, children, dark = false, bonus }) => {
    const [touched, setTouched] = useState(false);

    const inputChangedHandler = e => {
        setTouched(true);
        onChange(e);
    }

    let content;

    if (type === 'datetime-local') content = <DateTimeInput id={id} name={name} required={required} readOnly={readonly} className={"w-100 d-flex text-small h-100"} value={value} defaultValue={!value && defaultValue} placeholder={placeholder} />
    else content = <>
        <WithTooltip content={placeholder && <>{placeholder}{required && <span className="text-red">*</span>}</>} id={'tooltip-' + (id ? id : name)}>
            <InputGroup className={`bg-${dark ? "grayblue" : "white border border-soft"} rounded-6 d-flex align-items-center`} size="lg">
                {(icon || addon) && <InputGroupAddon addonType="prepend">
                    <InputGroupText className="bg-transparent d-block border-0 px-4 py-0 my-1 text-center text-16" style={{ width: 77 }}>
                        {icon ? <i className={"fas fa-" + icon + " text-greenblue mx-1 fa-fw"} /> : addon}
                    </InputGroupText>
                </InputGroupAddon>}

                {children ?
                    <CustomInput valid={touched && !!value && checkValidity(value, validation)} invalid={touched && !checkValidity(value, validation)} onChange={inputChangedHandler} type={type} id={name} name={name} required={required} readOnly={readonly} disabled={disabled} defaultValue={defaultValue} value={value} className={`bg-${dark ? "grayblue" : ""} ${((icon || addon) ? "border-top-0 border-right-0 border-bottom-0 border-soft" : "")} rounded-right-6 text-small text-secondary h-100 px-4 py-3`}>{children}</CustomInput>
                    :
                    <>
                        <Input valid={touched && !!value && checkValidity(value, validation)} invalid={touched && !checkValidity(value, validation)} onChange={inputChangedHandler} id={id ? id : name} type={type} name={name} required={required} readOnly={readonly} disabled={disabled} defaultValue={defaultValue} value={value} className={((icon || addon) ? "border-top-0 border-right-0 border-bottom-0 border-soft" : "border-0") + " rounded-right-6 text-small text-secondary h-100 px-4 py-3"} />
                        <label className="text-small text-light text-truncate m-0" htmlFor={id ? id : name}>{placeholder}</label>
                    </>
                }

                {append && <InputGroupAddon addonType="append">
                    <InputGroupText className="bg-transparent border-0 text-secondary text-small px-4">
                        {append}
                    </InputGroupText>
                </InputGroupAddon>}
            </InputGroup>
        </WithTooltip>


        {bonus}
    </>;

    return <FormGroup className={`Backend Input ${className}`}>
        {content}
    </FormGroup>;
};