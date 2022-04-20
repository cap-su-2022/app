import { Controller, Get } from '@nestjs/common';
import {AppService} from "../services/app.service";
import {ConfigService} from "@nestjs/config";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {
  }

  @Get()
  getData() {

    return this.appService.getData();
  }
}
