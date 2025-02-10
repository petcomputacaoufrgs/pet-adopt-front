import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)<{ font_size: string, text_color: string }>`
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 800; 
  text-decoration: none;
  color: ${(props) => `${props.text_color}`};
  font-size: ${(props) => `${props.font_size}`};
  padding: 0px 0px;
  gap: 10px;
  line-height: 28px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  order: 2;
  flex-grow: 0;
  
  height: 40px;

}`;