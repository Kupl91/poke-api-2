// poke-api-2\src\components\ui\PokemonList.tsx
import React from 'react';
import { Button, buttonVariants } from './ui/button';

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

const PokemonList = ({ pokemons, handleDeleteClick, handleDetailsClick, handleUpdateSubmit, handleUpdateClick, handleUpdateInputChange, selectedDetail, updatingPokemon, currentPage, itemsPerPage }) => {
  return (
    <div>
      {pokemons
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((pokemon) => (
          <div key={pokemon.id} style={{ marginBottom:'10px', display: 'flex', alignItems: 'center' }}>
            <Button variant="destructive" onClick={() => handleDeleteClick(pokemon.id)} style={{ marginRight: '10px' }}>Удалить</Button>
            <h2 style={{ marginRight: '10px' }}>{pokemon.name}</h2>
            <Button variant="outline" onClick={() => handleDetailsClick(pokemon.id)} style={{ marginRight: '10px' }}>Детали</Button>
            {selectedDetail && selectedDetail.id === pokemon.id && 
              (<div>{`ID: ${selectedDetail.id}, Опыт: ${selectedDetail.experience}, Высота: ${selectedDetail.height}, Вес: ${selectedDetail.weight}`}</div>)
            }
            <Button variant="outline" onClick={() => handleUpdateClick(pokemon.id)} style={{ marginRight: '10px' }}>Обновить</Button>
            {updatingPokemon && updatingPokemon.id === pokemon.id && (
              <div>
                <input type="text" name="name" value={updatingPokemon.name} onChange={handleUpdateInputChange} placeholder="Имя" />
                <input type="number" name="weight" value={updatingPokemon.weight} onChange={handleUpdateInputChange} placeholder="Вес" />
                <input type="number" name="height" value={updatingPokemon.height} onChange={handleUpdateInputChange} placeholder="Высота" />
                <input type="text" name="species" value={updatingPokemon.species} onChange={handleUpdateInputChange} placeholder="Вид" />
                <input type="number" name="experience" value={updatingPokemon.experience} onChange={handleUpdateInputChange} placeholder="Опыт" />
                <Button variant="outline" onClick={handleUpdateSubmit}>Отправить</Button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default PokemonList;