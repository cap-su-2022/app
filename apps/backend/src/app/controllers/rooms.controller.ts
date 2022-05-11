import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UsePipes} from "@nestjs/common";
import {RoomsService} from "../services/rooms.service";
import {Rooms} from '../models';

import {AddRoomRequest, UpdateRoomRequest} from "@app/models";
import {RoomsRequestPayload} from "../payload/request/rooms.payload";
import {RoomsResponsePayload} from "../payload/response/rooms.payload";
import {RoomsValidation} from "../pipes/validation/rooms.validation";

@Controller("/v1/rooms")
export class RoomsController {
  constructor(private readonly service: RoomsService) {
  }

  //@Post()
  addRoom(@Body() room: AddRoomRequest) {
    return this.service.add(room);
  }

  @Post()
  @UsePipes(new RoomsValidation())
  getRooms(@Body() request: RoomsRequestPayload): Promise<RoomsResponsePayload> {
    return this.service.getAll(request);
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
