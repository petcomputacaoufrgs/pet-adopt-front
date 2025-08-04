import styled, { css } from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-width: 360px;
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

    h1{ //titulo
        font-size: 2rem; // 32px em rem utilizando 16px como base
        font-weight: 700;
        margin: 0;
    }

    h2{ //subtitulo
        font-size: 1.125rem; // 18px em rem utilizando 16px como base
        font-weight: 700;
        margin: 0;
    }
    
    h3{ //trecho
        font-size: 1rem; // 16px em rem utilizando 16px como base
        font-weight: 400;
        margin: 0;
    }

    h4{//infos
        font-size: 1rem; // 16px em rem utilizando 16px como base
        font-weight: 400;
        margin: 0;
        color: #755B4D;
    }
    
    h1{
        font-size: 2rem; // 32px em rem utilizando 16px como base
        font-weight: 700;
        margin: 0;
    }

    h5{//texto para social media
        font-size: 1rem; // 16px em rem utilizando 16px como base
        font-weight: 400;
        margin: 0;
        flex: 1;
        white-space: nowrap;
    }

    h6{ //texto da thumb
        font-size: clamp(1rem, 01.6666667vw, 01.6666667vw); // 32px em rem utilizando 16px como base
        font-weight: 700;
        margin: 0;
    }
        
`
export const PetProfileDiv = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;

    gap: 23px;


    @media (max-width: 1480px) {
      flex-direction: column;
      justify-content:center;
      align-items: center;
    }

`
export const InfosAction = styled.div`
    width: 100%; // 750px em vw utilizando 1920px como base
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
    width: 100%;
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
    width: 100%;

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

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
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

    @media (max-width: 900px) {
        flex-direction: column;
    }
`

export const InfoElement = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`

export const CardAbout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`
export const SocialContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 16px;

    justify-content: center;
    align-items: center;

    @media (max-width: 900px) {
      flex-direction: column;
        align-items: flex-start;
    }
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

  gap: 16px;

`;

// Interface for the Thumbnail's props
interface ThumbnailProps {
  isActive?: boolean;
  index?: number;
}

export const ViewerContainer = styled.div`
  display: flex;
  gap: 00.8333333vw; // 16px em vw utilizando 1920px como base
`;

export const ThumbnailGallery = styled.div`
  display: flex;
  height: 33.3333333vw; /* 618px em vw utilizando 1920px como base */
  min-height: 320px;
  flex-direction: column; /* Stacks thumbnails vertically */
  justify-content: flex-start; /* Aligns thumbnails to the top */
  gap: 01.3541667vw; /* 26px */

`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 05.46875vw; // 105px em vw utilizando 1920px como base
  min-width: 50px;
  height: 05.5729167vw; // 107px em vw utilizando 1920px como base
  min-height: 50px;
`;

export const ThumbnailBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 05.625vw; // 108px em vw utilizando 1920px como base
  min-width: 60px;
  height: 05.7291667vw; // 110px em vw utilizando 1920px como base
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.65); // cor escura semi-transparente
  cursor: pointer;

  font-size: 01.6666667vw; // 32px em vw utilizando 1920px como base

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const Thumbnail = styled.img<ThumbnailProps>`
  width: 05.46875vw; // 105px em vw utilizando 1920px como base
  min-width: 50px;
  height: 05.5729167vw; // 107px em vw utilizando 1920px como base
  min-height: 50px;
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
  width: 32.1875vw; // 618px em vw utilizando 1920px como base
  min-width: 320px;
  height: 33.3333333vw; // 640px em vw utilizando 1920px como base
  min-height: 320px;
  object-fit: cover;
  border-radius: 12px;
`;
