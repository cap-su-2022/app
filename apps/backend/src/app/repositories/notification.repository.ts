import { Repository } from 'typeorm';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Notification } from '../models/notification.entity';

@CustomRepository(Notification)
export class NotificationRepository extends Repository<Notification> {}
