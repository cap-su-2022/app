import { ApiProperty } from "@nestjs/swagger";

export class ChangeProfilePasswordRequest {
  @ApiProperty({
    name: "username",
    required: true,
    type: String,
    example: "example-account",
    minLength: 1,
    maxLength: 100
  })
  username: string;

  @ApiProperty({
    name: "password",
    required: true,
    type: String,
    example: "my-password",
    minLength: 1,
    maxLength: 100
  })
  password: string;

  @ApiProperty({
    name: "newPassword",
    required: true,
    type: String,
    example: "my-password",
    minLength: 1,
    maxLength: 100
  })
  newPassword: string;
}
