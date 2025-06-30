import styled from "styled-components";


export const BannerContainer = styled.div <{$backgroundColor: string}>`
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  justify-content: center;
  width: 100%; 
  background-color: ${props => props.$backgroundColor};

`

export const ContentContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`



export const BannerTextContainer = styled.div `
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  h1 {
    margin: 0;
    font-size: 48px;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 800;
    color: #553525;

  }

  h2 {
    margin: 0;
    font-size: 20px;
    font-family: 'Nunito Sans', sans-serif;
    color: #553525;
    font-weight: 400;

  }
`



export const BannerImage = styled.img`

  `;
