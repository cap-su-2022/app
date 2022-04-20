import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {Users} from "../models";

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {

  findByGoogleId(googleId: string): Promise<Users> {
    return this.createQueryBuilder("users")
      .where("users.googleId = :googleId", {googleId})
      .getOne();
  }

}
