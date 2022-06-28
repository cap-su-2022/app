import { PaginationParams } from './pagination.model';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RoomsPaginationParams extends PaginationParams {
  @IsString({
    message: 'Room type must be a string',
  })
  @IsOptional()
  roomType: string;
}
