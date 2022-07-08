import { Injectable } from '@nestjs/common';
import { Accounts, AccountHist } from '../models';
import { AccountHistRepository } from '../repositories/account-hist.repository';

@Injectable()
export class AccountHistService {
  constructor(private readonly repository: AccountHistRepository) {}

  async createNew(account: Accounts): Promise<AccountHist> {
    return this.repository.createNew(account);
  }
}
