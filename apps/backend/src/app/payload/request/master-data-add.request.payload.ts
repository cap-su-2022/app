import { PaginationParams } from '../../controllers/pagination.model';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class MasterDataAddRequestPayload extends PaginationParams {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: 'Name of type can not be empty',
  })
  name: string;

  @IsOptional()
  description: string;
}
