import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetContact = () => ({ type: actionTypes.CONTACT_RESET });
const contactStart = () => ({ type: actionTypes.CONTACT_START });
const contactSuccess = data => ({ type: actionTypes.CONTACT_SUCCESS, ...data });
const contactFail = error => ({ type: actionTypes.CONTACT_FAIL, error });
export const postContact = data => async dispatch => {
    dispatch(contactStart());

    try {
        const form = new FormData(data);
        const res = await fetch(`${prefix}contact`, {
            method: 'POST',
            body: form,
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);

        dispatch(contactSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(contactFail(error));
    }
}