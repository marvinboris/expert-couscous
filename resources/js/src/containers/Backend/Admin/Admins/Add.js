import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

// Components
import Error from '../../../../components/Messages/Error';
import Feedback from '../../../../components/Messages/Feedback';

import Form from '../../../../components/Backend/UI/Form';
import Save from '../../../../components/Backend/UI/Form/Save';
import PageTitle from '../../../../components/Backend/UI/Title/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Title/Breadcrumb';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import { getAdmin, postAdmins, patchAdmins, resetAdmins } from '../../../../store/actions/backend/admins';

const initialState = {
    name: '',
    phone: '',
    photo: null,
    email: '',
    password: '',
    password_confirmation: '',

    add: false,
}

class Add extends Component {
    state = { ...initialState }



    // Component methods
    saveHandler = e => {
        e.preventDefault();
        if (this.props.edit) this.props.patch(this.props.match.params.id, e.target);
        else this.props.post(e.target);
    }

    saveAddHandler = () => this.setState({ add: true }, () => this.props.post(document.querySelector('form')))

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        if (files) this.readURL(e.target);
        this.setState({ [name]: files ? files[0] : value });
    }

    readURL = input => {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById(`embed-${input.name}`).style.backgroundImage = `url('${e.target.result}')`;
                document.getElementById(`embed-${input.name}`).style.backgroundSize = "cover";
                document.getElementById(`embed-${input.name}`).querySelector(".file-selected").innerHTML = file.name;
            }

            reader.readAsDataURL(file); // convert to base64 string
        }
    }

    fileUpload = () => document.getElementById('photo').click()



    // Lifecycle methods
    componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.backend.admins.message && this.props.backend.admins.message && this.props.backend.admins.message.type === 'success' && !this.props.edit) {
            if (this.state.add) this.setState({ ...initialState });
            else this.props.history.push({
                pathname: '/admin/admins',
                state: {
                    message: this.props.backend.admins.message,
                },
            });
        }
        if (!prevProps.backend.admins.admin && this.props.backend.admins.admin) {
            const { backend: { admins: { admin } } } = this.props;
            this.setState({ ...admin });
        }
        if (this.props.edit && !prevProps.backend.admins.message && this.props.backend.admins.message && this.props.backend.admins.message.type === 'success') {
            const { photo } = this.props.backend.admins.admin;
            this.setState({ photo });
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { admins: { icon, title, add, edit, index, form } } } }
                }
            },
            backend: { admins: { loading, error, message, admin = {} } },
        } = this.props;
        const { name, phone, photo, email, password, password_confirmation } = this.state;
        let content;

        const errors = <>
            <Error err={error} />
        </>;

        if (loading) content = <Col xs={12}>
            <Preloader />
        </Col>;
        else content = <>
            <Feedback message={message} />

            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <Row>
                <div className="col-lg-9">
                    <Row>
                        <Input type="text" className="col-lg-6" onChange={this.inputChangeHandler} value={name} name="name" required label={form.name} />
                        <Input type="tel" className="col-lg-6" addon={<span className="text-secondary text-small">+237</span>} onChange={this.inputChangeHandler} value={phone} name="phone" required label={form.phone} />
                        <Input type="password" className="col-lg-6" onChange={this.inputChangeHandler} value={password} name="password" label={form.password} />
                        <Input type="password" className="col-lg-6" onChange={this.inputChangeHandler} value={password_confirmation} name="password_confirmation" label={form.password_confirmation} />
                        <Input type="email" className="col-lg-6" onChange={this.inputChangeHandler} value={email} name="email" label={form.email} />
                    </Row>
                </div>

                <div className="col-lg-3">
                    <Input type="image" name="photo" label={form.photo} onClick={this.fileUpload} cms={form} defaultValue={admin.photo} value={photo} />
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </Row>
        </>;


        return <div className='Admins'>
            <PageTitle title={title} subtitle={this.props.edit ? edit : add} icon={icon}>
                <Breadcrumb items={this.props.edit && [{ to: '/admin/admins', content: index }]} main={this.props.edit ? edit : add} />
            </PageTitle>

            <div className='content'>
                {errors}
                <Form onSubmit={this.saveHandler} icon={icon} title={this.props.edit ? edit : add} list={index} link="/admin/admins" innerClassName="row justify-content-center">
                    <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(getAdmin(id)),
    post: data => dispatch(postAdmins(data)),
    patch: (id, data) => dispatch(patchAdmins(id, data)),
    reset: () => dispatch(resetAdmins()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));