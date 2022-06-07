import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";

@Controller("/v1/health")
@ApiTags("Health Check")
@UseInterceptors(new PathLoggerInterceptor(HealthCheckController.name))
export class HealthCheckController {


  @ApiOperation({
    description: "Health check endpoint without authentication"
  })
  @Get()
  doHealthCheck(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve("pong!");
      reject("dead");
    });
  }

  @ApiOperation({
    description: 'Health check endpoint without authentication'
  })
  @Get('auth')
  @UseGuards(AuthGuard)
  doHealthCheckWithAuth(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve("pong!");
      reject("dead");
    });
  }

}
