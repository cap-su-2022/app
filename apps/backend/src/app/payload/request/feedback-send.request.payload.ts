import { PaginationParams } from '../../controllers/pagination.model';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class FeedbackSendRequestPayload extends PaginationParams {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: `Message can't be empty`,
  })
  message: string;

  @IsNotEmpty({
    message: `Feedback type can't be empty`,
  })  feedbackTypeId: string;

}
