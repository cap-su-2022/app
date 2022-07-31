import {ParseIntPipe} from '@nestjs/common';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {IsNull} from 'typeorm';
import {Transform, TransformFnParams} from 'class-transformer';
import {ContainsMany} from '../validators/contains-many.validator';
import {validationConfig} from '../pipes/validation/global.validator';
import {ApiProperty} from "@nestjs/swagger";

export class PaginationParams {

  @Transform((val) => Number.parseInt(val.value))
  @IsInt({
    message: 'Page number must be integer',
  })
  @IsNotEmpty({
    message: 'Page number must not be empty',
  })
  @Min(1, {
    message: 'Minimum value for page number is 1',
  })
  @ApiProperty({default: 1, required: true})
  page: number;

  @Transform((val) => Number.parseInt(val.value))
  @IsInt({
    message: 'Items per page must be integer',
  })
  @IsNotEmpty({
    message: 'Items per page must not be empty',
  })
  @Min(1, {
    message: 'Items per page must be at least 1',
  })
  @Max(50, {
    message: 'Items per page maximum value is 50',
  })
  @ApiProperty({default: 5, required: true})
  limit: number;

  // @Transform((val) => Number.parseInt(val.value))
  @IsString({
    message: 'Dir value must be a string',
  })
  @ContainsMany(['ASC', 'DESC'], {
    message: 'Direction must be ASC or DESC',
  })
  @ApiProperty({default: 'ASC', required: true})
  dir: string;

  // @Transform((val) => Number.parseInt(val.value))
  @IsOptional()
  @IsString({
    message: 'Search value must be a string',
  })
  @MaxLength(100, {
    message: 'Maximum length for search is 100 characters',
  })
  @ApiProperty({default: '', required: false})
  search: string;

  @IsNotEmpty({
    message: 'Sorting field must not be empty',
  })
  @IsString({
    message: 'Sorting field must be a string',
  })
  @ApiProperty({default: 'name', required: true})
  sort: string;
}
