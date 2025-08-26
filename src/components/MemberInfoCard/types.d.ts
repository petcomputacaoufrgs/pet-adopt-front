export interface MEMBER {
  id: string;
  name: string;
  email: string;
}

export interface MemberInfoCardProps {
  member?: MEMBER;
  onEditClick?: (member: MEMBER) => void;
  onDeleteClick?: (member: MEMBER) => void;
  selected?: boolean;
}
