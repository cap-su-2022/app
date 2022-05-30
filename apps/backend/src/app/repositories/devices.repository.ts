import {EntityRepository, Repository} from "typeorm";
import {Devices} from "../models/devices";
import { RepositoryPaginationPayload } from "../models/search-pagination.payload";

@EntityRepository(Devices)
export class DevicesRepository extends Repository<Devices> {
    async getSize(): Promise<number> {
        const result = await this.createQueryBuilder(`devices`)
          .select(`COUNT(id) as size`)
          .where(`devices.is_disabled = false`)
          .andWhere(`devices.is_deleted = false`)
          .getRawOne<{
          size: number
          }>();
        return result.size;
      }


      searchDevices(payload: RepositoryPaginationPayload): Promise<Devices[]> {
       return this.createQueryBuilder(`devices`)
       // qb.where(`rooms.name LIKE :name`, {name: `%${payload.search}%`});
      //  qb.orWhere(`rooms.description LIKE :description`, {description: `%${payload.search}%`})
        .where(`devices.is_disabled = false`)
        .andWhere(`devices.is_deleted = false`)
            .orWhere(`devices.name = :name`, {name: `%${payload.search}%`})
            .orWhere(`devices.description = :description`, {description: `%${payload.search}%`})
        .skip(payload.offset)
        .take(payload.limit)
        .addOrderBy('id', payload.direction === 'ASC' ? 'ASC' : 'DESC')
       .getMany();
      }

}
