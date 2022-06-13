import { Repository } from "typeorm";
import { UsersWarningFlagHistory } from "../models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";

@CustomRepository(UsersWarningFlagHistory)
export class UsersWarningFlagHistoryRepository extends Repository<UsersWarningFlagHistory> {

}
