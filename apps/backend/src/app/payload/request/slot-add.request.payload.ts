import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SlotsRequestPayload {
  @IsString()
  @IsNotEmpty({
    message: 'Name can not be empty',
  })
  @ApiProperty({
    name: 'name',
    description: 'Name to be added',
    required: true,
    type: String,
    title: 'Name',
    example: 'Slot 10',
    minLength: 1,
    maxLength: 256,
  })
  name: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'Name can not be empty',
  })
  @ApiProperty({
    name: 'name',
    description: 'Name to be added',
    required: true,
    type: String,
    title: 'Name',
    example: 'Slot 10',
    minLength: 1,
    maxLength: 256,
  })
  slotNum: number;

  @IsString()
  @IsNotEmpty({
    message: 'Time Start can not be empty',
  })
  @ApiProperty({
    name: 'timeStart',
    description: 'Time Start',
    required: true,
    type: String,
    title: 'Time Start',
    example: '21:00:15',
    minLength: 1,
    maxLength: 256,
  })
  timeStart: string;

  @IsString()
  @IsNotEmpty({
    message: 'Time End can not be empty',
  })
  @ApiProperty({
    name: 'timeEnd',
    description: 'Time End',
    required: true,
    type: String,
    title: 'Time End',
    example: '22:00:45',
    minLength: 1,
    maxLength: 256,
  })
  timeEnd: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'description',
    description: 'Description to be added',
    required: false,
    type: String,
    title: 'Description',
    example: 'Slot chính quy',
    minLength: 1,
    maxLength: 256,
  })
  description?: string;
}
