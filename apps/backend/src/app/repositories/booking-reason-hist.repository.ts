import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BookingReasonHist } from '../models/booking-reason-hist.entity';
import { BookingReason } from '../models/booking-reason.entity';
import { randomUUID } from 'crypto';

@CustomRepository(BookingReasonHist)
export class BookingReasonHistRepository extends Repository<BookingReasonHist> {
  async createNew(payload: BookingReason): Promise<BookingReasonHist> {
    return this.save({
      id: randomUUID(),
      bookingReasonId: payload.id,
      ...payload,
    });
  }
}
