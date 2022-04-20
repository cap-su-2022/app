import {EntityRepository, Repository} from "typeorm";
import {EquipmentsHistory, UsersOTP} from "../models";

@EntityRepository(UsersOTP)
export class UsersOTPRepository extends Repository<UsersOTP> {

}
