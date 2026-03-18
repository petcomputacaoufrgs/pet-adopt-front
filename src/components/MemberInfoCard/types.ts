import type { Member } from "../../types/member";

export interface MemberInfoCardProps {
  member?: Member;
  showApproveButtons?: boolean;
  showDeleteOptions?: boolean;
  onApproveClick?: (member: Member) => void;
  onRejectClick?: (member: Member) => void;
  onDeleteClick?: (member: Member) => void;
  selected?: boolean;
}
