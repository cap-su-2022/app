import { Controller, Get, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersOTPService } from "../services/users-otp.service";
import { UsersOTP } from "../models/users-otp.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enum/roles.enum";

@Controller("v1/users-otp")
@ApiBearerAuth()
@ApiTags("Users OTP")
@UseInterceptors(new PathLoggerInterceptor(UsersOTPController.name))
export class UsersOTPController {

  constructor(private readonly service: UsersOTPService) {
  }

  @ApiOperation({
    description: "UsersOTP"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for UsersOTP is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Invalid role',
  })
  @Get()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getAll(): Promise<UsersOTP[]> {
    return this.service.getAllByPagination();
  }
}
