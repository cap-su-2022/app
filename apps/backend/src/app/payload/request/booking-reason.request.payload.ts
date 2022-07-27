import {IsNotEmpty, IsOptional} from "class-validator";

export class BookingReasonUpdateRequestPayload {
  @IsNotEmpty({
    message: 'Name of booking reason can not be empty',
  })
  name: string;

  @IsOptional()
  description?: string;
}
