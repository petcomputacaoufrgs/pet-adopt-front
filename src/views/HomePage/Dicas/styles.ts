import styled from "styled-components";



export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 80vw;
    height: 30vw;
    gap: 1vw;
`


export const HintsContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    gap: 3vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFF6E8;

`

export const InfoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80vw;


    #titleDiv {
        width: 30%;
    }

    #textDiv {
        width: 70%;
    }

    h3 {
        color: #553525;
        font-size: 35px;
        margin: 0;
    }


    h2 {
        color: #563526;
        font-size: 50px;
        margin: 0;
    }


    p {
        color: #553525;
        font-size: 18px;
    }
`