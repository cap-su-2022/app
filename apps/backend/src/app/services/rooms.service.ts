import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Rooms } from '../models';
import { RoomsRepository } from '../repositories';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { ChooseBookingRoomFilterPayload } from '../payload/request/choose-booking-room-filter.payload';
import { RoomsPaginationParams } from '../controllers/rooms-pagination.model';
import { RoomHistService } from './room-hist.service';
import { DataAddRequestPayload } from '../payload/request/data-add.request.payload';
import { DataSource } from 'typeorm';
import { BookingRoomService } from './booking-room.service';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly repository: RoomsRepository,
    private readonly histService: RoomHistService,
    @Inject(forwardRef(() => BookingRoomService))
    private readonly bookingRoomService: BookingRoomService
  ) {}

  async getAll(request: RoomsPaginationParams) {
    try {
      const result = await this.repository.searchRoom(request);
      if(result.meta.currentPage > result.meta.totalPages){
        throw new BadRequestException('Current page is over');
      } 
      return result
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message || 'One or more parameters is invalid');
    }
  }

  async getRoomNames() {
    try {
      return await this.repository.findRoomNames();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRoomsByRoomType(roomTypeId: string): Promise<Rooms[]> {
    try {
      return await this.repository.getRoomsByRoomType(roomTypeId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ??
          'An error occurred while getting rooms by type ' + roomTypeId
      );
    }
  }

  async getRoomName(id: string) {
    try {
      return await this.repository.getRoomName(id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while retrieving this room'
      );
    }
  }

  async findById(id: string): Promise<Rooms> {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room does not found with the provided id'
        );
      }
      const result = await this.repository.findById(id);
      if (!result) {
        throw new BadRequestException(
          'This room is already deleted or disabled'
        );
      }
      return result;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while retrieving this room'
      );
    }
  }

  async add(
    user: KeycloakUserInstance,
    room: DataAddRequestPayload
  ): Promise<Rooms> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.repository.isExistedByName(room.name);
      if (isExisted) {
        throw new BadRequestException('Room name is duplicated!');
      }
      const roomAdded = await this.repository.createNewRoom(
        room,
        user.account_id,
        queryRunner
      );
      await this.histService.createNew(roomAdded, queryRunner);

      await queryRunner.commitTransaction();
      return roomAdded;
    } catch (e) {
      this.logger.error(e.message);
      await queryRunner.rollbackTransaction();
      if (
        e.message.includes('constraint') &&
        e.message.includes('rooms_room_type_id_fk')
      ) {
        throw new BadRequestException(
          'There is no room type with the provided id'
        );
      }
      throw new BadRequestException(
        e.message ?? 'Error occurred while adding this room'
      );
    }
  }

  async updateById(accountId: string, id: string, body: DataAddRequestPayload) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const isExisted = await this.repository.existsById(id);
    if (!isExisted) {
      throw new BadRequestException('Room does not found with the provided id');
    }
    const data = await this.repository.findById(id);
    if (data === undefined) {
      throw new BadRequestException('This room is already deleted or disabled');
    }
    try {
      const roomUpdated = await this.repository.updateById(
        accountId,
        id,
        body,
        queryRunner
      );

      await this.histService.createNew(roomUpdated, queryRunner);

      await queryRunner.commitTransaction();
      return roomUpdated;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      if (
        e.message.includes('constraint') &&
        e.message.includes('rooms_room_type_id_fk')
      ) {
        throw new BadRequestException(
          'There is no room type with the provided id'
        );
      }
      throw new BadRequestException(
        e.message ?? 'Error occurred while updating this room'
      );
    }
  }

  async disableById(accountId: string, id: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room does not found with the provided id'
        );
      }
      const isDisabled = await this.repository.checkIfRoomIsDisabledById(id);
      if (isDisabled) {
        throw new BadRequestException('This room is already disabled');
      }
      const isDeleted = await this.repository.checkIfRoomIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException(
          'This room is already deleted, can not disable'
        );
      }
      const data = await this.repository.findById(id);
      const listRequestBooked =
        await this.bookingRoomService.getRequestByRoomId(id);
      if (listRequestBooked.length > 0) {
        const reason = `Room ${data?.name} was deleted. Request in this room was auto cancelled`
        for (let i = 0; i < listRequestBooked.length; i++) {
          await this.bookingRoomService.cancelRequest(
            accountId,
            listRequestBooked[i].id,
            reason,
            queryRunner
          );
        }
      }
      const room = await this.repository.disableById(
        accountId,
        id,
        queryRunner
      );
      await this.histService.createNew(room, queryRunner);

      await queryRunner.commitTransaction();
      return room;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }

  async getDisabledRooms(search: string): Promise<Rooms[]> {
    try {
      return await this.repository.findDisabledRooms(search);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while getting disabled rooms'
      );
    }
  }

  async handleRestoreDisabledRoomById(accountId: string, id: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room does not found with the provided id'
        );
      }
      const isDeleted = await this.repository.checkIfRoomIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This room is already deleted');
      }
      const isDisabled = await this.repository.checkIfRoomIsDisabledById(id);
      if (!isDisabled) {
        throw new BadRequestException(
          'This room ID is now active. Cannot restore it'
        );
      }
      const room = await this.repository.restoreDisabledRoomById(
        accountId,
        id,
        queryRunner
      );

      await this.histService.createNew(room, queryRunner);
      await queryRunner.commitTransaction();
      return room;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(
        e.message ??
          'Error occurred while restore the disabled status of this room'
      );
    }
  }

  async deleteById(accountId: string, id: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room does not found with the provided id'
        );
      }
      const isDeleted = await this.repository.checkIfRoomIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This room is already deleted');
      }
      const data = await this.repository.findById(id);

      const listRequestBooked =
        await this.bookingRoomService.getRequestByRoomId(id);
      if (listRequestBooked.length > 0) {
        const reason = `Room ${data?.name} was deleted. Request in this room was auto cancelled`
        for (let i = 0; i < listRequestBooked.length; i++) {
          await this.bookingRoomService.cancelRequest(
            accountId,
            listRequestBooked[i].id,
            reason,
            queryRunner
          );
        }
      }
      const room = await this.repository.deleteById(accountId, id, queryRunner);
      await this.histService.createNew(room, queryRunner);
      await queryRunner.commitTransaction();

      return room;
    } catch (e) {
      this.logger.error(e.message);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }

  async getDeletedRooms(search: string): Promise<Rooms[]> {
    try {
      return await this.repository.findDeletedRooms(search);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while getting deleted rooms'
      );
    }
  }

  async handleRestoreDeletedRoomById(accountId: string, id: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room does not found with the provided id'
        );
      }
      const isDisabled = await this.repository.checkIfRoomIsDisabledById(id);
      if (isDisabled) {
        throw new BadRequestException('This room is already disabled');
      }
      const isDeleted = await this.repository.checkIfRoomIsDeletedById(id);
      if (!isDeleted) {
        throw new BadRequestException(
          'This room ID is now active. Cannot restore it'
        );
      }

      const room = await this.repository.restoreDeletedRoomById(
        accountId,
        id,
        queryRunner
      );
      await this.histService.createNew(room, queryRunner);
      await queryRunner.commitTransaction();
      return room;
    } catch (e) {
      this.logger.error(e.message);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }

  // getAllWithoutPagination(): Promise<Rooms[]> {
  //   try {
  //     return this.repository
  //       .createQueryBuilder('rooms')
  //       .where('rooms.disabled_at IS NULL')
  //       .andWhere('rooms.deleted_at IS NULL')
  //       .getMany();
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw new BadRequestException(
  //       e.message ?? 'An error occurred while adding this room'
  //     );
  //   }
  // }

  // getRoomsFilterByNameAndType(payload: ChooseBookingRoomFilterPayload) {
  //   return this.repository.filterByNameAndType(payload);
  // }

  filterRoomFreeByRoomBooked(listIdRoomBooked: string[]) {
    return this.repository.filterRoomFreeByRoomBooked(listIdRoomBooked);
  }
}
