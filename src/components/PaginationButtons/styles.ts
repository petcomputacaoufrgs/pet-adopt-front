import styled from "styled-components";


export const PaginationContainer = styled.div<{$buttonWidth: string; $buttonHeight: string; $containerHeight: string}>`

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 16px;

    height: ${(props) => props.$containerHeight};

    button {
        width: ${(props) => props.$buttonWidth};
        height: ${(props) => props.$buttonHeight};

        border-radius: 50%;
        border: none;

        box-shadow:
            0px 1px 4px rgba(12, 12, 13, 0.10), /* sombra mais forte */
            0px 1px 4px rgba(12, 12, 13, 0.05);  /* sombra mais suave */
    }


`

export const Ellipsis = styled.span`
    padding: 0 8px;
`

export const NumericPassPageButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

`
export const PaginationButton = styled.button<{$highlighted: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Nunito Sans", sans-serif;
    background-color: ${({ $highlighted }) => ($highlighted ? "#FF9944" : "#FFFFFF")};
    font-weight: 400;
    font-size: 16px;
    color: #553525;


    &:hover {
        cursor: pointer;
        background-color: ${({ $highlighted }) => ($highlighted ? "#FF9944" : "#e0e0e0")};
    }

    &:disabled {
        cursor: default;
  }


`


export const PassPageButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: #FFFFFF;


    &:hover {
        cursor: pointer;
        background-color: #e0e0e0;
    }

    &:disabled {
        cursor: default;
        background-color: #DEDEDE;
        color: #A6A6A6;

  }
`