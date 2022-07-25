import { Repository } from 'typeorm';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { RoomWishlistHist } from '../models';

@CustomRepository(RoomWishlistHist)
export class RoomWishlistHistRepository extends Repository<RoomWishlistHist> {}
