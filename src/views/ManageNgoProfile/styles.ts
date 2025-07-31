import styled from "styled-components";

// -- Containers Principais --
export const Container = styled.div`
    width: 100%;
    height: 100%;
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
    justify-content: center;
    flex-direction: row;
    margin-top: 50px;

    @media(max-width: 768px){
        flex-direction: column;
    }
`;

// -- Componentes de Card da ONG --
export const NgoCardContainer = styled.div`
    width: 35%; 
    height: 88%;
    border: 1px solid #DEDEDE;
    border-radius: 20px;
    padding: 3.2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 24px;
    box-sizing: border-box;

    @media(max-width: 768px){
        margin: 0;
        margin-bottom: 24px;
        width: 100%;
        padding: 8%;
    }
`;

export const NgoNameContainer = styled.div`
    width: 100%; 
    height: 37%;
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    box-sizing: border-box;
`;

export const TextsContainer = styled.div`
    height: 59%;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    h1 {
        margin: 0;
        font-weight: 800;
        font-size: clamp(18px, 2vw, 32px);
        margin-bottom: 2px;

        @media(max-width: 660px){
            font-size: 16px;
        }
    }

    p {
        margin: 0;
        font-size: clamp(14px, 1vw, 18px);
        margin-bottom: 2px;  
    }

    a {
        margin: 0;
        font-size: clamp(12px, 1vw, 18px);
        font-weight: 800;
        color: #553525;
        text-decoration: none;

        @media (max-width: 660px){
            font-size: 8px;
        }
    }

    @media(max-width: 768px){
        align-items: center;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;

    @media(max-width: 1050px){
        flex-direction: column;
    }

    @media(max-width: 768px){
        flex-direction: row;
        gap: 30px;
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

    color: #755B4D;
`;

export const InformationsContainer = styled.div`
    width: 100%; 
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    box-sizing: border-box;
    font-size: clamp(12px, 1vw, 18px);

    p {
        margin: 0;
        margin-bottom: 12px;
        word-break: break-word;
        white-space: normal;
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

    @media (max-width: 1024px) {
        width: 25px;
        height: 25px;   
    }

    @media (max-width: 850px) {
        width: 20px;
        height: 20px;   
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
    padding: 3.2%;
    box-sizing: border-box;

    @media (max-width: 1050px) {
        width: 62%;
    }

    @media(max-width: 768px){
        width: 100%;
        padding: 8%;
    }
`;

export const NgoTextsContainer = styled.div`
    width: 100%;
    height: 66%;
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;

    h3 {
        margin: 0;
        font-weight: 800;
        font-size: clamp(12px, 1vw, 18px);
    }

    p {
        margin: 0;
        margin-top: 24px;
        text-align: justify;
        font-size: clamp(10px, 1vw, 16px);

        @media(max-width: 1050px){
            margin-top: 14px;
        }
    }    
`;

export const NgoFormsContainer = styled.div`
    width: 100%; 
    height: 30%;
    display: flex;
    flex-direction: column;
    font-size: clamp(12px, 1vw, 18px);
    font-weight: 800;

    h3 {
        margin: 0;
        margin-bottom: 12px;
    }
`;

export const FormsContainer = styled.div`
    height: 75%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media (max-width: 1050px) {
        flex-direction: column;
    }

    div {
        width: 24%;
        border: 1px solid #DEDEDE;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-right: 12px;
        gap: 12px;
        padding: 2.7%;
        box-sizing: border-box;
        font-size: clamp(10px, 1vw, 16px);
        white-space: nowrap;

        @media (max-width: 1050px) {
            width: 100%;
            margin: 0;
            margin-bottom: 12px;
        }      
    }

    div:last-of-type{
        margin: 0;
    }
`;