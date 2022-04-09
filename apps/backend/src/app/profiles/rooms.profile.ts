import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {Rooms} from "../models/rooms.entity";
import {RoomsDTO} from "../dto/room.dto";
import {UpdateRoomRequest} from "../dto/request/update-room-request.dto";
import {AddRoomRequest} from "../dto/request/add-room-request.dto";

@Injectable()
export class RoomsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper) => {
      createMap(mapper, Rooms, RoomsDTO);
      createMap(mapper, Rooms, UpdateRoomRequest);
      createMap(mapper, Rooms, AddRoomRequest);
    }
  }
}
