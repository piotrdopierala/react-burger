import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    error: null,
    loading: false
}

const authReducer = (state = initialState, action) => {
    //let newState = {...state};
    let newState = {};
    Object.assign(newState, state);
    switch (action.type) {
        case actionTypes.AUTH_START:
            newState.loading = true;
            newState.error = null;
            return newState;
        case actionTypes.AUTH_SUCCESS:
            newState.loading = false;
            newState.error = null;
            newState.token = action.authData.token;
            return newState;
        case actionTypes.AUTH_FAIL:
            newState.loading = false;
            newState.error = action.error;
            newState.token = null;
            return newState;
        default:
            return state;
    }
}

export default authReducer;