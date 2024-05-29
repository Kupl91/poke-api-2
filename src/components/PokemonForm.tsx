// poke-api-2\src\components\ui\PokemonForm.tsx
import React from 'react';
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';

interface PokemonFormProps {
  handleSubmitClick: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateClick: () => void;
  showForm: boolean;
  newPokemon: {
    name: string;
    weight: number;
    height: number;
    species: string;
    experience: number;
  };
}

const PokemonForm: React.FC<PokemonFormProps> = ({ handleSubmitClick, handleInputChange, handleCreateClick, showForm, newPokemon }) => {
  return (
    <div>
      <Button variant="outline" onClick={handleCreateClick}>Создай</Button>
      {showForm && (
        <div className="flex space-x-4">
          <Input type="text" name="name" onChange={handleInputChange} placeholder="Имя" value={newPokemon.name} />
          <Input type="number" name="weight" onChange={handleInputChange} placeholder="Вес" value={newPokemon.weight} />
          <Input type="number" name="height" onChange={handleInputChange} placeholder="Высота" value={newPokemon.height} />
          <Input type="text" name="species" onChange={handleInputChange} placeholder="Вид" value={newPokemon.species} />
          <Input type="number" name="experience" onChange={handleInputChange} placeholder="Опыт" value={newPokemon.experience} />
          <Button variant="outline" onClick={handleSubmitClick}>Отправить</Button>
        </div>
      )}
    </div>
  );
};

export default PokemonForm;