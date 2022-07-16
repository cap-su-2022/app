import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Slot } from '../models/slot.entity';
import { Repository } from 'typeorm';
import { PaginationParams } from '../controllers/pagination.model';
import { paginateRaw, Pagination } from 'nestjs-typeorm-paginate';
import { Accounts } from '../models';

@CustomRepository(Slot)
export class SlotRepository extends Repository<Slot> {
  findByPagination(params: PaginationParams): Promise<Pagination<Slot>> {
    const query = this.createQueryBuilder('s')
      .select('s.id', 'id')
      .addSelect('s.time_start', 'timeStart')
      .addSelect('s.time_end', 'timeEnd')
      .addSelect('s.name', 'name')
      .where('s.deleted_at IS NULL')
      .andWhere('LOWER(s.name) LIKE LOWER(:search)', {
        search: `%${params.search}%`,
      })
      .orderBy(params.sort, params.dir as 'ASC' | 'DESC');
    return paginateRaw(query, {
      page: params.page,
      limit: params.limit,
    });
  }

  async getNumOfSlot(id: string): Promise<{ slotNum: number;}> {
    return this.createQueryBuilder('slot')
      .select('slot.slot_num', "slotNum")
      .where('slot.id = :slotId', { slotId: id })
      .getRawOne();
  }

  async findSlotNames(): Promise<Slot[]> {
    return this.createQueryBuilder('slots')
      .select('slots.name', 'name')
      .addSelect('slots.id', 'id')
      .addSelect('slots.slot_num', 'slotNum')
      .addSelect('slots.time_start', 'timeStart')
      .addSelect('slots.time_end', 'timeEnd')
      .where('slots.deleted_by IS NULL')
      .andWhere('slots.deleted_at IS NULL')
      .orderBy('slot_num', 'ASC')
      .getRawMany<Slot>();
  }

  async findById(id: string): Promise<Slot> {
    return this.createQueryBuilder('s')
      .select('s.id', 'id')
      .addSelect('s.name', 'name')
      .addSelect('s.time_start', 'timeStart')
      .addSelect('s.time_end', 'timeEnd')
      .addSelect('a.username', 'createdBy')
      .addSelect('s.created_at', 'createdAt')
      .addSelect('aa.username', 'updatedBy')
      .addSelect('s.updated_at', 'updatedAt')
      .addSelect('s.description', 'description')
      .innerJoin(Accounts, 'a', 'a.id = s.created_by')
      .leftJoin(Accounts, 'aa', 'aa.id = s.updated_by')
      .where('s.deleted_at IS NULL')
      .andWhere('s.id = :id', { id: id })
      .getRawOne<Slot>();
  }

  findAll(): Promise<Slot[]> {
    return this.find({
      where: {
        deletedAt: null,
        deletedBy: null
      }
    });
  }
}
