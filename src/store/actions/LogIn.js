import axios from 'axios';

import * as actionTypes from './actionTypes';

export const logInStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const logInSuccess = (authData) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        authData: authData
    };
};

export const logInFailed = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userEmail');
    return {
        type: actionTypes.LOGIN_LOGOUT
    }
}

export const checkLogInTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
}

export const logIn = (email, password, isSignIn) => {
    return (dispatch) => {
        dispatch(logInStart());
        const authData = {
            "email": email,
            "password": password
        }
        let url = 'http://localhost:8080/burger/api/cust/login-process'
        axios.post(url, authData)
            .then((response) => {
                localStorage.setItem('token', response.data.auth.token);
                let expirationDate = new Date(new Date().getTime() + Number(response.data.auth.expiresIn));
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userEmail', response.data.auth.email);
                dispatch(logInSuccess(response.data.auth));
                dispatch(checkLogInTimeout(response.data.auth.expiresIn));
            })
            .catch((error) => {
                dispatch(logInFailed(error.message));
            });
    };
};

export const setLogInRedirectPath = (path) => {
    return {
        type: actionTypes.SET_LOGIN_REDIRECT_PATH,
        path: path
    }
}

export const logInCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                //const userEmail = localStorage.getItem('userEmail');
                dispatch(logInSuccess({ 'token': token}));                
                dispatch(checkLogInTimeout(expirationDate.getTime() - new Date().getTime()));
            }else{
                dispatch(logout());
            }
        }
    }
}