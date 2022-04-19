import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {Rooms} from "../models/rooms.entity";
import {RoomsDTO} from "@app/models";
import {UpdateRoomRequest} from "@app/models";
import {AddRoomRequest} from "@app/models";

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
