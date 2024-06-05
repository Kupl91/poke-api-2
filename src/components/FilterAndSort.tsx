// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\components\FilterAndSort.tsx
import React from 'react';
import { Input } from './ui/input';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from './ui/select'; 
import { Pokemon } from '@/lib/types';

interface FilterAndSortProps {
  handleSortChange: (value: keyof Pokemon) => void;
  handleFilterTypeChange: (value: keyof Pokemon) => void;
  handleFilterValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const FilterAndSort: React.FC<FilterAndSortProps> = ({ 
  handleSortChange, 
  handleFilterTypeChange, 
  handleFilterValueChange 
}) => {
  return (
    <div className="flex space-x-4 bg-gray-300 rounded-lg">
      <Input
        type="text"
        onChange={handleFilterValueChange}
        className="w-35 bg-gray-300"
        placeholder="Фильтрация по "
      />
      <Select onValueChange={handleFilterTypeChange} >
        <SelectTrigger className="bg-grey-300">
          <SelectValue placeholder="Выберите опцию" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Имя</SelectItem>
          <SelectItem value="weight">Вес</SelectItem>
          <SelectItem value="height">Высота</SelectItem>
          <SelectItem value="species">Вид</SelectItem>
          <SelectItem value="experience">Опыт</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={handleSortChange} >
        <SelectTrigger className="bg-grey-300">
          <SelectValue placeholder="Выберите опцию" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Имя</SelectItem>
          <SelectItem value="weight">Вес</SelectItem>
          <SelectItem value="height">Высота</SelectItem>
          <SelectItem value="species">Вид</SelectItem>
          <SelectItem value="experience">Опыт</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterAndSort;
