import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Collapse, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';

import { updateObject } from '../../../../shared/utility';

import './List.scss';

let timeout;

class List extends Component {
    state = {
        show: 10,
        search: '',
        page: 1,
        pageNumber: 1,
        pageFirst: 1,
        pageSecond: 2,
        pageLast: 3,
    }

    componentDidUpdate(prevProps, prevState) {
        const { total } = this.props;
        const { show } = this.state;
        if (prevProps.total !== total || prevState.show !== show) this.setState({ pageNumber: Math.ceil(total / show) });
    }

    inputChangedHandler = e => {
        const { name, value } = e.target;
        const { page, show, search } = this.state;
        this.firstPageHandler();
        if (name === 'show') {
            this.props.get(page, value, search);
            return this.setState({ show: value });
        }
        if (name === 'search') {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.props.get(page, show, value);
                clearTimeout(timeout);
            }, 1000);
            return this.setState({ search: value });
        }
    }

    previousPageHandler = () => {
        const { page } = this.state;
        if (page <= 1) return;
        this.pageChangeHandler(page - 1);
    }

    nextPageHandler = () => {
        const { page, pageNumber } = this.state;
        const lastPage = pageNumber;
        if (page >= lastPage) return;
        this.pageChangeHandler(page + 1);
    }

    firstPageHandler = () => {
        const { page } = this.state;
        if (page <= 1) return;
        this.pageChangeHandler(1);
    }

    lastPageHandler = () => {
        const { page, pageNumber } = this.state;
        const lastPage = pageNumber;
        if (page >= lastPage) return;
        this.pageChangeHandler(lastPage);
    }

    pageChangeHandler = page => {
        const { show, search, pageNumber } = this.state;
        const lastPage = pageNumber;
        let pageFirst;
        if (page < 3) pageFirst = 1;
        else if (page === lastPage) pageFirst = lastPage - 2;
        else pageFirst = page - 1;
        const pageSecond = pageFirst + 1, pageLast = pageFirst + 2;
        this.setState({ page, pageFirst, pageSecond, pageLast }, () => this.props.get(page, show, search));
    }

    onClick = e => {
        e.preventDefault();

        const url = e.target.href;
        this.exportData(url);
    };

    exportData = async url => {
        const { data, title } = this.props;
        const format = url.split('/')[url.split('/').length - 1];
        const name = title + '.' + format;
        const token = localStorage.getItem('token');

        try {
            const formData = new FormData();

            formData.append('data', data);
            formData.append('name', name);

            const res = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: formData,
                headers: {
                    Authorization: token
                }
            });

            const resData = await res.blob();

            const downloadLink = URL.createObjectURL(resData);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadLink;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadLink);
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const {
            fields, array, loading = false, total = 0, limit, bordered, title, subtitle, add, link, dark = false, borderless, outerClassName = '', select, children, selectHandler, content: {
                cms: {
                    pages: { components: { list: cms } }
                }
            }
        } = this.props;
        const { show, search, page, pageFirst, pageSecond, pageLast, pageNumber } = this.state;

        const titles = fields.map(({ name, fixed }) => <th className={"text-nowrap" + (fixed ? " sticky" : "")} style={fixed ? { position: 'sticky', right: 0 } : {}} key={name}>{name}</th>);
        titles.unshift(<th className="text-center align-middle" key="#">{cms.sl}</th>);
        if (select) titles.unshift(<th className="align-middle text-center" key="select_all">
            <input type="checkbox" onClick={selectHandler} className="select_all" />
        </th>);

        const content = array.map((item, index) => {
            if (limit && index >= limit) return null;
            let inside = [<th className="text-center align-middle" key={'primary' + index}>{(show === 'All' ? 0 : (page - 1) * show) + index + 1}</th>];
            if (select) inside.unshift(<th className="text-center align-middle" key={'secondary' + index}>
                <input type="checkbox" value={item._id} />
            </th>);
            fields.forEach(({ key, minWidth, fixed }) => {
                inside.push(<td className="align-middle text-truncate" style={updateObject({ minWidth, maxWidth: 250, borderColor: dark ? '#606060' : '#DEE2E6' }, fixed ? { position: 'sticky', right: 0, backgroundColor: dark ? '#1B223F' : '#F4F4F4' } : {})} key={key}>{item[key]}</td>);
            });

            return <tr className="align-middle" key={index + 1}>{inside}</tr>;
        });

        const optionsContent = <>
            <div className='show'>
                <div className='text'>{cms.show}</div>

                <Input type="select" name="show" onChange={this.inputChangedHandler} className='select'>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="All">{cms.all}</option>
                </Input>
            </div>

            <UncontrolledDropdown className="export">
                <DropdownToggle color="blue" caret>
                    <i className='fas fa-file-export' />{'Export'}
                </DropdownToggle>

                <DropdownMenu>
                    <a href="/api/export/xlsx" onClick={this.onClick} className="dropdown-item"><i className='fas fa-file-excel' />{cms.excel}</a>
                    <a href="/api/export/pdf" onClick={this.onClick} className="dropdown-item"><i className='fas fa-file-pdf' />{cms.pdf}</a>
                    <a href="/api/export/csv" onClick={this.onClick} className="dropdown-item"><i className='fas fa-file-csv' />{cms.csv}</a>
                    <a href="/api/export/pdf" onClick={this.onClick} className="dropdown-item"><i className='fas fa-print' />{cms.print}</a>
                </DropdownMenu>
            </UncontrolledDropdown>

            <div className='search'>
                <Input type="search" name="search" onChange={this.inputChangedHandler} placeholder={`${cms.search}...`} />
            </div>

            {add && <Link to={link} className="link">
                <button className='btn btn-blue'>
                    <span>{add}</span><i className='fas fa-plus' />
                </button>
            </Link>}
        </>;

        const modulo = total % show;
        const entries = total === 0 ? total : (modulo !== 0 ? modulo : show);

        return (
            <div className={'UI List shadow ' + outerClassName}>
                <input type="hidden" id="table-show" value={show} />
                <input type="hidden" id="table-page" value={page} />
                <input type="hidden" id="table-search" value={search} />

                <div className='header'>
                    <div>
                        <div className='title'>{title}</div>
                        <div className='subtitle'>{subtitle}</div>
                        <div className='blue-line' />
                    </div>

                    {optionsContent}
                </div>

                <div className="body">
                    <div className="table-responsive scrollbar-blue">
                        <Table dark={dark} bordered={bordered} hover borderless={borderless}>
                            <thead><tr>{titles}</tr></thead>
                            <tbody>{!loading && content}</tbody>
                        </Table>

                        {loading && <div className="loading">{cms.loading}...</div>}
                    </div>

                    <div>
                        {children}
                    </div>

                    <div>
                        <div>{cms.showing} {((+page !== pageNumber) && (+page > 1)) ? show : entries} {cms.from} {total} {total > 1 ? cms.entries.plural : cms.entries.singular}.</div>

                        <div className="pt-2 d-flex justify-content-end">
                            {show !== "All" && <ul className="pagination btn-group">
                                {page !== 1 && <>
                                    <li className="btn btn-yellow" onClick={this.firstPageHandler}><i className="fas fa-angle-double-left mr-2" />{cms.first}</li>
                                    <li className="btn btn-darkblue text-secondary" onClick={this.previousPageHandler}><i className='fas fa-chevron-left' /></li>
                                </>}

                                <li className={"btn btn-darkblue " + (page === pageFirst ? 'text-700 active' : 'secondary')} onClick={() => this.pageChangeHandler(pageFirst)}>{pageFirst}</li>

                                {pageNumber > 1 && <>
                                    <li className={"btn btn-darkblue " + (page === pageSecond ? 'text-700 active' : 'secondary')} onClick={() => this.pageChangeHandler(pageSecond)}>{pageSecond}</li>

                                    {pageNumber > 2 && <li className={"btn btn-darkblue " + (page === pageLast ? 'text-700 active' : 'secondary')} onClick={() => this.pageChangeHandler(pageLast)}>{pageLast}</li>}

                                    {page !== pageNumber && <>
                                        <li className="btn btn-darkblue text-secondary" onClick={this.nextPageHandler}><i className='fas fa-chevron-right' /></li>
                                        <li className="btn btn-primary" onClick={this.lastPageHandler}>{cms.last}<i className="fas fa-angle-double-right ml-2" /></li>
                                    </>}
                                </>}
                            </ul>}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(List);