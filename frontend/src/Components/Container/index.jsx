import Styled, { css } from "styled-components";

export const Container = Styled.div`
    
    width: 100%;

    ${({ theme, height }) => {

        if (height) {
            return css`
                height: ${height}vh;
            `
        }
    }}
    ${({ centered }) => {
        if (centered) {
            return css`
                display: flex;
                justify-content: center;
                align-items: center;
            `
        }
    }}
    ${({ overlay }) => {
        if (overlay) {
            return css`
                position: fixed;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.3); /* Black background with opacity */
                z-index: 999;            
            `
        }
    }}
`