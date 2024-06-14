// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\components\PokemonList.tsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerHeader } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuLabel,
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
import { Checkbox } from './ui/checkbox';
import { inputTypes } from '@/lib/types';


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
  setShowDropdown: (show: boolean) => void;
  showDropdown: boolean;
  handleBulkDeleteClick: (ids: number[]) => void;
  selectedCharacteristic: string | null;
  setSelectedCharacteristic: (value: string | null) => void;
  handleMassUpdateSubmit: () => void;
  massUpdateValue: string | number;
  setMassUpdateValue: React.Dispatch<React.SetStateAction<string | number>>;
  handleMassUpdateInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showForm: boolean; 
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleMassInputChange: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  pokemonInputs: { [key: number]: string };
  handleInputTempChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void; 
  handleSelectCharacteristic?: (characteristic: string | number) => void;
  handleMassUpdateClick: (id: number | string) => void;
}

interface UpdateButtonProps {
  characteristic: string;
  handleMassUpdateClick: (id: number | string) => void;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ characteristic, handleMassUpdateClick }) => (
  <DropdownMenuTrigger asChild>
    <Button 
      variant="outline" 
      onClick={(e) => { 
        e.stopPropagation(); 
        handleMassUpdateClick(characteristic); 
      }}
    >
      {characteristic}
    </Button>
  </DropdownMenuTrigger>
);


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
  const inputType = selectedCharacteristic ? inputTypes[selectedCharacteristic] : 'text';
  return (
    <div className="bg-gray-300">
      {selectedPokemons.length > 1 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-gray-200"
              style={{ position: 'absolute', left: '0px', top: '565px' }}
              onClick={(e) => { 
                e.stopPropagation(); 
                selectedPokemons.forEach((pokemonId: number) => {
                  handleMassUpdateClick(pokemonId);
                });
                setShowDropdown(!showDropdown); 
              }}
            >...</Button>
          </DropdownMenuTrigger>
          {showDropdown && (
            <DropdownMenuContent sideOffset={4} className="p-1 bg-white shadow-md" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Button variant="outline" onClick={(e) => { e.stopPropagation(); handleBulkDeleteClick(selectedPokemons); }}>Массовое удаление</Button>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" onClick={(e) => e.stopPropagation()}>Массовое обновление параметра</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <UpdateButton characteristic='Имя' handleMassUpdateClick={handleMassUpdateClick} />
                        <UpdateButton characteristic='Вес' handleMassUpdateClick={handleMassUpdateClick} />
                        <UpdateButton characteristic='Высота' handleMassUpdateClick={handleMassUpdateClick} />
                        <UpdateButton characteristic='Вид' handleMassUpdateClick={handleMassUpdateClick} />
                        <UpdateButton characteristic='Опыт' handleMassUpdateClick={handleMassUpdateClick} />
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          <DropdownMenuLabel onClick={(e) => e.stopPropagation()}>Массовое обновление {selectedCharacteristic || ''}</DropdownMenuLabel>
<>
{selectedPokemons.map((id:number)=>{

 const pokemon=pokemons.find(pokemon=>pokemon.id===id);

return(
<div key={id}>
<label>{pokemon?.name}</label>
<Input
type={inputType}
value={pokemonInputs[id]||''}
onChange={(e)=>handleMassInputChange(e,id)}
onClick={(e)=>e.stopPropagation()}
placeholder={selectedCharacteristic || ''}
className="bg-gray-200"/>
</div>);
})}
<Button variant ="outline" onClick={(e)=>{
  e.stopPropagation();
  handleMassUpdateSubmit(); 
}} className="bg-blue-500">Отправить</Button>
            </>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        )}
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
    </div>
  );
};

export default PokemonList;