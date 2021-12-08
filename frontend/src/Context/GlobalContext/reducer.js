import * as types from "./types";

export const reducer = (state, action) => {

    switch (action.type) {
        case types.SET_LOADING:
            return { ...state, loading: !state.loading }
        default:
            return { ...state };
    }
}