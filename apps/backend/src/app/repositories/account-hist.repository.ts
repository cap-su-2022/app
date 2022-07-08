import { Repository } from 'typeorm';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { AccountHist, Accounts } from '../models';

@CustomRepository(AccountHist)
export class AccountHistRepository extends Repository<AccountHist> {
    async createNew(payload: Accounts): Promise<AccountHist> {
      console.log("AAAAAAAAAA: ", payload)
      const accountId = payload.id;
      delete payload.id
      return this.save({
        accountId: accountId,
        ...payload,
      });
    }
  }
