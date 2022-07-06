import { Injectable } from '@nestjs/common';
import { RoomHist, Rooms } from '../models';
import { RoomHistRepository } from '../repositories/room-hist.repository';

@Injectable()
export class RoomHistService {
    constructor(private readonly repository: RoomHistRepository) {}

  async createNew(room: Rooms): Promise<RoomHist> {
    return this.repository.createNew(room);
  }
}
