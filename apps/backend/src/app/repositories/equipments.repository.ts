import {EntityRepository, Repository} from "typeorm";
import {Equipments} from "../models/equipments.entity";

@EntityRepository(Equipments)
export class EquipmentsRepository extends Repository<Equipments> {

}
