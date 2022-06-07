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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes
} from "@nestjs/common";
import { AccountsService } from "../services/accounts.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";
import { UsersValidation } from "../pipes/validation/users.validation";
import { UsersRequestPayload } from "../payload/request/users.payload";
import { AccountsResponsePayload } from "../payload/response/accounts.payload";
import { AddDeviceRequest, UpdateDeviceRequest } from "@app/models";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { Multer } from "multer";
import { User } from "../decorators/keycloak-user.decorator";
import { KeycloakUserInfoDTO } from "../dto/keycloak-user-info.dto";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";

type File = Express.Multer.File;


@Controller("v1/accounts")
@ApiBearerAuth()
@ApiTags("Accounts")
@UseInterceptors(new PathLoggerInterceptor(AccountsController.name))
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
    description: "Access token is invalidated"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Invalid role"
  })
  @Post("add")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  createNewUser(@Body() room: AddDeviceRequest) {
    return this.service.add(room);
  }

  @Get("find/:id")
  @UseGuards(AuthGuard)
  getAccountById(@Param() payload: { id: string }) {
    return this.service.getById(payload.id);
  }

  @Get("find-by-keycloak-id/:id")
  @UseGuards(AuthGuard)
  getAccountByKeycloakId(@Param() payload: { id: string }) {
    return this.service.getAccountByKeycloakId(payload.id);
  }

  @Get("disabled")
  @UseGuards(AuthGuard)
  getDisabledAccounts() {
    return this.service.getDisabledAccounts();
  }

  @Get("deleted")
  @UseGuards(AuthGuard)
  getDeletedAccounts() {
    return this.service.getDeletedAccounts();
  }

  @Put("restore-deleted/:id")
  @UseGuards(AuthGuard)
  restoreDeletedUserById(@Param() payload: { id: string }) {
    return this.service.handleRestoreAccountById(payload.id);
  }

  @Put("restore-disabled/:id")
  @UseGuards(AuthGuard)
  restoreDisabledAccountById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDisabledAccountById(payload.id);
  }

  @Put("update/id/:id")
  @UseGuards(AuthGuard)
  updateAccountById(@Param() id: string, @Body() body: {
    phone: string;
    fullname: string;
    description: string;
  }) {
    return this.service.updateById(body, id);
  }

  @Put("update-profile")
  @UseGuards(AuthGuard)
  updateMyProfile(@User() user: KeycloakUserInfoDTO, @Body() payload: {
    fullname: string,
    phone: string,
    description: string
  }) {
    return this.service.updateMyProfile(user, payload);
  }

  @Put("disable/:id")
  @UseGuards(AuthGuard)
  disableAccountById(@Param() payload: { id: string }) {
    return this.service.disableById(payload.id);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteAccountById(@Param() payload: { id: string }) {
    return this.service.deleteById(payload.id);
  }

  @Put("update/upload-avatar/:id")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  updateAccountUploadAvatarById(@UploadedFile() image: File, @Param() payload: { id: string }) {
    return this.service.uploadAvatarByAccountId(image, payload.id);
  }

  @Put("update/change-password")
  @UseGuards(AuthGuard)
  changePassword(@User() keycloakUser: KeycloakUserInfoDTO, @Body() payload: { password: string }) {
    return this.service.changePassword(keycloakUser, payload.password);
  }

  @Put("update/change-password/:id")
  @UseGuards(AuthGuard)
  changePasswordByKeycloakId(@Param() payload: { id: string }, @Body() requestPayload: { password: string }) {
    return this.service.changePasswordByKeycloakId(payload.id, requestPayload.password);
  }
}
