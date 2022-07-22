import { PaginationParams } from '../../controllers/pagination.model';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class MasterDataAddRequestPayload extends PaginationParams {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: 'Name can not be empty',
  })
  name: string;

  @IsOptional()
  @IsNumber()
  slotNum: number;

  @IsOptional()
  description: string;

  @IsOptional()
  timeStart: string;

  @IsOptional()
  timeEnd: string;
}
