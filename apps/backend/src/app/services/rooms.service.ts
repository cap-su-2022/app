import {Injectable} from "@nestjs/common";
import {AddRoomRequest} from "../dto/request/add-room-request.dto";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Rooms} from "../models/rooms.entity";
import {NoSuchElementFoundException} from "../exception/no-such-element-found.exception";
import {UpdateRoomRequest} from "../dto/request/update-room-request.dto";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {RoomsProfile} from "../profiles/rooms.profile";

@Injectable()
export class RoomsService {


  constructor(
    @InjectRepository(Rooms) private readonly repository: Repository<Rooms>,
    private readonly profile: RoomsProfile,
    ) {
  }


  async add(room: AddRoomRequest): Promise<Rooms> {
    return await this.repository.save(room, {
      transaction: true
    })
  }

  async getAll(): Promise<Rooms[]> {
    return await this.repository.find({

    });
  }

  async deleteById(id: string): Promise<any> {
    return this.repository.delete(id).then((result) => {
      if (result.affected < 1) {
        throw new NoSuchElementFoundException();
      }
    });
  }

  async updateById(id: string, body: UpdateRoomRequest): Promise<UpdateResult> {
    let room;

    try {
      room = await this.repository.findOneOrFail(id);
    } catch (e) {
      throw new NoSuchElementFoundException();
    }
    console.log(room);


    return this.repository.save(
      {
        ...room,
        ...body
      }, {
      transaction: true
      }
    );

  }
}
