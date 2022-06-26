import { Injectable } from '@nestjs/common';
import { RoomWishlistHistRepository } from '../repositories/room-wishlist-hist.repository';

@Injectable()
export class RoomWishlistHistService {
  constructor(private readonly repository: RoomWishlistHistRepository) {}
}
