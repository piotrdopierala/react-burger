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

export const auth = (email, password)=> {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            "email" : email,
            "pass" : password
        }
        axios.post('http://localhost:8080/burger/api/cust/login-process',authData)
            .then((response)=>{
                dispatch(authSuccess(response.data.auth));
            })
            .catch((error)=>{
                console.log(error);
                dispatch(authFailed());
            });
    };
};