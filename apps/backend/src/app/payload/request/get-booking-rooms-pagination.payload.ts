export interface GetBookingRoomsPaginationPayload {
  roomName: string;
  limit: number;
  page: number;
  sort: string;
  reasonType: string;
  checkInAt: number;
  checkOutAt: number;
}
