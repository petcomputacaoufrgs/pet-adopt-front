import styled from "styled-components";


export const ContentContainer = styled.div`
    display: flex;
    padding: 0;
    margin-left: 10%;
    margin-right: 10%;
    justify-content: center;
    gap: 14px;
`;

export const NGOCardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 14px 0px;


`


export const Overlay = styled.div`
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 1000;
  overflow: auto;
  height: 100%;
`;


export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 32px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  z-index: 1100;

  &:hover {
    color: #000;
  }
`;


export const FixedFilterButton = styled.button`
    position: fixed;
    left: 0;
    top: 50%;
    z-index: 1000;
`


export const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  scroll-margin-top: 80px;
`;

export const TopBarContent = styled.div`
  
  display: flex;
  width: 80%;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

export const NGOCardWrapper = styled.div`
  position: relative;
`;

export const NGOApproveButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  gap: 10px;
  width: 100%;
`;

export const Msg = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
`