import { Injectable } from '@nestjs/common';
import { RoomWishlistHistRepository } from '../repositories';

@Injectable()
export class RoomWishlistHistService {
  constructor(private readonly repository: RoomWishlistHistRepository) {}
}
