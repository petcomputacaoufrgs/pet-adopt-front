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

`;

export const AboutDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #FFFFFF;
  padding-left: 3%;
  padding-right: 3%;
`;

export const BackgroundDiv = styled.div<{$backgroundImage: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  
  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-color: #FF9944;
  
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