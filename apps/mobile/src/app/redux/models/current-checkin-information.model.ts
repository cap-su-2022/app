export interface CurrentCheckinInformation {
  id: string;
  description: string;
  username: string;
  bookingReason: string;
  roomId: string;
  roomName: string;
  requestedBy: string;
  requestedAt: string;
  checkinSlot: number;
  checkoutSlot: number;
  acceptedAt: string;
  checkinDate: string;
}
