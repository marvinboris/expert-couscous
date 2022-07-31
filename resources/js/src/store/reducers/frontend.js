import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {};

const pages = {
    home: "HOME", about: "ABOUT", contact: "CONTACT", publications: "PUBLICATIONS", services: "SERVICES",
};

Object.keys(pages).forEach(page => {
    initialState[page] = {
        loading: false,
        error: null
    }
});

const reset = (root, state) => updateObject(state, { [root]: initialState[root] });
const start = (root, state) => updateObject(state, { [root]: updateObject(state[root], { loading: true, message: null }) });
const success = (root, state, action) => updateObject(state, { [root]: updateObject(state[root], { loading: false, error: null, ...action }) });
const fail = (root, state, action) => updateObject(state, { [root]: updateObject(state[root], { loading: false, ...action }) });

const getPageKey = (actionType, end) => {
    const [start] = actionType.split(end);
    return Object.keys(pages).find(key => pages[key] === start);
}

export default (state = initialState, action) => {
    if (action.type.includes('_RESET')) return reset(getPageKey(action.type, '_RESET'), state);
    else if (action.type.includes('_START')) return start(getPageKey(action.type, '_START'), state);
    else if (action.type.includes('_SUCCESS')) return success(getPageKey(action.type, '_SUCCESS'), state, action);
    else if (action.type.includes('_FAIL')) return fail(getPageKey(action.type, '_FAIL'), state, action);
    else return state;
};