import styled from "styled-components";

export const ListContainer = styled.div`
  font-family: 'Nunito Sans', sans-serif;
 display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 100px;

  scroll-margin-top: 108px;

`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  font-weight: bold;
  color: #553525
`;

export const TextTitle2 = styled.text`
  font-family: 'Source Serif 4', serif;

  @media (min-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  } 
`;

export const TextTitle = styled.text`
  @media (min-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const DogContainter = styled.div`
  display: flex;
  justify-content: center;
`;  

export const DogCardsContainer = styled.div`
  display: grid;
  margin-bottom: 28px;

  @media (min-width: 1612px) {
    grid-template-rows: repeat(2, auto); 
    grid-template-columns: repeat(4, 1fr); 
  }

  @media (max-width: 1612px) {
    grid-template-rows: repeat(2, auto); 
    grid-template-columns: repeat(3, 1fr); 
  }

  @media (max-width: 1260px) {
    grid-template-rows: repeat(2, auto); 
    grid-template-columns: repeat(2, 1fr); 
  }

   @media (max-width: 788px) {
    grid-template-rows: repeat(1, auto); 
    grid-template-columns: repeat(1, 1fr); 
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const OrangeButton = styled.button`
  color: #553525;
  background-color: #FF7F00;
  font-weight: bold;
  border-radius: 30px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 18px;
    padding-right: 26px;
    padding-left: 26px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 339px;
    height: 48px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 255px;
    height: 15px;
  }

  &:hover {
    transform: scale(1.03); 
    cursor: pointer;
  }
`;