import styled from "styled-components";

export const GridContainer = styled.div`
  background-color: #FFF6E8;
  margin: 0;

  color: #553525;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 18px;

  p {
    margin: 0;
  }

  @media (max-width: 915px) {
    padding: 64px 28px 24px 28px;
  }
`;

export const FooterGrid = styled.div`
  margin: 5% 10% 3.3% 10%;
  width: 75%;

  font-size: 1em;

  display: flex;
  justify-content: space-around;

  @media (max-width: 1200px) {
    font-size: 0.88em;
  }

  @media (max-width: 915px) {
    width: 86%;
    margin: 0;

    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const FooterDiv = styled.div`
  width: 18%;
  margin-right: 18%;

  font-family: 'Nunito Sans';

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 915px) {
    margin-right: 0;
    margin-bottom: 10%;
    width: 100%;

    p,strong{
      max-width: 370px;
      text-align: center;
    }
  }
`;

export const Image3 = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 18%;

  @media (max-width: 915px) {
    width: 45%;
    height: auto;
    max-width: 200px;
    margin-bottom: 8%;
  }
`;

export const FooterLinks = styled.div`
  width: 64%;
  gap: 9%;

  font-family: 'Source Serif 4';
  font-weight: 800;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 915px) {
    width: 100%;
    margin-bottom: 10%;

    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const FooterSection = styled.div`
  
a {
    margin-bottom: 16px;
    line-height: 2;
    text-decoration: none;
    color: #553525;

    &:hover {
      color: #8b6a50;
      cursor: pointer;
    }
  }

  p{
    margin-bottom: 16px;
    line-height: 2;
  }

  @media (max-width: 915px) {
    margin-bottom: 10%;    

    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const SocialIconsDiv = styled.div`
  gap: 24px;
  width: 100%;

  display: flex;
  flex-direction: row;  
`;

export const Icon = styled.div<{ $orange: string; $brown: string }>`
  width: 35px;
  height: 35px;
  background-image: url(${props => props.$orange});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-image 0.3s ease-in-out;

  &:hover {
    background-image: url(${props => props.$brown});
  }
`;

export const Rights = styled.div`
  width: 79%;
  border-top: 1px solid #D9D2CE;
  margin-bottom: 0.8%;

  font-weight: 400;
  font-size: 0.77em;
  font-family: 'Nunito Sans';

  display: flex;
  justify-content: space-between;

  p {
    line-height: 3;
  }

  @media (max-width: 915px) {
    width: 86%%;
    margin-bottom: 2%;
   
    font-size: 0.66em;
  
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;