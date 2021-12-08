import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        box-shadow: none !important;
    }

    .required::after {
        content: '*';
        color: red;
    }

    .page-item{
        cursor: pointer;
    }
    .disabled{
        cursor: not-allowed !important;
    }

`