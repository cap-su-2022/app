import {Controller, Get, HttpStatus} from '@nestjs/common';
import {AppService} from '../services/app.service';
import {ConfigService} from '@nestjs/config';
import {ApiCreatedResponse} from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Test if Web API is working correctly',
    status: HttpStatus.OK,
  })
  getData() {
    return this.appService.getData();
  }
}
