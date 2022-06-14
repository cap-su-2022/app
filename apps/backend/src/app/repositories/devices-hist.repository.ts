import { Repository } from "typeorm";
import { DevicesHist } from "../models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";

@CustomRepository(DevicesHist)
export class DevicesHistRepository extends Repository<DevicesHist> {

}
