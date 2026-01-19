import styled from "styled-components";

interface CardContainerProps {
  $isHovered: boolean;
}

interface InfoBoxProps {
  $hasActions: boolean;
}


export const CardContainer = styled.div<CardContainerProps>`
    font-family: 'Nunito Sans', sans-serif;
    display: flex;
    flex-direction: column;
    margin: 0 16px 32px 16px;
    width: 362px;
    
    transition: all 0.3s ease;
    transform: ${({ $isHovered }) => $isHovered ? 'translateY(-4px)' : 'translateY(0)'};

`;

// Container lógico que agrupa Imagem + Info para receber o Click e o Hover
export const ClickableArea = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Image = styled.img<CardContainerProps>`
  width: 100%;
  max-width: 362px;
  height: 240px; 
  object-fit: cover;
  border-radius: 20px 20px 0 0; 
  
`;

// A parte SUPERIOR da caixa branca (Clicável)
export const InfoBox = styled.div<InfoBoxProps & CardContainerProps>`
  background-color: #FFFFFF;
  border: 1px solid #DEDEDE;
  margin-top: -25px;
  
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  box-sizing: border-box;
  width: 100%;


  border-bottom: ${({ $hasActions }) => $hasActions ? 'none' : '1px solid #DEDEDE'};
  border-radius: ${({ $hasActions }) => $hasActions ? '0' : '0 0 20px 20px'};

  transition: all 0.3s ease;
  box-shadow: ${({ $isHovered }) => $isHovered ? '0px 4px 15px rgba(0, 0, 0, 0.1)' : 'none'};
`;

// A parte INFERIOR da caixa branca (Botões - NÃO Clicável)
export const ActionsBox = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #DEDEDE;
  border-radius: 0 0 20px 20px;
  
  padding: 12px 1.5em;
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #E0E0E0;
  margin-bottom: 8px;
`;

export const CardCenteredContainer = styled.div`
   display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CardTagsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 14px;
`;

export const AnimalName = styled.span`
    color: #553525;
    font-weight: 800;
    margin-bottom: 14px;

    @media (min-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }    
`;

export const AnimalRace = styled.span`
    color: #553525;
    margin-bottom: 14px;

    @media (min-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const AgeLocationContainer = styled.div` 
    color: #755B4D;
    font-size: 14px;
`;

export const PinText = styled.div`
    display: flex;
    align-items: center;

    #paw {
        width: 14px;
        height: 13px;
        margin-right: 10px;
    }

    #loc {
        width: 14px;
        height: 17px;
        margin-right: 10px;
    }
`;