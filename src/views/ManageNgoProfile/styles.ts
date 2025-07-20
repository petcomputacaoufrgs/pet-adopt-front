import styled from "styled-components";


export const Container = styled.div`
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
    background-color: #34d0cdff;
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
    background-color: #f0f0f0;
`;

export const NgoCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 490px;
    height: 585px;
    background: #b3d12cff;
`;

export const NgoNameContainer = styled.div`
    width: 385px;
    height: 185px;
    background: #af3434ff;
`;

export const NgoInformationsContainer = styled.div`
    width: 385px;
    height: 275px;
    background: #2d199eff;
`;

export const NgoDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 1010px;
    height: 670px;
    background-color: #d84576ff;
`;

export const NgoTextsContainer = styled.div`
    width: 910px;
    height: 380px;
    background: #45c627ff;
`;

export const NgoFormsContainer = styled.div`
    width: 910px;
    height: 170px;
    background: #d422b7ff;
`;
