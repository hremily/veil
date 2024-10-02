import { DEFAULT_PAGE_SIZE, PAGE } from '../utils/pagination.constans';

export const paginationFunc = (limit: number, skip: number) => {
  const pageSize = limit || DEFAULT_PAGE_SIZE;
  const calcSkip = (PAGE - 1) * pageSize;
  const pageSkip = skip || calcSkip;

  return { pageSize, pageSkip };
};
