import * as types from "./types";

export const reducer = (state, action) => {

    switch (action.type) {
        case types.SET_LOADING:
            return { ...state, loading: !state.loading }
        case types.SET_TOAST:
            return { ...state, toast: action.payload }
        default:
            return { ...state };
    }
}