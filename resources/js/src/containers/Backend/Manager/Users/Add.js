import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Save from '../../../../components/Backend/UI/Form/Save';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import actions from '../../../../store/actions/backend/users';
import * as utility from '../utility';

const initialState = {
    name: '',
    phone: '',
    photo: null,
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '',

    add: false,
}

class Add extends Component {
    state = { ...initialState }

    // Component methods
    resetState = () => this.setState({ ...initialState })
    saveAddHandler = () => utility.add.component.saveAddHandler(this.setState.bind(this), this.props)
    inputChangeHandler = e => utility.add.component.inputChangeHandler(this.state, this.setState.bind(this))(e)
    fileUpload = id => utility.add.component.fileUpload(id)

    // Lifecycle methods
    componentDidMount() { utility.add.lifecycle.componentDidMount(this.props) }
    componentDidUpdate(prevProps) { utility.add.lifecycle.componentDidUpdate('users', 'user')(prevProps, this.props, this.state, this.setState.bind(this), this.resetState) }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { users: { form } } } }
                }
            },
            backend: { users: { loading, roles = [], user = {} } },
        } = this.props;
        const { name, phone, photo, email, password, password_confirmation, role_id } = this.state;
        let content;

        const rolesOptions = roles.sort((a, b) => a.name.localeCompare(b.name)).map(role => <option key={JSON.stringify(role)} value={role.id}>{role.name}</option>);

        if (loading) content = <div className='col-12'>
            <Preloader />
        </div>;
        else content = <>
            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <div className='row'>
                <div className="col-lg-9">
                    <div className='row'>
                        <Input type="text" className="col-lg-6" onChange={this.inputChangeHandler} value={name} name="name" required label={form.name} />
                        <Input type="tel" className="col-lg-6" addon={<span className="text-secondary text-small">+237</span>} onChange={this.inputChangeHandler} value={phone} name="phone" required label={form.phone} />
                        <Input type="password" className="col-lg-6" onChange={this.inputChangeHandler} value={password} name="password" label={form.password} />
                        <Input type="password" className="col-lg-6" onChange={this.inputChangeHandler} value={password_confirmation} name="password_confirmation" label={form.password_confirmation} />
                        <Input type="email" className="col-lg-6" onChange={this.inputChangeHandler} value={email} name="email" label={form.email} />
                        <Input type="select" className="col-lg-6" name="role_id" label={form.role} onChange={this.inputChangeHandler} required value={role_id}>
                            <option>{form.select_role}</option>
                            {rolesOptions}
                        </Input>
                    </div>
                </div>

                <div className="col-lg-3">
                    <Input type="image" name="photo" label={form.photo} onClick={() => this.fileUpload('photo')} cms={form} defaultValue={user.photo} value={photo} />
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </div>
        </>;

        return <utility.add.lifecycle.render className='Users' props={this.props} resource={'users'}>
            <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
            {content}
        </utility.add.lifecycle.render>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(actions.show(id)),
    info: () => dispatch(actions.info()),
    post: data => dispatch(actions.post(data)),
    patch: (id, data) => dispatch(actions.patch(id, data)),
    reset: () => dispatch(actions.reset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));