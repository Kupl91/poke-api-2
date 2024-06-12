//C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\lib\PokemonUtils\pokeUiPlusMassactions.ts
import { useState, useEffect } from 'react';
import { usePokemonActions } from '@/lib/PokemonUtils/pokeActions';
import { Pokemon, PokemonDetail, initialPokemonState } from '@/lib/types';


export const usePokemonUI = () => {
    const { pokemons, setPokemons } = usePokemonActions();
    const { updatingPokemon, setUpdatingPokemon } = usePokemonActions();
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
const [pokemonInputs, setPokemonInputs] = useState<{ [key: number]: string }>({});





const handleMassUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  
  console.log(`Изменение массового обновления ввода на: ${value}`);
  
  setMassUpdateValue(value);
};

const handleCreateClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleMassInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const value = e.target.value;
    setPokemonInputs(prevState => ({
      ...prevState,
      [id]: value
    }));
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

  const handleCheckboxChange = (id: number) => {
    console.log(id);
    setSelectedPokemons(prevState =>
      prevState.includes(id)
        ? prevState.filter(pokemonId => pokemonId !== id)
        : [...prevState, id]
    );
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
    const updatedPokemons = pokemons.map(pokemon => {
      if (selectedPokemons.includes(pokemon.id)) {
        return { ...pokemon, name: massUpdateValue as string };
      } else {
        console.warn(`Не найдено новое имя для Pokemon ID: ${pokemon.id}`);
        return pokemon;
      }
    });
  
    try {
      const responses = await Promise.all(selectedPokemons.map(async (id) => {
        const pokemonToUpdate = updatedPokemons.find(pokemon => pokemon.id === id);
        
        if (!id || !massUpdateValue) throw new Error(`Неправильные данные для Pokemon ID: ${id}`);
        
        const response = await fetch(`/api/pokemon/update?id=${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: pokemonToUpdate!.name })
        });
        
        if (!response.ok) throw new Error('Bad Request');
  
        return response;
      }));
  
      setPokemons(updatedPokemons);
  
    } catch (error) {
      console.error("Ошибка при массовом обновлении покемонов:", error);
    }
  };

  useEffect(() => {
    if (selectedCharacteristic === 'name') {
      handleMassUpdateSubmit();
    }
  }, [selectedCharacteristic]);
  
  const handleMassUpdateClick = (id: number | string) => {
    console.log(`валидация пользовательского ввода c id: ${id}`);
    
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
  
  const handleInputTempChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const value = e.target.value;
    setPokemonInputs({
      ...pokemonInputs, 
      [id]: value
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
};
};