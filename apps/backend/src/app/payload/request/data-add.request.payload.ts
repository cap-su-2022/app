import { PaginationParams } from '../../controllers/pagination.model';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DataAddRequestPayload extends PaginationParams {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MaxLength(100)
  @IsNotEmpty({
    message: 'Name can not be empty',
  })
  name: string;

  @ApiProperty({
    name: 'description',
    description: 'Description to be added',
    maxLength: 500,
    minLength: 0,
    type: String,
    example: 'New entity',
  })
  @MaxLength(500)
  @IsString()
  description?: string;

  @ApiProperty({
    name: 'isDisabled',
    description: 'Is the room should be disabled',
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isDisabled?: boolean;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: 'Type can not be empty',
  })
  type: string;
}
