import { PaginationParams } from '../../controllers/pagination.model';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class BookingFeedbackSendRequestPayload extends PaginationParams {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: `Message can't be empty`,
  })
  message: string;

  @IsNotEmpty({
    message: `rate num can't be empty`,
  })
  rateNum: number;

  @IsNotEmpty({
    message: `Booking room id can't be empty`,
  })
  bookingRoomId: string;

  @IsOptional()
  type: string;
  
}
