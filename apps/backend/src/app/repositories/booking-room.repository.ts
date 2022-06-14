import { Repository } from "typeorm";
import { BookingRequest } from "../models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";

@CustomRepository(BookingRequest)
export class BookingRoomRepository extends Repository<BookingRequest> {

}
