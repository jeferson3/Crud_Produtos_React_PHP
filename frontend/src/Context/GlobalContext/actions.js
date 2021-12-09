import { env } from "../../Environment";
import * as types from "./types";

export const setLoading = (dispatch) => {
    dispatch({ type: types.SET_LOADING })
}
export const setToast = (dispatch, payload) => {
    dispatch({ type: types.SET_TOAST, payload })
}

export const setProducts = (dispatch, payload) => {
    dispatch({ type: types.SET_TOAST, payload })
}

export const getProducts = async (page, per_page, dispatch) => {
    setLoading(dispatch);

    const body = new FormData();
    body.append('page', page)
    body.append('limit', per_page)

    const res = await fetch(env.api.url.dev + '?page=products&method=list', {
            method: 'post',
            body
        })
    const json = await res.json();

    setLoading(dispatch);
    dispatch({ type: types.SET_PRODUCTS, payload: json });
}

export const paginationSetPage = (dispatch, page) => {
    dispatch({ type: types.PAGINATION_SET_PAGE, payload: page })
}