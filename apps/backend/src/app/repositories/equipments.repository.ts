import {EntityRepository, Repository} from "typeorm";
import {Equipments} from "../models/equipments.entity";
import { RepositoryPaginationPayload } from "../models/search-pagination.payload";

@EntityRepository(Equipments)
export class EquipmentsRepository extends Repository<Equipments> {
    async getSize(): Promise<number> {
        const result = await this.createQueryBuilder(`equipments`)
          .select(`COUNT(id) as size`)
          .where(`equipments.is_disabled = 0`)
          .andWhere(`equipments.is_deleted = 0`)
          .getRawOne<{
          size: number
          }>();
        return result.size;
      }


      searchDevices(payload: RepositoryPaginationPayload): Promise<Equipments[]> {
        const qb = this.createQueryBuilder(`equipments`);
       // qb.where(`rooms.name LIKE :name`, {name: `%${payload.search}%`});
      //  qb.orWhere(`rooms.description LIKE :description`, {description: `%${payload.search}%`})
        qb.where(`equipments.is_disabled = 0`);
        qb.andWhere(`equipments.is_deleted = 0`);
        qb.orWhere(`equipments.id = :id`, {id: `%${payload.search}%`})
            .orWhere(`equipments.name = :name`, {name: `%${payload.search}%`})
            .orWhere(`equipments.description = :description`, {description: `%${payload.search}%`});
        qb.skip(payload.offset);
        qb.take(payload.limit);
        qb.addOrderBy('id', payload.direction === 'ASC' ? 'ASC' : 'DESC');
        return qb.getMany();
      }
    
}
