import { Repository } from "typeorm";
import { UsersWarningFlag } from "../models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";

@CustomRepository(UsersWarningFlag)
export class UsersWarningFlagRepository extends Repository<UsersWarningFlag> {

}
