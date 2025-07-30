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
        margin: 0;
    }

    h2{
        font-size: 1.125rem; // 18px em rem utilizando 16px como base
        font-weight: 700;
        margin: 0;
    }
    
    h3{
        font-size: 1rem; // 16px em rem utilizando 16px como base
        font-weight: 400;
        margin: 0;
    }

    h4{
        font-size: 1rem; // 16px em rem utilizando 16px como base
        font-weight: 400;
        margin: 0;
        color: #755B4D;
    }
        
`

export const Cards = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: 16px;
`

export const BackButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 53px 0;
    box-sizing: border-box;
`

export const InfoCard = styled.div`
    width: 38.9583333vw; // 750px em vw utilizando 1920px como base

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 2.5vw; // 40px em vw utilizando 1920px como base

    gap: 32px;

    box-sizing: border-box;

    border-radius: 20px;
    border: 0.1px solid #DEDEDE;
`
export const Title = styled.div
`
    display: flex;
    flex-direction: column;
    gap: 16px;
`
export const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`
export const TagsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`

export const InfoContainer = styled.div`
    
    width: 100%;

    display: flex;
    flex-direction: row;
    
    padding-top: 16px;
    padding-bottom: 16px;
    gap: 24px;

    border-top: 0.1px solid #DEDEDE;
    border-bottom: 0.1px solid #DEDEDE;

    box-sizing: border-box;
`

export const InfoElement = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`

export const CardAbout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
`
export const Icon = styled.div<{ $orange: string; $brown: string }>`
  width: 35px;
  height: 35px;
  background-image: url(${props => props.$orange});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-image 0.3s ease-in-out;

  &:hover {
    background-image: url(${props => props.$brown});
  }
`;

export const SocialIconsDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;  

  align-items: center;

  gap: 16px

`;