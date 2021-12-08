import { useReducer } from "react";
import { GlobalContext } from "./context";
import { data } from "./data";
import { reducer } from "./reducer";

export const GlobalContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, data)
    return <GlobalContext.Provider value={{state, dispatch}}>{ children }</GlobalContext.Provider>
}