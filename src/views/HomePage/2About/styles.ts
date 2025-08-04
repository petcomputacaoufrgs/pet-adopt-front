import styled from "styled-components";

export const AboutContainer = styled.div`
    font-family: 'Nunito Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    min-height: 100vh;

    @media (max-width: 1200px) {
      flex-direction: column;
    } 

  scroll-margin-top: 80px;

`;

export const AboutDiv = styled.div<{ $backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.$backgroundColor};

`;

export const BackgroundDiv = styled.div<{$backgroundImage: string, $backgroundColor: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  
  background: ${(props) => `url(${props.$backgroundImage}) ${props.$backgroundColor}`};
  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 

  @media (max-width: 1300px) {
     background-size: cover;
  } 

`;

export const Image = styled.img`
  width: 100%;
  height: 100%; 
  object-fit: cover;
`;