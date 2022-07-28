import { PaginationParams } from '../../controllers/pagination.model';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class BookingRequestAddRequestPayload extends PaginationParams {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MaxLength(100)
  @IsNotEmpty({
    message: 'Room can not be empty',
  })
  @IsString()
  roomId: string;

  @IsNotEmpty({
    message: 'Day checkin can not be empty',
  })
  @IsString()
  checkinDate?: string;

  @IsOptional()
  @IsString()
  checkoutDate?: string;

  @IsNotEmpty({
    message: 'Slot check in can not be empty',
  })
  @IsString()
  checkinSlot?: string;

  @IsNotEmpty({
    message: 'Slot check out can not be empty',
  })
  @IsString()
  checkoutSlot?: string;

  @MaxLength(500)
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  bookedFor?: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({
    message: 'Reason type can not be empty',
  })
  @IsString()
  bookingReasonId: string;

  @IsOptional()
  @IsArray()
  listDevice: [];
}
