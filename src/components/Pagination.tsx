// poke-api-2\src\components\ui\Pagination.tsx
import React from 'react';
import { Button, buttonVariants } from './ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, nextPage, previousPage }) => {
  return (
    <div>
      <Button variant="outline" onClick={previousPage} style={{ marginRight: '10px' }}>Предыдущая</Button>
      <Button variant="outline" onClick={nextPage}>Следующая</Button>
      <div>Страница {currentPage} из {totalPages}</div>
    </div>
  );
};

export default Pagination;