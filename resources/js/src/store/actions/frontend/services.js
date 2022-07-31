import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetServices = () => ({ type: actionTypes.SERVICES_RESET });
const servicesStart = () => ({ type: actionTypes.SERVICES_START });
const servicesSuccess = data => ({ type: actionTypes.SERVICES_SUCCESS, ...data });
const servicesFail = error => ({ type: actionTypes.SERVICES_FAIL, error });
export const getServices = () => async dispatch => {
    dispatch(servicesStart());

    try {
        const res = await fetch(`${prefix}services`);
        const resData = await res.json();

        dispatch(servicesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(servicesFail(error));
    }
}

export const getService = slug => async dispatch => {
    dispatch(servicesStart());

    try {
        const res = await fetch(`${prefix}services/${slug}`);
        const resData = await res.json();

        dispatch(servicesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(servicesFail(error));
    }
}