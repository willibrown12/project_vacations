import { useState } from "react";

function usePagination(data: Array<any>, itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);



  // Calculates and returns a slice of data for the current page.
// `begin` is the starting index, and `end` is the exclusive end index.
// Slices the data array to include only items for the current page.
  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  const next = () => {
    if (currentPage < maxPage) setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const jump = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, maxPage)));
  };

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;



