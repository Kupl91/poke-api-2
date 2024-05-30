// poke-api-2\src\components\ui\PokemonForm.tsx
import React from 'react';
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';
import { Toaster } from '@/components/ui/toaster';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

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
const PokemonForm: React.FC<PokemonFormProps> = ({handleSubmitClick, handleInputChange, handleCreateClick, showForm, newPokemon}) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" onClick={handleCreateClick}>Создай</Button>
        </DrawerTrigger>
        {showForm && (
          <DrawerContent>
            <DrawerClose />
            <DrawerHeader>Создание Покемона</DrawerHeader>
            <div className="flex flex-col space-y-4 p-4">
              {["name", "weight", "height", "species", "experience"].map((field) => (
                <Input
                  key={field}
                  type={field === "weight" || field === "height" || field === "experience" ? "number" : "text"}
                  name={field}
                  onChange={handleInputChange}
                  placeholder={
                    field.charAt(0).toUpperCase() + field.slice(1)
                      .replace("name", 'Имя')
                      .replace("species", 'Вид')
                      .replace("weight", 'Вес')
                      .replace("height", 'Высота')
                      .replace("experience", 'Опыт')
                   }
                  value={newPokemon[field]}
                />
              ))}
              <Button variant="outline" onClick={handleSubmitClick}>Отправить</Button>
            </div>
          </DrawerContent>
        )}
      </Drawer>
      <Toaster />
    </div>
  );
};

export default PokemonForm;