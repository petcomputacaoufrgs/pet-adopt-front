import styled from "styled-components";

export const GridContainer = styled.div`
  background-color: #FFF6E8;
  margin: 0;

  color: #553525;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
  }
`;

export const FooterGrid = styled.div`
  margin: 95px 200px 65px 200px;
  width: 1435px;

  font-size: 18px;

  display: flex;
  justify-content: space-around;
`;

export const FooterDiv = styled.div`
  width: 255px;
  margin-right: 255px;

  font-family: 'Nunito Sans';

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image3 = styled.img`
  width: 257px;
  height: 105px;
  margin-bottom: 45px;
`;

export const FooterLinks = styled.div`
  width: 920px;

  font-family: 'Source Serif 4';
  font-weight: 800;
  font-size: 18px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;

`;

export const FooterSection = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  p {
    color: #553525;
    transition: color 0.1s ease;

    font-family: 'Source Serif 4', serif;
    font-weight: 800;
    font-size: clamp(0.8rem, 1vw, 0.7rem);
    line-height: 2;

    margin: 0;

    &:hover {
      color: #8b6a50;
      cursor: pointer;
    }
  }

  @media (max-width: 1200px) {
    align-items: center;
    width: 100%;
    gap: 10px;
  }
`;

export const SocialIconsDiv = styled.div`
  gap: 15px;
  width: 100%;

  display: flex;

  @media (max-width: 1200px) {
    gap: 10px;
    justify-content: center;
  }
`;

export const Image = styled.img`
  width: 40px;
  height: 40px;
`;

export const Rights = styled.div`
  border-top: 1px solid #D9D2CE;
  width: 1515px;
  margin-bottom: 15px;

  font-weight: 400;
  font-size: 14px;
  font-family: 'Nunito Sans';

  display: flex;
  justify-content: space-between;

  p {
    margin: 0;
    line-height: 3;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
`;