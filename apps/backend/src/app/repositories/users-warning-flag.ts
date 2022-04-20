import {EntityRepository, Repository} from "typeorm";
import {EquipmentsHistory} from "../models";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";

@EntityRepository(UsersWarningFlag)
export class UsersWarningFlagRepository extends Repository<UsersWarningFlag> {

}
