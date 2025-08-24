export interface MEMBER {
  id: string;
  name: string;
  email: string;
}

export interface MemberInfoCardProps {
  member?: MEMBER;
  onEditClick?: (ngo: NGO) => void;
  onDeleteClick?: (ngo: NGO) => void;
  selected?: boolean;
}
