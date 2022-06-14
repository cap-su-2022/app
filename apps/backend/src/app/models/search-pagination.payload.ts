export interface RepositoryPaginationPayload {
  search: string[] | string;
  limit: number;
  offset: number;
  direction: Direction[];
};

export type Direction = {
  name: string;
  order: "ASC" | "DESC";
}
