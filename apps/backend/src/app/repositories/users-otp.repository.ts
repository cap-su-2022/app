import { Repository } from "typeorm";
import { UsersOTP } from "../models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";

@CustomRepository(UsersOTP)
export class UsersOTPRepository extends Repository<UsersOTP> {

}
