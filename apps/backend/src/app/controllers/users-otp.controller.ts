import {Controller, Get} from "@nestjs/common";
import {UsersWarningFlagHistoryService} from "../services/users-warning-flag-hist.service";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";
import {UsersOTPService} from "../services/users-otp.service";
import {UsersOTP} from "../models";

@Controller('v1/users-otp')
export class UsersOTPController {

  constructor(private readonly service: UsersOTPService) {
  }

  @Get()
  getAll(): Promise<UsersOTP[]> {
    return this.service.getAllByPagination();
  }
}
