import { Controller, Get, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import AuthGuard from "../guards/auth.guard";
import { FastifyRequest } from "fastify";

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
    description: "Health check endpoint without authentication"
  })
  @Get("auth")
  @UseGuards(AuthGuard)
  doHealthCheckWithAuth(@Req() request: FastifyRequest): Promise<string> {
    console.log(request.headers["Authorization"]);
    return new Promise((resolve, reject) => {
      resolve("pong!");
      reject("dead");
    });
  }

}
