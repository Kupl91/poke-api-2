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
    console.log('Начало функции handleMassUpdateSubmit');
    console.log('selectedPokemons:', selectedPokemons);
    console.log('selectedCharacteristic:', selectedCharacteristic);
  
    if (!selectedPokemons.length || !selectedCharacteristic) {
      console.error('Нет выбранных покемонов или характеристик для обновления.');
      return;
    }
  
    console.log(`Характеристика для обновления: ${selectedCharacteristic}`);
  
    const updatedPokemons = pokemons.map((pokemon) => {
      if (selectedPokemons.includes(pokemon.id)) {
        const newName = pokemonInputs[pokemon.id];
  
        if (newName) {
          console.log(`Updating Pokemon ID: ${pokemon.id}`);
          console.log(`Old Name: ${pokemon.name}`);
  
          switch (selectedCharacteristic) {
            case "name":
              pokemon.name = newName;
              break;
            // Добавь другие случаи здесь по аналогии
            default:
              break;
          }
  
          // Логирование после изменения имени
          console.log(`Updated Name: ${pokemon.name}`);
        } else {
          console.warn(`Не найдено новое имя для Pokemon ID: ${pokemon.id}`);
        }
      }
  
      return pokemon;
    });
  
    try {
      // Отправляем обновленные данные на сервер
      const responses = await Promise.all(updatedPokemons.map((pokemon) => 
        fetch(`/api/pokemon/update?id=${pokemon.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pokemon)
        })
      ));
  
      // Проверяем, что все запросы успешно выполнены
      const allOk = responses.every((response) => response.ok);
      if (!allOk) {
        throw new Error('Не удалось обновить некоторых покемонов');
      }
  
      // Обновляем состояние покемонов
      setPokemons(updatedPokemons);
    } catch (error) {
      console.error("Ошибка при массовом обновлении покемонов:", error);
    }
  };
  
  
  const handleMassUpdateClick = (id: number | string) => {
    console.log(`handleMassUpdateClick вызвана с id: ${id}`);
    
    // Преобразуем id в число для сравнения и поиска
    const numericId = Number(id);
  
    if (selectedPokemons.includes(numericId)) {
      console.log(`Pokemon с id: ${numericId} уже выбран для обновления`);
      
      setUpdatingPokemons(prevUpdatingPokemons =>
        prevUpdatingPokemons.filter(pokemon => pokemon.id !== numericId)
      );
    
      setSelectedPokemons(prevSelected =>
        prevSelected.filter(selectedId => selectedId !== numericId)
      );
      
      console.log(`Pokemon с id: ${numericId} удален из списка для обновления`);
    } else {
      const pokemonToUpdate = pokemons.find(pokemon => pokemon.id === numericId);
    
      if (pokemonToUpdate) {
        console.log(`Найден Pokemon для обновления: ${JSON.stringify(pokemonToUpdate)}`);
        
        setUpdatingPokemons(prevUpdatingPokemons =>
          [...prevUpdatingPokemons, { ...pokemonToUpdate }]
        );
    
        setSelectedPokemons(prevSelect =>
          [...prevSelect, numericId]
        );
        
        console.log(`Pokemon с id: ${numericId} добавлен в список для обновления`);
      } else {
        console.log(`Не удалось найти Pokemon с id: ${numericId} для обновления`);
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