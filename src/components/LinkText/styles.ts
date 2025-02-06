import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 800; 
  text-decoration: none;
  color: #553525;
  font-size: 18px;
  padding: 6px 0px;
  gap: 10px;
  line-height: 28px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  order: 2;
  flex-grow: 0;
  
  height: 40px;

}`;