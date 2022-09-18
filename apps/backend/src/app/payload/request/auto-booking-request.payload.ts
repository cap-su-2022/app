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

class AutoRoomBookingCapacity {
  @IsNotEmpty()
  @IsPositive()
  min: number;

  @IsNotEmpty()
  @IsPositive()
  max: number;
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
  @ValidateNested({ each: true })
  @Type(() => AutoRoomBookingCapacity)
  capacity: AutoRoomBookingCapacity;

  @IsNotEmpty()
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

export {AutoRoomBookingRequestPayload, AutoRoomBookingRequest, AutoRoomBookingDevice, AutoRoomBookingCapacity};
