import * as types from "./types";

export const reducer = (state, action) => {

    switch (action.type) {
        case types.SET_LOADING:
            return { ...state, loading: !state.loading }
        case types.SET_TOAST:
            return { ...state, toast: action.payload }
        case types.SET_PRODUCTS:
            return { ...state, products: action.payload }
        case types.PAGINATION_SET_PAGE:
            return { ...state, products: { ...state.products, page: action.payload } }
        default:
            return { ...state };
    }
}