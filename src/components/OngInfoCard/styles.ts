import styled, { css } from "styled-components";

export const CardContainer = styled.div<{ $estado: "default" | "hover" | "selected"; $modo: "edit" | "approve" | "none"}>`
  width: 90%;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: ${({ $estado }) =>
    $estado === "hover"
      ? "0 4px 10px rgba(0, 0, 0, 0.1)"
      : $estado === "selected"
      ? "0 0 0 2px  rgba(0, 0, 0, 0.1)"
      : "0 2px 5px rgba(0, 0, 0, 0.0)"};

  border: ${({ $estado }) =>
    $estado === "hover"
      ? "0px solid rgba(222, 222, 222, 1)"
      : $estado === "selected"
      ? "0px solid rgba(222, 222, 222, 1)"
      : "1px solid rgba(0, 0, 0, 0.1)"};
  position: relative;
  cursor: ${({ $modo }) => ($modo === "edit" ? "pointer" : "default")};
  transition: box-shadow 0.3s ease;
   align-self: start;
`;

export const OngName = styled.h3`
  margin: 0;
  font-weight: 700;
  text-align: center;
  font-size: 16px
  
`;

export const OngType = styled.p`
  margin: 0;
  text-align: center;
  font-size: 14px;
`;

export const InfoSection = styled.div`
    width: 100%;
    background: #FFF6E8;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    
    justify-content: center;
    padding: 20px 24px 20px 24px;
    box-sizing: border-box;

    font-size: clamp(14px, 1vw, 18px);
    color: #755B4D;

    @media (max-width: 1526px) {
        font-size: 14px;
    }
`;

export const DataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 12px;

  img {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #755B4D;
    word-break: break-word;
  }
`;




export const NGOApproveButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding-top: 15px
`;

export const SocialIconsDiv = styled.div`
    width: 100%; 
    display: flex;
    flex-direction: row;
    margin: 10px 0px 15px 0px;
    a{
        margin-right: 12px;
    }
`;

export const Icon = styled.div<{ $orange: string; $brown: string }>`
    width: 25px;
    height: 25px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${props => props.$orange});
    transition: background-image 0.3s ease-in-out;

    &:hover {
        background-image: url(${props => props.$brown});
    }
`;

export const Cabecalho = styled.div`
  position: relative;
  display: flex;
  justify-content: center;  // centraliza o texto
  align-items: center;
  padding: 10px;
`;

export const OngTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(86, 53, 38, 1);
  font-size: 
`;

export const EditButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
