// poke-api-2\src\components\ui\PokemonList.tsx
import React from 'react';
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
} from './ui/table'; // Исправленный импорт

interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  baseExperience: number;
  species: string;
  experience: number;
  abilities: { ability: { name: string } }[];
}

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
}) => (
  <div className="bg-gray-300">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Имя</TableHead>
          <TableHead>Вес</TableHead>
          <TableHead>Высота</TableHead>
          <TableHead>Вид</TableHead>
          <TableHead>Опыт</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pokemons
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((pokemon) => (
            <TableRow key={pokemon.id}>
              <TableCell>{pokemon.name}</TableCell>
              <TableCell>{pokemon.weight}</TableCell>
              <TableCell>{pokemon.height}</TableCell>
              <TableCell>{pokemon.species}</TableCell>
              <TableCell>{pokemon.experience}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteClick(pokemon.id)} className="bg-red-600">Удалить</Button>
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
                <Drawer> 
                  <DrawerTrigger asChild>
                    <Button variant="outline" onClick={() => handleUpdateClick(pokemon.id)} className="bg-blue-500">Обновить</Button>
                  </DrawerTrigger>
                  <DrawerContent  className="bg-grey-301 w-1/3">
                    <DrawerClose />
                    <DrawerHeader>Обновление Покемона</DrawerHeader>
                    {updatingPokemon && (
                      <>
                        <Input type="text" name="name" value={updatingPokemon.name || ''} onChange={handleUpdateInputChange} placeholder="Имя" className="bg-gray-200" />
                        <Input type="number" name="weight" value={updatingPokemon.weight || ''} onChange={handleUpdateInputChange} placeholder="Вес" className="bg-gray-200" />
                        <Input type="number" name='height' value={updatingPokemon.height || ''} onChange={handleUpdateInputChange} placeholder='Высота' className="bg-gray-200" />
                        <Input type="text" name="species" value={updatingPokemon.species || ''} onChange={handleUpdateInputChange} placeholder="Вид" className="bg-gray-200" />
                        <Input type="number" name="experience" value={updatingPokemon.experience || ''} onChange={handleUpdateInputChange} placeholder="Опыт" className="bg-gray-200" />
                        <Button variant="outline" onClick={handleUpdateSubmit} className="bg-blue-500">Отправить</Button>
                      </>
                    )}
                  </DrawerContent>
                </Drawer>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </div>
);

export default PokemonList;
