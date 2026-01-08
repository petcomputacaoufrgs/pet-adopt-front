import styled from "styled-components";

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  gap: 16px;
  width: 100%;

  p {
    margin: 0;
    font-weight: 400;
    font-size: 18px;
    color: #553525;

  }
  
  h1 {
    margin: 0;
    font-weight: bold;
    font-size: 40px;
    color: #553525;
  }
    
`;

export const FormContainer = styled.div`
  width: 1305px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 1600px) {
    width: 90%;
  
  }



`

export const LocationInputsContainer = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 1180px) {
    flex-direction: column;
    gap: 16px;
    
  }
`


export const InputsContainer = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 818px) {
    flex-direction: column;
    align-items: center;
  }

`



export const ImageSlotsContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 12px 24px;
    flex-wrap: wrap;

    @media (max-width: 1600px) {
    gap: 12px 16px;
  
    }

    @media (max-width: 931px) {
      justify-content: center;
    }
`


export const Label = styled.label<{ $fontSize: string }>`
  font-family: 'Nunito Sans', sans-serif;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 700;
  color: #553525;
  display: block;
`;

export const RequiredAsterisk = styled.span`
  color: #F17D6E;
`;


export const InputSubtitle = styled.p`
  font-family: 'Nunito Sans', sans-serif;
  color: #553525;
  margin: 0;
  font-size: 1rem;



`