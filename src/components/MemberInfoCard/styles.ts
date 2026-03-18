import styled from "styled-components";

export const CardContainer = styled.div<{ $estado: "default" | "hover" | "selected"}>`
  background-color: white;
  border-radius: 15px;
  width: 100%;
  max-width: clamp(400px, 1vh, 300px);
  
  padding: 0; 
  
  display: flex;
  flex-direction: column;
  align-self: start;
  box-shadow: ${({ $estado }) =>
    $estado === "hover"
      ? "0 4px 10px rgba(0, 0, 0, 0.1)"
      : $estado === "selected"
      ? "0 0 0 2px  rgba(0, 0, 0, 0.1)"
      : "0 2px 5px rgba(0, 0, 0, 0.0)"};

  border: ${({ $estado }) =>
    $estado === "hover"
      ? "1px solid transparent"
      : $estado === "selected"
      ? "1px solid transparent"
      : "1px solid rgba(0, 0, 0, 0.1)"};
  position: relative;
  z-index: ${({ $estado }) => ($estado === "hover" ? "2" : "1")};
  transform: ${({ $estado }) => ($estado === "hover" ? "translateY(-3px)" : "translateY(0)")};
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
`;

export const MemberName = styled.h3`
  margin: 0;
  font-weight: 700;
  text-align: center;
  font-size: 18px
  
`;

export const MemberType = styled.p`
  margin-top: 0;
  padding-top:10px;
  text-align: center;
  font-size: 14px;
`;

export const MemberApproveButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding-top: 15px
`;


export const InfoSection = styled.div`

    background: #FFF6E8;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: 20px 24px;
    box-sizing: border-box;
    font-size: clamp(14px, 1vw, 18px);
    color: #755B4D;
    margin-right: 40px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const MemberTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: rgba(86, 53, 38, 1);
`;


export const ActionsBox = styled.div`
  background-color: #FFFFFF;
  border-top: 1px solid #DEDEDE;
  border-radius: 0 0 15px 15px;
  
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;

export const Area = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1; /* Ocupa o espaço disponível */
  border-radius: 15px 15px 0 0;
  padding: 20px;
`;
