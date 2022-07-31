import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CustomInput, FormGroup, Row } from 'reactstrap';

import Error from '../../../../components/Messages/Error';
import Feedback from '../../../../components/Messages/Feedback';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import { postQuote } from '../../../../store/actions/frontend/home';

import './Quote.scss';

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    message: '',
    services: [],
}

class Quote extends Component {
    state = { ...initialState }



    // Component methods
    saveHandler = e => {
        e.preventDefault();
        this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, id, value, checked, files } = e.target;
        if (name.includes('services_check')) {
            let services = [...this.state.services];
            const [, service_id] = id.split('-');

            if (checked) services.push(service_id);
            else services = services.filter(service => +service !== +service_id);

            return this.setState({ services });
        }
        this.setState({ [name]: files ? files[0] : value });
    }



    // Lifecycle methods
    componentDidUpdate(prevProps) {
        if (!prevProps.frontend.home.message && this.props.frontend.home.message && this.props.frontend.home.message.type === 'success' && !this.props.edit) this.setState({ ...initialState });
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { frontend: { pages: { home: { quote: cms } } } }
                }, languages,
            },
            frontend: { home: { loading, error, message: backend_message, all_services = [] } },
        } = this.props;
        const { first_name, last_name, email, phone, company, address, message, services } = this.state;
        let content;
        const lang = localStorage.getItem('lang');

        const servicesItems = all_services.map(service => ({ ...service, title: service.title[lang] })).sort((a, b) => a.title.localeCompare(b.title)).map(service => {
            const checked = services.find(i => +i === +service.id) !== undefined;

            return <div key={JSON.stringify(service)}>
                <CustomInput type="switch" id={`service-${service.id}`} className="col-md-6" checked={checked} name={`services_check[]`} onChange={this.inputChangeHandler} label={<span className="text-400">{service.title}</span>} />
                {checked && <input type='hidden' name='services[]' defaultValue={+service.id} />}
            </div>
        });

        const errors = <>
            <Error err={error} />
        </>;

        if (loading) content = <div className='col-12'>
            <Preloader />
        </div>;
        else content = <div className='col-12'>
            <Feedback message={backend_message} time={5000} />

            <div className='row justify-content-center'>
                <div className='col-12'>
                    <div className='title'>{cms.form.title}</div>
                    <div className='subtitle'>{cms.form.subtitle}</div>
                </div>

                <div className="col-12">
                    <Row>
                        <FormGroup className="col-12">
                            <div className='services-title'>{cms.form.services_title}</div>
                            {servicesItems}
                        </FormGroup>
                        <Input className="col-lg-6" type="text" name="first_name" placeholder={cms.form.first_name} onChange={this.inputChangeHandler} required value={first_name} />
                        <Input className="col-lg-6" type="text" name="last_name" placeholder={cms.form.last_name} onChange={this.inputChangeHandler} required value={last_name} />
                        <Input className="col-lg-6" type="email" name="email" placeholder={cms.form.email} onChange={this.inputChangeHandler} required value={email} />
                        <Input className="col-lg-6" type="tel" name="phone" placeholder={cms.form.phone} onChange={this.inputChangeHandler} required value={phone} />
                        <Input className="col-lg-6" type="text" name="company" placeholder={cms.form.company} onChange={this.inputChangeHandler} required value={company} />
                        <Input className="col-lg-6" type="text" name="address" placeholder={cms.form.address} onChange={this.inputChangeHandler} required value={address} />
                        <Input className="col-12" type="textarea" name="message" placeholder={cms.form.message} onChange={this.inputChangeHandler} required value={message} />
                    </Row>
                </div>
            </div>

            <div className='submit'>
                <button className='btn btn-green'>{cms.form.submit}<i className='fas fa-paper-plane' /></button>
            </div>
        </div>;


        return <div className='Quote'>
            {errors}
            <form onSubmit={this.saveHandler} encType="multipart/form-data" className="row justify-content-center">
                {content}
            </form>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    post: data => dispatch(postQuote(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quote);