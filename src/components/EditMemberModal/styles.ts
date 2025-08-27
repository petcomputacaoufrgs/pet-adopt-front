import styled from "styled-components";

export const Container = styled.div`

  display: flex;
  align-items: center; 
  justify-content: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 999;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%; 
`

export const ContentContainer = styled.div`
    background-color: rgba(255, 246, 232, 1);
    border-radius: 20px;
    padding: 2% 8% 4% 8%;
    margin: 10% 10%;
    width: 60%;
    color: #553525;

    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`

export const UpdateButton = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`