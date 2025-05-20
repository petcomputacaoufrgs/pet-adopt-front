import styled from "styled-components";

export const HeaderContainer = styled.div <{$backgroundColor:string}> `
    font-family: 'Nunito Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    min-height: 100px;
    gap: 9vw;
    background-color: ${(props) => props.$backgroundColor};
    padding-left: 3.5em;  
    padding-right: 3.5em;    
  
`;

export const TextContainer = styled.div`
    
    display: flex;
    font-weight: 800;
    font-size: clamp(0.8rem, 1vw, 1.1em); /* Responsivo */
    line-height: 2;
    color: #553525;
        
    gap:3vw;
    
}`

export const ButtonsContainer = styled.div`
    
    display: flex;    
    gap:0.9vw;
    align-items: center;
    justify-content: center;
    
}`

export const TextButton = styled.button`

    display: flex;
    border: none;
    background: rgb(0,0,0,0);

    font-weight: 800;
    font-size: clamp(0.8rem, 1vw, 1.1em); /* Responsivo */
    line-height: 2;
    color: #553525;

    &:hover {
        cursor: pointer;
        color: #8b6a50; 
`

export const Image = styled.img`
  width: auto;
  height: 45px;
  } 
`;
