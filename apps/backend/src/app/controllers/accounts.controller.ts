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
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AccountsService } from '../services';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UsersValidation } from '../pipes/validation/users.validation';
import { UsersRequestPayload } from '../payload/request/users.payload';
import { AccountsResponsePayload } from '../payload/response/accounts.payload';
import { User } from '../decorators/keycloak-user.decorator';
import { PathLoggerInterceptor } from '../interceptors/path-logger.interceptor';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import { Accounts } from '../models';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { FastifyFileInterceptor } from '../interceptors/fastify-file.interceptor';
import { ChangeProfilePasswordRequest } from '../payload/request/change-password.request.payload';
import { diskStorage } from 'multer';
import { imageFileFilter } from '../validators/utils/file-upload.util';
import { AccountsPaginationParams } from './accounts-pagination.model';
import { AccountAddRequestPayload } from '../payload/request/account-add.request.payload';
import {
  AccountUpdateProfilePayload
} from '../payload/request/account-update-profile.request.payload';



@Controller('v1/accounts')
@ApiBearerAuth()
@ApiTags('Accounts')
@UseInterceptors(new PathLoggerInterceptor(AccountsController.name))
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Get()
  @UsePipes(new UsersValidation())
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Get the list of accounts',
    description:
      'Get the list of accounts with the provided pagination payload',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved the users list',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while getting users or request payload is invalid',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  getAll(@Query() payload: AccountsPaginationParams) {
    return this.service.getAll(payload);
  }

  @Get('syncKeycloak')
  @UsePipes(new UsersValidation())
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    description: 'Sync users from Keycloak to current DB',
  })
  syncUsersFromKeycloak() {
    return this.service.syncUsersFromKeycloak();
  }

  @Get('find/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieve account information by id',
    description: 'Get account information by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved the account information',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving account information by id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getAccountById(@Param() payload: { id: string }) {
    return this.service.getById(payload.id);
  }

  @Post('add')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Create a new account',
    description: 'Create a new account with the provided payload',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created a new device',
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
    description: 'Insufficient privileges',
  })
  //   @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Successfully created a new user',
  //   type: Accounts,
  //   schema: {
  //     allOf: [
  //       {
  //         $ref: getSchemaPath(Accounts),
  //       },
  //       {
  //         properties: {
  //           results: {
  //             type: 'object',
  //             items: { $ref: getSchemaPath(Accounts) },
  //           },
  //         },
  //       },
  //     ],
  //   },
  // })
  createNewUser(
    @User() user: KeycloakUserInstance,
    @Body() account: AccountAddRequestPayload
  ): Promise<Accounts> {
    return this.service.add(account, user.account_id);
  }

  @Get('my-profile')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @ApiOperation({
    summary: 'Retrieve current profile information',
    description: 'Get profile information',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved the profile information',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving profile information',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  getCurrentProfileInformation(
    @User() user: KeycloakUserInstance
  ): Promise<Accounts> {
    return this.service.getCurrentProfileInformation(user.sub);
  }

  @Get('find-by-keycloak-id/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Get account information by keycloak id',
    description: 'Get account information by keycloak id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieve account information',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving account information by keycloak id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  getAccountByKeycloakId(@Param() payload: { id: string }) {
    return this.service.getAccountByKeycloakId(payload.id);
  }

  @Get('by-role')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more payload parameters are invalid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched accounts',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getAccountsByRoleId(@Query('role') roleId = ''): Promise<Accounts[]> {
    return this.service.getAccountsByRoleId(roleId);
  }

  @Put('disable/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Disable account by id',
    description: 'Disable account by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully disabled the account',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while disabling the account',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  disableAccountById(
    @User() user: KeycloakUserInstance,
    @Param('id') id: string
  ) {
    return this.service.disableById(user.account_id, id);
  }

  @Get('disabled')
  @ApiOperation({
    summary: 'Get a list of disabled accounts',
    description: 'Get a list of disabled accounts',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getDisabledAccounts(@Query('search') search = '') {
    return this.service.getDisabledAccounts(search);
  }

  @Put('restore-disabled/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Restore the disabled account by id',
    description: 'Restore the disabled account by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully restored the disabled account',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while restoring the disabled the account',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  restoreDisabledAccountById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string }
  ) {
    return this.service.handleRestoreDisabledAccountById(
      user.account_id,
      payload.id
    );
  }

  @Get('deleted')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  getDeletedAccounts(@Query('search') search = '') {
    return this.service.getDeletedAccounts(search);
  }

  @Put('restore-deleted/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  restoreDeletedUserById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string }
  ) {
    return this.service.handleRestoreDeletedAccountById(
      user.account_id,
      payload.id
    );
  }

  @Put('update/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  updateAccountById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string },
    @Body() body: AccountAddRequestPayload
  ) {
    return this.service.updateById(user.account_id, payload.id, body);
  }

  @Put('update-profile')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  updateMyProfile(
    @User() user: KeycloakUserInstance,
    @Body() body: AccountUpdateProfilePayload
  ) {
    return this.service.updateMyProfile(user, body);
  }

  @Delete(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  deleteAccountById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string }
  ) {
    return this.service.deleteById(user.account_id, payload.id);
  }

  @Put('update/upload-avatar/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FastifyFileInterceptor)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Update account avatar by account id',
    description: 'Update account avatar by account id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  updateAccountUploadAvatarById(
    @User() user: KeycloakUserInstance,
    @UploadedFile() image: Express.Multer.File,
    @Param() payload: { id: string }
  ) {
    return this.service.uploadAvatarByAccountId(image, payload.id);
  }

  @Put('update/upload-avatar/profile')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FastifyFileInterceptor('file', {}))
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Update account avatar by account id',
    description: 'Update account avatar by account id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  updateCurrentProfileAvatar(
    @User() user: KeycloakUserInstance,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.service.uploadAvatarByAccountId(image, user.account_id);
  }

  @Put('update/change-password')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @ApiOperation({
    summary: 'Change password by current profile',
    description: 'Change password by current profile',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  changePassword(
    @User() keycloakUser: KeycloakUserInstance,
    @Body() payload: ChangeProfilePasswordRequest
  ) {
    return this.service.changePassword(keycloakUser, payload);
  }

  @Put('update/change-password/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Change password by keycloak id',
    description: 'Change password by keycloak id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  changePasswordByKeycloakId(
    @Param() payload: { id: string },
    @Body() requestPayload: { password: string }
  ) {
    return this.service.changePasswordByKeycloakId(
      payload.id,
      requestPayload.password
    );
  }

  @Get('avatar')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @ApiOperation({
    summary: 'Get avatar URL by keycloak id',
    description: 'Get avatar URL by keycloak id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  getMyAvatarURL(@User() keycloakUser: KeycloakUserInstance) {
    return this.service.getAvatarURLByAccountId(keycloakUser.account_id);
  }
}
