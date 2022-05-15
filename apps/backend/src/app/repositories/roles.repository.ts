import {EntityRepository, Repository} from "typeorm";
import {Roles} from "../models/roles.entity";

@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles> {

}
