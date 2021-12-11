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

export const getCategories = (dispatch) => {
    fetch(env.api.url.dev + '?page=categories&method=list',
        {
            method: 'POST',
            mode: 'cors'
        })
        .then(async r => {

            let res = await r.json();

            if (r.status === 200) {
                dispatch({ type: types.SET_CATEGORIES, payload: res })
            }
        })


}

export const getProducts = (page, per_page, dispatch) => {
    setLoading(dispatch);

    const body = new FormData();
    body.append('page', page)
    body.append('limit', per_page)

    fetch(env.api.url.dev + '?page=products&method=list', {
        method: 'POST',
        mode: 'cors',
        body
    })
        .then(async r => {

            let res = await r.json();

            if (r.status === 200) {
                dispatch({ type: types.SET_PRODUCTS, payload: res })
            }
            else {
                setToast(dispatch, { status: true, type: 'danger', msg: res.message })
            }
        })

        .catch(err => {
            setToast(dispatch, { status: true, type: 'danger', msg: "Aconteceu um erro inesperado!" })
        })
        .finally(() => {
            setLoading(dispatch);
        })


}

export const saveProducts = (dispatch, data) => {

    setLoading(dispatch);

    const body = new FormData();
    body.append('name', data.inputName);
    body.append('price', data.inputPrice);
    body.append('category_id', data.inputCategoryId);
    body.append('purchase_time', data.inputPurchaseTime);
    body.append('is_perishable', data.inputPerishable);

    fetch(env.api.url.dev + '?page=products&method=create',
        {
            method: 'POST',
            body
        })
        .then(async r => {

            let json = await r.json();

            if (r.status === 201) {
                setToast(dispatch, { status: true, type: 'primary', msg: json })
            }
            else {
                setToast(dispatch, { status: true, type: 'danger', msg: json.message })
            }
        })
        .catch(err => {
            setToast(dispatch, { status: true, type: 'danger', msg: "Aconteceu um erro inesperado!" })
        })
        .finally(() => {
            setLoading(dispatch);
        })

}

export const updateProducts = (dispatch, data) => {

    setLoading(dispatch);

    const body = new FormData();
    body.append('id', data.id);
    body.append('name', data.inputName);
    body.append('price', data.inputPrice);
    body.append('category_id', data.inputCategoryId);
    body.append('purchase_time', data.inputPurchaseTime);
    body.append('is_perishable', data.inputPerishable);

    fetch(env.api.url.dev + '?page=products&method=update',
        {
            method: 'POST',
            body
        })
        .then(async r => {

            let json = await r.json();

            if (r.status === 200) {
                setToast(dispatch, { status: true, type: 'primary', msg: json })
            }
            else {
                setToast(dispatch, { status: true, type: 'danger', msg: json.message })
            }
        })
        .catch(err => {
            setToast(dispatch, { status: true, type: 'danger', msg: "Aconteceu um erro inesperado!" })
        })
        .finally(() => {
            setLoading(dispatch);
        })

}

export const deleteProducts = (dispatch, data) => {

    const body = new FormData();
    body.append('id', data.id);

    fetch(env.api.url.dev + '?page=products&method=delete',
        {
            method: 'POST',
            body
        })

        .then(async r => {

            let json = await r.json();

            if (r.status === 200) {
                setToast(dispatch, { status: true, type: 'primary', msg: json })
            }
            else {
                setToast(dispatch, { status: true, type: 'danger', msg: json.message })
            }
        })
        .catch(err => {
            setToast(dispatch, { status: true, type: 'danger', msg: "Aconteceu um erro inesperado!" })
        })
}

export const paginationSetPage = (dispatch, page) => {
    dispatch({ type: types.PAGINATION_SET_PAGE, payload: page })
}