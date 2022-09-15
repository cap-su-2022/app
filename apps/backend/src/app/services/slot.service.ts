import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { SlotRepository } from '../repositories/slot.repository';
import { PaginationParams } from '../controllers/pagination.model';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Slot } from '../models/slot.entity';
import { BookingRoomService } from './booking-room.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SlotsRequestPayload } from '../payload/request/slot-add.request.payload';
import { getConfigFileLoaded } from '../controllers/global-config.controller';
import { SlotsConfigRequestPayload } from '../payload/request/slot-config-request-add.payload';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

@Injectable()
export class SlotService {
  private readonly logger = new Logger(SlotService.name);

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly repository: SlotRepository,
    @Inject(forwardRef(() => BookingRoomService))
    private readonly bookingRoomService: BookingRoomService
  ) {}

  async getAll() {
    try {
      return Promise.resolve(getConfigFileLoaded().slots);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  // async getAllByPagination(
  //   params: PaginationParams
  // ): Promise<Pagination<Slot> | Slot[]> {
  //   try {
  //     let result;
  //     if (!params || !params.page) {
  //       result = await this.repository.findAll();
  //     } else {
  //       result = await this.repository.findByPagination(params);
  //       if(result.meta.totalPages > 0 && result.meta.currentPage > result.meta.totalPages){
  //         throw new BadRequestException('Current page is over');
  //       }
  //     }
  //     return result;
  //   } catch (e) {
  //     this.logger.error(e.message);
  //     throw new BadRequestException(e.message);
  //   }
  // }

  // async getSlotNames() {
  //   try {
  //     return await this.repository.findSlotNames();
  //   } catch (e) {
  //     this.logger.error(e.message);
  //     throw new BadRequestException(e.message);
  //   }
  // }

  // async getNumOfSlot(id: string) {
  //   try {
  //     const slot = await this.repository.getNumOfSlot(id);
  //     return slot;
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw new BadRequestException('One or more parameters is invalid');
  //   }
  // }

  async getById(id: string) {
    try {
      const slot = `slot${id}`;
      const slotInfor = Promise.resolve(getConfigFileLoaded().slots).then(
        (slots) => {
          return {
            ...slots[slot],
          };
        }
      );
      return slotInfor;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  // async getById(id: string) {
  //   try {
  //     const data = await this.repository.findById(id);
  //     if (data === undefined) {
  //       throw new BadRequestException('This slot is already deleted');
  //     }
  //     return data;
  //   } catch (e) {
  //     this.logger.error(e.message);
  //     throw new BadRequestException(e.message);
  //   }
  // }

  // getAll(): Promise<Slot[]> {
  //   return this.repository.findAll();
  // }

  async addNewSlot(slot: SlotsConfigRequestPayload) {
    try {
      const isValidTimeStart =
        /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(slot.start);

      if (!isValidTimeStart) {
        throw new BadRequestException('Time start is not valid');
      }

      const isValidTimeEnd =
        /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(slot.end);

      if (!isValidTimeEnd) {
        throw new BadRequestException('Time end is not valid');
      }

      await Promise.resolve(getConfigFileLoaded())
        .then((data) => {
          const slots = new Object(data.slots);
          const newSlotName = slot.name.toLowerCase().replace(/\s/g, '');

          const slotsArray = Object.values(slots);
          const isDuplicate = slotsArray.some((s) => {
            const resutl =
              (s.start <= slot.start && s.end > slot.start) ||
              (s.start < slot.end && s.end >= slot.end) ||
              (s.start > slot.start && s.end < slot.end);
            return resutl;
          });

          if (isDuplicate) {
            throw 'This time is duplicate';
          }

          fs.writeFileSync(
            './backend-config.yaml',
            yaml.dump({
              ...data,
              slots: {
                ...slots,
                [newSlotName]: slot,
              },
            })
          );
        })
        .catch((e) => {
          throw new BadRequestException(e)
        })
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async updateById(id: string, slot: SlotsConfigRequestPayload) {
    // const slotInfor =  getById(id);
  }

  async deleteSlotById(accountId: string, id: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Slot does not found with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException('This slot is already deleted');
      }

      // const listRequestBySlot =
      //   await this.bookingRoomService.getRequestBySlotId(id);
      // if (listRequestBySlot?.length > 0) {
      //   const reason = `${data.name} was deleted. Request in this slot was auto cancelled`;
      //   for (let i = 0; i < listRequestBySlot.length; i++) {
      //     this.bookingRoomService.cancelRequest(
      //       accountId,
      //       listRequestBySlot[i].id,
      //       reason,
      //       queryRunner
      //     );
      //   }
      // }

      const slot = await this.repository.deleteById(accountId, id, queryRunner);
      // await this.histService.createNew(slot);
      await queryRunner.commitTransaction();
      return slot;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    } finally {
      await queryRunner.release();
    }
  }

  async getDeletedSlots(search: string) {
    try {
      const slot = await this.repository.findDeletedByPagination(search);
      return slot;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async restoreDeletedSlotById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Slot does not found with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      if (!data.deletedAt) {
        throw new BadRequestException(
          'This slot ID is now active. Cannot restore it'
        );
      } else {
        const isHaveSlotSameNameActive =
          await this.repository.isHaveSlotSameNameActive(data.name);
        if (isHaveSlotSameNameActive) {
          throw new BadRequestException(
            `Already have slot with name '${data.name}' active.
            Try other name or delete slot have name '${data.name}' before restore`
          );
        }

        const isHaveSlotSameNumActive =
          await this.repository.isHaveSlotSameNumActive(data.slotNum);
        if (isHaveSlotSameNumActive) {
          throw new BadRequestException(
            `There already exists a slot with the same sequence number active.`
          );
        }
      }

      const roomType = await this.repository.restoreDeletedById(accountId, id);
      // await this.histService.createNew(roomType);
      return roomType;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
