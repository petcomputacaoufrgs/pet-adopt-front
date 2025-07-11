import styled from "styled-components";


export const HeaderWrapper = styled.div<{$showCompactMenu: boolean; $color: string;}>`
  background-color: ${({ $showCompactMenu, $color }) => $showCompactMenu ? "white" : $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;



export const HeaderContainer = styled.div <{$backgroundColor:string}> `
    font-family: 'Nunito Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    min-height: 100px;
    gap: min(128px, 9vw);
    background-color: ${(props) => props.$backgroundColor};

    @media (max-width: 900px){
        justify-content: space-between;
    }
  
`;

export const TextContainer = styled.div`
    display: flex;
    align-items: center;        
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
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 800;
    font-size: clamp(16px, 1vw, 1.1em); /* Responsivo */
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

export const CompactedMenuButton = styled.button<{$highlighted: boolean}>` 
  min-width: 60px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$highlighted? "#553525" : "#FF9944"};
  border: none;
  border-radius: 20px;

  svg {
    stroke: ${(props) => props.$highlighted? "white" : "#553525"};
  }

  &:hover {
    cursor: pointer;
    background-color: #553525;
    
    svg {
        stroke: white;
    }

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


export const CompactUserOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
`;

export const CompactLoginSignupButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  width: 100%;
`;

export const CompactGeneralOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
`;

