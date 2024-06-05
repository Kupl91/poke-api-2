import React from 'react';
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { Button } from './ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage(): void;
  previousPage(): void;
  handleChange(pageNumber: number): void;
  handleItemsPerChange(event: any): void;
  itemsPerPage: number;
  pageNumbers: number[];
}

const CustomPagination = ({ 
  currentPage, 
  totalPages,
  nextPage,
  previousPage,
  handleChange,
  handleItemsPerChange,
  itemsPerPage,
  pageNumbers,
}: PaginationProps) => {
  return (
    <>
      <div className="mb-2">
        {"Rows per page:"}
        <select value={itemsPerPage} onChange={handleItemsPerChange}>
          {[5, 10, 15].map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
  
      <PaginationUI className="bg-gray-300 rounded-lg p-2">
        <PaginationContent>
          <PaginationItem>
            <Button onClick={() => handleChange(1)} variant="default" size="sm">
              В начало
            </Button>
          </PaginationItem>
  
          <PaginationItem>
            <Button onClick={previousPage} variant="default" size="sm">
              <PaginationPrevious />
            </Button>
          </PaginationItem>
          
          {pageNumbers.map((number) => {
            if (number === currentPage) {
              return (
                <div key={number} className="bg-gray-300 rounded-lg">
                  <p><strong>{number}</strong></p>
                </div>
              );
            } else if (Math.abs(number - currentPage) <= 3) {
              return (
                <Button key={number} onClick={() => handleChange(number)} variant="default" size="sm">
                  {number}
                </Button>
              );
            } else if (Math.abs(number - currentPage) > 3 && number === totalPages - (totalPages - number)) {
              return (
                <PaginationEllipsis key={`${number}-ellipsis`} />
              );
            }
            return null;
          })}
          
          {totalPages > (currentPage + 5) && (
            <PaginationEllipsis />
          )}
  
          <PaginationItem>
            <Button onClick={nextPage} variant="default" size="sm">
              <PaginationNext />
            </Button>
          </PaginationItem>
  
          <PaginationItem>
            <Button onClick={() => handleChange(totalPages)} variant="default" size="sm">
              В конец
            </Button>
          </PaginationItem>
        </PaginationContent>
      </PaginationUI>
    </>
  );
};

export default CustomPagination;
