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

export const SectionTitle = styled.p`
  font-size: 1.1em;
  font-weight: 900;
  margin-bottom: 16px;
  color: #36c1d9;

  @media (max-width: 915px) {
    font-size: 1em;
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

export const RightsContainer = styled.div`
  width: 79%;
  border-top: 1px solid #D9D2CE;
  margin-bottom: 0.8%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;

  @media (max-width: 915px) {
    width: 86%;
    margin-bottom: 2%;
    flex-direction: column;
    align-items: center;
  }
`;

export const Rights = styled.div`
  font-weight: 400;
  font-size: 0.77em;
  font-family: 'Nunito Sans';

  display: flex;
  justify-content: space-between;
  flex: 1;

  p {
    line-height: 3;
    margin: 0;
  }

  @media (max-width: 915px) {
    width: 100%;
    font-size: 0.66em;
    justify-content: center;
  }
`;

export const PrivacyLink = styled.button`
  background: none;
  border: none;
  color: #D97736;
  font-size: 1em;
  font-family: 'Nunito Sans';
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  line-height: 3;

  &:hover {
    color: #553525;
    transition: color 0.3s ease;
  }

  @media (max-width: 915px) {
    font-size: 0.66em;
  }
`;

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #FFF6E8;
  border-radius: 12px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  font-family: 'Nunito Sans';
  color: #553525;

  h2 {
    font-size: 1.8em;
    color: #D97736;
    margin: 0 0 20px 0;
    font-weight: 900;
  }

  p {
    font-size: 0.95em;
    line-height: 1.8;
    margin-bottom: 16px;
    text-align: justify;
  }

  ul {
    margin: 16px 0;
    padding-left: 24px;

    li {
      margin-bottom: 12px;
      font-size: 0.95em;
      line-height: 1.6;
    }
  }

  @media (max-width: 915px) {
    padding: 24px;
    
    h2 {
      font-size: 1.4em;
    }

    p {
      font-size: 0.9em;
    }
  }
`;

export const ModalCloseButton = styled.button`
  background-color: #D97736;
  color: #FFF6E8;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 0.95em;
  font-weight: 600;
  font-family: 'Nunito Sans';
  cursor: pointer;
  margin-top: 24px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c85c1f;
  }

  @media (max-width: 915px) {
    font-size: 0.9em;
    padding: 8px 20px;
  }
`;