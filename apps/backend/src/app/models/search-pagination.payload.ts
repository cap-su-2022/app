export interface RepositoryPaginationPayload {
  search: string[] | string;
  limit: number;
  page: number;
  direction: Direction[];
};

export type Direction = {
  name: string;
  order: "ASC" | "DESC";
}
