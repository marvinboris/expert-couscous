import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetPublications = () => ({ type: actionTypes.PUBLICATIONS_RESET });
const publicationsStart = () => ({ type: actionTypes.PUBLICATIONS_START });
const publicationsSuccess = data => ({ type: actionTypes.PUBLICATIONS_SUCCESS, ...data });
const publicationsFail = error => ({ type: actionTypes.PUBLICATIONS_FAIL, error });
export const getPublications = publicationCategorySlug => async dispatch => {
    dispatch(publicationsStart());

    try {
        let res;
        if (publicationCategorySlug) res = await fetch(`${prefix}publication-categories/${publicationCategorySlug}/publications`);
        else res = await fetch(`${prefix}publications`);
        const resData = await res.json();

        dispatch(publicationsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(publicationsFail(error));
    }
}

export const getPublication = (publicationCategorySlug, slug) => async dispatch => {
    dispatch(publicationsStart());

    try {
        let res;
        if (publicationCategorySlug) res = await fetch(`${prefix}publication-categories/${publicationCategorySlug}/publications/${slug}`);
        else res = await fetch(`${prefix}publications/${slug}`);
        const resData = await res.json();

        dispatch(publicationsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(publicationsFail(error));
    }
}