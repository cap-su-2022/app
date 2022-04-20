import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {Rooms} from "../models";

@EntityRepository(Rooms)
export class RoomsRepository extends Repository<Rooms>{

}
