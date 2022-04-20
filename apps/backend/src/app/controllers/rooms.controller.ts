import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {RoomsService} from "../services/rooms.service";

import {AddRoomRequest, UpdateRoomRequest} from "@app/models";

@Controller("/v1/rooms")
export class RoomsController {
  constructor(private readonly service: RoomsService) {
  }

  @Post()
  addRoom(@Body() room: AddRoomRequest) {
    return this.service.add(room);
  }

  @Get()
  getRooms() {
    return this.service.getAll();
  }

  @Put(":id")
  updateRoomById(@Param() id: string, @Body() body: UpdateRoomRequest) {
    return this.service.updateById(id, body);
  }

  @Delete(":id")
  deleteRoomById(@Param() id: string) {
    return this.service.deleteById(id);
  }
}
