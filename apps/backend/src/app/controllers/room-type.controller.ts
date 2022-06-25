import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RoomTypeService } from "../services/room-type.service";
import { RoomTypeUpdateRequestPayload } from "../payload/request/room-type-update.request.payload";
import { RoomType } from "../enum/room-type.enum";
import { RoomTypeAddRequestPayload } from "../payload/request/room-type-add.request.payload";
import { User } from "../decorators/keycloak-user.decorator";
import { KeycloakUserInstance } from "../dto/keycloak.user";

@Controller('room-type')
@ApiBearerAuth()
@ApiTags("Room Type")
export class RoomTypeController {

  constructor(private readonly service: RoomTypeService) {
  }

  @Get()
  getRoomTypes(
    @Query('limit') limit: number,
    @Query('dir') dir: string,
    @Query('page') page: number,
    @Query('sort') sort: string,
    @Query('search') search: string,
  ) {
    return this.service.getRoomTypesWithPagination({
      limit, dir, sort, search, page
    });
  }

  @Get(':id')
  getRoomTypeById(@Param('id') payload: {id: string}) {
    return this.service.getRoomTypeById(payload.id);
  }

  @Put(':id')
  updateRoomTypeById(@Body() updatePayload: RoomTypeUpdateRequestPayload,
                     @Param('id') payload: {id: string}) {
    return this.service.updateRoomTypeById(updatePayload, payload.id);
  }

  @Put('disable/:id')
  disableRoomTypeById(@Param('id') payload: {id: string}) {
    return this.service.disableRoomTypeById(payload.id);
  }

  @Get('disabled')
  getDisabledRoomTypes(
    @Query('search') search: string
  ) {
    return this.service.getDisabledRoomTypes(search);
  }

  @Get('deleted')
  getDeletedRoomTypes(
    @Query('search') search: string
  ) {
    return this.service.getDeletedRoomTypes(search);
  }

  @Put('restore-disabled/:id')
  restoreDisabledRoomTypeById(@Param('id') payload: { id: string }) {
    return this.service.restoreDisabledRoomTypeById(payload.id);
  }

  @Put('restore-deleted/:id')
  restoreDeletedRoomTypeById(@Param('id') payload: { id: string }) {
    return this.service.restoreDeletedRoomTypeById(payload.id);
  }

  @Delete(':id')
  deleteRoomTypeById(@Param('id') payload: {id: string}) {
    return this.service.deleteRoomTypeById(payload.id);
  }

  @Post()
  addRoomType(@User() keycloakUser: KeycloakUserInstance,
              @Body() addRoomType: RoomTypeAddRequestPayload) {
    return this.service.addRoomType(keycloakUser.account_id, addRoomType);
  }
}
