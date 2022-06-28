import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BookingReasonService } from '../services/booking-reason.service';
import { BookingReason } from '../models/booking-reason.entity';

@Controller('/v1/booking-reasons')
export class BookingReasonController {
  constructor(private readonly service: BookingReasonService) {}

  @Get()
  getAllBookingReasons(
    @Query('dir', new DefaultValuePipe('ASC')) dir: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('search', new DefaultValuePipe('')) search: string,
    @Query('sort', new DefaultValuePipe('name')) sort: string
  ) {
    return this.service.getAllByPagination({
      page,
      dir,
      search,
      sort,
      limit,
    });
  }

  @Get(':id')
  getBookingReasonById(@Param('id') id: string): Promise<BookingReason> {
    return this.service.getBookingReasonById(id);
  }
}
