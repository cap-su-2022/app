import { Repository } from 'typeorm';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { NotificationType } from '../models/notification-type.entity';

@CustomRepository(NotificationType)
export class NotificationTypeRepository extends Repository<NotificationType> {}
