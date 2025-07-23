import styled from "styled-components";

// -- Containers Principais --
export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;

    font-family: 'Nunito Sans', sans-serif;
    color: #553525;
`;

export const MiddleContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 79%;
    height: 48%;
    align-self: center;
    margin-top: 50px;
    margin-bottom: 50px;
    box-sizing: border-box;
`;

export const ProfileContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 50px;

    @media (max-width: 1387px) {
        flex-direction: column;
        height: auto;
    }
`;

// -- Componentes de Card da ONG --
export const NgoCardContainer = styled.div`
    width: 35%; 
    height: 88%;
    border: 1px solid #DEDEDE;
    border-radius: 20px;
    padding: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 24px;
    box-sizing: border-box;

    @media (max-width: 1387px) {
        width: 100%;
        height: 50%;
        flex-direction: row;
    }
`;

export const NgoNameContainer = styled.div`
    width: 100%; 
    height: 37%;
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    box-sizing: border-box;

    @media (max-width: 1387px) {
    }
`;

export const TextsContainer = styled.div`
    height: 59%;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    h1 {
        margin: 0;
        font-weight: 800;
        font-size: 32px;
        margin-bottom: 2px;
    }

    p {
        margin: 0;
        font-size: 18px;
        margin-bottom: 2px;
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
    height: 28%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;

    @media (max-width: 1387px) {
        flex-direction: column;
    }
`;

export const NgoInformationsContainer = styled.div`
    width: 100%;
    height: 57%;
    background: #FFF6E8;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 24px 32px 24px;
    box-sizing: border-box;

    font-size: 18px;
    color: #755B4D;

    @media (max-width: 1387px) {

    }
`;

export const InformationsContainer = styled.div`
    width: 100%; 
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    box-sizing: border-box;

    p {
        margin: 0;
        margin-bottom: 12px;
    }
`;

export const SocialIconsDiv = styled.div`
    width: 100%; 
    display: flex;
    flex-direction: row;

    a{
        margin-right: 12px;
    }
`;

export const Icon = styled.div<{ $orange: string; $brown: string }>`
    width: 30px;
    height: 30px;
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
    width: 72%;
    height: 100%;
    border: 1px solid #DEDEDE;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    box-sizing: border-box;

    @media (max-width: 1387px) {
        width: 100%;
    }
`;

export const NgoTextsContainer = styled.div`
    width: 100%;
    height: 66%;
    display: flex;
    flex-direction: column;
    overflow: scroll;

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
    width: 100%; 
    height: 30%;
    display: flex;
    flex-direction: column;

    font-size: 18px;
    font-weight: 800;

    h3 {
        margin: 0;
        margin-bottom: 12px;
    }
`;

export const FormsContainer = styled.div`
    height: 126px;
    display: flex;
    flex-direction: row;

    div {
        width: 25%;
        border: 1px solid #DEDEDE;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        gap: 12px;
    }

    div:last-of-type{
        margin: 0;
    }
`;