// C:\Users\Pavel\poke-api-2\src\lib\PokemonUtils\pokeActions.ts
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const usePokemonActions = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [newPokemon, setNewPokemon] = useState({
    name: '',
    weight: 0,
    height: 0,
    species: '',
    experience: 0,
  });
  const [updatingPokemon, setUpdatingPokemon] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch('/api/pokemons');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPokemons(data);
    } catch (error) {
      console.error("Ошибка при загрузке покемонов:", error.message); 
    }
  };

  const handleDetailsClick = async (id) => {
    if (selectedDetail && selectedDetail.id === id) {
      setSelectedDetail(null);
      return;
    }
  
    try {
      const response = await fetch(`/api/pokemon/get?id=${id}`);
      
      if (!response.ok) {
        setSelectedDetail(null);
        alert('Покемон с таким ID не найден');
        return;
      }
  
      const pokemonData = await response.json();
  
      // Корректное получение способностей
      const abilities = Array.isArray(pokemonData.abilities)
                        ? pokemonData.abilities.map(pa => ({ ability: pa.ability }))
                        : [];
  
          setSelectedDetail({
            id: pokemonData.id,
            experience: pokemonData.experience,
            height: pokemonData.height,
            weight: pokemonData.weight,
           abilities, // Поправка
          });
   } catch (error) {
   console.error('Ошибка при загрузке данных', error);
  }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`/api/pokemon/delete?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPokemons(pokemons.filter((pokemon) => pokemon.id !== id));
      } else {
        throw new Error('Не удалось удалить покемона');
      }
    } catch (error) {
      console.error("Ошибка при удалении покемона:", error);
    }
  };


const handleSubmitClick = async () => {
  try {
    const response = await fetch('/api/pokemon/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newPokemon.name,
        weight: newPokemon.weight,
        height: newPokemon.height,
        species: newPokemon.species,
        experience: newPokemon.experience,
      }),
    });
    if (response.ok) {
      const pokemon = await response.json();
      setPokemons([...pokemons, pokemon]);
      toast({
        title: "Успех!",
        description: 'Покемон успешно заведен!',
        variant: "default",
      });
    } else {
      throw new Error('Не удалось создать покемона');
    }
  } catch (error) {
    console.error("Ошибка при создании покемона:", error.message);
    toast({
       title:"Ошибка!", 
       description:'Такой покемон уже существует.',
       variant:"destructive",
     });
  }
};
  const handleUpdateSubmit = async () => {
    if (!updatingPokemon) {
      console.error("Нет покемона для обновления");
      return;
    }
  
    try {
      const response = await fetch('/api/pokemon/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updatingPokemon.id,
          name: updatingPokemon.name,
          weight: updatingPokemon.weight,
          height: updatingPokemon.height,
          species: updatingPokemon.species,
          experience: updatingPokemon.experience,
        }),
      });
  
      if (response.ok) {
        const updatedPokemon = await response.json();
        setPokemons(pokemons.map((pokemon) => pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon));
        setUpdatingPokemon(null);
      } else {
        throw new Error('Не удалось обновить покемона');
      }
    } catch (error) {
      console.error("Ошибка при обновлении покемона:", error.message);
    }
  };

  const handleUpdateInputChange = (event) => {
    setUpdatingPokemon({
      ...updatingPokemon,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleInputChange = (event) => {
    setNewPokemon({
      ...newPokemon,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleUpdateClick = (id: number) => {
    if (updatingPokemon && updatingPokemon.id === id) {
      setUpdatingPokemon(null);
      setUpdateFormOpen(false); 
    } else {
      const pokemonToUpdate = pokemons.find((pokemon) => pokemon.id === id);
      setUpdatingPokemon(pokemonToUpdate ? {...pokemonToUpdate} : null);
      setUpdateFormOpen(true); 
    }
  };
  

  return {
    pokemons,
    selectedDetail,
    newPokemon,
    updatingPokemon,
    fetchPokemons,
    handleDetailsClick,
    handleDeleteClick,
    handleSubmitClick,
    handleUpdateSubmit,
    handleUpdateInputChange,
    showForm, 
    handleCreateClick,
    handleInputChange,
    handleUpdateClick,
    
  };
};
