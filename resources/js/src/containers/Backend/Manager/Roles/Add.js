import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormGroup, CustomInput } from 'reactstrap';

// Components
import Save from '../../../../components/Backend/UI/Form/Save';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import actions from '../../../../store/actions/backend/roles';
import * as utility from '../utility';

const initialState = {
    name: '',
    description: '',
    features: [],

    add: false,
}

class Add extends Component {
    state = { ...initialState }

    // Component methods
    resetState = () => this.setState({ ...initialState })
    saveAddHandler = () => utility.add.component.saveAddHandler(this.setState.bind(this), this.props)
    inputChangeHandler = e => {
        const { id, name, value, checked, files } = e.target;
        if (name.includes('features')) {
            let features = [...this.state.features];

            if (name.includes('id')) {
                const [, feature_id] = id.split('-');
                const feature = features.find(f => +f.id === +feature_id);

                if (checked && !feature) features.push({ id: feature_id, permissions: [] });
                else features = features.filter(f => +f.id !== +feature_id);
            } else if (name.includes('permissions')) {
                const [, feature_id, abbr] = id.split('-');
                const featureIndex = features.findIndex(f => +f.id === +feature_id);
                const feature = features[featureIndex];
                let permissions = [...feature.permissions];
                const found = permissions.includes(abbr);

                if (checked && !found) permissions.push(abbr);
                else permissions = permissions.filter(p => p !== abbr);

                feature.permissions = permissions;
                features[featureIndex] = feature;
            }

            return this.setState({ features });
        }
        this.setState({ [name]: files ? files[0] : value });
    }
    fileUpload = id => utility.add.component.fileUpload(id)

    // Lifecycle methods
    componentDidMount() { utility.add.lifecycle.componentDidMount(this.props) }
    componentDidUpdate(prevProps) { utility.add.lifecycle.componentDidUpdate('roles', 'role')(prevProps, this.props, this.state, this.setState.bind(this), this.resetState) }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { roles: { form } } } }
                }
            },
            backend: { roles: { loading, features = [] } },
        } = this.props;
        const { name, description, features: f } = this.state;
        let content;

        const featuresItems = features.sort((a, b) => a.name.localeCompare(b.name)).map(feature => {
            const element = f.find(i => +i.id === +feature.id);

            const permissions = [{ abbr: 'c', name: form.create }, { abbr: 'u', name: form.update }, { abbr: 'd', name: form.delete }].map(p => {
                const checked = element && element.permissions.includes(p.abbr);

                return <div key={JSON.stringify(p)} className='col-lg-4'>
                    <FormGroup>
                        <CustomInput type="checkbox" id={`feature-${feature.id}-${p.abbr}`} checked={checked} name={`features[${feature.id}][permissions][${p.abbr}]`} onChange={this.inputChangeHandler} label={p.name} />
                    </FormGroup>
                </div>
            });

            const checked = element !== undefined;

            return <div key={JSON.stringify(feature)}>
                <CustomInput type="switch" id={`feature-${feature.id}`} className="col-12 pb-2" checked={checked} name={`features[${feature.id}][id]`} onChange={this.inputChangeHandler} label={<span className="text-500">{feature.name}</span>} />

                {checked && <div className='row'>{permissions}</div>}
            </div>
        });

        if (loading) content = <div className='col-12'>
            <Preloader />
        </div>;
        else content = <>
            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <div className='row'>
                <div className="col-lg-9">
                    <div className='row'>
                        <Input type="text" className="col-md-6" onChange={this.inputChangeHandler} value={name} name="name" required label={form.name} />
                        <Input type="text" className="col-md-6" onChange={this.inputChangeHandler} value={description} name="description" required label={form.description} />

                        <div className="pb-2 col-12 text-large text-700">{form.features}</div>
                        <FormGroup className="col-12">
                            {featuresItems}
                        </FormGroup>
                    </div>
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </div>
        </>;

        return <utility.add.lifecycle.render className='Roles' props={this.props} resource={'roles'}>
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