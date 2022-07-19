export interface BookingRoomsByFilters {
  roomName?: string;
  status?: string[];
  startDate?: string;
  endDate?: string;
  slotStart?: number;
  slotEnd?: number;
}
