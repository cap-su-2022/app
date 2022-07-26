export interface Feedback {
  id?: string;
  feedbackMess?: string;
  status?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdBy: string;
  createdAt: string;
  deletedAt: string;
  deletedBy: string;
  resolvedMess: string;
  rejectedBy: string;
  rejectedAt: string;
}
