import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFailed = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime);
    }
}

export const auth = (email, password, isSignIn)=> {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            "email" : email,
            "password" : password
        }
        let url = 'http://localhost:8080/burger/api/cust/login-process'
        if(isSignIn){
            url = 'http://localhost:8080/burger/api/cust/sign-up'
        }
        axios.post(url,authData)
            .then((response)=>{
                dispatch(authSuccess(response.data.auth));
                dispatch(checkAuthTimeout(response.data.auth.expiresIn));
            })
            .catch((error)=>{
                dispatch(authFailed(error.message));
            });
    };
};