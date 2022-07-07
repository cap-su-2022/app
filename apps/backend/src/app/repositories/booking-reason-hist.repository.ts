import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BookingReasonHist } from '../models/booking-reason-hist.entity';
import { BookingReason } from '../models/booking-reason.entity';

@CustomRepository(BookingReasonHist)
export class BookingReasonHistRepository extends Repository<BookingReasonHist> {
  async createNew(payload: BookingReason): Promise<BookingReasonHist> {
    const bookingReasonId = payload.id;
    delete payload.id
    return this.save({
      bookingReasonId: bookingReasonId,
      ...payload,
    });
  }

  async deleteAllHist(id: string) {
    return await this.createQueryBuilder('booking_reason_hist')
      .delete()
      .where('booking_reason_hist.booking_reason_id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }
}
