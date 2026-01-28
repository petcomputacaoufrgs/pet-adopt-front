import styled from "styled-components";

interface CardStateProps {
  $isHovered: boolean;
}

export const CardContainer = styled.div<CardStateProps>`
  width: 100%;
  background-color: white;
  border-radius: 15px;
  
  padding: 0; 
  
  display: flex;
  flex-direction: column;
  align-self: start;
  
  border: 1px solid ${({ $isHovered }) => $isHovered ? 'rgba(222, 222, 222, 1)' : 'rgba(0, 0, 0, 0.1)'};
  box-shadow: ${({ $isHovered }) => $isHovered ? '0 4px 15px rgba(0, 0, 0, 0.1)' : '0 2px 5px rgba(0, 0, 0, 0.0)'};
  
  transform: ${({ $isHovered }) => ($isHovered ? "translateY(-4px)" : "translateY(0)")};
  transition: all 0.3s ease;
  z-index: ${({ $isHovered }) => ($isHovered ? "2" : "1")};
`;

// Wrapper da área clicável (Header + Info)
export const ClickableArea = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1; /* Ocupa o espaço disponível */
  border-radius: 15px 15px 0 0;
`;


export const ContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Cabecalho = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
`;

export const OngTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(86, 53, 38, 1);
`;

export const OngName = styled.h3`
  margin: 0;
  font-weight: 700;
  text-align: center;
  font-size: 16px;
`;

export const OngType = styled.p`
  margin: 0;
  text-align: center;
  font-size: 14px;
`;

export const InfoSection = styled.div`
    width: 100%;
    background: #FFF6E8;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 24px;
    box-sizing: border-box;
    font-size: clamp(14px, 1vw, 18px);
    color: #755B4D;
`;

export const DataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  img {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #755B4D;
    word-break: break-word;
  }
`;

export const SocialIconsDiv = styled.div`
    width: 100%; 
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    
    a {
        margin-right: 12px;
        /* Garante que o clique no ícone não navegue o card (se propagation for parado) */
        cursor: pointer; 
    }
`;

export const Icon = styled.div<{ $orange: string; $brown: string }>`
    width: 25px;
    height: 25px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${props => props.$orange});
    transition: background-image 0.3s ease-in-out;

    &:hover {
        background-image: url(${props => props.$brown});
    }
`;


export const ActionsBox = styled.div`
  background-color: #FFFFFF;
  border-top: 1px solid #DEDEDE;
  border-radius: 0 0 15px 15px;
  
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;