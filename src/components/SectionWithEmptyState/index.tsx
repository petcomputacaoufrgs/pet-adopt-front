import React from "react";
import styled from "styled-components";
import PrimarySecondaryButton from "../PrimarySecondaryButton";
import frustratedDog from "../../assets/frustrated_dog.png";

interface SectionWithEmptyStateProps {
  title: string;
  subtitle: string;
  emptyMessage: string;
  allowEdit?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  emptyState: boolean; // pode tipar melhor, ex: Pet[] ou NGO[]
}

const SectionWithEmptyState: React.FC<SectionWithEmptyStateProps> = ({
  title,
  subtitle,
  emptyMessage,
  buttonText,
  onButtonClick,
  emptyState
}) => {
  return (
    <>
      <Header>
        <HeaderText>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </HeaderText>

        { buttonText && onButtonClick && (
          <ButtonWrapper>
            <PrimarySecondaryButton
              content={buttonText}
              onClick={onButtonClick}
              height={"48px"}
              paddingH={"26px"}
            />
          </ButtonWrapper>
        )}
      </Header>

      {emptyState && 
        <EmptyState>
          <EmptyText>{emptyMessage}</EmptyText>
          <img src={frustratedDog} alt="Nada encontrado" />
        </EmptyState>
    
      }
    </>
  );
};


export default SectionWithEmptyState;
// ===== styled-components =====


const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h2`
  font-family: "Nunito Sans", sans-serif;
  font-size: 32px;
  color: #553525;
  margin: 0;
  font-weight: 800;
`;

const Subtitle = styled.p`
  font-family: "Nunito Sans", sans-serif;
  font-size: 18px;
  color: #553525;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyText = styled.p`
  font-family: "Nunito Sans", sans-serif;
  font-size: 48px;
  font-weight: 500;
  color: #553525;
  text-align: center;
`;

// ================================
