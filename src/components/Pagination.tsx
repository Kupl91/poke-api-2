import React from 'react';
import {Pagination as PaginationUI, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious, } from './ui/pagination';
import { Button } from './ui/button';
import { PaginationProps } from '@/lib/types';

const CustomPagination = ({ 
  currentPage, 
  totalPages,
  nextPage,
  previousPage,
  handleChange,
  pageNumbers,
}: PaginationProps) => {
  return (
    <>
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
