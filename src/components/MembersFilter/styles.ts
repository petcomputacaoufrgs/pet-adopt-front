import styled from "styled-components";

export const Container = styled.div<{$width: string; $hasBorder: boolean}>`
    display: flex;
    width: ${(props) => props.$width};
    max-height: 420px;
    flex-direction: column;
    gap: 24px;
    padding: 48px 32px;
    border: ${(props) => props.$hasBorder ? "1px solid #DEDEDE" : "none"};
    border-radius: 20px;
`

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;


`


export const ButtonsContainer = styled.div<{$width: string}>`
    display: flex;
    width: ${(props) => props.$width};
    flex-direction: column;
    align-items: center;

    gap: 12px;
`

export const InputTitle = styled.p`

    font-family: Nunito Sans, sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #553525;
    margin-bottom: 8px;
    margin-top: 0;


`

export const SpecieRadioGroup = styled.div`

`


export const ContainerTitle = styled.h2`
    font-family: Nunito Sans, sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #553525;
    margin: 0;

`
