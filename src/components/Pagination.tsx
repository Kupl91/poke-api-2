// poke-api-2\src\components\ui\Pagination.tsx
import React from 'react';
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,

  PaginationPrevious,
} from './ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage(): void;
  previousPage(): void;
  handleChange(pageNumber: number): void;
  handleItemsPerChange(event: any): void;
  itemsPerPage: number;
}

const CustomPagination = ({ 
  currentPage, 
  totalPages,
  nextPage,
  previousPage,
 handleChange,
 handleItemsPerChange,
 itemsPerPage
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
          <button onClick={previousPage} className="bg-gray-300 rounded-lg">
            <PaginationPrevious />
          </button>
        </PaginationItem>
        
        {[...Array(totalPages)].map((_, index) => (
          (index + 1 === currentPage) ? (
            <div key={index} className="bg-gray-300 rounded-lg">
              <p><strong>{index + 1}</strong></p>
            </div>
          ) : (
            <div key={index} onClick={() => handleChange(index + 1)} className="bg-gray-300 rounded-lg">{index + 1}</div>
          )
        ))}
        
        {totalPages > (currentPage + 5) && (
          <>
             <PaginationEllipsis />
          </>
        )}

        <PaginationItem>
          <button onClick={nextPage} className="bg-gray-300 rounded-lg">
            <PaginationNext />
          </button>
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  </>
);
};
export default CustomPagination;
