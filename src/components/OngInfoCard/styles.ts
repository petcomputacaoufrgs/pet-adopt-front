import styled, { css } from "styled-components";

export const CardContainer = styled.div<{ $estado: "default" | "hover" | "selected"; $modo: "edit" | "approve" | "none"}>`
  width: 280px;
  background-color: white;
  border-radius: 16px;
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
  background-color: #fff2e5;
  border-radius: 10px;
  padding: 10px;
  margin: 12px 0;
`;

export const DataItem = styled.p`
  font-size: 0.85rem;
  color: rgba(86, 53, 38, 1);
  padding: 2px;
`;



export const NGOApproveButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  gap: 10px;
  width: 100%;
  padding-top: 5px
`;

export const SocialMediaGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  img{
    heigth: 24px;
    width: 24px;
  }
`
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
