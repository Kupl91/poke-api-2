//C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\components\PokemonDropdownMenu.tsx
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import { Pokemon } from '@/lib/types';

interface PokemonDropdownMenuProps {
  selectedPokemons: number[];
  pokemons: Pokemon[];
  handleMassUpdateClick: (id: number | string) => void;
  setShowDropdown: (show: boolean) => void;
  showDropdown: boolean;
  handleBulkDeleteClick: (ids: number[]) => void;
  handleMassUpdateSubmit: () => void;
  massUpdateValue: string | number;
  setMassUpdateValue: React.Dispatch<React.SetStateAction<string | number>>;
  handleMassUpdateInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMassInputChange: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  pokemonInputs: { [key: number]: string };
}

const PokemonDropdownMenu: React.FC<PokemonDropdownMenuProps> = ({
  selectedPokemons,
  pokemons,
  handleMassUpdateClick,
  setShowDropdown,
  showDropdown,
  handleBulkDeleteClick,
  handleMassUpdateSubmit,
  massUpdateValue,
  setMassUpdateValue,
  handleMassUpdateInputChange,
  handleMassInputChange,
  pokemonInputs,
}) => {
    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-gray-200" style={{ position: 'absolute', left: '0px', top: '565px' }} onClick={(e) => { e.stopPropagation(); selectedPokemons.forEach((pokemonId: number) => { handleMassUpdateClick(pokemonId); }); setShowDropdown(!showDropdown); }}>...</Button>
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
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" onClick={(e) => { e.stopPropagation(); handleMassUpdateClick('name'); }}>Имя</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuLabel onClick={(e) => e.stopPropagation()}>Массовое обновление имени</DropdownMenuLabel>
                            <>
                              {selectedPokemons.map((id:number) => {
                                const pokemon = pokemons.find(pokemon => pokemon.id === id);
                                return (
                                  <div key={id}>
                                    <label>{pokemon?.name}</label>
                                    <Input
                                      type="text"
                                      value={pokemonInputs[id] || ''}
                                      onChange={(e) => handleMassInputChange(e, id)}
                                      onClick={(e) => e.stopPropagation()}
                                      placeholder="Имя"
                                      className="bg-gray-200"
                                    />
                                  </div>
                                );
                              })}
                              <Button variant="outline" onClick={(e) => { e.stopPropagation(); handleMassUpdateSubmit(); }} className="bg-blue-500">Отправить</Button>
                            </>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" onClick={(e) => { e.stopPropagation(); handleMassUpdateClick('weight'); }}>Вес</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuLabel onClick={(e) => e.stopPropagation()}>Массовое обновление веса</DropdownMenuLabel>
                            <>
                              {selectedPokemons.map((id: number) => {
                                const pokemon = pokemons.find(pokemon => pokemon.id === id);
                                return (
                                  <div key={id}>
                                    <label>{pokemon?.name} - Вес: {pokemon?.weight}</label>
                                    <Input
                                      type="number"
                                      value={pokemonInputs[id] || ''}
                                      onChange={(e) => handleMassInputChange(e, id)}
                                      onClick={(e) => e.stopPropagation()}
                                      placeholder="Вес"
                                      className="bg-gray-200"
                                    />
                                  </div>
                                );
                              })}
                              <Button variant="outline" onClick={(e) => { e.stopPropagation(); handleMassUpdateSubmit(); }} className="bg-blue-500">Обновить</Button>
                            </>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </DropdownMenuItem>
                    {/* Добавьте здесь другие параметры для массового обновления */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      );
    };
    
    export default PokemonDropdownMenu;