import * as types from "./types";

export const setLoading = (dispatch) => {
    dispatch({ type: types.SET_LOADING })
}
export const setToast = (dispatch, payload) => {
    dispatch({ type: types.SET_TOAST, payload })
}