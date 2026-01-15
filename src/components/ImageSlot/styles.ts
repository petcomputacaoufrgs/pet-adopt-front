import styled, { css } from "styled-components";

export const ImageSlotContainer = styled.div<{$image: null | string; $isCover: boolean}>`
    width: 103.8px;
    height: 78px;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFF3DF;

    border: ${({ $isCover }) => ($isCover ? "1px solid #FF9944" : "1px dashed #A39289")};
    border-radius: 8px;

    cursor: ${({ $image }) => ($image ? "default" : "pointer")};

    background-image: ${({ $image }) => ($image ? `url(${$image})` : "none")};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    box-shadow: ${({ $isCover }) => ($isCover ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "none")};

`

// Etiquetinha de "Capa" para imagem
export const CoverBadge = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 153, 68, 0.9);
  color: white;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  padding: 2px 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  pointer-events: none; // Permite clicar na imagem através do badge
`;


export const DeleteButton = styled.button`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background: #553525;
    border: none;
    border-radius: 9999px;
    padding: 2px;

    cursor: pointer;

    transition: background 0.2 ease; 

    &:hover{
        background: #6a3f2d;
    }


`

