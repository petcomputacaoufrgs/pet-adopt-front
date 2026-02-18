import type { NGO } from "../../types/ngos";

export interface OngInfoCardProps {
  ngo: NGO;
  showApproveButtons?: boolean;
  showDeleteOptions?: boolean;

  onApproveClick?: (ngo: NGO) => void;
  onRejectClick?: (ngo: NGO) => void;
  onDeleteClick?: (ngo: NGO) => void;

  selected?: boolean;
}
