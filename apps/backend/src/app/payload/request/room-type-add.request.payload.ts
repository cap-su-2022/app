import { PaginationParams } from '../../controllers/pagination.model';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class RoomTypeAddRequestPayload extends PaginationParams {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: 'name of room type can not be empty',
  })
  name: string;

  @IsOptional()
  description: string;
}
