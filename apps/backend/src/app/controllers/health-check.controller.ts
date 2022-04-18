import {Controller, Get, UseGuards} from "@nestjs/common";
import {ApiOperation} from "@nestjs/swagger";
import {AuthGuard} from "../guards/auth.guard";

@Controller('/v1/health')
export class HealthCheckController {


  @ApiOperation({
    description: 'Health check endpoint without authentication'
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
