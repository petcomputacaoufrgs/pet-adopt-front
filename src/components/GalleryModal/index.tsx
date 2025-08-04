import React from 'react';
import {GalleryModalProps} from './types.d';
import { GalleryContainer, NavigatorContainer , ModalWrapper, Backdrop, TopBar, Image, BottomBar, CloseButtonStyled, NavigatorButton} from './styles';
import CarouselIndicator from '../CarouseIndicator';
import { ReactComponent as Close } from '../../assets/close.svg';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';


const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  image,
  onClose,
  totalItems,
  activeIndex,
  onIndicatorClick,
}) => {

    if (!isOpen) return null;

    const incIndex = () => {
    if (activeIndex < totalItems - 1) {
        onIndicatorClick?.(activeIndex + 1);
    } else {
        onIndicatorClick?.(0); // Volta para o início se estiver no último
    }
    };

    const decIndex = () => {
    if (activeIndex > 0) {
        onIndicatorClick?.(activeIndex - 1);
    } else {
        onIndicatorClick?.(totalItems - 1); // Vai para o último se estiver no primeiro
    }
    };

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
                                <Close width="100%" height="100%"/>
                        </CloseButtonStyled>                
                </TopBar>

                    <NavigatorContainer>
                        <NavigatorButton onClick={decIndex}>
                            <ChevronLeft color="#553525" width="100%" height="100%"/>
                        </NavigatorButton>

                        <Image src={image}/>

                        <NavigatorButton onClick={incIndex}>
                            <ChevronRight color="#553525" width="100%" height="100%"/>
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