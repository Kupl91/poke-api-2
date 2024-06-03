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

  return {
    sortType,
    filterType,
    filterValue,
    handleSortChange,
    handleFilterTypeChange,
    handleFilterValueChange,
    sortedAndFilteredPokemons: pokemons
      .filter((pokemon) =>
        (pokemon[filterType] as string | number)?.toString().toLowerCase().includes(filterValue)
      )
      .sort((a, b) => {
        if (typeof a[sortType] === 'string' && typeof b[sortType] === 'string') {
          return (a[sortType] as string).localeCompare(b[sortType] as string);
        } else if (typeof a[sortType] === 'number' && typeof b[sortType] === 'number') {
          return (a[sortType] as number) - (b[sortType] as number);
        }
        return 0;
      })
  };
};
