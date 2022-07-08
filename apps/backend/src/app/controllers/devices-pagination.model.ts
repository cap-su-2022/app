import { PaginationParams } from './pagination.model';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DevicesPaginationParams extends PaginationParams {
  @IsString({
    message: 'Room type must be a string',
  })
  @IsOptional()
  deviceType: string;
}
