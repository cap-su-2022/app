import {Body, Controller, Get, Post} from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import {readFileSync} from 'fs';
import {join} from 'path';
import {ApiTags} from '@nestjs/swagger';
import {Roles} from '../decorators';
import {Role} from '../enum';
import dayjs = require('dayjs');

class RoomBookingLimitDate {
  startDate: string;
  endDate: string;
}

class SlotInfo {
  start: string;
  end: string;
}

export const getConfigFileLoaded = () => {
  try {
    return yaml.load(
      readFileSync(join('backend-config.yaml'), 'utf8')
    ) as Record<any, number>;
  } catch (e) {
    fs.writeFileSync(
      './backend-config.yaml',
      yaml.dump({
        maxBookingDateRange: 14,
        maxDeviceBorrowQuantity: 100,
        maxBookingRequestPerWeek: 3,
        maxRoomCapacity: 1000
      })
    );
    return yaml.load(
      readFileSync(join('backend-config.yaml'), 'utf8')
    ) as Record<any, number>;
  }
};

@Controller('/v1/config')
@ApiTags('System Config')
export class GlobalConfigController {
  @Get('room-booking-date-limit')
  getRoomBookingLimitDate(): Promise<RoomBookingLimitDate> {
    return Promise.resolve({
      startDate: dayjs().add(1, 'day').startOf('day').toISOString(),
      endDate: dayjs()
        .endOf('week')
        .endOf('day')
        .add(getConfigFileLoaded().maxBookingDateRange + 1, 'day')
        .toISOString(),
    });
  }

  @Get('max-borrow-devices-quantity')
  getMaxBorrowDevicesQuantity(): Promise<any> {
    return Promise.resolve(getConfigFileLoaded().maxDeviceBorrowQuantity);
  }

  @Get('max-booking-request-per-week')
  getMaxBookingRequestPerWeek(): Promise<any> {
    return Promise.resolve(getConfigFileLoaded().maxBookingRequestPerWeek);
  }

  @Get('max-room-capacity')
  getMaxRoomCapacity(): Promise<any> {
    return Promise.resolve(getConfigFileLoaded().maxRoomCapacity);
  }

  @Get()
  getAllConfig() {
    return Promise.resolve(getConfigFileLoaded());
  }

  @Post()
  @Roles(Role.APP_ADMIN)
  updateConfig(
    @Body()
      val: {
      maxBookingDateRange: string;
      maxDeviceBorrowQuantity: string;
      maxBookingRequestPerWeek: string;
      maxRoomCapacity: string;
    }
  ) {
    fs.writeFileSync(
      './backend-config.yaml',
      yaml.dump({
        maxBookingDateRange: val.maxBookingDateRange
          ? parseInt(val.maxBookingDateRange, 10)
          : 14,
        maxDeviceBorrowQuantity: val.maxDeviceBorrowQuantity
          ? parseInt(val.maxDeviceBorrowQuantity, 10)
          : 100,
        maxBookingRequestPerWeek: val.maxBookingRequestPerWeek
          ? parseInt(val.maxBookingRequestPerWeek, 10)
          : 3,
        maxRoomCapacity: val.maxRoomCapacity
          ? parseInt(val.maxRoomCapacity, 10)
          : 1000
      })
    );
  }

  @Post('max-booking-request-per-week')
  @Roles(Role.APP_ADMIN)
  setMaxBookingRequestPerWeek(@Body() val: { number: number }) {
    fs.writeFileSync(
      './backend-config.yaml',
      yaml.dump({
        ...getConfigFileLoaded(),
        maxBookingRequestPerWeek: val.number,
      })
    );
  }

  @Post('max-borrow-devices-quantity')
  @Roles(Role.APP_ADMIN)
  setMaxBorrowDevicesQuantity(@Body() val: { number: number }) {
    fs.writeFileSync(
      './backend-config.yaml',
      yaml.dump({
        ...getConfigFileLoaded(),
        maxDeviceBorrowQuantity: val.number,
      })
    );
  }

  @Post('room-booking-date-limit')
  @Roles(Role.APP_ADMIN)
  setRoomBookingDateRange(@Body() val: { number: number }) {
    fs.writeFileSync(
      './backend-config.yaml',
      yaml.dump({
        ...getConfigFileLoaded(),
        maxBookingDateRange: val.number,
      })
    );
  }

  @Post('max-room-capacity')
  @Roles(Role.APP_ADMIN)
  setMaxRoomCapacity(@Body() val: { number: number }) {
    fs.writeFileSync(
      './backend-config.yaml',
      yaml.dump({
        ...getConfigFileLoaded(),
        maxRoomCapacity: val.number,
      })
    );
  }
}
