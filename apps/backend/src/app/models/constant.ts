export const SEARCH_ROOMS_PAGINATION = (direction) => {
  return `SELECT * FROM rooms r WHERE r.description LIKE :search
     OR r.name LIKE :search ORDER BY r.id ${direction} LIMIT :limit OFFSET :offset`;
};
