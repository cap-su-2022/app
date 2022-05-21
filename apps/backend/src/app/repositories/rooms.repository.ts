import {EntityRepository, Like, Repository, Equal,} from "typeorm";
import {RepositoryPaginationPayload} from "../models/search-pagination.payload";
import {Rooms} from "../models/rooms.entity";


@EntityRepository(Rooms)
export class RoomsRepository extends Repository<Rooms> {

  getSize(): Promise<number> {
    return this.createQueryBuilder(`rooms`)
      .select(`COUNT(id)`)
      .where(`rooms.is_disabled = 0`)
      .andWhere(`rooms.is_deleted = 0`)
      .getRawOne<number>();
  }

  findDisabledRooms(): Promise<Rooms[]> {
    return this.createQueryBuilder(`rooms`)
      .where(`rooms.is_disabled = 1`)
      .andWhere(`rooms.is_deleted = 0`)
      .getMany();
  }

  searchRoom(payload: RepositoryPaginationPayload): Promise<Rooms[]> {
    const qb = this.createQueryBuilder(`rooms`);
   // qb.where(`rooms.name LIKE :name`, {name: `%${payload.search}%`});
  //  qb.orWhere(`rooms.description LIKE :description`, {description: `%${payload.search}%`})
    qb.where(`rooms.is_disabled = 0`);
    qb.andWhere(`rooms.is_deleted = 0`);
    qb.orWhere(`rooms.id = :id`, {id: `%${payload.search}%`})
        .orWhere(`rooms.name = :name`, {name: `%${payload.search}%`})
        .orWhere(`rooms.description = :description`, {description: `%${payload.search}%`});
    qb.skip(payload.offset);
    qb.take(payload.limit);
    qb.addOrderBy('id', payload.direction === 'ASC' ? 'ASC' : 'DESC');
    return qb.getMany();
  }

  async disableById(id: string) {
    return this.manager.transaction(async (em) => {
       await em.queryRunner.query(`UPDATE rooms r SET r.is_disabled = 1 WHERE r.id = ?`, [id]);
    });
  }
}
