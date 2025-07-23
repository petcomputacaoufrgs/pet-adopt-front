export interface OngInfoCardProps {
  showApproveButtons?: boolean;
  showEditOptions?: boolean;

  onApproveClick?: () => void;
  onRejectClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;

  selected?: boolean;
}
