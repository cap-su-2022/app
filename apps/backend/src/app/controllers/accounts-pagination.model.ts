import { PaginationParams } from './pagination.model';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AccountsPaginationParams extends PaginationParams {
  @IsString({
    message: 'Role type must be a string',
  })
  @IsOptional()
  role: string;
}
