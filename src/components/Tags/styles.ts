import styled from "styled-components";
import { TagProps } from "./types";


export const TagContainer = styled.div<TagProps>`
  font-family: "Nunito Sans", sans-serif;
  display: inline-block;
  align-items: center;
  border-radius: 999px;
  padding: 0.5em 1em;
  font-weight: bold;
  border: 2px solid;
  font-size: ${(props) => props.fontSize};

  #checkmark {
        width: 1em;
        height: 1em;
        margin-right: 0.5em;
        vertical-align: middle;
    }

  ${(props) =>
    props.type === "light" && `
      background: #ffebcc;
      border-color: #FF9944;
      color: #582c0e;
    `}

  ${(props) =>
    props.type === "orange" && `
      background: #FF9944;
      border-color: #FF9944;
      color: #582c0e;
    `}

  ${(props) =>
    props.type === "disabled" && `
      background: #d3d3d3;
      border-color: #a0a0a0;
      color: #a0a0a0;
      cursor: not-allowed;
    `}
`;