import React from 'react';
import { Table } from 'reactstrap';

export default ({ fields, array, limit, bordered, dark = false, borderless, innerClassName = '', outerClassName = '', select, children, selectHandler }) => {
    const titles = fields.map(({ name }) => <th className="align-middle text-nowrap" key={name}>{name}</th>);
    titles.unshift(<th className="text-center align-middle" key="#">SL</th>);
    if (select) titles.unshift(<th className="align-middle text-center" key="select_all">
        <input type="checkbox" onClick={selectHandler} className="select_all" />
    </th>);

    const content = array.map((item, index) => {
        if (limit && index >= limit) return null;
        let inside = [<th className="text-center align-middle" key={'primary' + index}>{index + 1}</th>];
        if (select) inside.unshift(<th className="text-center align-middle" key={'white' + index}>
            <input type="checkbox" value={item._id} />
        </th>);
        fields.forEach(({ key, minWidth, maxWidth }) => {
            inside.push(<td className="align-middle text-nowrap text-truncate" style={{ minWidth, maxWidth }} key={key}>{item[key]}</td>);
        });

        return <tr className="align-middle" key={index + 1}>{inside}</tr>;
    });


    return (
        <div className={`pb-4 text-16 ${outerClassName}`}>
            <div className="flex-fill d-flex flex-column">
                <div className="table-responsive flex-fill">
                    <Table dark={dark} bordered={bordered} hover borderless={borderless} className={'text-reset ' + innerClassName}>
                        <thead className="bg-border-10 rounded-8"><tr>{titles}</tr></thead>
                        <tbody>{content}</tbody>
                    </Table>
                </div>

                <div className="pt-3">
                    {children}
                </div>
            </div>
        </div>
    );
};