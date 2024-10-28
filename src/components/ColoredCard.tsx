import styled from "styled-components";

interface ICard {
  title: string;
  background_color: string;
  image_url: string;
  image_url_mobile: string;
  children: React.ReactNode;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  gap: 8px;
  width: 100%;
  max-width: 450px;
  padding: 1em; /* Usar unidades relativas */

  p {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 400;
    font-size: 1.2em;
    line-height: 1.5;
    color: #553525;
  }

  h3 {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 800;
    font-size: 1.5em;
    line-height: 1.5;
    color: #553525;
  }
`;

const CardDiv = styled.div<{ background_color: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 1em; 
  gap: 16px;

  width: 100%;
  max-width: 800px;
  height: auto;

  background: ${(props) => props.background_color};
  border-radius: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 1em; 
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 150px; 
  height: auto; 
`;

const ColoredCard = ({ title, background_color, image_url, image_url_mobile, children }: ICard) => {
  return (
    <CardDiv background_color={background_color}>
      <Image src={image_url} srcSet={`${image_url} 1x, ${image_url_mobile} 768w`} sizes="100vw" />
      <CardContainer>
        <h3>{title}</h3>
        {children}
      </CardContainer>
    </CardDiv>
  );
};

export default ColoredCard;
