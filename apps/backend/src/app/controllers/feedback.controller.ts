import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { FeedbackService } from '../services';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginationParams } from './pagination.model';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Feedback } from '../models';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { User } from '../decorators/keycloak-user.decorator';
import { FeedbackSendRequestPayload } from '../payload/request/feedback-send.request.payload';
import { FeedbackResolveRequestPayload } from '../payload/request/feedback-resolve.request.payload';

@Controller('/v1/feedbacks')
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

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
    @Body() payload: FeedbackSendRequestPayload
  ) {
    return this.service.addNewFeedback(user.account_id, payload);
  }

  @Put('resolve/:id')
  @Roles(Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully resolve feedback by id',
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
    summary: 'Resolve feedback by id',
    description: 'Resolve feedback by id',
  })
  resolveFeedbackById(
    @Param('id') id: string,
    @Body() payload: FeedbackResolveRequestPayload,
    @User() user: KeycloakUserInstance
  ) {
    return this.service.resolveFeedbackById(user.account_id, id, payload);
  }

  @Put('reject/:id')
  @Roles(Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully Rejected feedback by id',
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
    summary: 'Rejected feedback by id',
    description: 'Rejected feedback by id',
  })
  rejectFeedbackById(
    @Param('id') id: string,
    @User() user: KeycloakUserInstance
  ) {
    return this.service.rejectFeedbackById(user.account_id, id);
  }
}
