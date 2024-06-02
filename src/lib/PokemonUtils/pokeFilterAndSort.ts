// C:\Users\Pavel\poke-api-2\src\lib\PokemonUtils\pokeFilterAndSort.ts
import { useState } from 'react';
import { Pokemon } from '@/lib/types';

export const usePokemonFilterAndSort = (pokemons: Pokemon[]) => {
  const [sortType, setSortType] = useState<keyof Pokemon>('id');
  const [filterType, setFilterType] = useState<keyof Pokemon>('name');
  const [filterValue, setFilterValue] = useState('');

  const handleSortChange = (value: keyof Pokemon) => {
    setSortType(value);
  };

  const handleFilterTypeChange = (value: keyof Pokemon) => {
    setFilterType(value);
  };

  const handleFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value.toLowerCase());
  };

  const sortedAndFilteredPokemons = pokemons
    .filter((pokemon) =>
      pokemon[filterType]?.toString().toLowerCase().includes(filterValue)
    )
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
