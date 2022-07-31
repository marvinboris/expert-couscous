import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('publication-categories', {
    start: () => ({ type: actionTypes.PUBLICATION_CATEGORIES_START }),
    success: data => ({ type: actionTypes.PUBLICATION_CATEGORIES_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.PUBLICATION_CATEGORIES_FAIL, error })
}, type, ...params);

export default {
    reset: () => ({ type: actionTypes.PUBLICATION_CATEGORIES_RESET }),
    get: (page, show, search) => resource('index', page, show, search),
    info: () => resource('info'),
    show: id => resource('show', id),
    post: data => resource('post', data),
    patch: (id, data) => resource('patch', id, data),
    delete: id => resource('delete', id),
}