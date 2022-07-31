import {PaginationParams} from '../../controllers/pagination.model';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {Transform, TransformFnParams} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class DataAddRequestPayload {
  @Transform(({value}: TransformFnParams) => value?.trim())
  @MaxLength(100)
  @ApiProperty({
    name: 'name',
    description: 'Name to be added',
    maxLength: 500,
    minLength: 0,
    type: String,
    example: 'New entity',
  })
  @IsNotEmpty({
    message: 'Name can not be empty',
  })
  name?: string;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @ApiProperty({
    name: 'description',
    description: 'Description to be added',
    maxLength: 500,
    minLength: 0,
    type: String,
    example: 'New entity',
  })
  @MaxLength(500)
  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    name: 'isDisabled',
    description: 'Should be disabled',
    type: Boolean,
    example: true,
  })
  isDisabled?: boolean;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @ApiProperty({
    name: 'type',
    description: 'Type to be added',
    maxLength: 500,
    minLength: 0,
    type: String,
    example: 'New entity',
  })
  @IsNotEmpty({
    message: 'Type can not be empty',
  })
  type?: string;
}
