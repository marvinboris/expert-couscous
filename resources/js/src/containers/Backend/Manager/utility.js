import React from 'react';
import { Redirect } from 'react-router-dom';

import Error from '../../../components/Messages/Error';
import Feedback from '../../../components/Messages/Feedback';

import Form from '../../../components/Backend/UI/Form';
import List from '../../../components/Backend/UI/List';

import PageTitle from '../../../components/Backend/UI/Title/PageTitle';
import Breadcrumb from '../../../components/Backend/UI/Title/Breadcrumb';

const readURL = input => {
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
};

const saveHandler = props => e => {
    e.preventDefault();
    if (props.edit) props.patch(props.match.params.id, e.target);
    else props.post(e.target);
};

const Redirection = ({ props, resource }) => {
    const {
        auth: { role, data }
    } = props;

    if (role === 'user') {
        const feature = data.role.features.find(f => f.prefix === resource.split('_').join('-'));
        return !(feature && JSON.parse(feature.permissions).includes(props.edit ? 'u' : 'c')) ? <Redirect to="/user/dashboard" /> : null;
    }

    return null;
};

export const add = {
    component: {
        saveAddHandler: (setState, props) => () => setState({ add: true }, () => props.post(document.querySelector('form'))),
        inputChangeHandler: (state, setState) => e => {
            const { name, value, files } = e.target;
            if (files) readURL(e.target);
            if (name.includes('[')) {
                const { translate } = state;
                const stateName = name.split('[')[0];
                const element = state[stateName];
                element[translate] = value;
                return setState({ [stateName]: element });
            }
            setState({ [name]: files ? files[0] : value });
        },
        fileUpload: id => document.getElementById(id).click(),
    },
    lifecycle: {
        componentDidMount: (props) => {
            props.reset();
            if (props.edit) props.get(props.match.params.id);
            else if (props.info) props.info();
        },
        componentDidUpdate: (resource, singular) => (prevProps, props, state, setState, resetState) => {
            if (!prevProps.backend[resource].message && props.backend[resource].message && props.backend[resource].message.type === 'success' && !props.edit) {
                if (state.add) resetState();
                else props.history.push({
                    pathname: `/${props.auth.role}/${resource.split('_').join('-')}`,
                    state: {
                        message: props.backend[resource].message,
                    },
                });
            }
            if ((!prevProps.backend[resource][singular] && props.backend[resource][singular]) || (props.edit && !prevProps.backend[resource].message && props.backend[resource].message && props.backend[resource].message.type === 'success')) {
                const { backend: { [resource]: { [singular]: item } } } = props;
                setState({ ...item });
            }
        },
        render: ({ className, props, resource, children }) => {
            const {
                content: {
                    cms: {
                        pages: { backend: { pages: { [resource]: cms } } }
                    }
                },
                backend: { [resource]: { error, message } },
                auth: { role }
            } = props;

            return <div className={className}>
                <PageTitle title={cms.title} subtitle={props.edit ? cms.edit : cms.add} icon={cms.icon}>
                    <Breadcrumb items={props.edit && [{ to: `/${role}/${resource.split('_').join('-')}`, content: cms.index }]} main={props.edit ? cms.edit : cms.add} />
                </PageTitle>

                <div className='content'>
                    <Redirection props={props} resource={resource} />
                    <Feedback message={message} />
                    <Error err={error} />
                    <Form onSubmit={saveHandler(props)} icon={cms.icon} title={props.edit ? cms.edit : cms.add} list={cms.index} link={`/${role}/${resource.split('_').join('-')}`} innerClassName="row justify-content-center">
                        {children}
                    </Form>
                </div>
            </div>
        }
    }
};

export const index = {
    lifecycle: {
        render: ({ className, props, resource, data, fields }) => {
            const {
                content: {
                    cms: {
                        pages: { backend: { pages: { [resource]: cms } } }
                    }
                },
                backend: { [resource]: { loading, error, message, [resource]: items = [], total } },
                auth: { role }
            } = props;
            return <div className={className}>
                <PageTitle title={cms.title} subtitle={cms.index}>
                    <Breadcrumb main={cms.index} />
                </PageTitle>

                <div className='content'>
                    <Error err={error} />
                    {props.location.state ? <Feedback time={5000} message={props.location.state.message} /> : null}
                    <Feedback message={message} />
                    <List array={data} loading={loading} data={JSON.stringify(items)} get={props.get} total={total} bordered add={cms.add} link={`/${role}/${resource.split('_').join('-')}/add`} icon={cms.icon} title={cms.index} className="shadow-sm" fields={fields} />
                </div>
            </div>;
        }
    }
}