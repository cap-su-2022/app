import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {DataSource} from "typeorm";
import {KeycloakUserInstance} from "../dto/keycloak.user";
import {Holidays, Rooms} from "../models";
import {HolidayAddRequestPayload} from "../payload/request/holidays-add.request.payload";
import {HolidaysRepository} from "../repositories/holidays.repository";
import {PaginationParams} from "../controllers/pagination.model";
import {RoomAddRequestPayload} from "../payload/request/room-add.request.payload";
import {getConfigFileLoaded} from "../controllers/global-config.controller";

@Injectable()
export class HolidaysService {
  private readonly logger = new Logger(HolidaysService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly repository: HolidaysRepository,
  ) {

  }

  async getAll(request: PaginationParams) {
    try {
      const result = await this.repository.searchHoliday(request);
      if (
        result.meta.totalPages > 0 &&
        result.meta.currentPage > result.meta.totalPages
      ) {
        throw new BadRequestException('Current page is over');
      }
      console.log(result.meta)
      return result;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message || 'One or more parameters is invalid'
      )
    }
  }

  async getHolidayNames() {
    try {
      return await this.repository.getHolidayNames();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async findById(id: string): Promise<Holidays> {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Holiday does not found with the provided id'
        );
      }
      const result = await this.repository.findById(id);
      if (!result) {
        throw new BadRequestException('This holiday is already deleted');
      }
      return result;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while retrieving this holiday'
      );
    }
  }


  async add(
    user: KeycloakUserInstance,
    holiday: HolidayAddRequestPayload
  ): Promise<Holidays> {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const dateStartIsValid = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(holiday.dateStart);
      const dateEndIsValid = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(holiday.dateEnd);

      if (!dateStartIsValid) {
        throw new BadRequestException('Date Start must be corrected format yyyy-mm-dd');
      }
      if (!dateEndIsValid) {
        throw new BadRequestException('Date End must be corrected format yyyy-mm-dd');
      }

      if (holiday.dateStart > holiday.dateEnd) {
        throw new BadRequestException('Date Start must be less than or equal to Date End');
      }

      const holidayDeletedSameName = await this.repository.getHolidayDeletedByName(holiday.name);
      let holidayAdded;
      if (holidayDeletedSameName) {
        holidayAdded = await this.repository.restoreDeletedHolidayIsDuplicateName(
          holiday,
          user.account_id,
          holidayDeletedSameName.id,
          queryRunner
        )
      } else {
        const isExisted = await this.repository.isExistedByNameActive(holiday.name);
        if (isExisted) {
          throw new BadRequestException(
            'There is already existed holiday with this name. Try with another name.'
          );
        }
        holidayAdded = await this.repository.createNewHoliday(
          user.account_id,
          holiday,
        );
      }
      await queryRunner.commitTransaction();
      return holidayAdded;
    } catch (e) {
      this.logger.error(e.message);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(
        e.message ?? 'Error occurred while adding this holiday'
      );
    } finally {
      await queryRunner.release();
    }
  }

  async updateById(accountId: string, id: string, body: HolidayAddRequestPayload) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Holiday does not found with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException('This holiday is already deleted');
      }
      const dateStartIsValid = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(body.dateStart);
      const dateEndIsValid = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(body.dateEnd);

      if (!dateStartIsValid) {
        throw new BadRequestException('Date Start must be corrected format yyyy-mm-dd');
      }
      if (!dateEndIsValid) {
        throw new BadRequestException('Date End must be corrected format yyyy-mm-dd');
      }

      if (body.dateStart > body.dateEnd) {
        throw new BadRequestException('Date Start must be less than or equal to Date End');
      }
      const isExistedByName = await this.repository.isExistedByNameActiveUpdate(
        body.name,
        id
      );
      if (isExistedByName) {
        throw new BadRequestException(
          'There is already existed holiday with the this name. Try with another name.'
        );
      }

      const holidayUpdated = await this.repository.updateById(
        accountId,
        id,
        body,
        queryRunner
      );
      await queryRunner.commitTransaction();
      return holidayUpdated;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(
        e.message ?? 'Error occurred while updating this holiday'
      );
    } finally {
      await queryRunner.release();
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
          'Holiday does not found with the provided id'
        );
      }
      const isDeleted = await this.repository.checkIfHolidayIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This holiday is already deleted');
      }
      const holiday = await this.repository.deleteById(accountId, id, queryRunner);
      await queryRunner.commitTransaction();

      return holiday;
    } catch (e) {
      this.logger.error(e.message);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    } finally {
      await queryRunner.release();
    }
  }

  async getDeletedHolidays(search: string): Promise<Holidays[]> {
    try {
      return await this.repository.findDeletedHolidays(search);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while getting deleted holidays'
      );
    }
  }

  async restoreDeletedHolidayById(accountId: string, id: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Holiday does not found with the provided id'
        );
      }
      const isDeleted = await this.repository.checkIfHolidayIsDeletedById(id);
      if (!isDeleted) {
        throw new BadRequestException(
          'This holiday ID is now active. Cannot restore it'
        );
      }

      const holiday = await this.repository.restoreDeletedHolidayById(
        id,
        accountId,
        queryRunner
      );
      await queryRunner.commitTransaction();
      return holiday;
    } catch (e) {
      this.logger.error(e.message);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }


}
