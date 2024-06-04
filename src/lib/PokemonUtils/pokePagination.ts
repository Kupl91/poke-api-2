// C:\Users\Pavel\poke-api-2\src\lib\PokemonUtils\pokePagination.ts
import { useState } from 'react';

export const usePokemonPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const previousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };
  
 const handleChange = (pageNumber: number) =>{
  setCurrentPage(pageNumber); 
 };
   
 const handleItemsPerChange = (event: any) => {
  setItemsPerPage(Number(event.target.value));
 };

 return { 
   currentPage, 
   itemsPerPage,
   setItemsPerPage,
   nextPage,
   previousPage,
  handleChange,
  handleItemsPerChange,
 };
};