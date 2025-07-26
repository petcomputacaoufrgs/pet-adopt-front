import styled from 'styled-components';

export const Container = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label<{ fontSize: string }>`
  font-family: 'Nunito Sans', sans-serif;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 700;
  color: #553525;
`;

export const Required = styled.span`
  color: #F17D6E;
`;
