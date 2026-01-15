import { X } from "lucide-react";
import { useEffect, useMemo, memo } from "react";
import { CoverBadge, DeleteButton, ImageSlotContainer } from "./styles";
import imagePlus from "../../assets/ImagePlus.svg";

type ImageSlotProps = {
  source: File | string | null; 
  onClick: () => void;
  onRemove: () => void;
  isCover: boolean;
};

const ImageSlot = memo(({ source, onClick, onRemove, isCover }: ImageSlotProps) => {

  // O previewUrl só muda se o objeto 'source' mudar, evitando reenderizações desnecessárias
  const previewUrl = useMemo(() => {
    if (!source) return null;

    if (typeof source === 'string') {
      if (source.startsWith('http://') || source.startsWith('https://')) {
        return source;
      } else {
        const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
        return `${baseURL}${source.startsWith('/') ? '' : '/'}${source}`;
      }
    } else {
      return URL.createObjectURL(source);
    }
  }, [source]);

  // Boa prática: Limpar a URL da memória quando o componente desmontar
  useEffect(() => {
    return () => {
      if (previewUrl && typeof source !== 'string') {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, source]);

  return (
    <ImageSlotContainer 
      onClick={previewUrl ? () => {} : onClick}
      $image={previewUrl}
      $isCover={isCover} 
    >
      {previewUrl ? (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>

          {isCover && <CoverBadge>CAPA</CoverBadge>}

          
          <DeleteButton
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X strokeWidth={3} size={14} color="#FFF6E8" />
          </DeleteButton>
        </div>
      ) : (
        <img src={imagePlus} alt="Adicionar imagem" />
      )}
    </ImageSlotContainer>
  );
});

export default ImageSlot;