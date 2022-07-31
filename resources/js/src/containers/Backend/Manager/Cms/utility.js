import React, { Fragment } from "react";
import { FormGroup, Label, NavItem, NavLink } from "reactstrap";

import Input from "../../../../components/UI/Input";

export const onChange = (value, setValue) => (e, ...deepness) => {
    const valueCopy = { ...value };

    if (deepness.length === 1) {
        valueCopy[deepness[0]] = e.target.value;
        return setValue(valueCopy);
    }

    const subValues = [];
    let subValue = { ...value };
    for (let i = 0; i < deepness.length - 1; i++) {
        const element = deepness[i];
        subValue = subValue[element];
        subValues.push(subValue);
    }
    subValues[subValues.length - 1][deepness[deepness.length - 1]] = e.target.value;
    for (let i = 1; i < deepness.length - 1; i++) {
        const element = deepness[deepness.length - 1 - i];
        const index = subValues.length - 1 - i;
        subValues[index][element] = subValues[index + 1];
    }
    valueCopy[deepness[0]] = subValues[0];

    setValue(valueCopy);
};

const recursiveDeepness = onChange => (paramItem, paramName, paramId, paramValue, paramDeepness, paramPrepends = [], paramAppends = []) => Object.keys(paramItem).map(item => {
    const mainItem = paramItem[item];
    const mainName = `${paramName}[${item}]`;
    const mainId = `${paramId}-${item}`;
    const mainValue = paramValue[item];
    const mainDeepness = paramDeepness.concat(item);

    let prepend;
    const findPrepend = paramPrepends.find(el => (new RegExp(el.regex.replace(/\[/g, '\\[').replace(/\]/g, '\\]'))).test(mainName));
    prepend = !findPrepend ? null : findPrepend.action(mainItem);

    let append;
    const findAppend = paramAppends.find(el => (new RegExp(el.regex.replace(/\[/g, '\\[').replace(/\]/g, '\\]'))).test(mainName));
    append = !findAppend ? null : findAppend.action(mainItem);

    return typeof mainItem === 'string' ? <Fragment key={Math.random() + mainName}>
        {prepend}
        <FormGroup className="col-md-6 col-lg-4 align-self-end">
            <Label className="text-small text-500">{mainItem}</Label>
            <Input key={Math.random() + mainName + '-input'} type="text" name={mainName} id={mainId} placeholder={mainItem} onChange={e => onChange(e, ...mainDeepness)} value={mainValue} />
        </FormGroup>
        {append}
    </Fragment> : recursiveDeepness(mainItem, mainName, mainId, mainValue, mainDeepness, paramPrepends, paramAppends);
});

export const navItems = (item, language, activeTab, toggle) => Object.keys(item).map(key => {
    const id = `${language.abbr}-${key}`;

    return <NavItem key={id}>
        <NavLink className={(activeTab === id) ? 'active' : ""} onClick={() => toggle(id)}>
            <span className="text-capitalize">{key.split('_').join(' ')}</span>
        </NavLink>
    </NavItem>
});

export const resourceDeepness = onChange => (example, prefix, prefixId, value) => (resource, paramPrepends = [], paramAppends = []) => {
    const resourceItem = example[resource];
    const resourceName = `${prefix}[${resource}]`;
    const resourceId = `${prefixId}-${resource}`;
    const resourceValue = value[resource];
    const resourceDeepness = [resource];
    return recursiveDeepness(onChange)(resourceItem, resourceName, resourceId, resourceValue, resourceDeepness, paramPrepends, paramAppends);
};