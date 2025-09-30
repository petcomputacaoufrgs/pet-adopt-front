import styled from "styled-components";

export const AboutContainer = styled.div`
    font-family: 'Nunito Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    min-height: max(calc(100vh - 108px), 600px);

    @media (max-width: 1200px) {
      flex-direction: column;
      min-height: calc(100vh - 108px);
    } 

`;

export const AboutDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: max(calc(100vh - 108px), 600px);
  background: #FFFFFF;
  padding-left: 3%;
  padding-right: 3%;

  @media (max-width: 1200px) {
    padding: 0;
    min-height: calc(100vh - 108px);
  }
`;


export const InfoContainer = styled.div`
  display: flex;
  width: 75%;

  @media (max-width: 1200px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 95%;
  }


`

export const BackgroundDiv = styled.div<{$backgroundImage: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: max(calc(100vh - 108px), 600px);
  
  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-color: #FF9944;
  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 

  @media (max-width: 1600px) {
    background-position: 30%;
  }

  @media (max-width: 1350px) {
    background-position: 35%;
  }
  @media (max-width: 1300px) {
     background-size: cover;
  } 

  @media (max-width: 1250px) {
    background-position: 38%;
  }

  @media (max-width: 1200px) {
    min-height: calc(100vh - 108px);
  }


`;

export const Image = styled.img`
  width: 100%;
  height: 100%; 
  object-fit: cover;
`;