import { Controller, Get, HttpStatus, UseGuards } from "@nestjs/common";
import { UsersOTPService } from "../services/users-otp.service";
import { UsersOTP } from "../models/users-otp.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";

@Controller("v1/users-otp")
@ApiBearerAuth()
@ApiTags("Users OTP")
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
  @UseGuards(AuthGuard)
  getAll(): Promise<UsersOTP[]> {
    return this.service.getAllByPagination();
  }
}
