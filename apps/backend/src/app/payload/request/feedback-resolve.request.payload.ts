import { PaginationParams } from '../../controllers/pagination.model';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class FeedbackResolveRequestPayload extends PaginationParams {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: `Resolve message can't be empty`,
  })
  resolveMessage: string;
}
