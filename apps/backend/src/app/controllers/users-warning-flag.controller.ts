import {Controller, Get, HttpStatus} from "@nestjs/common";
import {UsersWarningFlagService} from "../services/users-warning-flag.service";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('v1/users-warning-flag')
@ApiBearerAuth()
export class UsersWarningFlagController {

  constructor(private readonly service: UsersWarningFlagService) {
  }
  @ApiOperation({
    description: 'Room Booking',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully added a user into a warning flag history list',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for users warning flag is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Invalid role',
  })


  @Get()
  getAll(): Promise<UsersWarningFlag[]> {
    return this.service.getAllByPagination();
  }

  @Get('find/:id')
  getUserById(id: any): Promise<UsersWarningFlag>{
    return this.service.getUserById(id);
  }


}
