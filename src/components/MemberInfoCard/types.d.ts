

export interface MemberInfoCardProps {
  member?: User;
  onEditClick?: (member: User) => void;
  onDeleteClick?: (member: User) => void;
  selected?: boolean;
}
