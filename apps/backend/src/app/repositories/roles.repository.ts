import {EntityRepository, Repository} from "typeorm";
import {Roles} from "../models";

@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles> {

}
