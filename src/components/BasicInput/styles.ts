import styled from "styled-components";

export const StyledInput = styled.input<{
  $width: string;
  $fontSize: string;
  $paddingRight: string;
  $paddingVertical: string;
  $readOnly: boolean;
  $inputType: string;
  $error: boolean;
}>`
  font-family: 'Nunito Sans', sans-serif;
  width: ${({ $width }) => $width};
  font-size: ${({ $fontSize }) => $fontSize};
  box-sizing: border-box;
  border: ${({ $error, $inputType }) =>
    $error ? "1px solid #FF3B30" : $inputType === "Primário" ? "1px solid #FFC99C" : "1px solid #BCAFA9"};
  color: #553525;
  background-color: ${({ $inputType }) => ($inputType === "Primário" ? "#FFF3DF" : "#FFFFFF")};
  padding-top: ${({ $paddingVertical }) => $paddingVertical};
  padding-bottom: ${({ $paddingVertical }) => $paddingVertical};
  padding-right: ${({ $paddingRight }) => $paddingRight};
  padding-left: 24px;
  border-radius: 100px;

  &:hover {
    cursor: ${({ $readOnly }) => ($readOnly ? "pointer" : "text")};
  }

  &:focus {
    outline: none;
    border: ${({ $error, $inputType }) =>
      $error ? "1px solid #FF3B30" : $inputType === "Primário" ? "1px solid #FF9944" : "1px solid #755B4D"};
  }
`;

export const Label = styled.label<{ $fontSize: string }>`
  font-family: 'Nunito Sans', sans-serif;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 700;
  color: #553525;
  display: block;
`;

export const RequiredAsterisk = styled.span`
  color: #F17D6E;
`;

export const Container = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  position: relative;
  display: flex;
  align-items: center;
`;

export const ErrorMessageContainer = styled.div<{ $fontSize: string }>`
  display: flex;
  align-items: center;
  gap: 6px;

  & > span {
    color: #FF3B30;
    font-size: calc(${({ $fontSize }) => $fontSize} - 0.125em);
    font-weight: 500;
    font-family: 'Nunito Sans', sans-serif;
  }

  svg {
    width: calc(${({ $fontSize }) => $fontSize} - 0.125em);
    height: calc(${({ $fontSize }) => $fontSize} - 0.125em);
  }
`;
