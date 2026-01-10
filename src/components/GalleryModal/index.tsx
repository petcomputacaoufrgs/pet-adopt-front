import React, { useEffect, useCallback } from 'react';
import { GalleryModalProps } from './types.d';
import { GalleryContainer, NavigatorContainer, ModalWrapper, Backdrop, TopBar, Image, BottomBar, CloseButtonStyled, NavigatorButton } from './styles';
import CarouselIndicator from '../CarouseIndicator';
import { ReactComponent as Close } from '../../assets/close.svg';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryModal: React.FC<GalleryModalProps> = ({
    isOpen,
    image,
    onClose,
    totalItems,
    activeIndex,
    onIndicatorClick,
}) => {

    // Funções de navegação
    const incIndex = useCallback(() => {
        if (activeIndex < totalItems - 1) {
            onIndicatorClick?.(activeIndex + 1);
        } else {
            onIndicatorClick?.(0);
        }
    }, [activeIndex, totalItems, onIndicatorClick]);

    const decIndex = useCallback(() => {
        if (activeIndex > 0) {
            onIndicatorClick?.(activeIndex - 1);
        } else {
            onIndicatorClick?.(totalItems - 1);
        }
    }, [activeIndex, totalItems, onIndicatorClick]);


    // Hook para capturar eventos do teclado
    useEffect(() => {
        // Se o modal não estiver aberto, não adiciona o listener
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                    incIndex();
                    break;
                case 'ArrowLeft':
                    decIndex();
                    break;
                case 'Escape':
                    onClose(); // Fecha o modal ao apertar Esc
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, incIndex, decIndex, onClose]);

    // 3. Verificação de renderização (movida para baixo dos hooks)
    if (!isOpen) return null;

    return (
        <>
            <Backdrop onClick={onClose} />
            <ModalWrapper>
                <GalleryContainer>
                    <TopBar>
                        <CloseButtonStyled
                            themeMode="light"
                            disabled={false}
                            onClick={onClose}
                            aria-label="Fechar"
                        >
                            <Close width="100%" height="100%" />
                        </CloseButtonStyled>
                    </TopBar>

                    <NavigatorContainer>
                        <NavigatorButton onClick={decIndex}>
                            <ChevronLeft color="#553525" width="100%" height="100%" />
                        </NavigatorButton>

                        <Image src={image} />

                        <NavigatorButton onClick={incIndex}>
                            <ChevronRight color="#553525" width="100%" height="100%" />
                        </NavigatorButton>
                    </NavigatorContainer>

                    <BottomBar>
                        <CarouselIndicator
                            totalItems={totalItems}
                            activeIndex={activeIndex}
                            onIndicatorClick={onIndicatorClick}
                        />
                    </BottomBar>

                </GalleryContainer>
            </ModalWrapper>
        </>
    );
};

export default GalleryModal;