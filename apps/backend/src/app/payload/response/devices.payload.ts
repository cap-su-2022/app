import {PaginationPayload} from "./pagination.payload";
import {Rooms} from "../../models/rooms.entity";
import {Devices} from "../../models/devices";

export interface DevicesResponsePayload extends PaginationPayload<Devices> {
  data: Devices[];
}
