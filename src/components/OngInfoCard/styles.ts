import styled, { css } from "styled-components";

export const CardContainer = styled.div<{ $estado: "default" | "hover" | "selected"; $modo: "edit" | "approve" }>`
  width: 280px;
  background-color: white;
  border-radius: 16px;
  padding: 16px;
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
`;

export const OngType = styled.p`
  margin: 0;
  text-align: center;
  font-size: 0.85rem;
  color: #444;
`;

export const InfoSection = styled.div`
  background-color: #fff2e5;
  border-radius: 10px;
  padding: 10px;
  margin: 12px 0;
`;

export const DataItem = styled.p`
  font-size: 0.85rem;
  margin: 4px 0;
  color: rgba(86, 53, 38, 1);
  padding: 4px;
  img{
    padding-right: 8px;
  }
`;




export const EditButtonWrapper = styled.div`
  position: absolute;
  top: 24px;
  left: 40px;
`;

export const NGOApproveButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  gap: 10px;
  width: 100%;
`;

export const SocialMediaGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  gap: 10px;
  width: 100%;
  img{
    heigth: 24px;
    width: 24px;
  }
`

export const Cabecalho = styled.div `
  display: flex;
  flex-direction: column;
  gap: 4px;
`