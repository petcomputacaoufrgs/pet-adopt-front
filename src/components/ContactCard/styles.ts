import styled from "styled-components";

export const CardContainer = styled.div<{ $backgroundColor: string }>`
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

  width: min(48%, 620px);
  min-height: 420px;
  box-sizing: border-box;
  padding: 5% 6%;

  background: ${(props) => props.$backgroundColor};
  border-radius: 50px;
  border: none;

  @media (max-width: 1200px) {
    width: min(70%, 620px);
    min-height: 380px;
    border-radius: 30px;
  }

  @media (max-width: 750px) {
    width: min(88%, 620px);
    min-height: 360px;
    padding: 7% 8%;
  }

  @media (max-width: 550px) {
    width: 95%;
    min-height: auto;
  }
`;

export const CardDiv = styled.div`
  display: flex;
  text-decoration: none;
  width: 100%;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: flex-start;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-family: 'Source Serif 4', sans-serif;
  font-size: clamp(32px, 2.2vw, 48px);
  line-height: 1.2;
  color: #553525;
`;

export const CardSubtitle = styled.h3`
  margin: 0;
  font-size: clamp(20px, 1.4vw, 28px);
  font-weight: 800;
  color: #2b6cb0;
`;
