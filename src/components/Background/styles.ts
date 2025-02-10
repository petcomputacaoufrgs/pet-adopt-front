import zIndex from "@mui/material/styles/zIndex";
import styled from "styled-components";


export const BackContainer = styled.div `

  display: flex;
  justify-content: center;
  align-items: center; 
  width: 100%; 
  height: 100%;

  @media (max-width: 500px) {
    min-height: 750px;
  } 
`

export const Img1Container = styled.div`
  
  display: flex;
  position: relative;
  height: 100%;
  width: 100%; 

`

export const Image1 = styled.img <{top?: string; left?: string; width?: string; height?: string; translate?:string; zIndex?: number}>`

  position: absolute;
  top: ${props => props.top || "0"};
  left: ${props => props.left || "0"};
  width: ${props => props.width || "auto"};
  height: ${props => props.height || "auto"}; 
  z-index: ${props => props.zIndex || 1};
  transform: translate(${props => props.translate || "0"}, ${props => props.translate || "0"});

`