import styled from "styled-components";

export const GridContainer = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  display: grid;
  grid-template-areas: "header";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  min-height: 505px;
  width: 100%;
`;

export const Image1Div = styled.header`
  grid-area: header;
  background-color: #FF9944;
  display: flex;
`;

export const Image2Div = styled.header`
  grid-area: header;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
`;

export const CardDiv = styled.header`
  grid-area: header;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Image1 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Image2 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left;
`;

export const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: flex-start;
  color: #553525;
`;

export const ContactText = styled.p`
  margin: 0;
  font-size: clamp(1rem, 1vw, 18px);
  line-height: 1.7;
  color: #553525;
`;

export const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const ContactSectionTitle = styled.h4`
  margin: 0;
  font-size: clamp(1rem, 1vw, 18px);
  font-weight: 800;
  color: #2b6cb0;
`;

export const ContactLink = styled.a`
  color: #553525;
  font-weight: 700;
  text-decoration: none;
  font-size: clamp(1rem, 1vw, 18px);

  &:hover {
    text-decoration: underline;
  }
`;

export const SocialIconsDiv = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
`;

export const SocialIcon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`;
