import styled from "styled-components";

export const CardContainer = styled.button<{ background_color: string }>`
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  
  align-items: center;
  justify-content: center;

  width: 40%;
  height: 40vh;

  background: ${(props) => props.background_color};
  border-radius: 50px;

  border: none;

  @media (max-width: 1300px) {
    width: 60%;
    height: 60vh;
    border-radius: 30px;
  } 
  
  @media (max-height: 700px) {
    width: 60%;
    min-height: 400px;
    border-radius: 30px;
  } 

`;

export const Image = styled.img`
  width: 100%;
  max-width: 150px; 
  height: auto; 
  margin-left: 16px;


`;


export const CardDiv = styled.div`
  display: flex; 
  text-decoration: none;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`