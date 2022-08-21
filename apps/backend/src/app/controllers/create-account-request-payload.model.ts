import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateAccountRequestPayload {
  @MaxLength(100)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  @MaxLength(100)
  confirmPassword: string;

  @MaxLength(100)
  @IsNotEmpty()
  firstName: string;

  @MaxLength(100)
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @MaxLength(10)
  phone: string;

  @IsOptional()
  @MaxLength(500)
  description: string;

  @IsUUID()
  @IsNotEmpty()
  roleId: string;
}
