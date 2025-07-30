import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;  
    display: flex;
    flex-direction: column;

    font-family: "Nunito Sans", sans-serif;
    color: #563526;
    
`

export const Main = styled.main`
    
    width: 100%;
    border-box

    display: flex;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    align-items: flex-start;
    justify-content: flex-start;

    box-sizing: border-box; 

    padding-left: 10.4166667vw; // 200px em vw utilizando 1920px como base
    padding-right: 10.4166667vw;

    h1{
        font-size: 2rem; // 32px em rem utilizando 16px como base
        font-weight: 700;
    }

    h2{
        font-size: 1.125rem; // 18px em rem utilizando 16px como base
        font-weight: 700;
    }
    
    h3{
        font-size: 1rem; // 16px em rem utilizando 16px como base
    }
`

export const BackButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;


`