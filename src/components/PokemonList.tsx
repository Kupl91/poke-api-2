// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\components\PokemonList.tsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import PokemonDropdownMenu from './PokemonDropdownMenu';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerHeader } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableRow,
  TableCell
} from './ui/table'; 
import { Pokemon } from '@/lib/types';
import { Checkbox } from './ui/checkbox';
import { Toaster } from '@/components/ui/toaster';

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
  selectedPokemons: number[];
  handleCheckboxChange: (id: number) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  handleBulkDeleteClick: (ids: number[]) => void;
  selectedCharacteristic: string | null;
  setSelectedCharacteristic: (value: string | null) => void;
  handleMassUpdateSubmit: () => void;
  massUpdateValue: string | number;
  setMassUpdateValue: React.Dispatch<React.SetStateAction<string | number>>;
  handleMassUpdateInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showForm: boolean; 
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleMassInputChange: (event: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => void;
  pokemonInputs: { [key: number]: { [field: string]: string | number } };
  handleInputTempChange: (event: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => void; 
  handleSelectCharacteristic?: (characteristic: string | number) => void;
  handleMassUpdateClick: (id: number | string) => void;
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
  showDropdown,
  setShowDropdown,
  handleBulkDeleteClick,
  selectedCharacteristic,
  setSelectedCharacteristic,
  handleMassUpdateSubmit,
  massUpdateValue,
  setMassUpdateValue,
  handleMassUpdateInputChange,
  showForm,
  handleInputTempChange,
  pokemonInputs,
  handleMassInputChange,
  handleMassUpdateClick,
}) => {
  return (
    <div className="bg-gray-300">
      <PokemonDropdownMenu
        selectedPokemons={selectedPokemons}
        pokemons={pokemons}
        handleMassUpdateClick={handleMassUpdateClick}
        setShowDropdown={setShowDropdown}
        showDropdown={showDropdown}
        handleBulkDeleteClick={handleBulkDeleteClick}
        handleMassUpdateSubmit={handleMassUpdateSubmit}
        massUpdateValue={massUpdateValue}
        setMassUpdateValue={setMassUpdateValue}
        handleMassUpdateInputChange={handleMassUpdateInputChange}
        handleMassInputChange={handleMassInputChange}
        pokemonInputs={pokemonInputs}
      />
      <Table>
        <TableBody>
          {pokemons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(pokemon => (
            <TableRow key={pokemon.id} onClick={() => handleCheckboxChange(pokemon.id)}>
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
                <div>
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
                            {updatingPokemon && updatingPokemon.id === pokemon.id && (
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toaster />
    </div>
  );
};

export default PokemonList;