// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\components\FilterAndSort.tsx
import React from 'react';
import { Input } from './ui/input';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from './ui/select'; 

interface FilterAndSortProps {
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterAndSort: React.FC<FilterAndSortProps> = ({ 
  handleSortChange, 
  handleFilterTypeChange, 
  handleFilterValueChange 
}) => {
  return (
    <div className="flex space-x-4 bg-gray-100 rounded-lg">
      <Input
        type="text"
        onChange={handleFilterValueChange}
        className="w-35 bg-gray-200"
        placeholder="Фильтрация по "
      />
      <Select onValueChange={handleFilterTypeChange} className="bg-gray-200 rounded-lg">
        <SelectTrigger>
          <SelectValue placeholder="Выберите опцию" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Имя</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="height">Высота</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={handleSortChange} className="bg-gray-200 rounded-lg">
        <SelectTrigger>
          <SelectValue placeholder="Выберите опцию" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Имя</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="height">Высота</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterAndSort;
