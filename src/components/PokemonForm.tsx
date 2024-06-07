// poke-api-2\src\components\ui\PokemonForm.tsx
import React from 'react';
import { Button,} from './ui/button';
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
  DrawerTrigger
} from "@/components/ui/drawer";

interface PokemonFormProps {
 handleSubmitClick: () => void;
 handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
 handleCreateClick: () => void;
 showForm: boolean;
 newPokemon: IndexedPokemon; // обновили здесь
}

interface IndexedPokemon {
 [key: string]: string | number | undefined; // добавили этот индексный интерфейс
 name: string;
 weight:number;
 height:number;
 species:string ;
 experience:number ;
}


const PokemonForm: React.FC<PokemonFormProps> = ({ handleSubmitClick, handleInputChange, handleCreateClick, showForm, newPokemon }) => {
  return (
    <div className="bg-gray-300">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" onClick={handleCreateClick} className="bg-green-500">Создай</Button>
        </DrawerTrigger>
        {showForm && (
          <div className="flex items-center justify-center pointer-events-none">
    <DrawerContent className="bg-black w-1/3 pointer-events-auto">
              <DrawerClose />
              <DrawerHeader className="text-gray-300">Создание Покемона</DrawerHeader>
              <div className="flex flex-col space-y-4 p-4">
                {[
                  { name: "name", placeholder: "Введите имя покемона", type: "text" },
                  { name: "weight", placeholder: "Введите вес покемона", type: "number"},
                  { name:"height",placeholder:"Введите высоту покемона ",type:"number"},
                  { name:"species",placeholder:"Введите вид покемона ", type:"text"},
                  { name:"experience",placeholder:"Введите опыт покемона ",type:"number"}
                ].map((field) => {
                    const inputValue = newPokemon[field.name];
                    return (
                      <div key={field.name}>
                        <label className="text-gray-300">{field.placeholder}</label>
                        <Input
                          type={field.type}
                          name={field.name}
                          onChange={handleInputChange}
                          value={inputValue !== undefined ? String(inputValue) : ''}
                          className='bg-gray-300'
                        />
                      </div>
                    );
                })}
                <Button variant="outline" onClick={handleSubmitClick} className="bg-blue-500">Отправить</Button>
              </div>
            </DrawerContent>
          </div> 
        )}
      </Drawer>
      <Toaster />
    </div>
  );
};

export default PokemonForm;
