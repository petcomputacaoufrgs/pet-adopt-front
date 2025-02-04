import styled from "styled-components";

export const CardContainer = styled.div`
    font-family: 'Nunito Sans';
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Image = styled.img`
    width: 362px;
    height: 240px;
`;

export const CardInfoContainer = styled.div`
    background-color: #FFFFFF;
    border: 1px solid #DEDEDE;
    border-radius: 20px;
    width: 362px;
    height: 292px;
    margin-top: -25px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 100px;
`;

export const CardCenteredContainer = styled.div`
    width: 282px;
    height: 220px;
    display: flex;
    flex-direction: column;
`;

export const CardTagsContainer = styled.div`
    display: flex;
    margin-bottom: 14px;
`;

export const AnimalName = styled.text`
    color: #553525;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 14px;
`;

export const AnimalRace = styled.text`
    color: #553525;
    font-size: 18px;
    margin-bottom: 14px;
`;

export const AgeLocationContainer = styled.div` 
    color: #755B4D;
    margin-bottom: 14px;
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

