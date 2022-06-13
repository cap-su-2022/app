import { Brackets, In, Like, Repository, UpdateResult } from "typeorm";
import { RepositoryPaginationPayload } from "../models/search-pagination.payload";
import { Rooms } from "../models/rooms.entity";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";
import { Accounts } from "../models";


@CustomRepository(Rooms)
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

  async isExistedById(id: string): Promise<boolean> {
    return this.createQueryBuilder("rooms")
      .select("COUNT(rooms.name)")
      .where("rooms.id = :id", { id })
      .getRawOne().then((data) => data > 0);
  }

  async isExistedByName(name: string): Promise<boolean> {
    return this.createQueryBuilder("rooms")
      .select("COUNT(rooms.name)")
      .where("rooms.name = :name", { name })
      .getRawOne().then((data) => data["count"] > 0);
  }

  findDisabledRooms() {
    return this.createQueryBuilder("rooms")
      .where("rooms.is_disabled = true")
      .getMany();
  }

  findDeletedRooms(): Promise<Rooms[]> {
    return this.createQueryBuilder(`rooms`)
      .where(`rooms.is_deleted = true`)
      .getMany();
  }

  searchRoom(payload: RepositoryPaginationPayload): Promise<Rooms[]> {
    const query = this.createQueryBuilder("r")
      .innerJoin(Accounts, "a", "r.created_by = a.id")
      .innerJoin(Accounts, "aa", "r.updated_by = aa.id")
      .select("r.id", "id")
      .addSelect("r.name", "name")
      .addSelect("r.description", "description")
      .addSelect("r.type", "type")
      .addSelect("r.createdAt", "createdAt")
      .addSelect("r.updatedAt", "updatedAt")
      .addSelect("a.username", "createdBy")
      .addSelect("aa.username", "updatedBy")
      .where("r.id IN (:...ids)", { ids: payload.search })
      .andWhere("r.is_disabled = false")
      .andWhere("r.is_deleted = false")
      .take(payload.limit)
      .skip(payload.offset);
    // .addOrderBy(`r.${payload.direction[0].name}`, payload.direction[0].order)
    //.addOrderBy(`r.${payload.direction[1].name}`, payload.direction[1].order)
    //.getRawMany<Rooms>();
    payload.direction.forEach((direction) => query
      .addOrderBy(`r.${direction.name}`, direction.order));
    return query.getRawMany<Rooms>();
  }

  disableById(id: string) {
    return this.createQueryBuilder("rooms")
      .update({
        isDisabled: true
      }).where("rooms.id = :id", { id: id })
      .useTransaction(true)

      .execute();
  }

  restoreDisabledRoomById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("rooms")
      .update({
        isDisabled: false
      }).where("rooms.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  deleteById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("rooms")
      .update({
        isDeleted: true,
        isDisabled: false
      }).where("rooms.id = :id", { id: id })
      .execute();
  }

  restoreDeletedRoomById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("rooms")
      .update({
        isDeleted: false
      }).where("rooms.id = :id", { id: id })
      .execute();
  }

  getAllRoomsForElasticIndex(): Promise<Rooms[]> {
    return this.createQueryBuilder("rooms")
      .select(["rooms.id", "rooms.name", "rooms.description",
        "rooms.isDeleted", "rooms.isDisabled"])
      .getMany();
  }
}
