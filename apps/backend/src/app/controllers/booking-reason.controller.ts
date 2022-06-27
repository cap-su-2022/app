import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BookingReasonService } from '../services/booking-reason.service';

@Controller('/v1/booking-reason')
export class BookingReasonController {
  constructor(private readonly service: BookingReasonService) {}

  @Get()
  getAllBookingReasons(
    @Query('dir', new DefaultValuePipe('ASC')) dir: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('search', new DefaultValuePipe('')) search: string,
    @Query('sort', new DefaultValuePipe('')) sort: string
  ) {
    return this.service.getAllByPagination({
      page,
      dir,
      search,
      sort,
      limit,
    });
  }
}
