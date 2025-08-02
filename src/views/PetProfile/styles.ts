import styled, { css } from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;  
    display: flex;
    flex-direction: column;

    font-family: "Nunito Sans", sans-serif;
    color: #563526;
    
`
export const Main = styled.main`
    
    width: 100%;
    border-box

    display: flex;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    align-items: flex-start;
    justify-content: flex-start;

    box-sizing: border-box; 

    padding-left: 10.4166667vw; // 200px em vw utilizando 1920px como base
    padding-right: 10.4166667vw;
    padding-bottom: 100px;

    h1{
        font-size: 2rem; // 32px em rem utilizando 16px como base
        font-weight: 700;
        margin: 0;
    }

    h2{
        font-size: 1.125rem; // 18px em rem utilizando 16px como base
        font-weight: 700;
        margin: 0;
    }
    
    h3{
        font-size: 1rem; // 16px em rem utilizando 16px como base
        font-weight: 400;
        margin: 0;
    }

    h4{
        font-size: 1rem; // 16px em rem utilizando 16px como base
        font-weight: 400;
        margin: 0;
        color: #755B4D;
    }
        
`
export const PetProfileDiv = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;

    gap: 23px;

`
export const InfosAction = styled.div`
    width: 750px;
    display: flex;

    flex-direction: column;

    gap: 32px
`

export const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 12px;
`

export const Cards = styled.div`
    width: 750px;
    display: flex;
    flex-direction: column;

    gap: 16px;
`

export const BackButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 53px 0;
    box-sizing: border-box;
`

export const InfoCard = styled.div`
    width: 750px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 40px;

    gap: 32px;

    box-sizing: border-box;

    border-radius: 20px;
    border: 0.1px solid #DEDEDE;
`
export const Title = styled.div
`
    display: flex;
    flex-direction: column;
    gap: 16px;
`
export const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`
export const TagsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`

export const InfoContainer = styled.div`
    
    width: 100%;

    display: flex;
    flex-direction: row;
    
    padding-top: 16px;
    padding-bottom: 16px;
    gap: 24px;

    border-top: 0.1px solid #DEDEDE;
    border-bottom: 0.1px solid #DEDEDE;

    box-sizing: border-box;
`

export const InfoElement = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`

export const CardAbout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
`
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

export const SocialIconsDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;  

  align-items: center;

  gap: 16px

`;

// Interface for the Thumbnail's props
interface ThumbnailProps {
  isActive?: boolean;
  index?: number;
}

export const ViewerContainer = styled.div`
  display: flex;
  gap: 16px; /* Space between thumbnails and the main image */
`;

export const ThumbnailGallery = styled.div`
  display: flex;
  height: 640px; /* Match the height of the main image */
  flex-direction: column; /* Stacks thumbnails vertically */
  justify-content: flex-start; /* Aligns thumbnails to the top */
  gap: 26px;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 105px;
  height: 107px;
`;

export const ThumbnailBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 108px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.65); // cor escura semi-transparente
  pointer-events: none;
`;

export const Thumbnail = styled.img<ThumbnailProps>`
  width: 105px;
  height: 107px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 20px;
  border: 2px solid transparent; /* Default transparent border */
  transition: border-color 0.3s;


  ${props =>
    props.index !== undefined && props.index < 4 
    &&
    css`
      &:hover {
        opacity: 0.8;
      }
  `}
  
  

  /* Conditionally applies style if the 'isActive' prop is true */
  ${props =>
    props.isActive &&
    props.index !== undefined &&
    props.index < 4 &&
    css`
      border-color: #FF9944; /* Border color for the active image */
    `}
`;

export const MainImageContainer = styled.div`
  /* This container can be used for additional styling around the image */
`;

export const MainImage = styled.img`
  width: 618px; /* Adjust width as needed */
  height: 640px;
  object-fit: cover;
  border-radius: 12px;
`;
