import { Repository } from "typeorm";
import { Devices, DeviceHist } from "../models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";

@CustomRepository(DeviceHist)
export class DeviceHistRepository extends Repository<DeviceHist> {
  async createNew(payload: Devices): Promise<DeviceHist> {
    const deviceId = payload.id;
    delete payload.id
    return this.save({
      deviceId: deviceId,
      ...payload,
    });
  }
}
