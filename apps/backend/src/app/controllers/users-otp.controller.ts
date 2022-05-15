import {Controller, Get} from "@nestjs/common";
import {UsersOTPService} from "../services/users-otp.service";
import {UsersOTP} from "../models/users-otp.entity";

@Controller('v1/users-otp')
export class UsersOTPController {

  constructor(private readonly service: UsersOTPService) {
  }

  @Get()
  getAll(): Promise<UsersOTP[]> {
    return this.service.getAllByPagination();
  }
}
