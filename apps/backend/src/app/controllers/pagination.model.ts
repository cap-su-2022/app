import { ParseIntPipe } from '@nestjs/common';
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
import { IsNull } from 'typeorm';
import { Transform } from 'class-transformer';
import { ContainsMany } from '../validators/contains-many.validator';
import { validationConfig } from '../pipes/validation/global.validator';

export class PaginationParams {
  @IsString({
    message: 'Search value must be a string',
  })
  @IsOptional()
  @MaxLength(100, {
    message: 'Maximum length for search is 100 characters',
  })
  search = '';

  @IsOptional()
  @IsInt({
    message: 'Page number must be integer',
  })
  @IsNotEmpty({
    message: 'Page number must not be empty',
  })
  @Transform((val) => Number.parseInt(val.value))
  @Min(1, {
    message: 'Minimum value for page number is 1',
  })
  page: number;

  @IsOptional()
  @IsInt({
    message: 'Items per page must be integer',
  })
  @IsNotEmpty({
    message: 'Items per page must not be empty',
  })
  @Transform((val) => Number.parseInt(val.value))
  @Min(1, {
    message: 'Items per page must be at least 1',
  })
  @Max(50, {
    message: 'Items per page maximum value is 50',
  })
  limit: number;

  @IsOptional()
  @ContainsMany(['ASC', 'DESC'], {
    message: 'Direction must be ASC or DESC',
  })
  dir: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Sorting field must not be empty',
  })
  @IsString({
    message: 'Sorting field must be a string',
  })
  sort: string;
}
