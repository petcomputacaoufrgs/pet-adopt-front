import styled from "styled-components";

export const HeaderWrapper = styled.div<{$showCompactMenu: boolean; $color: string; $shrink: boolean}>`
  background-color: ${({ $showCompactMenu, $color, $shrink }) => ($showCompactMenu || $shrink) ? "white" : $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  font-family: 'Nunito Sans', sans-serif;

  position: sticky;
  top: 0;
  z-index: 10;

`;

export const HeaderContainer = styled.div<{$backgroundColor: string; $shrink: boolean}>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: 80%;
  gap: 32px;
  box-sizing: border-box;

  min-height: ${({$shrink}) => $shrink ? "80px" : "108px"};
  transition: min-height 0.3s ease-in-out; 
  background-color: ${(props) => props.$backgroundColor};

  @media (max-width: 980px) {
    display: flex;
    justify-content: space-between;
    width: 80%;
    padding: 0;
  }
`;



export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(4px, 1.2vw, 20px);
  overflow: hidden;
  min-width: 0; 
`;


export const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media (max-width: 1480px) {
    padding-right: 80px;
  }

  @media (max-width: 980px) {
    padding-right: 0px;
  }
`;

export const TextButton = styled.button`
  display: inline-block;
  border: none;
  background: transparent;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 800;

  font-size: clamp(16px, 1.5vw, 18px);
  line-height: 1.2;

  color: #553525;

  white-space: nowrap; /* impede quebra de linha */

  &:hover {
    cursor: pointer;
    color: #8b6a50;
  }
`;



export const Image = styled.img`
  max-width: 140px;
  height: auto;
  flex-shrink: 0;
`;


export const CompactedMenuButton = styled.button<{$highlighted: boolean}>`
  min-width: 60px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$highlighted ? "#553525" : "#FF9944"};
  border: none;
  border-radius: 20px;

  svg {
    stroke: ${(props) => props.$highlighted ? "white" : "#553525"};
  }

  &:hover {
    cursor: pointer;
    background-color: #553525;

    svg {
      stroke: white;
    }
  }
`;

export const CompactMenu = styled.div<{$visible: boolean}>`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.1);
  gap: 48px;
  transition: max-height 0.4s ease, opacity 0.4s ease;

  padding: ${(props) => props.$visible ? "30px 0" : "0"};
  max-height: ${(props) => (props.$visible ? "500px" : "0")};
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  overflow: hidden;

  button {
    font-size: 18px;
  }
`;

export const CompactGeneralOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
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