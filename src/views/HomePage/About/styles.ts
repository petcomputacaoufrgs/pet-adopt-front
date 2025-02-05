import styled from "styled-components";

export const AboutContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    min-height: 100vh;
    overflow: hidden;

    @media (max-width: 800px) {
      flex-direction: column;
      overflow: hidden;
    } 
`;

export const AboutDiv = styled.div<{ background_color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh; 
  background: ${(props) => props.background_color};

`