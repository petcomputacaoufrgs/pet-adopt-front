import {CardContainer, Image, CardDiv} from "./styles";

import {ICard} from "./types"

import InfoComponent from "../Info";


const ContactCard = ({ title, subtitle, buttonTitle, background_color, to, position, children }: ICard) => {
  return (
    

    <CardDiv>

      <CardContainer background_color={background_color}>
        <InfoComponent title={title} subTitle={subtitle} buttonTitle={buttonTitle} to={to} position={position}>
            {children}
        </InfoComponent>
      </CardContainer>

    </CardDiv>

  );
};

export default ContactCard;
