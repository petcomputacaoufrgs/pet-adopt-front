import type { Member } from "../../types/member";

export interface MemberInfoCardProps {
  member?: Member;
  showApproveButtons?: boolean;
  showEditOptions?: boolean;
  onApproveClick?: (member: Member) => void;
  onRejectClick?: (member: Member) => void;
  onEditClick?: (member: Member) => void;
  onDeleteClick?: (member: Member) => void;
  selected?: boolean;
}
