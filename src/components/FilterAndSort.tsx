// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\components\FilterAndSort.tsx
import React from 'react';
import { Input } from './ui/input';

interface FilterAndSortProps {
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterAndSort: React.FC<FilterAndSortProps> = ({ handleSortChange, handleFilterTypeChange, handleFilterValueChange }) => {
  return (
    <div className="flex space-x-4">
      <Input type="text" onChange={handleFilterValueChange} className="w-35" placeholder="Фильтр..." />
      <select onChange={handleFilterTypeChange}>
        <option value="name">Имя</option>
        <option value="id">ID</option>
        <option value="height">Высота</option>
      </select>
      <select onChange={handleSortChange}>
        <option value="id">ID</option>
        <option value="name">Имя</option>
        <option value="height">Высота</option>
      </select>
    </div>
  );
};

export default FilterAndSort;