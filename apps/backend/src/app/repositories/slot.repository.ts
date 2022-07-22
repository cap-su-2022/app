import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Slot } from '../models/slot.entity';
import { Repository } from 'typeorm';
import { PaginationParams } from '../controllers/pagination.model';
import { paginateRaw, Pagination } from 'nestjs-typeorm-paginate';
import { Accounts } from '../models';

@CustomRepository(Slot)
export class SlotRepository extends Repository<Slot> {
  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('sl')
      .select('COUNT(1)', 'count')
      .where('sl.id = :id', { id: id })
      .getRawOne()
      .then((data) => data?.count > 0);
  }

  isHaveSlotSameNameActive(name: string): Promise<boolean> {
    return this.createQueryBuilder('sl')
      .select('COUNT(1)', 'count')
      .where('sl.name ILIKE :name', { name: name })
      .andWhere('sl.deleted_by IS NULL')
      .andWhere('sl.deleted_at IS NULL')
      .getRawOne()
      .then((data) => data?.count > 0);
  }

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
      .orderBy('s.slot_num', 'ASC')
      .orderBy(params.sort, params.dir as 'ASC' | 'DESC');
    return paginateRaw<Slot>(query, {
      page: params.page,
      limit: params.limit,
    });
  }

  async getNumOfSlot(id: string): Promise<{ slotNum: number }> {
    return this.createQueryBuilder('slot')
      .select('slot.slot_num', 'slotNum')
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
      .addSelect('s.slot_num', 'slotNum')
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
        deletedBy: null,
      },
      order: {
        ['slotNum']: 'ASC',
      },
    });
  }

  async addNew(
    accountId: string,
    payload: { name: string; slotNum: number, timeStart: string, timeEnd: string, description: string }
  ): Promise<Slot> {
    return this.save<Slot>(
      {
        name: payload.name.trim(),
        slotNum: payload.slotNum,
        timeStart: payload.timeStart,
        timeEnd: payload.timeEnd,
        description: payload.description,
        createdBy: accountId,
        createdAt: new Date(),
      },
      {
        transaction: true,
      }
    );
  }

  async deleteById(accountId: string, id: string) {
    const isDeleted = await this.createQueryBuilder('slot')
      .update({
        deletedAt: new Date(),
        deletedBy: accountId,
      })
      .where('slot.id = :id', { id: id })
      .useTransaction(true)
      .execute();
    if (isDeleted.affected > 0) {
      return this.findOneOrFail({
        where: {
          id: id,
        },
      });
    }
  }

  findDeletedByPagination(search: string): Promise<Slot[]> {
    return this.createQueryBuilder('sl')
      .select('sl.id', 'id')
      .addSelect('sl.name', 'name')
      .addSelect('sl.time_start', 'timeStart')
      .addSelect('sl.time_end', 'timEnd')
      .addSelect('sl.deleted_at', 'deletedAt')
      .addSelect('a.username', 'deletedBy')
      .innerJoin(Accounts, 'a', 'a.id = sl.deleted_by')
      .where('sl.name ILIKE :search', { search: `%${search.trim()}%` })
      .andWhere('sl.deleted_at IS NOT NULL')
      .orderBy('sl.deleted_at', 'DESC')
      .getRawMany<Slot>();
  }

  async restoreDeletedById(accountId: string, id: string) {
    const isRestored = await this.createQueryBuilder('sl')
      .update({
        updatedAt: new Date(),
        updatedBy: accountId,
        deletedAt: null,
        deletedBy: null,
      })
      .where('sl.id = :id', { id: id })
      .useTransaction(true)
      .execute();
    if (isRestored.affected > 0) {
      return this.findOneOrFail({
        where: {
          id: id,
        },
      });
    }
  }

}
