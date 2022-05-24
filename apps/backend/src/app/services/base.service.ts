import {PaginationPayload} from "../payload/request/pagination.payload";

export abstract class BaseService<M, E, ID> {
  abstract getAll(): Promise<E[]>;

  abstract getAllByPagination(p: PaginationPayload<any>): Promise<E[]>;

  abstract addAll(models: M[]): Promise<E[]>;

  abstract add(model: M): Promise<E>;

  abstract deleteById(id: ID): Promise<void>;

  abstract getById(id: ID): Promise<E>;

  abstract updateById(model: M, id: ID): Promise<E>;
}
