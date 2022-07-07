import {Injectable} from "@nestjs/common";
import { DeviceHistRepository } from "../repositories";
import { Devices, DeviceHist } from "../models";

@Injectable()
export class DeviceHistService {
    constructor(private readonly repository: DeviceHistRepository) {}

  async createNew(device: Devices): Promise<DeviceHist> {
    return this.repository.createNew(device);
  }
}
