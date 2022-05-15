import {EntityRepository, Repository} from "typeorm";
import {UsersOTP} from "../models/users-otp.entity";

@EntityRepository(UsersOTP)
export class UsersOTPRepository extends Repository<UsersOTP> {

}
