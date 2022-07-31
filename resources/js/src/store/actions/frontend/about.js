import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetAbout = () => ({ type: actionTypes.ABOUT_RESET });
const aboutStart = () => ({ type: actionTypes.ABOUT_START });
const aboutSuccess = data => ({ type: actionTypes.ABOUT_SUCCESS, ...data });
const aboutFail = error => ({ type: actionTypes.ABOUT_FAIL, error });
export const getAbout = () => async dispatch => {
    dispatch(aboutStart());

    try {
        const res = await fetch(`${prefix}about`);
        const resData = await res.json();

        dispatch(aboutSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(aboutFail(error));
    }
}