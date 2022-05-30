import {EntityRepository, Like, Repository, Equal, UpdateResult,} from "typeorm";
import {RepositoryPaginationPayload} from "../models/search-pagination.payload";
import {Rooms} from "../models/rooms.entity";


@EntityRepository(Rooms)
export class RoomsRepository extends Repository<Rooms> {

  async getSize(): Promise<number> {
    const result = await this.createQueryBuilder(`rooms`)
      .select(`COUNT(id) as size`)
      .where(`rooms.is_disabled = false`)
      .andWhere(`rooms.is_deleted = false`)
      .getRawOne<{
      size: number
      }>();
    return result.size;
  }

  findDisabledRooms() {
    return this.createQueryBuilder('rooms')
      .where('rooms.is_disabled = true')
      .getMany();
  }

  findDeletedRooms(): Promise<Rooms[]> {
    return this.createQueryBuilder(`rooms`)
      .where(`rooms.is_deleted = true`)
      .getMany();
  }

  searchRoom(payload: RepositoryPaginationPayload): Promise<Rooms[]> {
    return this.createQueryBuilder(`rooms`)
    .where(`rooms.name LIKE :name`, {name: `%${payload.search}%`})
    .orWhere(`rooms.description LIKE :description`, {description: `%${payload.search}%`})
    .where(`rooms.is_disabled = false`)
    .andWhere(`rooms.is_deleted = false`)
      .orWhere(`rooms.name = :name`, {name: `%${payload.search}%`})
        .orWhere(`rooms.description = :description`, {description: `%${payload.search}%`})
    .skip(payload.offset)
    .take(payload.limit)
    .addOrderBy('id', payload.direction === 'ASC' ? 'ASC' : 'DESC')
     .getMany();
  }

  disableById(id: string) {
    return this.createQueryBuilder('rooms')
      .update({
        isDisabled: true
      }).where("rooms.id = :id", {id: id})
      .useTransaction(true)

      .execute();
  }

   restoreDisabledRoomById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('rooms')
      .update({
        isDisabled: false
      }).where('rooms.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }

   deleteById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('rooms')
      .update({
        isDeleted: true,
        isDisabled: false,
      }).where('rooms.id = :id', {id: id})
      .execute();
  }

   restoreDeletedRoomById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('rooms')
      .update({
        isDeleted: false
      }).where('rooms.id = :id', {id: id})
      .execute();
  }
}
