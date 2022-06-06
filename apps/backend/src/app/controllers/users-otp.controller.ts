import {Controller, Get, HttpStatus} from "@nestjs/common";
import {UsersOTPService} from "../services/users-otp.service";
import {UsersOTP} from "../models/users-otp.entity";
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('v1/users-otp')
@ApiBearerAuth()
export class UsersOTPController {

  constructor(private readonly service: UsersOTPService) {
  }
  @ApiOperation({
    description: 'UsersOTP',
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
  getAll(): Promise<UsersOTP[]> {
    return this.service.getAllByPagination();
  }
}
