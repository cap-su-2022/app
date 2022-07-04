import { PaginationParams } from '../../controllers/pagination.model';

export interface GetBookingRoomsPaginationPayload extends PaginationParams {
  reasonType: string;
  checkInAt: string;
  checkOutAt: string;
  status: string;
}
