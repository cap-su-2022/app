import {EntityRepository, Repository} from "typeorm";
import {EquipmentsHistory, UsersWarningFlagHistory} from "../models";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";

@EntityRepository(UsersWarningFlagHistory)
export class UsersWarningFlagHistoryRepository extends Repository<UsersWarningFlagHistory> {

}
