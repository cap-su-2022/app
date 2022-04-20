import {EntityRepository, Repository} from "typeorm";
import {Equipments} from "../models";

@EntityRepository(Equipments)
export class EquipmentsRepository extends Repository<Equipments> {

}
