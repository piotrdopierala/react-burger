import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    error: null,
    loading: false
}

const authReducer = (state = initialState, action)=>{
    let newState = Object.assign(state);
    switch (action.type) {
        case actionTypes.AUTH_START:
            newState.loading = true;
            newState.error = false;
            return newState;
        case actionTypes.AUTH_SUCCESS:
            newState.loading = false;
            newState.error = false;
            newState.token = action.authData.token;
            return newState;
        case actionTypes.AUTH_FAIL:
            newState.loading = false;
            newState.error = true;
            return newState;
        default:
            return state;
    }
}

export default authReducer;