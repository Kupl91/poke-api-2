import React from 'react';
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, nextPage, previousPage }) => {
  const handleChange = (pageNumber) => {
    if (pageNumber > currentPage) {
      nextPage();
    } else if (pageNumber < currentPage) {
      previousPage();
    }
  };

  return (
    <PaginationUI>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={previousPage} />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink isActive={index + 1 === currentPage} onClick={() => handleChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
};

export default Pagination;
