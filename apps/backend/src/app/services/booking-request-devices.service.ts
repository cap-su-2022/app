import { BadRequestException, Injectable, Logger, Scope } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { BookingRequestDevices } from '../models';
import { BookingRoomDevicesRepository } from '../repositories/booking-request-devices.repository';

@Injectable()
export class BookingRoomDevicesService {
  private readonly logger = new Logger(BookingRoomDevicesService.name);
  constructor(
    private readonly dataSource: DataSource,
    private readonly repository: BookingRoomDevicesRepository
  ) {}

  async findByRequestId(id: string) {
    try {
      return await this.repository.findByRequestId(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async addDeviceToRequest(
    bookingRequestId: string,
    payload: {
      value: string;
      quantity: number;
    }[],
    queryRunner: QueryRunner
  ) {
    try {
      if (payload) {
        const bookingRequestDevices: BookingRequestDevices[] = [];
        for (let i=0; i< payload.length; i++) {
          const result = await await this.repository.addDeviceToRequest(
            bookingRequestId,
            payload[i].value,
            payload[i].quantity,
            queryRunner
          );
          bookingRequestDevices.push(result);
        }
        return bookingRequestDevices;
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
