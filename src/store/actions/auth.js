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
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userEmail');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
}

export const auth = (email, password, isSignIn) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            "email": email,
            "password": password
        }
        let url = 'http://localhost:8080/burger/api/cust/login-process'
        if (isSignIn) {
            url = 'http://localhost:8080/burger/api/cust/sign-up'
        }
        axios.post(url, authData)
            .then((response) => {
                localStorage.setItem('token', response.data.auth.token);
                let expirationDate = new Date(new Date().getTime() + Number(response.data.auth.expiresIn));
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userEmail', response.data.auth.email);
                dispatch(authSuccess(response.data.auth));
                dispatch(checkAuthTimeout(response.data.auth.expiresIn));
            })
            .catch((error) => {
                dispatch(authFailed(error.message));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                //const userEmail = localStorage.getItem('userEmail');
                dispatch(authSuccess({ 'token': token}));                
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
            }else{
                dispatch(logout());
            }
        }
    }
}