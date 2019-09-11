import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const logInReducer = (state = initialState, action) => {
    //let newState = {...state};
    let newState = {};
    Object.assign(newState, state);
    switch (action.type) {
        case actionTypes.LOGIN_START:
            newState.loading = true;
            newState.error = null;
            return newState;
        case actionTypes.LOGIN_SUCCESS:
            newState.loading = false;
            newState.error = null;
            newState.token = action.authData.token;
            return newState;
        case actionTypes.LOGIN_FAIL:
            newState.loading = false;
            newState.error = action.error;
            newState.token = null;
            return newState;
        case actionTypes.LOGIN_LOGOUT:
            newState.token = null;
            return newState;
        case actionTypes.SET_LOGIN_REDIRECT_PATH:
            newState.authRedirectPath = action.path;
            return newState;
        default:
            return state;
    }
}

export default logInReducer;