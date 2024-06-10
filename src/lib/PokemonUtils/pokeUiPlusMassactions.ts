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



const handleMassUpdateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setMassUpdateValue(event.target.value);
};

const handleCreateClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPokemon({
      ...newPokemon,
      [event.target.name]: event.target.value,
    });
  };

  const handleMassInputChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    console.log("handleMassInputChange called with id:", id);
    setUpdatingPokemons(prevUpdatingPokemons =>
      prevUpdatingPokemons.map(pokemon =>
        pokemon.id === id ? { ...pokemon, name: event.target.value } : pokemon
      )
    );
  };;

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
    if (!selectedCharacteristic || selectedPokemons.length === 0) {
      console.error("Нет выбранных покемонов или характеристик для обновления");
      return;
    }
  
    try {
      const responses = await Promise.all(
        selectedPokemons.map((pokemonId) =>
          fetch('/api/pokemon/update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: pokemonId,
              [selectedCharacteristic]: massUpdateValue, // 
            }),
          })
        )
      );
  
      const allOk = responses.every(response => response.ok);
  
      if (allOk) {
        const updatedPokemons = await Promise.all(responses.map(response => response.json()));
        setPokemons(pokemons.map((pokemon) => {
          const updatedPokemon = updatedPokemons.find(updatedPokemon => updatedPokemon.id === pokemon.id);
          return updatedPokemon ? updatedPokemon : pokemon;
        }));
        setSelectedPokemons([]);
        setSelectedCharacteristic(null);
      } else {
        throw new Error('Не удалось обновить некоторых покемонов');
      }
    } catch (error) {
      console.error("Ошибка при массовом обновлении покемонов:", error);
    }
  };

  const handleMassUpdateClick = (id: number) => {
    if (selectedPokemons.includes(id)) {
      setUpdatingPokemons(prevUpdatingPokemons => prevUpdatingPokemons.filter(pokemon => pokemon.id !== id));
    } else {
      const pokemonToUpdate = pokemons.find((pokemon) => pokemon.id === id);
      if (pokemonToUpdate) {
        setUpdatingPokemons(prevUpdatingPokemons => [...prevUpdatingPokemons, pokemonToUpdate]);
      }
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
  handleInputChange,
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