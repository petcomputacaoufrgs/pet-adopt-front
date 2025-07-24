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

export const AnimalFormContainer = styled.div`
  width: 1536px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFF6E8;
  border-radius: 28px;
  border: 1px solid #DEDEDE;
  padding: 32px 0;

  @media (max-width: 1600px) {
    width: 90%;
  
  }

  @media (max-width: 1000px) {
    width: 95%;
  }
`

export const InputsContainer = styled.div`
  display: flex;
  gap: 30px;

`



export const ImageSlotsContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 12px 24px;
    flex-wrap: wrap;

    @media (max-width: 1600px) {
    gap: 12px 16px;
  
    }

    @media (max-width: 979px) {
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