import { Controller, Get, HttpStatus, UseInterceptors } from "@nestjs/common";
import { AppService } from "../services";
import { ConfigService } from "@nestjs/config";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";

@Controller()
@ApiTags("Application")
@UseInterceptors(new PathLoggerInterceptor(AppController.name))
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
