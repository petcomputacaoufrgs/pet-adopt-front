import { useNavigate, useParams } from "react-router-dom";
import { hints } from "../../data/hint";
import PrimarySecondaryButton from "../../components/PrimarySecondaryButton";
import {
  Container,
  Content,
  HeroImage,
  Title,
  Description,
  TextSection,
  BackButton,
} from "./styles";

const HintView = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const hint = hints.find((item) => item.id === id);

  const paragraphs = hint
    ? hint.content
        .trim()
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  return (
    <Container>
      <Content>
        <BackButton>
          <PrimarySecondaryButton
            buttonType="Secund�rio"
            content="Voltar"
            onClick={() => navigate(-1)}
            paddingH="22px"
            paddingV="12px"
          />
        </BackButton>

        {hint ? (
          <>
            <Title>{hint.title}</Title>
            <HeroImage src={hint.image} alt={hint.title} />
            <TextSection>
              {paragraphs.map((paragraph, index) => (
                <Description key={index}>{paragraph}</Description>
              ))}
            </TextSection>
          </>
        ) : (
          <>
            <Title>Dica n�o encontrada</Title>
            <Description>
              N�o conseguimos encontrar a dica selecionada. Volte e tente
              novamente.
            </Description>
          </>
        )}
      </Content>
    </Container>
  );
};

export default HintView;
