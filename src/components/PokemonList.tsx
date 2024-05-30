// poke-api-2\src\components\ui\PokemonList.tsx
import React from 'react';
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerHeader } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from './ui/dropdown-menu';


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
  handleUpdateClick: (id: number) => void; // Добавьте эту строку
  handleUpdateInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedDetail: Pokemon | null;
  updatingPokemon: Pokemon | null;
  currentPage: number;
  itemsPerPage: number;
}

const PokemonList = ({
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
    <div>
      {pokemons
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((pokemon) => (
          <div key={pokemon.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <Button variant="destructive" onClick={() => handleDeleteClick(pokemon.id)} style={{ marginRight: '10px' }}>Удалить</Button>
            <h2 style={{ marginRight: '10px' }}>{pokemon.name}</h2>
            <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <Button variant="outline" onClick={() => handleDetailsClick(pokemon.id)} style={{ marginRight: '10px' }}>Детали</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="p-36 bg-white shadow-md">
    {selectedDetail && selectedDetail.id === pokemon.id && (
      <>
        <div>ID: {selectedDetail.id}</div>
        <div>Опыт: {selectedDetail.experience}</div>
        <div>Высота: {selectedDetail.height}</div>
        <div>Вес: {selectedDetail.weight}</div>
      </>
    )}
  </DropdownMenuContent>
</DropdownMenu>
          <Drawer> 
            <DrawerTrigger asChild>
              <Button variant="outline" onClick={() => handleUpdateClick(pokemon.id)} style={{ marginRight: '10px' }}>Обновить</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerClose />
              <DrawerHeader>Обновление Покемона</DrawerHeader>
              {updatingPokemon && (
                <>
                  <Input type="text" name="name" value={updatingPokemon.name || ''} onChange={handleUpdateInputChange} placeholder="Имя" />
                  <Input type="number" name="weight" value={updatingPokemon.weight || ''} onChange={handleUpdateInputChange} placeholder="Вес" />
                  <Input type="number" name='height' value={updatingPokemon.height || ''} onChange={handleUpdateInputChange} placeholder='Высота' />
                  <Input type="text" name="species" value={updatingPokemon.species || ''} onChange={handleUpdateInputChange} placeholder="Вид" />
                  <Input type="number" name="experience" value={updatingPokemon.experience || ''} onChange={handleUpdateInputChange} placeholder="Опыт" />
                  <Button variant="outline" onClick={handleUpdateSubmit}>Отправить</Button>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      ))}
    </div>
);

export default PokemonList;