import axios from 'axios';

import * as actionTypes from './actionTypes';

export const signIn = (formData) => {
    return (dispatch) => {
        dispatch(signInStart());
        axios.post('http://localhost:8080/burger/api/cust/sign-up', formData)
            .then((response) => dispatch(signInSuccess(response)))
            .catch((error) => dispatch(signInError(error)));
    }
}

export const signInStart = () => {
    return {
        type: actionTypes.SIGNIN_START
    }
}

export const signInSuccess = (response) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        response: response
    }
}

export const signInError = (error) => {
    return {
        type: actionTypes.SIGNIN_FAIL,
        error: error
    }
}