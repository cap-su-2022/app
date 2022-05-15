import {PaginationPayload} from "./pagination.payload";
import {Rooms} from "../../models/rooms.entity";

export interface RoomsResponsePayload extends PaginationPayload<Rooms> {
  data: Rooms[];
}
