import styled from "styled-components";


export const Container = styled.div`
    font-family: 'Nunito Sans', sans-serif;
    color: #553525;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    gap: 55px;
`;

export const MiddleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 50px;
`;

export const Voltar = styled.button`
    display: flex;
    align-self: start;
`;

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 1520px;
    height: 680px;
    gap: 50px;
    width: 100%;
`;

export const NgoCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 490px;
    height: 585px;
    border: 1px solid #DEDEDE;
    border-radius: 20px;
`;

export const NgoNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 395px;
    height: 185px;
`;

export const TextsContainer = styled.div`
    display: flex;
    flex-direction: column;
    hegiht: 110px;
    gap: 2px;

    p{
        margin: 0;
        font-size: 18px;
    }

    h1{
        margin: 0;
        font-weight: 800;
        font-size: 32px;
    }

    a{
        text-decoration: none;
        color:#553525;
        font-weight: 800;
        margin: 0;
        font-size: 18px;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 50px;
    gap: 8px;
`;

export const NgoInformationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 395px;
    height: 275px;
    background: #FFF6E8;
    border-radius: 12px;
    font-size: 18px;
    color: #755B4D
`;

export const InformationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 345px;
    height: 150px;
    gap: 12px;

    p {
        margin: 0;
    }
`;

export const SocialIconsDiv = styled.div`
    display: flex;
    flex-direction: row; 
    gap: 24px;
    width: 345px;
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

export const NgoDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 1010px;
    height: 670px;
    border: 1px solid #DEDEDE;
    border-radius: 20px;
`;

export const NgoTextsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 910px;
    height: 380px;

    p{
        margin: 0;
        font-size: 16px;
    }

    h3{
        margin: 0;   
        font-weight: 800;
        font-size: 18px; 
    }
`;

export const NgoFormsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 910px;
    height: 170px;
    font-size: 18px;
    font-weight: 800;

    h3 {
        margin: 0;
    }

`;

export const FormsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    height: 126px;

    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;
        width: 218px;
        border: 1px solid #DEDEDE;
        border-radius: 12px;
    }
`;