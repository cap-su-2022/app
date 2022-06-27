export interface RoomParams {
  page?: number;
  limit?: number;
  name?: string;
  type?: string;
  dir?: string;
  sort?: string;
}

export const defaultPaginationParams: RoomParams = {
  page: 1,
  limit: 5,
  name: '',
  type: '',
  dir: 'ASC',
  sort: 'name',
};
