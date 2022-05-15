import {EntityRepository, Repository} from "typeorm";
import {EquipmentsHistory} from "../models/equipments.hist.entity";

@EntityRepository(EquipmentsHistory)
export class EquipmentsHistoryRepository extends Repository<EquipmentsHistory> {

}
