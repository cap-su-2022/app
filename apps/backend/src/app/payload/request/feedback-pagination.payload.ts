import { PaginationParams } from '../../controllers/pagination.model';

export interface FeedbackPaginationPayload extends PaginationParams {
  status: string;
  type: string;
  fromDate: string;
  toDate: string;
}
