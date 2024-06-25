// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\components\PokemonList.tsx
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import PokemonDropdownMenu from './PokemonDropdownMenu';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerHeader } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from './ui/dropdown-menu';
import { Table, TableBody, TableRow, TableCell } from './ui/table'; 
import { Pokemon } from '@/lib/types';
import { Checkbox } from './ui/checkbox';
import { Toaster } from '@/components/ui/toaster';
import { PokemonListProps, PokemonDropdownMenuProps } from '@/lib/types';

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
  const emptyRows = new Array(5 - pokemons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).length).fill(null);

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
              <TableCell className="flex justify-start space-x-4">
                <Checkbox 
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(pokemon.id);
                  }}
                />
                <span>{pokemon.name}</span>
              </TableCell>
              <TableCell className="text-left">{pokemon.weight}</TableCell>
              <TableCell className="text-left">{pokemon.height}</TableCell>
              <TableCell className="text-left">{pokemon.species}</TableCell>
              <TableCell className="text-left">{pokemon.experience}</TableCell>
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
          {emptyRows.map((_, index) => (
  <TableRow key={`empty-${index}`}>
    <TableCell colSpan={6} style={{ height: '73px' }}>&nbsp;</TableCell>
  </TableRow>
))}
        </TableBody>
      </Table>
      <Toaster />
    </div>
  );
};

export default PokemonList;
