import {
  ArrayMaxSize,
  ArrayMinSize, IsArray,
  IsDateString, IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsPositive, IsString,
  IsUUID, MaxLength,
  ValidateNested
} from "class-validator";
import {Type} from "class-transformer";

class AutoRoomBookingDevice {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}

class AutoRoomBookingRequest {

  @IsNotEmpty()
  @IsDateString()
  date: string;

  timeStart: string;
  timeEnd: string;

  @ValidateNested({ each: true })
  @Type(() => AutoRoomBookingDevice)
  devices: AutoRoomBookingDevice[];

  @IsNotEmpty()
  @IsPositive()
  capacity: number;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsUUID()
  bookingReasonId: string;
}

class AutoRoomBookingRequestPayload {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AutoRoomBookingRequest)
  request: AutoRoomBookingRequest[];
}

class AutoRoomBookingResponsePayload {
  capacity: number;
  roomName: string;
  roomType: string;
  description: string;
  date: string;
  checkinAt: string;
  checkoutAt: string;
}

export {AutoRoomBookingRequestPayload, AutoRoomBookingRequest, AutoRoomBookingDevice, AutoRoomBookingResponsePayload};
