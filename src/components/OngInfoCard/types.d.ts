export interface OngInfoCardProps {
  modo?: "edit" | "approve";
  estado?: "default" | "hover" | "selected";

  modalAction: 'aprovar' | 'recusar' | null;
  setModalAction: React.Dispatch<React.SetStateAction<'aprovar' | 'recusar' | null>>;
  handleConfirm: () => void;
}
