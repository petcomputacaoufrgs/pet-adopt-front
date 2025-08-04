import styled from "styled-components";

export const CardContainer = styled.div`
    font-family: 'Nunito Sans', sans-serif;
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    margin-left: 16px;
    margin-bottom: 32px;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 362px;
  height: auto;
`;

export const CardInfoContainer = styled.div`
   background-color: #FFFFFF;
  border: 1px solid #DEDEDE;
  border-radius: 0 0 20px 20px;
  margin-top: -25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  width: 100%;
  height: auto;
  box-sizing: border-box;
`;

export const CardCenteredContainer = styled.div`
   display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CardTagsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 210px;
    margin-bottom: 14px;
`;

export const AnimalName = styled.text`
    color: #553525;
    font-weight: bold;
    margin-bottom: 14px;

    @media (min-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }    
`;

export const AnimalRace = styled.text`
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
    padding-bottom: 14px;
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