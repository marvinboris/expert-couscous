import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {};

const resources = {
    admins: 'ADMINS', cms: 'CMS', notifications: 'NOTIFICATIONS', dashboard: 'DASHBOARD', features: 'FEATURES', languages: 'LANGUAGES', roles: 'ROLES', users: 'USERS', settings: 'SETTINGS',
    publication_categories: 'PUBLICATION_CATEGORIES', publications: 'PUBLICATIONS', subscribers: 'SUBSCRIBERS', services: 'SERVICES', testimonies: 'TESTIMONIES', team_members: 'TEAM_MEMBERS', partners: 'PARTNERS',
};

Object.keys(resources).forEach(resource => {
    initialState[resource] = {
        loading: false,
        error: null
    }
});

const reset = (root, state) => updateObject(state, { [root]: initialState[root] });
const start = (root, state) => updateObject(state, { [root]: updateObject(state[root], { loading: true, message: null }) });
const success = (root, state, action) => updateObject(state, { [root]: updateObject(state[root], { loading: false, error: null, ...action }) });
const fail = (root, state, action) => updateObject(state, { [root]: updateObject(state[root], { loading: false, ...action }) });

const getResourceKey = (actionType, end) => {
    const [start] = actionType.split(end);
    return Object.keys(resources).find(key => resources[key] === start);
}

export default (state = initialState, action) => {
    if (action.type.includes('_RESET')) return reset(getResourceKey(action.type, '_RESET'), state);
    else if (action.type.includes('_START')) return start(getResourceKey(action.type, '_START'), state);
    else if (action.type.includes('_SUCCESS')) return success(getResourceKey(action.type, '_SUCCESS'), state, action);
    else if (action.type.includes('_FAIL')) return fail(getResourceKey(action.type, '_FAIL'), state, action);
    else return state;
};