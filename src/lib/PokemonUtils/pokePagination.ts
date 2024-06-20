// C:\Users\Pavel\poke-api-2\src\lib\PokemonUtils\pokePagination.ts
import { useState, useMemo } from 'react';

export const usePokemonPagination = (totalPages: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const nextPage = () => {
    setCurrentPage((prev) => prev < totalPages ? prev + 1 : prev);
  };
  
  const previousPage = () => {
    setCurrentPage((prev) => prev > 1 ? prev - 1 : prev);
  };
  
 const handleChange = (pageNumber: number) =>{
  setCurrentPage(pageNumber); 
 };
   
 const handleItemsPerChange = (event: any) => {
  setItemsPerPage(Number(event.target.value));
 };

 const pageNumbers = useMemo(() =>
  Array.from({ length: totalPages }, (_, i) => i + 1), 
  [totalPages]
  );


 return { 
   currentPage, 
   itemsPerPage,
   setItemsPerPage,
   nextPage,
   previousPage,
  handleChange,
  handleItemsPerChange,
  pageNumbers,
 };
};
