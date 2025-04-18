import styled from "styled-components";

export const AboutContainer = styled.div`
    font-family: 'Nunito Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    min-height: 790px;

    @media (max-width: 1200px) {
      flex-direction: column;
    } 
`;

export const AboutDiv = styled.div<{ background_color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 790px;
  background: ${(props) => props.background_color};

`;

export const BackgroundDiv = styled.div<{background_image: string, background_color: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 790px;
  
  background: ${(props) => `url(${props.background_image}) ${props.background_color}`};
  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 

  @media (max-width: 1500px) {
     background-size: cover;
  } 

`;

export const Image = styled.img`
  width: 100%;
  height: 100%; 
  object-fit: cover;
`;