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
  UsePipes,
} from '@nestjs/common';
import {AccountsService} from '../services/accounts.service';
import {ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {AuthGuard} from '../guards/auth.guard';
import {UsersValidation} from '../pipes/validation/users.validation';
import {UsersRequestPayload} from '../payload/request/users.payload';
import {AccountsResponsePayload} from '../payload/response/accounts.payload';
import {AddDeviceRequest, UpdateDeviceRequest} from '@app/models';

@Controller('v1/accounts')
@ApiBearerAuth()
export class AccountsController {
  constructor(private readonly service: AccountsService) {
  }

  @Post()
  @UsePipes(new UsersValidation())
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getAll(
    @Body() payload: UsersRequestPayload
  ): Promise<AccountsResponsePayload> {
    return this.service.getAllByPagination(payload);
  }

  @ApiOperation({
    description: 'Sync users from Keycloak to current DB',
  })
  @Get('syncKeycloak')
  syncUsersFromKeycloak() {
    return this.service.syncUsersFromKeycloak();
  }

  @ApiOperation({
    description: 'Get all users',
  })
  @ApiOperation({
    description: 'Create new library room with the provided payload',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created a new user',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for user is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Invalid role',
  })
  @Post('add')
  @HttpCode(HttpStatus.OK)
  addRoom(@Body() room: AddDeviceRequest) {
    return this.service.add(room);
  }

  @Get('find/:id')
  getDevicesById(@Param() id: string) {
    return this.service.getById(id);
  }

  @Get('disabled')
  @UseGuards(AuthGuard)
  getDisableRooms() {
    return this.service.getDisabledAccounts();
  }

  @Get('deleted')
  @UseGuards(AuthGuard)
  getDeletedRooms() {
    return this.service.getDeletedAccounts();
  }

  @Put('restore-deleted/:id')
  @UseGuards(AuthGuard)
  restoreDeletedRoomById(@Param() payload: { id: string }) {
    return this.service.handleRestoreAccountById(payload.id);
  }

  @Put('restore-disabled/:id')
  @UseGuards(AuthGuard)
  restoreDisabledRoomById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDisabledAccountById(payload.id);
  }

  @Put('update/:id')
  updateRoomById(@Param() id: string, @Body() body: UpdateDeviceRequest) {
    return this.service.updateById(body, id);
  }

  @Put('disable/:id')
  disableRoomById(@Param() payload: { id: string }) {
    return this.service.disableById(payload.id);
  }

  @Delete(':id')
  deleteRoomById(@Param() payload: { id: string }) {
    return this.service.deleteById(payload.id);
  }
}
