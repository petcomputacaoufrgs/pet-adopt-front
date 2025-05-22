import { StyledButton, StyledText } from "./styles";


function SelectorButton({ label, active, clicked, setActive, width, height, backgroundImage,  backgroundColor, overlayImage, overlayImageWidth = "0px", overlayImageHeight = "0px", overlayImageLeft="0px", overlayImageTop="0px" }: SelectorButtonProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
    <StyledButton $width={width} $height={height} $backgroundImage={backgroundImage} $backgroundColor={backgroundColor} $active={active} onClick={setActive}>
      {active && clicked && overlayImage && <img src={overlayImage} width={overlayImageWidth} height={overlayImageHeight} style={{position: "absolute", top: overlayImageTop, left: overlayImageLeft}} />}
    </StyledButton>
    <StyledText>{label}</StyledText>
    </div>
  );
}

export default SelectorButton;