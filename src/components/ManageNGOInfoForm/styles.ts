import styled from "styled-components";

// ...existing code...
export const Container = styled.form`
   width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;  
`;

export const ContentContainer = styled.div`
  background-color: rgba(255, 246, 232, 1);
  border-radius: 12px;
  border-top: 30px solid rgba(255, 246, 232, 1);
  border-left: 30px solid rgba(255, 246, 232, 1);
  border-right: 15px solid rgba(255, 246, 232, 1);
  border-bottom: 15px solid rgba(255, 246, 232, 1);
  padding: 2%;
  width: 100%;
  color: #553525;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
       
  overflow-y: auto;         
  max-height: 100%;        

  padding-bottom: 3.5rem;
  box-sizing: border-box;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #cccccc; border-radius: 10px; }
  &::-webkit-scrollbar-thumb:hover { background: #999999; }
  scrollbar-color: #cccccc transparent;
  scrollbar-width: thin;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const UpdateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;


export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-start;
`;
