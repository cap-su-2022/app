import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes
} from "@nestjs/common";
import {RoomsService} from "../services/rooms.service";

import {AddRoomRequest, UpdateRoomRequest} from "@app/models";
import {RoomsRequestPayload} from "../payload/request/rooms.payload";
import {RoomsResponsePayload} from "../payload/response/rooms.payload";
import {RoomsValidation} from "../pipes/validation/rooms.validation";
import {AuthGuard} from "../guards/auth.guard";
import {Rooms} from "../models/rooms.entity";

@Controller("/v1/rooms")
export class RoomsController {
  constructor(private readonly service: RoomsService) {
  }

  //@Post()
  addRoom(@Body() room: AddRoomRequest) {
    return this.service.add(room);
  }

  @Get(":id")
  getRoomById(@Param() id: string): Promise<Rooms> {
    return this.service.findById(id);
  }

  @Post()
  @UsePipes(new RoomsValidation())
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
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
