import {Controller, Get, HttpStatus, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {AuthGuard} from "../guards/auth.guard";

@Controller('/v1/health')
@ApiBearerAuth()
export class HealthCheckController {

  @ApiOperation({
    description: 'Health checking devices',
  })

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for health check is not validated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Invalid role',
  })

  @Get()
  @UseGuards(AuthGuard)
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
