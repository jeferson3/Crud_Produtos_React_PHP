import { createContext, useContext } from "react";

export const GlobalContext = createContext();

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    return context;
}