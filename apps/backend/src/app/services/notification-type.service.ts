import { Injectable } from '@nestjs/common';
import { NotificationTypeRepository } from '../repositories';

@Injectable()
export class NotificationTypeService {
  constructor(private readonly repository: NotificationTypeRepository) {}
}
