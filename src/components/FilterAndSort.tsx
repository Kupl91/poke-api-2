import React from 'react';
import { Input } from './ui/input';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from './ui/select'; 
import { Pokemon } from '@/lib/types';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from './ui/table';

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
  
  const sortAttributes = [
    { key: 'name', label: 'Имя' },
    { key: 'weight', label: 'Вес' },
    { key: 'height', label: 'Высота' },
    { key: 'species', label:'Вид' },
    { key:'experience',label:'Опыт'}
 ];

 return (
   <div className="space-y-4">
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
           {/* Вставляем те же самые атрибуты что и в `sortAttributes` */}
           {
             sortAttributes.map((attribute)=>(
              <SelectItem value={attribute.key}>{attribute.label}</SelectItem>
             ))
           }
         </SelectContent>
       </Select>
     </div>
     
     <Table className="min-w-full divide-y divide-gray-200">
       <TableHeader>
         <TableRow>
           {
             sortAttributes.map((attribute) => (
               <TableHead key={attribute.key} onClick={() => handleSortChange(attribute.key)}>
                 <button>{`${attribute.label}`}</button>
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
