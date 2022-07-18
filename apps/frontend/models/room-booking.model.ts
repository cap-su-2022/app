export interface RoomBooking {
  checkinDate: string;
  checkoutSlot: string | number | readonly string[];
  checkinSlot: string | number | readonly string[];
  stt: number;
  id: string;
  roomid: string;
  roomName: string
  timeCheckin: string;
  timeCheckout: string;
  requestedBy: string;
  requestedAt: string;
  status: string;
  bookedAt: string;
  checkInAt: string;
  checkOutAt: string;
  updatedAt: string;
  updatedBy: string;
  cancelledBy: string;
  reason: string;
  description: string;
}

