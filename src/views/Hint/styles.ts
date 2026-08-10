import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 90px 20px 60px;
  min-height: calc(100vh - 90px);
  background: #fff5eb;
`;

export const Content = styled.div`
  width: min(980px, 100%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0 18px 55px rgba(85, 53, 37, 0.12);
`;

export const BackButton = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  color: #553525;
  line-height: 1.05;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 24px;
  object-fit: cover;
  aspect-ratio: 16 / 9;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  color: #5a3d31;
`;
