const DEFAULT_PAGE_SIZE = 10;

export const paginate = (items, pageParam) => {
  const totalItems = items.length;
  const pageSize = DEFAULT_PAGE_SIZE;

  let currentPage = parseInt(pageParam, 10);
  if (Number.isNaN(currentPage) || currentPage < 1) currentPage = 1;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageItems = items.slice(startIndex, endIndex);

  return {
    pageItems,
    totalItems,
    totalPages,
    currentPage
  };
};
