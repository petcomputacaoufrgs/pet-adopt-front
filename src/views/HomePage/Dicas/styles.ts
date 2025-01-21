import styled from "styled-components";



export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 80vw;
    height: 60vh;
   
    min-height: 500px;
    gap: 1vw;

    @media (max-width: 768px) {
      height: auto;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 1vh;
    }
`


export const HintsContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    overflow: auto;
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
    gap: 1vw;

    #titleDiv {
        width: 30%;
    }

    #textDiv {
        width: 70%;
    }

    h3 {
        color: #553525;
        font-size:calc(20px + 1.5vw);
        margin: 0;
    }


    h2 {
        color: #563526;
        font-size:calc(30px + 1.5vw);
        margin: 0;
    }


    p {
        color: #553525;
        font-size: 18px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      p{
        font-size: 16px;
      }

    #titleDiv {
        width: 100%;
    }

    #textDiv {
        width: 100%;
    }

    }
`


export const Image = styled.img<{width: Number}>`
  width: ${(props) => `${props.width}%`};;
  height: auto; 

@media (max-width: 768px) {
    display: none;
    }
`;