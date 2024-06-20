import React from 'react';
import { Input } from './ui/input';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from './ui/select'; 
import { Pokemon, FilterAndSortProps } from '@/lib/types';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from './ui/table';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const FilterAndSort: React.FC<FilterAndSortProps> = ({
  handleSortChange,
  handleSortDirectionChange,
  handleFilterTypeChange,
  handleFilterValueChange,
  sortDirection
}) => {
  
  const sortAttributes = [
    "name",
    "weight",
    "height",
    "species", 
    "experience"
  ].map(key => ({ key:key as keyof Pokemon, label:key.charAt(0).toUpperCase()+key.slice(1)}));

 return (
   <div className="space-y-4">
     <div className="flex space-x-4 bg-gray-300 rounded-lg">
       <Input
         type="text"
         onChange={handleFilterValueChange}
         className="w-35 bg-gray-300"
         placeholder="Фильтрация по "
       />
       <Select onValueChange={(value) => handleFilterTypeChange(value as keyof Pokemon)}>
  <SelectTrigger className="bg-grey-300">
    <SelectValue placeholder="Выберите опцию" />
  </SelectTrigger>
  <SelectContent>
    {
      sortAttributes.map((attribute) => (
        <SelectItem value={attribute.key} key={`filter-${attribute.key}`}>{attribute.label}</SelectItem>
      ))
    }
  </SelectContent>
</Select>
     </div>
     
     <Table className="min-w-full divide-y divide-gray-200">
       <TableHeader>
         <TableRow>
           {
             sortAttributes.map((attribute, idx) => (
              <TableHead key={`sort-${attribute.key}`}>
                <button onClick={() => handleSortChange(attribute.key)} style={{ display: 'flex', alignItems: 'center' }}>
                  {`${attribute.label} `}
                  {sortDirection === 'asc' ? <FaArrowUp size={15} /> : <FaArrowDown size={15} />}
                </button>
               </TableHead>
             ))
           }
           <TableHead>Действия</TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         {/* Здесь будут строки таблицы */}
       </TableBody>
     </Table>
     
   </div> 
 );
};

export default FilterAndSort;