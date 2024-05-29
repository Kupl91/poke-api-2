// C:\Users\Pavel\poke-api-2\src\lib\PokemonUtils\pokeFilterAndSort.ts
import { useState } from 'react';

export const usePokemonFilterAndSort = (pokemons) => {
  const [sortType, setSortType] = useState('id');
  const [filterType, setFilterType] = useState('name');
  const [filterValue, setFilterValue] = useState('');

  const handleSortChange = (value) => {
    setSortType(value);
  };

  const handleFilterTypeChange = (value) => {
    setFilterType(value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value.toLowerCase());
  };

  const sortedAndFilteredPokemons = pokemons
    .filter((pokemon) => pokemon[filterType]?.toString().toLowerCase().includes(filterValue))
    .sort((a, b) => {
      if (sortType === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a[sortType] - b[sortType];
      }
    });

  return { 
    sortType, 
    filterType, 
    filterValue, 
    handleSortChange, 
    handleFilterTypeChange, 
    handleFilterValueChange, 
    sortedAndFilteredPokemons 
  };
};
