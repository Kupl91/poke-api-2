import React from 'react';
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, nextPage, previousPage }) => {
  const handleChange = (pageNumber: number) => {
    // Логика изменения страницы здесь.
  };

  return (
    <PaginationUI>
      <PaginationContent>
        <PaginationItem>
        <button onClick={previousPage}>
            <PaginationPrevious />
          </button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          (index + 1 === currentPage) ? (
            <div key={index}>
              <p><strong>{index + 1}</strong></p>
            </div>
          ) : (
            // Добавь более специфическую логику для обработчика кликов.
            <div key={index} onClick={() => handleChange(index + 1)}>{index + 1}</div>
          ))
        )}
        {totalPages > (currentPage + 5) && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <button onClick={() => handleChange(totalPages)}>
                  <PaginationNext />
              </button>
            </PaginationItem>
          </>
        )}
      </PaginationContent>
      <PaginationItem>
        <button onClick={nextPage}>
            <PaginationNext />
        </button>
      </PaginationItem>
    </PaginationUI>
  );
};

export default CustomPagination;