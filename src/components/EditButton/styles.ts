import styled from "styled-components";

export const EditButtonContainer = styled.div<{$width: string, $height: string}>`
    position: relative;
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
`

export const StyledOptionButton = styled.button`
    width: 175px;
    padding: 8px 16px;
    background-color: #FFFFFF;
    box-shadow:
        0px 1px 4px rgba(12, 12, 13, 0.10), /* sombra mais forte */
        0px 1px 4px rgba(12, 12, 13, 0.05);  /* sombra mais suave */
    border: none;
    border-radius: 100px;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: #553525;


    &:hover {
        cursor: pointer;
        background-color: #FF9944;
        transition: background-color 0.3s ease;
    }
`

export const StyledEditButton = styled.button<{$backgroundImage: string, $width: string, $height: string, $clicked: boolean}>`
    background-image: url(${(props) => props.$backgroundImage});
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    border-radius: 50%;
    border: none;
    background-color: ${(props) => (props.$clicked ? "#FF9944" : "#FFFFFF")};

    &:hover {
        cursor: pointer;
        background-color: #FF9944;
        transition: background-color 0.3s ease;
    }

`

export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: absolute;
    top: 0;
    left: calc(100% + 12px);
    z-index: 100;
`

export const OptionContentContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 4px;
    align-items: center;
    justify-content: center;


`