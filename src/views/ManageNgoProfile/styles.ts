import styled from "styled-components";

// -- Containers Principais --
export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 55px;

    font-family: 'Nunito Sans', sans-serif;
    color: #553525;
`;

export const MiddleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 50px;
`;

export const ProfileContainer = styled.div`
    width: 100%;
    height: 680px;
    display: flex;
    flex-direction: row;
    gap: 50px;
`;

// -- Componentes de Card da ONG --
export const NgoCardContainer = styled.div`
    width: 490px; 
    height: 585px;
    border: 1px solid #DEDEDE;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
`;

export const NgoNameContainer = styled.div`
    width: 395px; 
    height: 185px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const TextsContainer = styled.div`
    height: 110px;
    display: flex;
    flex-direction: column;
    gap: 2px;

    h1 {
        margin: 0;
        font-weight: 800;
        font-size: 32px;
    }

    p {
        margin: 0;
        font-size: 18px;
    }

    a {
        margin: 0;
        font-size: 18px;
        font-weight: 800;
        color: #553525;
        text-decoration: none;
    }
`;

export const ButtonsContainer = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
`;

export const NgoInformationsContainer = styled.div`
    width: 395px;
    height: 275px;
    background: #FFF6E8;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;

    font-size: 18px;
    color: #755B4D;
`;

export const InformationsContainer = styled.div`
    width: 345px; 
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    p {
        margin: 0;
    }
`;

export const SocialIconsDiv = styled.div`
    width: 345px; 
    display: flex;
    flex-direction: row;
    gap: 24px;
`;

export const Icon = styled.div<{ $orange: string; $brown: string }>`
    width: 35px;
    height: 35px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${props => props.$orange});
    transition: background-image 0.3s ease-in-out;

    &:hover {
        background-image: url(${props => props.$brown});
    }
`;

// -- Componentes de Descrição da ONG --
export const NgoDescriptionContainer = styled.div`
    width: 1010px;
    height: 670px;
    border: 1px solid #DEDEDE;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
`;

export const NgoTextsContainer = styled.div`
    width: 910px;
    height: 380px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    h3 {
        margin: 0;
        font-weight: 800;
        font-size: 18px;
    }

    p {
        margin: 0;
        font-size: 16px;
        margin-top: 24px;
        text-align: justify;
    }
`;

export const NgoFormsContainer = styled.div`
    width: 910px; 
    height: 170px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-size: 18px;
    font-weight: 800;

    h3 {
        margin: 0;
    }
`;

export const FormsContainer = styled.div`
    height: 126px;
    display: flex;
    flex-direction: row;
    gap: 12px;

    div {
        width: 218px;
        border: 1px solid #DEDEDE;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;
    }
`;