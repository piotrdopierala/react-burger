import axios from 'axios';

import * as actionTypes from './actionTypes';

export const signInStart = () => {
    return {
        type: actionTypes.SIGN_IN_START
    };
};

export const signInSuccess = (authData) => {
    return {
        type: actionTypes.SIGN_IN_SUCCESS,
        authData: authData
    };
};

export const signInFailed = (error) => {
    return{
        type: actionTypes.SIGN_IN_FAIL,
        error: error
    }
}

export const signIn = (email, password)=> {
    return (dispatch) => {
        dispatch(signInStart());
        const authData = {
            "email" : email,
            "password" : password
        }
        axios.post('http://localhost:8080/burger/api/cust/sign-up',authData)
            .then((response)=>{
                dispatch(signInSuccess(response.data.auth));
            })
            .catch((error)=>{
                console.log(error);
                dispatch(signInFailed());
            });
    };
};