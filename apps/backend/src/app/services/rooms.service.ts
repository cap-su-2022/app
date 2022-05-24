import {BadRequestException, Injectable} from "@nestjs/common";
import {AddRoomRequest} from "@app/models";
import {UpdateResult} from "typeorm";
import {NoSuchElementFoundException} from "../exception/no-such-element-found.exception";
import {UpdateRoomRequest} from "@app/models";
import {Rooms} from '../models/rooms.entity';
import {RoomsRepository} from "../repositories/rooms.repository";
import {RoomsRequestPayload} from "../payload/request/rooms.payload";
import {RoomsResponsePayload} from "../payload/response/rooms.payload";

@Injectable()
export class RoomsService {

  constructor(
    private readonly repository: RoomsRepository,) {
  }


  async add(room: AddRoomRequest): Promise<Rooms> {
    return await this.repository.save(room, {
      transaction: true
    })
  }

  async findById(id: string): Promise<Rooms> {
    return this.repository.findOneOrFail(id);
  }

  async getAll(request: RoomsRequestPayload): Promise<RoomsResponsePayload> {
    const offset = request.size * (request.page - 1);
    const limit = request.size;

    const queryResult = await this.repository.searchRoom(
        {
          search: request.search,
          offset: offset,
          limit: limit,
          direction: request.sort
        }).catch(() => {
          throw new BadRequestException("One or more parameters is invalid");
        });

    const total = await this.repository.getSize().catch(() => {
      throw new BadRequestException("One or more parameters is invalid");
    });
    const totalPage = Math.ceil(total / request.size);

    return {
      data: queryResult,
      currentPage: request.page,
      totalPage: totalPage,
      size: total
    };
  }

  async getDeletedRooms(): Promise<Rooms[]> {
    return await this.repository.findDeletedRooms();
  }

  async getDisabledRooms(): Promise<Rooms[]> {
    return await this.repository.findDisabledRooms();
  }

  async updateById(id: string, body: UpdateRoomRequest): Promise<UpdateResult> {
    let room;

    try {
      room = await this.repository.findOneOrFail(id);
    } catch (e) {
      throw new NoSuchElementFoundException();
    }


    return this.repository.save(
      {
        ...room,
        ...body
      }, {
      transaction: true
      }
    );

  }

  async disableById(id: string): Promise<any> {
    return await this.repository.disableById(id);
  }

  handleRestoreDeletedRoomById(id: string) {
    return this.repository.restoreDisabledRoomById(id);
  }

  async handleRestoreDisabledRoomById(id: string) {
    return await this.repository.restoreDisabledRoomById(id);
  }

  async deleteById(id: string) {
    return await this.repository.deleteById(id);
  }
}
