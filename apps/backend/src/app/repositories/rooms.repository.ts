import { Brackets, In, Like, Repository, UpdateResult } from "typeorm";
import { RepositoryPaginationPayload } from "../models/search-pagination.payload";
import { Rooms } from "../models/rooms.entity";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";
import { Accounts } from "../models";
import {ChooseBookingRoomFilterPayload} from "../payload/request/choose-booking-room-filter.payload";


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
      .getRawOne().then((data) => data["count"] > 0);
  }

  async isExistedByName(name: string): Promise<boolean> {
    return this.createQueryBuilder("rooms")
      .select("COUNT(rooms.name)")
      .where("rooms.name = :name", { name })
      .getRawOne().then((data) => data["count"] > 0);
  }

  findDisabledRooms(search: string) {
    return this.createQueryBuilder("rooms")
      .select("rooms.id", "id")
      .addSelect("rooms.name", "name")
      .addSelect("rooms.type", "type")
      .addSelect("rooms.disabled_at", "disabledAt")
      .addSelect("a.username", "disabledBy")
      .innerJoin(Accounts, "a", "rooms.disabled_by = a.id")
      .where("rooms.is_disabled = true")
      .andWhere("rooms.is_deleted = false")
      .andWhere("rooms.name LIKE :search", { search: `%${search}%` })
      .getRawMany<Rooms>();
  }

  findDeletedRooms(search: string): Promise<Rooms[]> {
    return this.createQueryBuilder(`rooms`)
      .select("rooms.deleted_at", "deletedAt")
      .addSelect("a.username", "deletedBy")
      .addSelect("rooms.name", "name")
      .addSelect("rooms.type", "type")
      .addSelect("rooms.id", "id")
      .innerJoin(Accounts, "a", "a.id = rooms.deleted_by")
      .where(`rooms.is_deleted = true`)
      .andWhere("rooms.is_disabled = false")
      .andWhere("rooms.name LIKE :name", { name: `%${search}%` })
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

      .where(new Brackets(qb => qb.where("r.name LIKE :name", {
        name: `%${payload.search}%`
      }).orWhere("r.description LIKE :description", {
        description: `%${payload.search}%`
      })))
      .andWhere("r.is_disabled = false")
      .andWhere("r.is_deleted = false")
      .limit(payload.limit)

      .offset(payload.offset)
    // .addOrderBy(`r.${payload.direction[0].name}`, payload.direction[0].order)
    //.addOrderBy(`r.${payload.direction[1].name}`, payload.direction[1].order)
    //.getRawMany<Rooms>();
    payload.direction.forEach((direction) => query
      .addOrderBy(`r.${direction.name}`, direction.order));
    query.take(payload.limit).skip(payload.offset);
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

  async findRoomNames() {
    return this.createQueryBuilder("rooms")
      .select("rooms.name", "name")
      .where("rooms.is_disabled = false")
      .andWhere("rooms.is_deleted = false")
      .getRawMany<{ name: string }>()
      .then((data) => data.map((room) => room.name));
  }

  async findById(id: string): Promise<Rooms> {
    return this.createQueryBuilder("rooms")
      .select("rooms.id", "id")
      .addSelect("rooms.name", "name")
      .addSelect("rooms.type", "type")
      .addSelect("rooms.created_at", "createdAt")
      .addSelect("a.username", "createdBy")
      .addSelect("rooms.updated_at", "updatedAt")
      .addSelect("aa.username", "updatedBy")
      .addSelect("rooms.description", "description")
      .innerJoin(Accounts, "a", "rooms.created_by = a.id")
      .innerJoin(Accounts, "aa", "rooms.updated_by = aa.id")
      .where("rooms.is_disabled = false")
      .andWhere("rooms.is_deleted = false")
      .andWhere("rooms.id = :roomId", { roomId: id })
      .getRawOne<Rooms>();
  }

  filterByNameAndType(payload: ChooseBookingRoomFilterPayload) {
    return this.createQueryBuilder("rooms")
      .select('rooms.id', 'id')
      .addSelect('rooms.name', 'name')
      .addSelect('rooms.type', 'type')
      .where('rooms.is_disabled = false')
      .andWhere('rooms.is_deleted = false')
      .andWhere('rooms.type LIKE :type', {type: `%${payload.roomType.name}%`})
      .andWhere('rooms.name LIKE :name', {name: `%${payload.roomName.name}%`})
      .orderBy('rooms.name', payload.roomName.sort)
      .addOrderBy('rooms.type', payload.roomType.sort)
      .getRawMany<Rooms>();
  }
}
