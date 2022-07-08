import { UpdateAccountRequest } from './../../../../../libs/models/src/lib/request/update-account-request.dto';
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

class UploadProfileRequest {
  fullname: string;
  phone: string;
  description: string;
}

class CreateUserRequest {
  @ApiProperty({
    name: 'username',
    description: 'Username of the account is used for logging into the system',
    required: true,
    type: String,
    title: 'username',
    example: 'account01',
    minLength: 3,
    maxLength: 100,
  })
  username: string;

  @ApiProperty({
    name: 'fullname',
    description: 'Fullname of the account',
    minLength: 2,
    maxLength: 200,
    required: true,
    title: 'fullname',
    type: String,
    example: 'Adios',
  })
  fullname: string;

  @ApiProperty({
    name: 'phone',
    description: 'Phone number of the account',
    minLength: 10,
    maxLength: 10,
    required: true,
    type: String,
    title: 'phone',
    example: '0123456789',
  })
  phone: string;

  @ApiProperty({
    name: 'email',
    description: 'E-mail address of the account',
    minLength: 10,
    maxLength: 10,
    required: true,
    type: String,
    title: 'phone',
    example: 'account01@fpt.edu.vn',
  })
  email: string;

  @ApiProperty({
    name: 'phone',
    description: 'Phone number of the account',
    minLength: 10,
    maxLength: 10,
    required: true,
    type: String,
    title: 'phone',
    example: '0123456789',
  })
  description: string;

  @ApiProperty({
    name: 'role',
    description: 'Role of the account',
    required: true,
    type: String,
    title: 'role',
    example: Role.APP_STAFF,
    enum: Role,
    enumName: 'role',
  })
  role: string;

  @ApiProperty({
    name: 'avatar',
    description: 'Avatar of the account',
    required: true,
    type: String,
    title: 'avatar',
    example: 'http://google.com/',
    minLength: 1,
    maxLength: 256,
  })
  avatar: string;

  @ApiProperty({
    name: 'is_disabled',
    description: 'Disable status of the account',
    required: true,
    type: Boolean,
    title: 'is_disabled',
    example: false,
  })
  is_disabled: boolean;
}

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

  // @ApiOperation({
  //   summary: 'Create a new account',
  //   description: 'Create a new account with the provided payload',
  // })
  // @ApiResponse({
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
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   description: 'Request payload for user is not validated',
  // })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Access token is invalidated',
  // })
  // @ApiResponse({
  //   status: HttpStatus.FORBIDDEN,
  //   description: 'Invalid role',
  // })


  @Post('add')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  createNewUser(
    @User() user: KeycloakUserInstance,
    @Body() account: CreateUserRequest
  ): Promise<Accounts> {
    return this.service.add(account);
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
    description: 'Access token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges',
  })
  getAccountById(@Param() payload: { id: string }) {
    return this.service.getById(payload.id);
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
  getDisabledAccounts() {
    return this.service.getDisabledAccounts();
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
  restoreDisabledAccountById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDisabledAccountById(payload.id);
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
  getDeletedAccounts() {
    return this.service.getDeletedAccounts();
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
  restoreDeletedUserById(@Param() payload: { id: string }) {
    return this.service.handleRestoreAccountById(payload.id);
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
  updateRoomById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string },
    @Body() body: UpdateAccountRequest
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
    @Body() payload: UploadProfileRequest
  ) {
    return this.service.updateMyProfile(user, payload);
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
    return this.service.deleteById(payload.id);
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
