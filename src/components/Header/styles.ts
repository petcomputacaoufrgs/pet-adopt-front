import styled from "styled-components";

export const HeaderContainer = styled.div <{$backgroundColor:string}> `
    font-family: 'Nunito Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    min-height: 100px;
    gap: 9vw;
    background-color: ${(props) => props.$backgroundColor};

    @media (max-width: 900px){
        justify-content: space-between;
    }
  
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
    justify-content: center;
    border: none;
    background: rgb(0,0,0,0);
    width: 100%;
    font-weight: 900;
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

export const CompactedMenuButton = styled.button` 
  min-width: 60px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FF9944;
  border: none;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    background-color: #553525;
    
    svg {
        stroke: white;
    }

  }
  svg {
    stroke: #553525;
  }

`

export const CompactMenu = styled.div<{$visible: boolean}>`
  width: 100%;
  background-color: #fff;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.1);
  gap: 48px;
  transition: max-height 0.4s ease, opacity 0.4s ease;

  padding: ${(props) => props.$visible ? "30px 0 30px 0" : "0"};
  max-height: ${(props) => (props.$visible ? "500px" : "0")};
  opacity: ${(props) => (props.$visible ? 1 : 0)};

  button {
    font-size: 18px;
  }
`;


export const SocialIconsDiv = styled.div`
  gap: 24px;
  width: 100%;

  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: center; 
`;

export const Icon = styled.div<{ $orange: string; $brown: string }>`
  width: 35px;
  height: 35px;
  background-image: url(${props => props.$orange});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-image 0.3s ease-in-out;

  &:hover {
    background-image: url(${props => props.$brown});
  }
`;

