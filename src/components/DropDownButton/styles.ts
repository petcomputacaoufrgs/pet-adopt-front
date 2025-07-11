import styled from "styled-components";

export const Container = styled.div<{ $buttonWidth: string }>`
  position: relative;
  width: ${({ $buttonWidth }) => $buttonWidth};
`;

export const DropdownWrapper = styled.div<{ $dropDownWidth: string }>`
  position: absolute;
  top: 100%;
  padding-top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: ${({ $dropDownWidth }) => $dropDownWidth};
`;

export const ContentWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
