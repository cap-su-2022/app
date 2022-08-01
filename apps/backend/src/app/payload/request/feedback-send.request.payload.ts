import {PaginationParams} from '../../controllers/pagination.model';
import {isEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength} from 'class-validator';
import {Transform, TransformFnParams} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class FeedbackSendRequestPayload {
  @ApiProperty({
    name: 'message',
    description: 'Message',
    required: true,
    type: String,
    title: 'Message',
    example: '',
    minLength: 1,
    maxLength: 256,
  })
  @IsNotEmpty({
    message: `Message can't be empty`,
  })
  message: string;

  @ApiProperty({
    name: 'feedbackType',
    description: 'Message',
    required: true,
    type: String,
    title: 'Message',
    example: 'Library devices',
    minLength: 1,
    maxLength: 256,
  })
  @IsNotEmpty({
    message: `Feedback type can't be empty`,
  }) feedbackTypeId: string;

}
