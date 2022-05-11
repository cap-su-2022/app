import {Logger} from "@nestjs/common";
import {EntityRepository, Like, Repository} from "typeorm";
import {Rooms} from "../models";
import {RepositoryPaginationPayload} from "../models/search-pagination.payload";



@EntityRepository(Rooms)
export class RoomsRepository extends Repository<Rooms>{

  getSize(): Promise<number> {
    return this.manager.query(`SELECT COUNT(id) as COUNT FROM rooms`)
      .then(res => res[0]['COUNT']).then(res => Number(res));
  }


  searchRoom(payload: RepositoryPaginationPayload): Promise<Rooms> {
    return this.find({
      order: {
        id: payload.direction,
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
}
