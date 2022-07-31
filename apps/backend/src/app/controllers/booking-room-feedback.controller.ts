import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { PaginationParams } from './pagination.model';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Feedback } from '../models';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { User } from '../decorators/keycloak-user.decorator';
import { BookingFeedbackSendRequestPayload } from '../payload/request/booking-feedback-send.request.payload';
import { BookingFeedbackService } from '../services/booking-feedback.service';

@Controller('/v1/booking-room-feedbacks')
@ApiTags('Booking Room Feedbacks')
export class BookingFeedbackController {
  constructor(private readonly service: BookingFeedbackService) {}

  @Get()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully got get all feedback',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for roles is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiOperation({
    summary: 'Get all feedback',
    description: 'Get all feedback',
  })
  getAllFeedbacks(
    @Query() payload: PaginationParams
  ): Promise<Pagination<Feedback>> {
    return this.service.getAllFeedbacks(payload as PaginationParams);
  }

  @Get(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched feedback by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for roles is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiOperation({
    summary: 'Get feedback by id',
    description: 'Get feedback by id',
  })
  getFeedbackById(@Param('id') id: string) {
    return this.service.getFeedbackById(id);
  }

  @Post('send-feedback')
  @Roles(Role.APP_STAFF, Role.APP_LIBRARIAN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send feedback',
    description: 'Send feedback',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully added feedback',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for roles is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  addNewFeedbackType(
    @User() user: KeycloakUserInstance,
    @Body() payload: BookingFeedbackSendRequestPayload
  ) {
    return this.service.addNewFeedback(user.account_id, payload);
  }

}
