import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
`;

export const NgoCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

export const NgoNameContainer = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const NgoInformationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const NgoDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const NgoTextsContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

export const NgoFormsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const Voltar = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #000;

    &:hover {
        text-decoration: underline;
    }
`;


