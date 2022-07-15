import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BookingRequest, BookingRequestHist } from '../models';

@CustomRepository(BookingRequestHist)
export class BookingRequestHistRepository extends Repository<BookingRequestHist> {
  async createNew(payload: BookingRequest): Promise<BookingRequestHist> {
    const bookingRequestId = payload.id;
    delete payload.id
    return this.save({
      bookingRequestId: bookingRequestId,
      ...payload,
    });
  }
}
