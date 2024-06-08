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
  handleCheckboxChange: (id: number) => void;
  setShowDropdown: (show: boolean) => void;
  showDropdown: boolean;
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
}) => {
  return (
    <div className="bg-gray-300">
      <Table>
        <TableBody>
          {pokemons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(pokemon => (
            <TableRow key={pokemon.id} onClick={() => handleCheckboxChange(pokemon.id)}>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Checkbox 
                      checked={selectedPokemons.includes(pokemon.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(pokemon.id);
                      }}
                    />
                  </DropdownMenuTrigger>
                  {selectedPokemons.includes(pokemon.id) && (
                    <DropdownMenuContent sideOffset={4} className="p-1 bg-white shadow-md fixed top-[50px] left-[10px]">
                      <DropdownMenuItem><Button variant="outline">Кнопка 1</Button></DropdownMenuItem>
                      <DropdownMenuItem><Button variant="outline">Кнопка 2</Button></DropdownMenuItem>
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
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
                        <Button variant="destructive" onClick={() => handleDeleteClick(pokemon.id)} className="bg-red-600">Delete</Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" onMouseOver={() => handleDetailsClick(pokemon.id)} className="bg-gray-200">Details</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent sideOffset={4} className="p-1 bg-white shadow-md">
                            {selectedDetail && selectedDetail.id === pokemon.id && (
                              <>
                                <DropdownMenuItem>{`ID: ${selectedDetail.id}`}</DropdownMenuItem>
                                {selectedDetail.abilities && selectedDetail.abilities.map((ability) => (
                                  <DropdownMenuItem key={ability.ability.name}>{`Ability: ${ability.ability.name}`}</DropdownMenuItem>
                                ))}
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button variant="outline" onClick={(event) => { event.stopPropagation(); handleUpdateClick(pokemon.id); }} className="bg-blue-500">Update</Button>
                          </DrawerTrigger>
                          <DrawerContent className="bg-black text-gray-200 w-1/3" onClick={(e) => e.stopPropagation()}>
                            <DrawerClose />
                            <DrawerHeader>Update Pokemon</DrawerHeader>
                            {updatingPokemon && updatingPokemon.id === pokemon.id && (
                              <>
                                <label>Name:</label>
                                <Input type="text" name="name" value={updatingPokemon.name || ''} onChange={handleUpdateInputChange} placeholder="Name" className="bg-gray-200" />
                                <label>Weight:</label>
                                <Input type="number" name="weight" value={updatingPokemon.weight || ''} onChange={handleUpdateInputChange} placeholder="Weight" className="bg-gray-200" />
                                <label>Height:</label>
                                <Input type="number" name='height' value={updatingPokemon.height || ''} onChange={handleUpdateInputChange} placeholder='Height' className="bg-gray-200" />
                                <label>Species:</label>
                                <Input type="text" name="species" value={updatingPokemon.species || ''} onChange={handleUpdateInputChange} placeholder="Species" className="bg-gray-200" />
                                <label>Experience:</label>
                                <Input type="number" name="experience" value={updatingPokemon.experience || ''} onChange={handleUpdateInputChange} placeholder="Experience" className="bg-gray-200" />
                                <Button variant="outline" onClick={handleUpdateSubmit} className="bg-blue-500">Submit</Button>
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
    </div>
  );
};

export default PokemonList;