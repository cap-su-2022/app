import {EntityRepository, Repository} from "typeorm";
import {EquipmentsHistory} from "../models";

@EntityRepository(EquipmentsHistory)
export class EquipmentsHistoryRepository extends Repository<EquipmentsHistory> {

}
