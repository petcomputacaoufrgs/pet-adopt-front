export interface MemberInfoCardProps {
  member?: User;
  showApproveButtons?: boolean;
  showEditOptions?: boolean;
  onApproveClick?: (ngo: NGO) => void;
  onRejectClick?: (ngo: NGO) => void;
  onEditClick?: (member: User) => void;
  onDeleteClick?: (member: User) => void;
  selected?: boolean;
}
