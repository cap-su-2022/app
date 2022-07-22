import { PaginationParams } from '../../controllers/pagination.model';
import {
  IsBoolean, IsEmail,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString, Matches,
  MaxLength, Min, MinLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";


export class AccountUpdateProfilePayload extends PaginationParams {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: 'Full name can not be empty',
  })
  @MinLength(0)
  @MaxLength(55)
  @IsString()
  fullname: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: 'Email can not be empty',
  })
  @IsEmail()
  email: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Matches(/[0-9]/,{
    message: 'Phone number must be numbers'
  })
  @MinLength(10)
  @MaxLength(11)
  @IsNotEmpty({
    message: 'Phone can not be empty',
  })
  phone: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  description?: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  roleId?: string;
}
