//C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\lib\PokemonUtils\pokeUiPlusMassactions.ts
import { useState, useEffect } from 'react';
import { usePokemonActions } from '@/lib/PokemonUtils/pokeActions';
import { Pokemon, PokemonDetail, initialPokemonState } from '@/lib/types';
import { ChangeEvent } from 'react';


export const usePokemonUI = () => {
    const { pokemons, setPokemons } = usePokemonActions();
const [showForm, setShowForm] = useState(false);
const [showDropdown, setShowDropdown] = useState(false);
const [newPokemon, setNewPokemon] = useState({
    name: '',
    weight: 0,
    height: 0,
    species: '',
    experience: 0,
  });
;
const [selectedPokemons, setSelectedPokemons] = useState<number[]>([]);
const [updatingPokemons, setUpdatingPokemons] = useState<Pokemon[]>([]);
const [selectedCharacteristic, setSelectedCharacteristic] = useState<string | null>(null);
const [massUpdateValue, setMassUpdateValue] = useState<string | number>('');
const [pokemonInputs, setPokemonInputs] = useState<{ [key: number]: { [field: string]: string | number } }>({});

const handleCreateClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  useEffect(() => {
    console.log('Selected Pokemons:', selectedPokemons);
    setShowDropdown(selectedPokemons.length > 0);
  }, [selectedPokemons]);
  
  useEffect(() => {
    if (selectedPokemons.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [selectedPokemons]);

  const handleCheckboxChange = (id:number) => {
    setSelectedPokemons(prevSelectedPokemons => {
      if (prevSelectedPokemons.includes(id)) {
        return prevSelectedPokemons.filter(pokemonId => pokemonId !== id);
      } else {
        return [...prevSelectedPokemons, id];
      }
    });
  };
  

  const handleBulkDeleteClick = async (ids: number[]) => {
    try {
      const responses = await Promise.all(
        ids.map((id) =>
          fetch(`/api/pokemon/delete?id=${id}`, {
            method: 'DELETE',
          })
        )
      );
  
      const allOk = responses.every(response => response.ok);
      
      if (allOk) {
        setPokemons(pokemons.filter((pokemon) => !ids.includes(pokemon.id)));
        setSelectedPokemons([]); 
      } else {
        throw new Error('Не удалось удалить некоторых покемонов');
      }
    } catch (error) {
      console.error("Ошибка при массовом удалении покемонов:", error);
    }
  };

  const handleMassUpdateSubmit = async () => {
    // Обходим каждого покемона в массиве selectedPokemons
    for (const id of selectedPokemons) {
      // Получаем новые данные для покемона
      const newPokemonData = pokemonInputs[id];
      // Если данные не заданы, пропускаем этого покемона
      if (!newPokemonData) continue;
      // Находим покемона, которого нужно обновить
      const pokemonToUpdate = pokemons.find(pokemon => pokemon.id === id);
      // Если покемон не найден, пропускаем этого покемона
      if (!pokemonToUpdate) continue;
      // Обновляем покемона с новыми данными
      try {
        const response = await fetch('/api/pokemon/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...pokemonToUpdate,
            ...newPokemonData,
          }),
        });
        if (response.ok) {
          const updatedPokemon = await response.json();
          // Обновляем состояние pokemons с помощью функции обратного вызова
          setPokemons(prevPokemons => prevPokemons.map(pokemon => pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon));
          console.log(`Покемон с ID ${id} успешно обновлен`); // Логирование при успешном обновлении
        } else {
          throw new Error('Не удалось обновить покемона');
        }
      } catch (err) {
        const error = err as Error;
        console.error(`Ошибка при обновлении покемона с ID ${id}:`, error.message);
      }
    }
  };

  
  const handleMassUpdateClick = (id: number | string) => {
    console.log(`Валидация пользовательского ввода c id: ${id}`);
    
    // Преобразуем id в число, независимо от того, является ли он строкой или числом
    const numericId = Number(id);
    const selectedPokemon = pokemons.find(pokemon => pokemon.id === numericId);

    if (!selectedPokemon) {
        console.warn(`Покемон с id:${numericId} не найден`);
        return;
    }

    if (selectedPokemons.includes(numericId)) {
        console.log(`Если клиент с id: ${numericId} уже выбран для обновления`);

        setUpdatingPokemons(prevUpdatingPokemons =>
            prevUpdatingPokemons.filter(pokemon => pokemon.id !== numericId)
        );

        setSelectedPokemons(prevSelected =>
            prevSelected.filter(selectedId => selectedId !== numericId)
        );

    } else {
        setUpdatingPokemons([...updatingPokemons, selectedPokemon]);

        setSelectedPokemons([...selectedPokemons, numericId]);
    }
};



useEffect(() => {
  console.log(`selectedCharacteristic: ${selectedCharacteristic}`);
}, [selectedCharacteristic]);
  
  
const handleMassInputChange = (e: ChangeEvent<HTMLInputElement>, id: number, field: string) => {
  let value: string | number = e.target.value;

  // Если поле является числовым, преобразуем ввод в число
  if (field === 'weight' || field === 'height' || field === 'experience') {
    value = Number(value);
  }

  setPokemonInputs((prevInputs) => ({
    ...prevInputs,
    [id]: {
      ...(prevInputs[id] || {}),
      [field]: value,
    },
  }));
};


  
  const handleMassUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    console.log(`Изменение массового обновления ввода на: ${value}`);
    
    setMassUpdateValue(value);
  };
  
  const handleInputTempChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => {
    let value: string | number = e.target.value;
  
    // Если поле является числовым, преобразуем ввод в число
    if (field === 'weight' || field === 'height' || field === 'experience') {
      value = Number(value);
    }
  
    setPokemonInputs({
      ...pokemonInputs, 
      [id]: {
        ...(pokemonInputs[id] || {}),
        [field]: value
      }
    });
  };
  
  

  
return {
  showForm, 
  handleCreateClick,
  showDropdown,
  setShowDropdown,
  selectedPokemons,
  setSelectedPokemons,
  handleCheckboxChange,
  handleBulkDeleteClick,
  handleMassUpdateSubmit,
  handleMassUpdateClick,
  updatingPokemons,
  setUpdatingPokemons,
  selectedCharacteristic,
  setSelectedCharacteristic,
  massUpdateValue,
  setMassUpdateValue,
  handleMassUpdateInputChange,
  handleMassInputChange,
  setShowForm,
  handleInputTempChange, 
  pokemonInputs,
  pokemons,
  setPokemons,
};
};