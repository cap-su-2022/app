import {Rooms} from "../../models";
import {PaginationPayload} from "./pagination.payload";

export interface RoomsResponsePayload extends PaginationPayload<Rooms> {
  data: Rooms[];
}
