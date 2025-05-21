import styled from "styled-components";


export const StyledButton = styled.button<{
  $width: string,
  $height: string,
  $backgroundImage: string,
  $backgroundColor: string,
  $active: boolean
}>`

  position: relative;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background-color: ${(props) =>
    props.$active ? props.$backgroundColor : "#cccccc"}; 

  opacity: ${(props) =>
    props.$active ? "1.0" : "0.6"}; 

  border-radius: 8px;
  overflow: hidden;
  border: none;
  

  transition: opacity 0.3s ease, background-color 0.3s ease;

  &:hover {
    cursor: pointer;
    opacity: 1.0;
    background-color: ${(props) => props.$backgroundColor};
    transition: background-color 0.3s ease, opacity 0.3s ease;

  }

  &:hover::before{
    filter: none;
    transition: filter 0.3s ease;

  }


  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(${(props) => props.$backgroundImage});
    background-size: 80%;
    background-position: center bottom;
    background-repeat: no-repeat;
    filter: ${(props) => (props.$active ? "none" : "grayscale(100%)")};
    transition: filter 0.3s ease;
  }
`

export const StyledText = styled.p`
    margin: 0;
    color: #553525;
    font-family: "Nunito Sans", sans-serif;
    font-size: 16px;

`