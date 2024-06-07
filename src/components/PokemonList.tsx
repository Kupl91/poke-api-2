//C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\components\PokemonList.tsx
import React,{ useState }  from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerHeader } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from './ui/dropdown-menu';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from './ui/table'; 
import { Pokemon } from '@/lib/types';
import { Checkbox } from './ui/checkbox'; // импортируйте Checkbox

interface PokemonListProps {
  pokemons: Pokemon[];
  handleDeleteClick: (id: number) => void;
  handleDetailsClick: (id: number) => void;
  handleUpdateSubmit: () => void;
  handleUpdateClick: (id: number) => void;
  handleUpdateInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedDetail: Pokemon | null;
  updatingPokemon: Pokemon | null;
  currentPage: number;
  itemsPerPage: number;
  selectedPokemons: number[]; // добавьте это
  handleCheckboxChange: (id: number) => void; // добавьте это
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  handleDeleteClick,
  handleDetailsClick,
  handleUpdateSubmit,
  handleUpdateClick,
  handleUpdateInputChange,
  selectedDetail,
  updatingPokemon,
  currentPage,
  itemsPerPage,
  selectedPokemons, 
  handleCheckboxChange, 
}) => {
  return (
  <div className="bg-gray-300">
    <Table>
    {selectedPokemons.length > 0 && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-gray-200">Действия</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={4} className="p-1 bg-white shadow-md">
          <DropdownMenuItem>
            <Button variant="outline" className="bg-gray-200">Кнопка 1</Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="outline" className="bg-gray-200">Кнопка 2</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>  
    )}
      <TableBody>
        {pokemons
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((pokemon) => (
            <TableRow onClick={() => console.log('TableRow clicked')}>
  <TableCell>
    <Checkbox 
      onChange={(e) => {
        e.stopPropagation();
        handleCheckboxChange(pokemon.id);
      }}
    />
  </TableCell>
              <TableCell>{pokemon.name}</TableCell>
              <TableCell>{pokemon.weight}</TableCell>
              <TableCell>{pokemon.height}</TableCell>
              <TableCell>{pokemon.species}</TableCell>
              <TableCell>{pokemon.experience}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-gray-200">...</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={4} className="p-1 bg-white shadow-md">
                    <DropdownMenuItem>
                      <Button variant="destructive" onClick={() => handleDeleteClick(pokemon.id)} className="bg-red-600">Удалить</Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" onMouseOver={() => handleDetailsClick(pokemon.id)} className="bg-gray-200">Детали</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent sideOffset={4} className="p-1 bg-white shadow-md">
                          {selectedDetail && selectedDetail.id === pokemon.id && (
                            <>
                              <DropdownMenuItem>{`ID: ${selectedDetail.id}`}</DropdownMenuItem>
                              {selectedDetail.abilities && selectedDetail.abilities.map((ability) => (
                                <DropdownMenuItem key={ability.ability.name}>{`Способность: ${ability.ability.name}`}</DropdownMenuItem>
                              ))}
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Drawer> 
                      <DrawerTrigger asChild>
                        <Button variant="outline" onClick={(event) => { event.stopPropagation(); handleUpdateClick(pokemon.id); }} className="bg-blue-500">Обновить</Button>
                      </DrawerTrigger>
                      <DrawerContent className="bg-black text-gray-200 w-1/3" onClick={(e) => e.stopPropagation()}>
                        <DrawerClose />
                        <DrawerHeader>Обновление Покемона</DrawerHeader>
                        {updatingPokemon  && updatingPokemon.id === pokemon.id && (
                          <>
                            <label>Имя:</label>
                            <Input type="text" name="name" value={updatingPokemon.name || ''} onChange={handleUpdateInputChange} placeholder="Имя" className="bg-gray-200" />
                            <label>Вес:</label>
                            <Input type="number" name="weight" value={updatingPokemon.weight || ''} onChange={handleUpdateInputChange} placeholder="Вес" className="bg-gray-200" />
                            <label>Высота:</label>
                            <Input type="number" name='height' value={updatingPokemon.height || ''} onChange={handleUpdateInputChange} placeholder='Высота' className="bg-gray-200" />
                            <label>Вид:</label>
                            <Input type="text" name="species" value={updatingPokemon.species || ''} onChange={handleUpdateInputChange} placeholder="Вид" className="bg-gray-200" />
                            <label>Опыт:</label>
                            <Input type="number" name="experience" value={updatingPokemon.experience || ''} onChange={handleUpdateInputChange} placeholder="Опыт" className="bg-gray-200" />
                            <Button variant="outline" onClick={handleUpdateSubmit} className="bg-blue-500">Отправить</Button>
                          </>
                        )}
                      </DrawerContent>
                    </Drawer>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </div>
);
};

export default PokemonList;
