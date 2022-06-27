import { Injectable } from '@nestjs/common';
import { BookingReason } from '../models/booking-reason.entity';
import { BookingReasonHistRepository } from '../repositories/booking-reason-hist.repository';
import { BookingReasonHist } from '../models/booking-reason-hist.entity';

@Injectable()
export class BookingReasonHistService {
  constructor(private readonly repository: BookingReasonHistRepository) {}

  async createNew(bookingReason: BookingReason): Promise<BookingReasonHist> {
    return this.repository.createNew(bookingReason);
  }
}
