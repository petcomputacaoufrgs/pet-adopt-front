import styled from "styled-components";

export const EditButtonContainer = styled.div<{$width: string, $height: string}>`
    position: relative;
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
`

export const StyledDeleteButton = styled.button<{$backgroundImage: string, $width: string, $height: string }>`
    background-image: url(${(props) => props.$backgroundImage});
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    border-radius: 50%;
    border: none;
    background-color:#FFFFFF;

    &:hover  {
        cursor: pointer;
        background-color: #FF9944;
        transition: background-color 0.3s ease;
    }

    &:active {
        cursor: pointer;
        background-color: #FF9944;
        transition: background-color 0.3s ease;
    }

`
