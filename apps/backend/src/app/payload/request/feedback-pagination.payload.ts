import { PaginationParams } from '../../controllers/pagination.model';

export class FeedbackPaginationPayload extends PaginationParams {
  status: string;
  type: string;
  fromDate: string;
  toDate: string;
}
