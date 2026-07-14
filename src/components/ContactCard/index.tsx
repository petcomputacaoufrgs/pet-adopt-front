import {
  CardContainer,
  CardDiv,
  CardContent,
  CardTitle,
  CardSubtitle,
} from "./styles";
import type { ICard } from "./types";

const ContactCard = ({
  title,
  subtitle,
  backgroundColor,
  children,
}: ICard) => {
  return (
    <CardDiv>
      <CardContainer $backgroundColor={backgroundColor}>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
          {children}
        </CardContent>
      </CardContainer>
    </CardDiv>
  );
};

export default ContactCard;