import { Injectable } from '@nestjs/common';
import { BookingRequest, BookingRequestHist} from '../models';
import { BookingRequestHistRepository } from '../repositories/booking-request-hist.repository';

@Injectable()
export class BookingRequestHistService {
    constructor(private readonly repository: BookingRequestHistRepository) {}

  async createNew(request: BookingRequest): Promise<BookingRequestHist> {
    return this.repository.createNew(request);
  }
}
