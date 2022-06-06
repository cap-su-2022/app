import { EntityRepository, Repository } from "typeorm";
import { BookingRequest } from "../models/booking-request.entity";
import { WishlistBookingRoomResponseDTO } from "../dto/wishlist-booking-room.response.dto";

@EntityRepository(BookingRequest)
export class BookingRoomRepository extends Repository<BookingRequest>{

}
