export interface NGO {
  _id: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  cnpj: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  state?: string;
}

export interface OngInfoCardProps {
  ngo: NGO;
  showApproveButtons?: boolean;
  showDeleteOptions?: boolean;

  onApproveClick?: (ngo: NGO) => void;
  onRejectClick?: (ngo: NGO) => void;
  onDeleteClick?: (ngo: NGO) => void;

  selected?: boolean;
}
