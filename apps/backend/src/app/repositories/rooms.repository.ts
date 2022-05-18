import {EntityRepository, Like, Repository} from "typeorm";
import {RepositoryPaginationPayload} from "../models/search-pagination.payload";
import {Rooms} from "../models/rooms.entity";


@EntityRepository(Rooms)
export class RoomsRepository extends Repository<Rooms>{

  getSize(): Promise<number> {
    return this.manager.query(`SELECT COUNT(id) as COUNT FROM rooms`)
      .then(res => res[0]['COUNT']).then(res => Number(res));
  }


  searchRoom(payload: RepositoryPaginationPayload): Promise<Rooms[]> {
    return this.find({
      order: {
        id: payload.direction === 'ASC' ? 1 : -1,
      },
      where: [
        {
          name: Like(`%${payload.search}%`),
        },
        {
          description: Like(`%${payload.search}%`),
        }
      ],
        skip: payload.offset,
      take: payload.limit
    });
  }

  async disableById(id: string) {
    return this.manager.transaction((em) => {
      return em.query(`UPDATE rooms r SET r.is_disabled = 1 WHERE r.id = CAST(? as CHAR)`, [id]);
    });
  }
}
