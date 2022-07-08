import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { RoomHist, Rooms } from '../models';

@CustomRepository(RoomHist)
export class RoomHistRepository extends Repository<RoomHist> {
  async createNew(payload: Rooms): Promise<RoomHist> {
    const roomId = payload.id;
    delete payload.id
    return this.save({
      roomId: roomId,
      ...payload,
    });
  }
}
