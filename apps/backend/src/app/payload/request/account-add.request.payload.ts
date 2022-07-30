import {PaginationParams} from '../../controllers/pagination.model';
import {
  IsBoolean, IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString, Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {Transform, TransformFnParams} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class AccountAddRequestPayload extends PaginationParams {
  @Transform(({value}: TransformFnParams) => value?.trim())
  @MinLength(8)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty({
    message: 'Userame can not be empty',
  })
  @ApiProperty({
    name: 'username',
    description: 'Username to be added',
    required: true,
    type: String,
    title: 'Username',
    example: 'ABCDabc1234',
    minLength: 1,
    maxLength: 256,
  })
  username: string;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @MinLength(8)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty({
    message: 'FullName can not be empty',
  })
  @ApiProperty({
    name: 'fullname',
    description: 'Fullname to be added',
    required: true,
    type: String,
    title: 'Fullname',
    example: 'Nguyễn Văn A',
    minLength: 1,
    maxLength: 256,
  })
  fullname: string;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @MinLength(11)
  @MaxLength(11)
  @IsString()
  @IsOptional()
  @Matches(/[0-9]/, {
    message: 'Phone number must be numbers'
  })
  @ApiProperty({
    name: 'phone',
    description: 'Phone number to be added',
    required: true,
    type: Number,
    title: 'Phone Number',
    example: '0123456789',
    minLength: 1,
    maxLength: 256,
  })
  phone: string;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @MinLength(11)
  @MaxLength(11)
  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'Email to be added',
    required: true,
    type: String,
    title: 'Email',
    example: 'abc@fpt.edu.vn',
    minLength: 1,
    maxLength: 256,
  })
  email?: string;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @MaxLength(100)
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'Description',
    description: 'Description to be added',
    required: true,
    type: String,
    title: 'Description',
    example: '',
    minLength: 1,
    maxLength: 256,
  })
  description?: string;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty({
    message: 'Role can not be empty',
  })
  @ApiProperty({
    name: 'Role ID',
    description: 'Role ID to be added',
    required: true,
    type: String,
    title: 'Role ID',
    example: '',
    minLength: 1,
    maxLength: 256,
  })
  roleId: string;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsString()
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

  @Transform(({value}: TransformFnParams) => value?.trim())
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
