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

export class AccountAddRequestPayload extends PaginationParams {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(8)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty({
    message: 'Userame can not be empty',
  })
  username: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(8)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty({
    message: 'FullName can not be empty',
  })
  fullname: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(11)
  @MaxLength(11)
  @IsString()
  @IsOptional()
  phone: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(11)
  @MaxLength(11)
  @IsString()
  @IsOptional()
  email: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MaxLength(100)
  @IsString()
  @IsNotEmpty({
    message: 'Description can not be empty',
  })
  description: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: 'Role can not be empty',
  })
  roleId: string;

  @ApiProperty({
    name: 'avatar',
    description: 'Avatar of the account',
    required: true,
    type: String,
    title: 'avatar',
    example: 'http://google.com/',
    minLength: 1,
    maxLength: 256,
  })
  avatar: string;

  @ApiProperty({
    name: 'isDisabled',
    description: 'Is the account should be disabled',
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isDisabled?: boolean;
}
