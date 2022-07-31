import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('services', {
    start: () => ({ type: actionTypes.SERVICES_START }),
    success: data => ({ type: actionTypes.SERVICES_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.SERVICES_FAIL, error })
}, type, ...params);

export default {
    reset: () => ({ type: actionTypes.SERVICES_RESET }),
    get: (page, show, search) => resource('index', page, show, search),
    info: () => resource('info'),
    show: id => resource('show', id),
    post: data => resource('post', data),
    patch: (id, data) => resource('patch', id, data),
    delete: id => resource('delete', id),
}