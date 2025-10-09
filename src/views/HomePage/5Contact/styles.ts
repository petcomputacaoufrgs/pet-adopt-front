import styled from "styled-components";


export const GridContainer = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  display: grid;
  grid-template-areas: "header";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  min-height: 505px;
  width: 100%;

  scroll-margin-top: 80px;
`;

export const Image1Div = styled.header`
  grid-area: header;
  background-color: #FF9944;
  display: flex;
`;

export const Image2Div = styled.header`
  grid-area: header;
  background-color: rgba(0, 0, 0, 0)  
  display: flex;

`;

export const CardDiv = styled.header`
  grid-area: header;
  background-color: rgba(0, 0, 0, 0)  
  display: flex;
  width: 100%;
  heigth: 100%;
  align-items: center;
  justify-content: center;
`;

export const Image1 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Image2 = styled.img`
  width: 100%;
  height: 100%; 
  object-fit: cover;
  object-position: left;
`;