import {PaginationPayload} from "./pagination.payload";
import {Rooms} from "../../models/rooms.entity";
import {Equipments} from "../../models/equipments.entity";

export interface DevicesResponsePayload extends PaginationPayload<Rooms> {
  data: Equipments[];
}
