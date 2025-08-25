import styled from "styled-components";

export const CardContainer = styled.div<{ $backgroundColor: string }>`
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  
  align-items: center;
  justify-content: center;

  width: 41%;
  height: 60%;

  box-sizing: border-box;
  padding: 4%;

  background: ${(props) => props.$backgroundColor};
  border-radius: 50px;

  border: none;

  @media (max-width: 1750px) {
    width: 45%;
  }

  @media (max-width: 1560px) {
    height: 75%;
  }

  @media (max-width: 1350px) {
    width: 50%;
  }

  @media (max-width: 1200px) {
    width: 60%;
    height: 80%;
    border-radius: 30px;
  } 

  @media (max-width: 750px) {
    width: 70%;
    height: 85%;
  }

  @media (max-width: 550px) {
    width: 95%;
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