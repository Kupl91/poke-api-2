// C:\Users\Pavel\poke-api-2\src\lib\PokemonUtils\pokePagination.ts
import { useState } from 'react';

export const usePokemonPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const previousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

 return { 
   currentPage, 
   itemsPerPage, 
   nextPage,
   previousPage,
 };
};