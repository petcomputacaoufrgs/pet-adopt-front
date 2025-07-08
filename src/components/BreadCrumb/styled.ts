import { Link } from "react-router-dom";
import styled from "styled-components";

export const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 20px;
  font-weight: 600;
  color: #555;
  gap: 4px;
`;

export const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  font-family: 'Nunito Sans', sans-serif;
  color: #553525;

  &:hover {
    text-decoration: underline;
  }
`;

export const Current = styled.span`
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 900;
  color: #553525;
`;

export const Separator = styled.span`
  margin: 0 4px;
  color: #553525;
`;
