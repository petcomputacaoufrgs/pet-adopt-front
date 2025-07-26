import styled from "styled-components";

export const ImageSlotContainer = styled.div<{$image: null | string}>`
    width: 103.8px;
    height: 78px;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFF3DF;

    border: 1px dashed #A39289;
    border-radius: 8px;

    cursor: ${({ $image }) => ($image ? "default" : "pointer")};

    background-image: ${({ $image }) => ($image ? `url(${$image})` : "none")};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

`


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

