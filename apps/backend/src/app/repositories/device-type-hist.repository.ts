import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { DeviceType, DeviceTypeHist } from '../models';

@CustomRepository(DeviceTypeHist)
export class DeviceTypeHistRepository extends Repository<any> {
  async createNew(payload: DeviceType): Promise<DeviceTypeHist> {
    const type = payload.id;
    delete payload.id;
    return this.save({
      type: type,
      ...payload,
    });
  }

  async deleteAllHist(id: string) {
    return await this.createQueryBuilder('device_type_hist')
      .delete()
      .where('device_type_hist.type = :id', { id: id })
      .useTransaction(true)
      .execute();
  }
}
