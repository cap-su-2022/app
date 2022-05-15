import {EntityRepository, Repository} from "typeorm";
import {UsersWarningFlagHistory} from "../models/users-warning-flag.hist.entity";

@EntityRepository(UsersWarningFlagHistory)
export class UsersWarningFlagHistoryRepository extends Repository<UsersWarningFlagHistory> {

}
