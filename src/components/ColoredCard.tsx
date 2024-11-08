import styled from "styled-components";

interface ICard {
  title: string;
  background_color: string;
  image_url: string;
  image_url_mobile: string;
  children: React.ReactNode;
}


const CardConteiner = styled.button<{ background_color: string }>`
  display: flex;
  align-items: center;

  padding: 2em; 
  gap: 16px;

  width: 100%;
  max-width: 800px;
  height: auto;

  background: ${(props) => props.background_color};
  border-radius: 20px;

  border: none;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03); 
    cursor: pointer; 
  } 

  


  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 1em; 
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  gap: 8px;
  width: 100%;
  max-width: 450px;
  padding: 1em; 

  p {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 400;
    font-size: 1.5em;
    line-height: 1.5;
    color: #553525;

  }

  h3 {
    margin: 0;
    font-family: 'Nunito Sans';
    font-weight: 800;
    font-size: 2em;
    line-height: 1.5;
    color: #553525;
  }
`;


const Image = styled.img`
  width: 100%;
  max-width: 150px; 
  height: auto; 
  margin-left: 16px;


`;


const ColoredCard = ({ title, background_color, image_url, image_url_mobile, children }: ICard) => {
  return (
    <CardConteiner background_color={background_color}>
      
      <Image src={image_url}/>
      
      <CardInfo>
        <h3>{title}</h3>
        {children}
      </CardInfo>
      
    </CardConteiner>
  );
};

export default ColoredCard;
